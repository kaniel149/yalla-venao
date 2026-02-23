/**
 * Data adapter — if Supabase is configured, use live data; otherwise fall back to mock data.
 * Components import from here instead of directly from mockData.
 */
import { isSupabaseConfigured } from '../lib/supabase'
import { businesses as mockBusinesses, categories as mockCategories, activeOrder as mockActiveOrder } from './mockData'
import type { Business } from './mockData'
import {
  useBusinesses as useSupabaseBusinesses,
  useBusiness as useSupabaseBusiness,
  useAuth as useSupabaseAuth,
  useCreateOrder as useSupabaseCreateOrder,
  useMyOrders as useSupabaseMyOrders,
  useVendorOrders as useSupabaseVendorOrders,
  useCourierOrders as useSupabaseCourierOrders,
  useUpdateOrderStatus as useSupabaseUpdateOrderStatus,
} from '../hooks/useSupabase'
import type { DbBusiness } from '../hooks/useSupabase'

// Re-export types
export type { Business, CartItem } from './mockData'
export type { Product } from './mockData'

// Re-export categories (always from mock — they're static)
export const categories = mockCategories

// Re-export activeOrder for demo
export const activeOrder = mockActiveOrder

// Convert DB business to app Business type
function dbToAppBusiness(db: DbBusiness): Business {
  return {
    id: db.id,
    name: db.name,
    category: db.category,
    vertical: (db.vertical as Business['vertical']) || 'food',
    image: db.image || '',
    rating: db.rating || 0,
    reviews: 0,
    deliveryTime: db.delivery_time || '',
    deliveryFee: db.delivery_fee || 0,
    minOrder: db.min_order || 0,
    tags: [],
    description: db.description || '',
    phone: db.phone || '',
    hours: { open: db.open_time || 0, close: db.close_time || 24 },
    coordinates: db.lat && db.lng ? { lat: db.lat, lng: db.lng } : undefined,
    products: (db.menu_items || []).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image || '',
      description: item.description || '',
    })),
  }
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

export function useBusinesses() {
  if (!isSupabaseConfigured) {
    return { businesses: mockBusinesses, loading: false }
  }
  const { businesses: dbBusinesses, loading } = useSupabaseBusinesses()
  return { businesses: dbBusinesses.map(dbToAppBusiness), loading }
}

export function useBusiness(id: string) {
  if (!isSupabaseConfigured) {
    const found = mockBusinesses.find(b => b.id === id) || null
    return { business: found, loading: false }
  }
  const { business: dbBusiness, loading } = useSupabaseBusiness(id)
  return { business: dbBusiness ? dbToAppBusiness(dbBusiness) : null, loading }
}

// Pass-through hooks (only work with Supabase)
export const useAuth = useSupabaseAuth
export const useCreateOrder = useSupabaseCreateOrder
export const useMyOrders = useSupabaseMyOrders
export const useVendorOrders = useSupabaseVendorOrders
export const useCourierOrders = useSupabaseCourierOrders
export const useUpdateOrderStatus = useSupabaseUpdateOrderStatus

// Direct access for non-hook contexts
export const businesses = mockBusinesses
