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
