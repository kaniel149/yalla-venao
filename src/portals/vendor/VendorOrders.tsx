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

  const refresh = async () => {
    if (!businessId) {
      setOrders(await orderStore.getAll())
    } else {
      setOrders(await orderStore.getByBusiness(businessId))
    }
  }

  useEffect(() => { refresh() }, [])

  const updateStatus = async (id: string, status: StoredOrder['status']) => {
    await orderStore.updateStatus(id, status)
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
