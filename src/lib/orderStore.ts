// src/lib/orderStore.ts
// Supabase-first with localStorage fallback

import { supabase, isSupabaseConfigured } from './supabase'

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
  courierName: string
  courierLat: number | null
  courierLng: number | null
}

// ─── DB row ↔ App type mapping ─────────────────────────────────────────────
interface DbRow {
  id: string
  business_id: string
  business_name: string
  customer_name: string
  items: { name: string; qty: number; price: number }[]
  subtotal: number
  delivery_fee: number
  tip: number
  total: number
  delivery_location: string
  status: string
  channel: string
  created_at: string
  courier_name: string
  courier_lat: number | null
  courier_lng: number | null
}

function rowToOrder(r: DbRow): StoredOrder {
  return {
    id: r.id,
    businessId: r.business_id,
    businessName: r.business_name,
    customerName: r.customer_name,
    items: r.items,
    subtotal: Number(r.subtotal),
    deliveryFee: Number(r.delivery_fee),
    tip: Number(r.tip),
    total: Number(r.total),
    deliveryLocation: r.delivery_location,
    status: r.status as StoredOrder['status'],
    createdAt: r.created_at,
    channel: r.channel as StoredOrder['channel'],
    courierName: r.courier_name || '',
    courierLat: r.courier_lat,
    courierLng: r.courier_lng,
  }
}

// ─── localStorage fallback ─────────────────────────────────────────────────
const STORAGE_KEY = 'yv_orders'

function localGetAll(): StoredOrder[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function localSave(orders: StoredOrder[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

// ─── Public API ────────────────────────────────────────────────────────────
export const orderStore = {
  async getAll(): Promise<StoredOrder[]> {
    if (!isSupabaseConfigured || !supabase) return localGetAll()
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) { console.error('orderStore.getAll:', error); return localGetAll() }
    return (data as DbRow[]).map(rowToOrder)
  },

  async add(order: Omit<StoredOrder, 'id' | 'createdAt' | 'status'>): Promise<StoredOrder> {
    if (!isSupabaseConfigured || !supabase) {
      const newOrder: StoredOrder = {
        ...order,
        id: `ord-${Date.now().toString(36)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        courierName: '',
        courierLat: null,
        courierLng: null,
      }
      const all = localGetAll()
      all.unshift(newOrder)
      localSave(all)
      return newOrder
    }
    const { data, error } = await supabase
      .from('orders')
      .insert({
        business_id: order.businessId,
        business_name: order.businessName,
        customer_name: order.customerName,
        items: order.items,
        subtotal: order.subtotal,
        delivery_fee: order.deliveryFee,
        tip: order.tip,
        total: order.total,
        delivery_location: order.deliveryLocation,
        channel: order.channel,
      })
      .select()
      .single()
    if (error) { console.error('orderStore.add:', error); throw error }
    return rowToOrder(data as DbRow)
  },

  async updateStatus(id: string, status: StoredOrder['status']): Promise<void> {
    if (!isSupabaseConfigured || !supabase) {
      const all = localGetAll()
      const idx = all.findIndex(o => o.id === id)
      if (idx !== -1) { all[idx].status = status; localSave(all) }
      return
    }
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
    if (error) console.error('orderStore.updateStatus:', error)
  },

  async getByBusiness(businessId: string): Promise<StoredOrder[]> {
    if (!isSupabaseConfigured || !supabase) {
      return localGetAll().filter(o => o.businessId === businessId)
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
    if (error) { console.error('orderStore.getByBusiness:', error); return [] }
    return (data as DbRow[]).map(rowToOrder)
  },

  /** Get orders with status 'ready' — available for courier pickup */
  async getReady(): Promise<StoredOrder[]> {
    if (!isSupabaseConfigured || !supabase) {
      return localGetAll().filter(o => o.status === 'ready')
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('status', 'ready')
      .order('created_at', { ascending: false })
    if (error) { console.error('orderStore.getReady:', error); return [] }
    return (data as DbRow[]).map(rowToOrder)
  },

  /** Courier accepts an order — set status to picked_up + courier name */
  async assignCourier(id: string, courierName: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase) {
      const all = localGetAll()
      const idx = all.findIndex(o => o.id === id)
      if (idx !== -1) {
        all[idx].status = 'picked_up'
        all[idx].courierName = courierName
        localSave(all)
      }
      return
    }
    const { error } = await supabase
      .from('orders')
      .update({ status: 'picked_up', courier_name: courierName })
      .eq('id', id)
    if (error) console.error('orderStore.assignCourier:', error)
  },

  /** Update courier GPS position on an active delivery */
  async updateCourierLocation(id: string, lat: number, lng: number): Promise<void> {
    if (!isSupabaseConfigured || !supabase) return
    const { error } = await supabase
      .from('orders')
      .update({ courier_lat: lat, courier_lng: lng })
      .eq('id', id)
    if (error) console.error('orderStore.updateCourierLocation:', error)
  },

  /** Get a single order by ID */
  async getById(id: string): Promise<StoredOrder | null> {
    if (!isSupabaseConfigured || !supabase) {
      return localGetAll().find(o => o.id === id) || null
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()
    if (error) { console.error('orderStore.getById:', error); return null }
    return rowToOrder(data as DbRow)
  },

  /** Get orders assigned to a courier */
  async getByCourier(courierName: string): Promise<StoredOrder[]> {
    if (!isSupabaseConfigured || !supabase) {
      return localGetAll().filter(o => o.courierName === courierName)
    }
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('courier_name', courierName)
      .order('created_at', { ascending: false })
    if (error) { console.error('orderStore.getByCourier:', error); return [] }
    return (data as DbRow[]).map(rowToOrder)
  },

  async getStats(): Promise<{
    totalOrders: number
    totalRevenue: number
    totalDeliveryFees: number
    byBusiness: { businessId: string; name: string; count: number; revenue: number }[]
  }> {
    const all = await this.getAll()
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
