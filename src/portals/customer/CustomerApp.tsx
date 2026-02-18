import { useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import HomePage from './HomePage'
import BusinessPage from './BusinessPage'
import CartPage from './CartPage'
import TrackOrderPage from './TrackOrderPage'
import OrdersPage from './OrdersPage'
import ExplorePage from './ExplorePage'
import ProfilePage from './ProfilePage'
import type { CartItem } from '../../data/mockData'

export default function CustomerApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState<CartItem[]>([])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === item.product.id)
      if (existing) {
        return prev.map(c => c.product.id === item.product.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.product.id === productId)
      if (existing && existing.qty > 1) {
        return prev.map(c => c.product.id === productId ? { ...c, qty: c.qty - 1 } : c)
      }
      return prev.filter(c => c.product.id !== productId)
    })
  }

  const clearCart = () => setCart([])

  const totalItems = cart.reduce((s, c) => s + c.qty, 0)

  const tabs = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🔍', label: 'Explore', path: '/explore' },
    { icon: '📦', label: 'Orders', path: '/orders' },
    { icon: '👤', label: 'Profile', path: '/profile' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
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

        {/* Bottom Nav */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex z-50 shadow-lg">
          {tabs.map(tab => {
            const active = location.pathname === tab.path
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-all ${active ? 'text-[#FF6B35]' : 'text-gray-400'}`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            )
          })}
          {/* Cart tab */}
          <button
            onClick={() => navigate('/cart')}
            className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-all relative ${location.pathname === '/cart' ? 'text-[#FF6B35]' : 'text-gray-400'}`}
          >
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute top-1 right-4 bg-[#FF6B35] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] font-medium">Cart</span>
          </button>
        </nav>
      </div>
    </div>
  )
}
