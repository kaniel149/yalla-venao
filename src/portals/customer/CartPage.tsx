import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CartItem } from '../../data/mockData'
import { businesses } from '../../data/mockData'

interface Props {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  onOrderPlaced: () => void
}

export default function CartPage({ cart, addToCart, removeFromCart, clearCart, onOrderPlaced }: Props) {
  const navigate = useNavigate()
  const [tip, setTip] = useState(0)
  const [address, setAddress] = useState('')
  const [placed, setPlaced] = useState(false)

  const businessId = cart[0]?.businessId
  const biz = businesses.find(b => b.id === businessId)

  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0)
  const deliveryFee = biz?.deliveryFee ?? 3
  const total = subtotal + deliveryFee + tip

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    setPlaced(true)
    setTimeout(() => {
      clearCart()
      onOrderPlaced()
    }, 1200)
  }

  if (cart.length === 0 && !placed) {
    return (
      <div className="pb-24 pt-4 px-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-gray-600">‹</button>
          <h1 className="text-xl font-bold text-gray-900">Your Order</h1>
        </div>
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <p className="text-gray-500 text-lg font-medium">Your cart is empty</p>
          <p className="text-gray-400 text-sm mt-1">Add items from a business to get started</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-6">Browse businesses</button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-36 pt-4 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-gray-600 text-lg">‹</button>
        <h1 className="text-xl font-bold text-gray-900">Your Order</h1>
      </div>

      {/* Business header */}
      {biz && (
        <div className="card p-3 flex items-center gap-3 mb-4">
          <img src={biz.image} alt={biz.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-bold text-gray-900">{biz.name}</p>
            <p className="text-xs text-gray-500">
            {biz.deliveryTime === 'On request' ? 'On request' : `${biz.deliveryTime} min`}
            {biz.deliveryFee > 0 ? ` · $${biz.deliveryFee} delivery` : ' · Free delivery'}
          </p>
          </div>
        </div>
      )}

      {/* Items */}
      <div className="card p-4 mb-4 space-y-3">
        {cart.map(item => (
          <div key={item.product.id} className="flex items-center gap-3">
            <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-900 truncate">{item.product.name}</p>
              <p className="text-[#FF6B35] font-bold text-sm">${(item.product.price * item.qty).toFixed(0)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 transition-all text-lg leading-none"
              >−</button>
              <span className="font-bold text-gray-900 w-4 text-center">{item.qty}</span>
              <button
                onClick={() => addToCart({ ...item, qty: 1 })}
                className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center font-bold text-white hover:bg-[#E85520] transition-all text-lg leading-none"
              >+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery address */}
      <div className="card p-4 mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery address</label>
        <input
          value={address}
          onChange={e => setAddress(e.target.value)}
          placeholder="Enter your location in Playa Venao..."
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
        />
      </div>

      {/* Fees + Tip */}
      <div className="card p-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-3">
          <span>Delivery fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-100 pt-3">
          <p className="text-sm font-semibold text-gray-700 mb-2">Add a tip</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(t => (
              <button
                key={t}
                onClick={() => setTip(t)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${tip === t ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t === 0 ? 'No tip' : `$${t}`}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between">
          <span className="font-bold text-gray-900 text-lg">Total</span>
          <span className="font-extrabold text-[#FF6B35] text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-[#F5F3EE] border-t border-gray-100">
        <button
          onClick={handlePlaceOrder}
          disabled={placed}
          className={`w-full py-4 rounded-full text-white font-bold text-lg transition-all ${placed ? 'bg-green-500' : 'bg-[#FF6B35] hover:bg-[#E85520] active:scale-95'}`}
        >
          {placed ? '✅ Order Placed!' : `Place Order · $${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  )
}
