import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './HomePage'
import BusinessPage from './BusinessPage'
import CartPage from './CartPage'
import TrackOrderPage from './TrackOrderPage'
import OrdersPage from './OrdersPage'
import ExplorePage from './ExplorePage'
import ProfilePage from './ProfilePage'
import type { CartItem } from '../../data/dataAdapter'

const NavIcon = {
  Home: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? '#FF6B35' : 'none'} stroke={active ? '#FF6B35' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
      <path d="M9 21V12h6v9"/>
    </svg>
  ),
  Explore: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
    </svg>
  ),
  Orders: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
      <rect x="9" y="3" width="6" height="4" rx="1"/>
      <path d="M9 12h6M9 16h4"/>
    </svg>
  ),
  Profile: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
  Cart: (active: boolean) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={active ? '#FF6B35' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
      <line x1="3" y1="6" x2="21" y2="6"/>
      <path d="M16 10a4 4 0 0 1-8 0"/>
    </svg>
  ),
}

const tabs = [
  { key: 'Home' as const, label: 'Home', path: '/' },
  { key: 'Explore' as const, label: 'Explore', path: '/explore' },
  { key: 'Orders' as const, label: 'Orders', path: '/orders' },
  { key: 'Profile' as const, label: 'Profile', path: '/profile' },
  { key: 'Cart' as const, label: 'Cart', path: '/cart' },
]

export default function CustomerApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === item.product.id)
      if (existing) return prev.map(c => c.product.id === item.product.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === productId)
      if (existing && existing.qty > 1) return prev.map(c => c.product.id === productId ? { ...c, qty: c.qty - 1 } : c)
      return prev.filter(c => c.product.id !== productId)
    })
  }

  const clearCart = () => setCart([])
  const totalItems = cart.reduce((s, c) => s + c.qty, 0)

  return (
    <div className="min-h-screen bg-theme">
      <div className="max-w-md mx-auto relative min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage onBusinessClick={(id) => navigate(`/business/${id}`)} />} />
          <Route path="/business/:id" element={<BusinessPage cart={cart} addToCart={addToCart} onViewCart={() => navigate('/cart')} />} />
          <Route path="/cart" element={<CartPage cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} onOrderPlaced={() => navigate('/track')} />} />
          <Route path="/track" element={<TrackOrderPage />} />
          <Route path="/orders" element={<OrdersPage onTrack={() => navigate('/track')} />} />
          <Route path="/explore" element={<ExplorePage onBusinessClick={(id) => navigate(`/business/${id}`)} />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>

        {/* ── Floating Pill Bottom Nav ── */}
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50" style={{ width: 340 }}>
          <div className="pill-nav rounded-full shadow-xl flex items-center px-2 py-2 gap-1">
            {tabs.map(tab => {
              const active = location.pathname === tab.path
              const Icon = NavIcon[tab.key]
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className="relative flex-1 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full transition-all duration-200"
                  style={{ color: active ? '#FF6B35' : 'var(--text-muted)' }}
                >
                  {/* Active indicator: filled circle behind icon */}
                  {active && (
                    <span
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(255,107,53,0.12)' }}
                    />
                  )}

                  {/* Cart badge */}
                  {tab.key === 'Cart' && totalItems > 0 && (
                    <span className="absolute top-0.5 right-2.5 bg-[#FF6B35] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center z-10">
                      {totalItems}
                    </span>
                  )}

                  <span className="relative z-10">{Icon(active)}</span>
                  <span className={`relative z-10 text-[9px] font-semibold tracking-wide ${active ? 'text-[#FF6B35]' : ''}`}>
                    {tab.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
