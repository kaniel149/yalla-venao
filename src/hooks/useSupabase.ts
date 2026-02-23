import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

// ─── Types ──────────────────────────────────────────────────────────────────
export interface DbBusiness {
  id: string
  name: string
  category: string
  description: string
  phone: string
  whatsapp: string
  lat: number
  lng: number
  image: string
  delivery_time: string
  delivery_fee: number
  min_order: number
  rating: number
  open_time: number
  close_time: number
  is_active: boolean
  vertical: string
  menu_items?: DbMenuItem[]
}

export interface DbMenuItem {
  id: string
  business_id: string
  name: string
  description: string
  price: number
  image: string
  is_available: boolean
  sort_order: number
}

export interface DbOrder {
  id: string
  customer_id: string
  business_id: string
  courier_id: string | null
  status: string
  items: unknown
  subtotal: number
  delivery_fee: number
  total: number
  delivery_address: string
  delivery_lat: number
  delivery_lng: number
  notes: string
  created_at: string
  updated_at: string
  businesses?: DbBusiness
}

// ─── useAuth ────────────────────────────────────────────────────────────────
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signup = useCallback(async (email: string, password: string, fullName: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    if (data.user) {
      await supabase.from('users').insert({ id: data.user.id, full_name: fullName, role: 'customer' })
    }
  }, [])

  const logout = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  return { user, session, loading, login, signup, logout }
}

// ─── useBusinesses ──────────────────────────────────────────────────────────
export function useBusinesses() {
  const [businesses, setBusinesses] = useState<DbBusiness[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase!
      .from('businesses')
      .select('*, menu_items(*)')
      .eq('is_active', true)
      .then(({ data, error }) => {
        if (!error && data) setBusinesses(data)
        setLoading(false)
      })
  }, [])

  return { businesses, loading }
}

// ─── useBusiness ────────────────────────────────────────────────────────────
export function useBusiness(id: string) {
  const [business, setBusiness] = useState<DbBusiness | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !id) { setLoading(false); return }

    supabase!
      .from('businesses')
      .select('*, menu_items(*)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!error && data) setBusiness(data)
        setLoading(false)
      })
  }, [id])

  return { business, loading }
}

// ─── useCreateOrder ─────────────────────────────────────────────────────────
export function useCreateOrder() {
  const [loading, setLoading] = useState(false)

  const createOrder = useCallback(async (params: {
    items: unknown
    businessId: string
    address: string
    notes: string
    subtotal: number
    deliveryFee: number
    total: number
    deliveryLat?: number
    deliveryLng?: number
  }) => {
    if (!supabase) throw new Error('Supabase not configured')
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase.from('orders').insert({
      customer_id: user.id,
      business_id: params.businessId,
      items: params.items,
      subtotal: params.subtotal,
      delivery_fee: params.deliveryFee,
      total: params.total,
      delivery_address: params.address,
      delivery_lat: params.deliveryLat,
      delivery_lng: params.deliveryLng,
      notes: params.notes,
    }).select().single()

    setLoading(false)
    if (error) throw error
    return data
  }, [])

  return { createOrder, loading }
}

// ─── useMyOrders ────────────────────────────────────────────────────────────
export function useMyOrders() {
  const [orders, setOrders] = useState<DbOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      supabase!
        .from('orders')
        .select('*, businesses(name, image)')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setOrders(data)
          setLoading(false)
        })
    })
  }, [])

  return { orders, loading }
}

// ─── useVendorOrders ────────────────────────────────────────────────────────
export function useVendorOrders(businessId: string) {
  const [orders, setOrders] = useState<DbOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase || !businessId) { setLoading(false); return }

    // Initial fetch
    supabase!
      .from('orders')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setOrders(data)
        setLoading(false)
      })

    // Real-time subscription
    const channel = supabase
      .channel(`vendor-orders-${businessId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'orders',
        filter: `business_id=eq.${businessId}`,
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setOrders(prev => [payload.new as DbOrder, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setOrders(prev => prev.map(o => o.id === (payload.new as DbOrder).id ? payload.new as DbOrder : o))
        }
      })
      .subscribe()

    return () => { supabase!.removeChannel(channel) }
  }, [businessId])

  return { orders, loading }
}

// ─── useCourierOrders ───────────────────────────────────────────────────────
export function useCourierOrders() {
  const [orders, setOrders] = useState<DbOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) { setLoading(false); return }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      supabase!
        .from('orders')
        .select('*, businesses(name, image, lat, lng)')
        .eq('courier_id', user.id)
        .in('status', ['ready', 'picked_up'])
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data) setOrders(data)
          setLoading(false)
        })
    })
  }, [])

  return { orders, loading }
}

// ─── useUpdateOrderStatus ───────────────────────────────────────────────────
export function useUpdateOrderStatus() {
  const [loading, setLoading] = useState(false)

  const updateStatus = useCallback(async (orderId: string, status: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    setLoading(true)
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId)
    setLoading(false)
    if (error) throw error
  }, [])

  return { updateStatus, loading }
}
