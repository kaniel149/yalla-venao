import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import type { CartItem } from '../../data/dataAdapter'
import { businesses } from '../../data/dataAdapter'

interface Props {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  onOrderPlaced: () => void
}

const BEACH_LOCATIONS = [
  { id: 'main-beach', label: 'Main Beach', emoji: '🏖️' },
  { id: 'el-sitio', label: 'El Sitio Beach', emoji: '🏄' },
  { id: 'campsite', label: 'Campsite', emoji: '🏕️' },
  { id: 'bungalow', label: 'My Bungalow', emoji: '🏡' },
  { id: 'other', label: 'Other', emoji: '📍' },
]

function fireConfetti() {
  const colors = ['#FF6B35', '#1B4332', '#FFD700', '#ffffff']
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.6 },
    colors,
    scalar: 1.1,
  })
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    })
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    })
  }, 200)
}

function buildWhatsAppLink(
  biz: { name: string; phone: string },
  cart: CartItem[],
  location: string,
  total: number
): string {
  const items = cart.map(c => `• ${c.product.name} ×${c.qty} — $${(c.product.price * c.qty).toFixed(0)}`).join('\n')
  const msg = `Hi ${biz.name}! 👋\nI'd like to order:\n\n${items}\n\nDeliver to: ${location}\nTotal: $${total.toFixed(0)}\n\nSent via Yalla Venao`
  return `https://wa.me/${biz.phone}?text=${encodeURIComponent(msg)}`
}

export default function CartPage({ cart, addToCart, removeFromCart, clearCart, onOrderPlaced }: Props) {
  const navigate = useNavigate()
  const [tip, setTip] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [customLocation, setCustomLocation] = useState('')
  const [placed, setPlaced] = useState(false)

  const businessId = cart[0]?.businessId
  const biz = businesses.find(b => b.id === businessId)

  const subtotal = cart.reduce((s, c) => s + c.product.price * c.qty, 0)
  const deliveryFee = biz?.deliveryFee ?? 3
  const total = subtotal + deliveryFee + tip

  const deliveryReady =
    selectedLocation !== null &&
    (selectedLocation !== 'other' || customLocation.trim().length > 0)

  const currentLocation =
    selectedLocation === 'other'
      ? customLocation.trim()
      : BEACH_LOCATIONS.find(l => l.id === selectedLocation)?.label ?? ''

  const handlePlaceOrder = () => {
    if (cart.length === 0 || !deliveryReady) return
    setPlaced(true)
    fireConfetti()
    setTimeout(() => {
      clearCart()
      onOrderPlaced()
    }, 1800)
  }

  const handleWhatsAppOrder = () => {
    if (cart.length === 0 || !deliveryReady || !biz?.phone) return
    const link = buildWhatsAppLink(
      { name: biz.name, phone: biz.phone },
      cart,
      currentLocation,
      total
    )
    setPlaced(true)
    window.open(link, '_blank')
    fireConfetti()
    setTimeout(() => {
      clearCart()
      onOrderPlaced()
    }, 1800)
  }

  if (cart.length === 0 && !placed) {
    return (
      <div className="pb-24 pt-4 px-4 bg-theme min-h-screen">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm font-bold text-lg" style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}>‹</button>
          <h1 className="text-xl font-bold text-theme-primary">Your Order</h1>
        </div>
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--surface-2)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <p className="text-theme-secondary text-lg font-medium">Your cart is empty</p>
          <p className="text-theme-muted text-sm mt-1">Add items from a business to get started</p>
          <button onClick={() => navigate('/')} className="btn-primary mt-6">Browse businesses</button>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-44 pt-4 px-4 bg-theme min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm font-bold text-lg" style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}>‹</button>
        <h1 className="text-xl font-bold text-theme-primary">Your Order</h1>
      </div>

      {/* Business header */}
      {biz && (
        <div className="card p-3 flex items-center gap-3 mb-4">
          <img src={biz.image} alt={biz.name} className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-bold text-theme-primary">{biz.name}</p>
            <p className="text-xs text-theme-muted">
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
              <p className="font-semibold text-sm text-theme-primary truncate">{item.product.name}</p>
              <p className="text-[#FF6B35] font-bold text-sm">${(item.product.price * item.qty).toFixed(0)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="w-7 h-7 rounded-full flex items-center justify-center font-bold hover:opacity-80 transition-all text-lg leading-none"
                style={{ background: 'var(--surface-2)', color: 'var(--text-secondary)' }}
              >−</button>
              <span className="font-bold text-theme-primary w-4 text-center">{item.qty}</span>
              <button
                onClick={() => addToCart({ ...item, qty: 1 })}
                className="w-7 h-7 rounded-full bg-[#FF6B35] flex items-center justify-center font-bold text-white hover:bg-[#E85520] transition-all text-lg leading-none"
              >+</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Beach Delivery Section ── */}
      <div className="card p-4 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round"><path d="M2 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0"/></svg>
          <span className="font-bold text-theme-primary">Beach Delivery</span>
        </div>
        <p className="text-xs text-theme-muted mb-3">Where shall we bring it?</p>

        <div className="grid grid-cols-2 gap-2">
          {BEACH_LOCATIONS.map(loc => {
            const isActive = selectedLocation === loc.id
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc.id)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
                style={{
                  background: isActive ? 'rgba(255,107,53,0.12)' : 'var(--surface-2)',
                  border: `2px solid ${isActive ? '#FF6B35' : 'transparent'}`,
                  color: isActive ? '#FF6B35' : 'var(--text-secondary)',
                }}
              >
                <span className="text-base">{loc.emoji}</span>
                <span>{loc.label}</span>
              </button>
            )
          })}
        </div>

        {/* Custom location input — shown only when "Other" selected */}
        {selectedLocation === 'other' && (
          <div className="mt-3">
            <input
              autoFocus
              value={customLocation}
              onChange={e => setCustomLocation(e.target.value)}
              placeholder="Describe your spot… (e.g. Blue hammock near the rocks)"
              className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
              style={{
                background: 'var(--surface-2)',
                border: '1.5px solid var(--border)',
                color: 'var(--text-primary)',
              }}
            />
          </div>
        )}
      </div>

      {/* Fees + Tip */}
      <div className="card p-4 mb-4">
        <div className="flex justify-between text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
          <span>Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          <span>Delivery fee</span>
          <span className="font-medium">${deliveryFee.toFixed(2)}</span>
        </div>

        <div className="pt-3" style={{ borderTop: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold text-theme-primary mb-2">Add a tip</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map(t => (
              <button
                key={t}
                onClick={() => setTip(t)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${tip === t ? 'bg-[#FF6B35] text-white' : ''}`}
                style={tip !== t ? { background: 'var(--surface-2)', color: 'var(--text-secondary)' } : {}}
              >
                {t === 0 ? 'No tip' : `$${t}`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-3 pt-3 flex justify-between" style={{ borderTop: '1px solid var(--border)' }}>
          <span className="font-bold text-theme-primary text-lg">Total</span>
          <span className="font-extrabold text-[#FF6B35] text-xl">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 space-y-2" style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
        {!deliveryReady && cart.length > 0 && (
          <p className="text-center text-xs text-theme-muted mb-1">👆 Pick a delivery spot first</p>
        )}

        {/* WhatsApp button — only if biz has a phone */}
        {biz?.phone && (
          <button
            onClick={handleWhatsAppOrder}
            disabled={placed || !deliveryReady}
            className={`w-full py-3.5 rounded-full text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all ${
              placed ? 'bg-green-500' :
              !deliveryReady ? 'opacity-50 cursor-not-allowed bg-[#25D366]' :
              'bg-[#25D366] hover:bg-[#20b85a] active:scale-95'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Order via WhatsApp
          </button>
        )}

        <button
          onClick={handlePlaceOrder}
          disabled={placed || !deliveryReady}
          className={`w-full py-4 rounded-full text-white font-bold text-lg transition-all ${
            placed ? 'bg-green-500' :
            !deliveryReady ? 'opacity-50 cursor-not-allowed bg-[#FF6B35]' :
            'bg-[#FF6B35] hover:bg-[#E85520] active:scale-95'
          }`}
        >
          {placed ? 'Order Placed!' : `Place Order · $${total.toFixed(2)}`}
        </button>
      </div>
    </div>
  )
}
