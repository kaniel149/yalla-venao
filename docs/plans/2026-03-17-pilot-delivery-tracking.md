# Yalla Venao Pilot — $5 Delivery Fee + Order Tracking

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Yalla Venao a working pilot — flat $5 delivery fee on every order, orders persist in localStorage, vendor sees their delivery count/revenue, admin sees all deliveries with per-business breakdown.

**Architecture:** localStorage-backed order store (`orderStore.ts`) provides a simple typed API for saving and querying orders. No Supabase required for pilot. All portals (customer, vendor, admin) read from the same store. When Supabase is connected later, only `orderStore.ts` needs to change.

**Tech Stack:** React + TypeScript + localStorage (zero-config, no backend)

---

## Constants

```
DELIVERY_FEE = 5  (flat $5 per delivery order)
STORAGE_KEY = 'yv_orders'
```

---

### Task 1: Create Order Store (`orderStore.ts`)

**Files:**
- Create: `src/lib/orderStore.ts`

**Step 1: Create the order store module**

```typescript
// src/lib/orderStore.ts

export interface StoredOrder {
  id: string
  businessId: string
  businessName: string
  customerName: string
  items: { name: string; qty: number; price: number }[]
  subtotal: number
  deliveryFee: number
  tip: number
  total: number
  deliveryLocation: string
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled'
  createdAt: string   // ISO string
  channel: 'app' | 'whatsapp'
}

const STORAGE_KEY = 'yv_orders'

function getAll(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function save(orders: StoredOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export const orderStore = {
  getAll,

  add(order: Omit<StoredOrder, 'id' | 'createdAt' | 'status'>): StoredOrder {
    const newOrder: StoredOrder = {
      ...order,
      id: `ord-${Date.now().toString(36)}`,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    const all = getAll()
    all.unshift(newOrder)
    save(all)
    return newOrder
  },

  updateStatus(id: string, status: StoredOrder['status']) {
    const all = getAll()
    const idx = all.findIndex(o => o.id === id)
    if (idx !== -1) {
      all[idx].status = status
      save(all)
    }
  },

  getByBusiness(businessId: string): StoredOrder[] {
    return getAll().filter(o => o.businessId === businessId)
  },

  /** Stats for admin: per-business delivery breakdown */
  getStats() {
    const all = getAll()
    const byBusiness: Record<string, { name: string; count: number; revenue: number }> = {}
    for (const o of all) {
      if (!byBusiness[o.businessId]) {
        byBusiness[o.businessId] = { name: o.businessName, count: 0, revenue: 0 }
      }
      byBusiness[o.businessId].count++
      byBusiness[o.businessId].revenue += o.total
    }
    return {
      totalOrders: all.length,
      totalRevenue: all.reduce((s, o) => s + o.total, 0),
      totalDeliveryFees: all.length * 5,
      byBusiness: Object.entries(byBusiness)
        .map(([id, data]) => ({ businessId: id, ...data }))
        .sort((a, b) => b.count - a.count),
    }
  },
}
```

**Step 2: Verify it compiles**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit src/lib/orderStore.ts`
Expected: No errors (standalone module, no imports)

**Step 3: Commit**

```bash
git add src/lib/orderStore.ts
git commit -m "feat: add localStorage order store for pilot"
```

---

### Task 2: Flat $5 Delivery Fee in CartPage + Save Orders

**Files:**
- Modify: `src/portals/customer/CartPage.tsx`

**Step 1: Change delivery fee to flat $5**

Line 72 currently:
```typescript
const deliveryFee = biz?.deliveryFee ?? 3
```

Replace with:
```typescript
const deliveryFee = 5
```

**Step 2: Import orderStore and save order on placement**

Add import at top:
```typescript
import { orderStore } from '../../lib/orderStore'
```

**Step 3: Update `handlePlaceOrder` (line 84-91) to save the order:**

```typescript
const handlePlaceOrder = () => {
  if (cart.length === 0 || !deliveryReady || !biz) return
  orderStore.add({
    businessId: biz.id,
    businessName: biz.name,
    customerName: 'Walk-in',
    items: cart.map(c => ({ name: c.product.name, qty: c.qty, price: c.product.price })),
    subtotal,
    deliveryFee,
    tip,
    total,
    deliveryLocation: currentLocation,
    channel: 'app',
  })
  setPlaced(true)
  fireConfetti()
  setTimeout(() => {
    clearCart()
    onOrderPlaced()
  }, 1800)
}
```

**Step 4: Update `handleWhatsAppOrder` (line 94-109) to also save:**

```typescript
const handleWhatsAppOrder = () => {
  if (cart.length === 0 || !deliveryReady || !biz?.phone) return
  const link = buildWhatsAppLink(
    { name: biz.name, phone: biz.phone },
    cart,
    currentLocation,
    total
  )
  orderStore.add({
    businessId: biz.id,
    businessName: biz.name,
    customerName: 'WhatsApp',
    items: cart.map(c => ({ name: c.product.name, qty: c.qty, price: c.product.price })),
    subtotal,
    deliveryFee,
    tip,
    total,
    deliveryLocation: currentLocation,
    channel: 'whatsapp',
  })
  setPlaced(true)
  window.open(link, '_blank')
  fireConfetti()
  setTimeout(() => {
    clearCart()
    onOrderPlaced()
  }, 1800)
}
```

**Step 5: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 6: Commit**

```bash
git add src/portals/customer/CartPage.tsx
git commit -m "feat: flat $5 delivery fee + persist orders to localStorage"
```

---

### Task 3: Show $5 Delivery Fee Across All Display Components

**Files:**
- Modify: `src/portals/customer/BusinessPage.tsx:389` — delivery fee display
- Modify: `src/portals/customer/HomePage.tsx:229-238` — delivery fee in cards
- Modify: `src/data/mockData.ts` — set all deliveryFee to 5

**Step 1: Update mockData.ts — set ALL business deliveryFee to 5**

In `src/data/mockData.ts`, find every `deliveryFee:` line and replace the value with `5`.
This ensures consistency everywhere businesses are displayed.

**Step 2: In HomePage.tsx, the Popular section (lines 229-238) already reads `biz.deliveryFee`, so after updating mockData it will show $5.**

Verify the display text on line 233 says `$${biz.deliveryFee} del.` — this will now show `$5 del.`

**Step 3: In BusinessPage.tsx line 389, the info row already reads `biz.deliveryFee` — will show `$5 delivery` after mockData change.**

**Step 4: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**

```bash
git add src/data/mockData.ts
git commit -m "data: set all business delivery fees to flat $5"
```

---

### Task 4: Vendor Dashboard — Real Delivery Stats

**Files:**
- Modify: `src/portals/vendor/VendorDashboard.tsx`

**Step 1: Replace hardcoded mock data with orderStore**

Replace the entire file content with a version that:
1. Imports `orderStore`
2. Reads vendor's business ID from localStorage (set during onboarding: `yv_vendor_setup`)
3. Shows REAL order count, revenue, and live orders from the store
4. Keeps the existing UI design (status buttons, cards)

```typescript
import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

type OrderStatus = 'pending' | 'preparing' | 'ready'

const statusConfig = {
  pending:   { label: 'New',       color: 'bg-blue-500',  dot: 'bg-blue-400' },
  preparing: { label: 'Preparing', color: 'bg-[#FF6B35]', dot: 'bg-orange-400' },
  ready:     { label: 'Ready',     color: 'bg-[#1B4332]', dot: 'bg-green-500' },
}

function getVendorBusinessId(): string | null {
  try {
    const raw = localStorage.getItem('yv_vendor_setup')
    if (!raw) return null
    return JSON.parse(raw).businessId || null
  } catch { return null }
}

export default function VendorDashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const businessId = getVendorBusinessId()

  // Refresh from store
  const refresh = () => {
    if (!businessId) {
      setOrders(orderStore.getAll())
    } else {
      setOrders(orderStore.getByBusiness(businessId))
    }
  }

  useEffect(() => { refresh() }, [])

  const updateStatus = (id: string, status: StoredOrder['status']) => {
    orderStore.updateStatus(id, status)
    refresh()
  }

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status))
  const todayOrders = orders.filter(o => {
    const d = new Date(o.createdAt)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  })
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0)
  const totalDeliveries = orders.length

  return (
    <div className="pb-8 pt-6 px-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="serif text-2xl text-gray-900 leading-tight">
            {orders[0]?.businessName || 'Your Business'}
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Playa Venao, Panama</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            isOpen ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-300 animate-pulse-dot' : 'bg-gray-400'}`} />
          {isOpen ? 'Open' : 'Closed'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">{todayOrders.length}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Orders today</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">${todayRevenue}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Revenue</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">{totalDeliveries}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Total deliveries</p>
        </div>
      </div>

      {/* Live orders */}
      <h2 className="font-bold text-gray-900 text-[15px] mb-3">
        Live orders {activeOrders.length > 0 && `(${activeOrders.length})`}
      </h2>
      <div className="space-y-3">
        {activeOrders.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No active orders</div>
        )}
        {activeOrders.map(order => {
          const sc = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
          return (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{order.customerName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${sc.color}`}>
                    {sc.label}
                  </span>
                  {order.channel === 'whatsapp' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">WA</span>
                  )}
                </div>
                <span className="font-bold text-[#FF6B35] text-sm">${order.total}</span>
              </div>
              <p className="text-[12px] text-gray-500 mb-1">
                {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
              </p>
              <p className="text-[10px] text-gray-300 mb-1 font-medium">
                {order.deliveryLocation} · {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[10px] text-gray-300 mb-3 font-medium">
                Delivery fee: $5 · #{order.id}
              </p>
              <div className="flex gap-2">
                {(['pending', 'preparing', 'ready'] as const).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order.id, s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      order.status === s
                        ? `${statusConfig[s].color} text-white`
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Delivery history section */}
      {orders.filter(o => o.status === 'delivered').length > 0 && (
        <>
          <h2 className="font-bold text-gray-900 text-[15px] mb-3 mt-6">Delivery history</h2>
          <div className="space-y-2">
            {orders.filter(o => o.status === 'delivered').map(order => (
              <div key={order.id} className="bg-white rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
                  <p className="text-[11px] text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-gray-900">${order.total}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
```

**Step 2: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add src/portals/vendor/VendorDashboard.tsx
git commit -m "feat: vendor dashboard reads real orders from localStorage"
```

---

### Task 5: Vendor Orders — Real Data from Store

**Files:**
- Modify: `src/portals/vendor/VendorOrders.tsx`

**Step 1: Replace hardcoded orders with orderStore**

Replace the entire file to read from `orderStore`, keeping the same UI (filter tabs, status buttons, WhatsApp link):

```typescript
import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

type Filter = 'all' | 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending:   { color: 'text-blue-600',   bg: 'bg-blue-100',   label: 'New' },
  confirmed: { color: 'text-blue-600',   bg: 'bg-blue-100',   label: 'Confirmed' },
  preparing: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Preparing' },
  ready:     { color: 'text-green-700',  bg: 'bg-green-100',  label: 'Ready' },
  picked_up: { color: 'text-purple-600', bg: 'bg-purple-100', label: 'Picked up' },
  delivered: { color: 'text-gray-600',   bg: 'bg-gray-100',   label: 'Delivered' },
  cancelled: { color: 'text-red-600',    bg: 'bg-red-100',    label: 'Cancelled' },
}

function getVendorBusinessId(): string | null {
  try {
    const raw = localStorage.getItem('yv_vendor_setup')
    if (!raw) return null
    return JSON.parse(raw).businessId || null
  } catch { return null }
}

export default function VendorOrders() {
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [filter, setFilter] = useState<Filter>('all')
  const businessId = getVendorBusinessId()

  const refresh = () => {
    if (!businessId) {
      setOrders(orderStore.getAll())
    } else {
      setOrders(orderStore.getByBusiness(businessId))
    }
  }

  useEffect(() => { refresh() }, [])

  const updateStatus = (id: string, status: StoredOrder['status']) => {
    orderStore.updateStatus(id, status)
    refresh()
  }

  const filters: Filter[] = ['all', 'pending', 'preparing', 'ready', 'delivered']
  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="pb-8 pt-4 px-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-xl">Orders</h2>
        <span className="text-sm text-gray-400">{orders.length} total</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f ? 'bg-[#1B4332] text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => {
          const s = statusConfig[order.status] || statusConfig.pending
          return (
            <div key={order.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{order.customerName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                  {order.channel === 'whatsapp' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">WA</span>
                  )}
                </div>
                <span className="font-bold text-[#FF6B35]">${order.total}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
              </p>
              <p className="text-xs text-gray-400">
                {order.deliveryLocation} · ${order.deliveryFee} delivery · #{order.id}
              </p>
              <p className="text-xs text-gray-300">
                {new Date(order.createdAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>

              {order.status === 'pending' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateStatus(order.id, 'preparing')} className="flex-1 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold">Accept</button>
                  <button onClick={() => updateStatus(order.id, 'cancelled')} className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold">Reject</button>
                </div>
              )}
              {order.status === 'preparing' && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => updateStatus(order.id, 'ready')} className="flex-1 py-2.5 bg-[#FF6B35] text-white rounded-xl text-xs font-bold">Mark Ready</button>
                </div>
              )}
              {order.status === 'ready' && (
                <div className="mt-3">
                  <button onClick={() => updateStatus(order.id, 'delivered')} className="w-full py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold">Mark Delivered</button>
                </div>
              )}
            </div>
          )
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No orders in this category</div>
        )}
      </div>
    </div>
  )
}
```

**Step 2: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add src/portals/vendor/VendorOrders.tsx
git commit -m "feat: vendor orders page reads from localStorage store"
```

---

### Task 6: Admin Dashboard — Real Stats + Per-Business Breakdown

**Files:**
- Modify: `src/portals/admin/AdminDashboard.tsx`

**Step 1: Replace hardcoded KPIs and orders with orderStore data**

```typescript
import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

const statusColor: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  pending: 'bg-blue-100 text-blue-600',
  preparing: 'bg-orange-100 text-orange-600',
  ready: 'bg-green-100 text-green-700',
  picked_up: 'bg-purple-100 text-purple-600',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [stats, setStats] = useState(orderStore.getStats())

  useEffect(() => {
    setOrders(orderStore.getAll())
    setStats(orderStore.getStats())
  }, [])

  const todayOrders = orders.filter(o => {
    return new Date(o.createdAt).toDateString() === new Date().toDateString()
  })

  const kpis = [
    { label: 'Total Orders', value: String(stats.totalOrders) },
    { label: 'GMV', value: `$${stats.totalRevenue}` },
    { label: 'Delivery Fees', value: `$${stats.totalDeliveryFees}` },
    { label: 'Today', value: String(todayOrders.length) },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-400 text-sm mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} · Playa Venao
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{kpi.label}</p>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Per-Business Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Deliveries per Business</h3>
        </div>
        {stats.byBusiness.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No deliveries yet</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.byBusiness.map(biz => (
              <div key={biz.businessId} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{biz.name}</p>
                  <p className="text-xs text-gray-400">{biz.count} delivery{biz.count !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#FF6B35]">${biz.revenue}</p>
                  <p className="text-[10px] text-gray-400">${biz.count * 5} in delivery fees</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <span className="text-xs text-gray-400">{orders.length} total</span>
        </div>
        {orders.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No orders yet. They'll appear here when customers place them.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order', 'Customer', 'Business', 'Amount', 'Channel', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 20).map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{o.customerName}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{o.businessName}</td>
                    <td className="px-4 py-3 font-bold text-[#FF6B35]">${o.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${o.channel === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {o.channel === 'whatsapp' ? 'WA' : 'App'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
```

**Step 2: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add src/portals/admin/AdminDashboard.tsx
git commit -m "feat: admin dashboard with real stats + per-business delivery breakdown"
```

---

### Task 7: Admin Orders Page — Real Data

**Files:**
- Modify: `src/portals/admin/AdminApp.tsx` — replace `AdminOrdersPage` function

**Step 1: Update the inline `AdminOrdersPage` component (lines 92-135)**

Replace with a version that reads from orderStore and allows status updates:

```typescript
function AdminOrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([])

  useEffect(() => {
    setOrders(orderStore.getAll())
  }, [])

  const updateStatus = (id: string, status: StoredOrder['status']) => {
    orderStore.updateStatus(id, status)
    setOrders(orderStore.getAll())
  }

  // ... (same table UI but with real data + status dropdown)
}
```

Add imports at top of AdminApp.tsx:
```typescript
import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'
```

**Step 2: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add src/portals/admin/AdminApp.tsx
git commit -m "feat: admin orders page reads real orders from store"
```

---

### Task 8: Customer Orders Page — Real Data

**Files:**
- Modify: `src/portals/customer/OrdersPage.tsx`

**Step 1: Replace hardcoded orders with orderStore**

Read orders from `orderStore.getAll()`, show active orders (non-delivered) at top, delivered orders below. Keep existing UI style.

**Step 2: Build check**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npx tsc --noEmit`
Expected: PASS

**Step 3: Commit**

```bash
git add src/portals/customer/OrdersPage.tsx
git commit -m "feat: customer orders page shows real order history"
```

---

### Task 9: Build + Deploy

**Step 1: Install dependencies**

Run: `cd ~/Desktop/projects/business-projects/yalla-venao && npm install`

**Step 2: Full build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Final commit + push**

```bash
git add -A
git commit -m "feat: Yalla Venao pilot — $5 flat delivery, order tracking, real dashboards"
git push origin main
```

Vercel auto-deploys from main → live at https://yalla-venao.vercel.app

---

## Summary of Changes

| File | Change |
|------|--------|
| `src/lib/orderStore.ts` | NEW — localStorage order persistence + stats API |
| `src/portals/customer/CartPage.tsx` | Flat $5 fee + save orders on placement |
| `src/data/mockData.ts` | All deliveryFee → 5 |
| `src/portals/vendor/VendorDashboard.tsx` | Real order stats + delivery count |
| `src/portals/vendor/VendorOrders.tsx` | Real orders from store |
| `src/portals/admin/AdminDashboard.tsx` | Real KPIs + per-business delivery breakdown |
| `src/portals/admin/AdminApp.tsx` | Real orders table |
| `src/portals/customer/OrdersPage.tsx` | Real order history |

## What This Gives You (Pilot)

- Customer places order → saved with $5 delivery fee
- Vendor dashboard → sees their real delivery count + revenue
- Admin dashboard → sees total deliveries, per-business breakdown, delivery fee income
- All order channels tracked (app vs WhatsApp)
- Zero backend config needed — works immediately
