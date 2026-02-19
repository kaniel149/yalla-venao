import { useParams, useNavigate } from 'react-router-dom'
import { businesses } from '../../data/mockData'
import type { CartItem, Product } from '../../data/mockData'

interface Props {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  onViewCart: () => void
}

function DeliveryTime({ time }: { time: string }) {
  if (time === 'On request') return <span>On request</span>
  return <span>{time} min</span>
}

export default function BusinessPage({ cart, addToCart, onViewCart }: Props) {
  const { id } = useParams()
  const navigate = useNavigate()
  const biz = businesses.find(b => b.id === id)

  if (!biz) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-500">Business not found</p>
    </div>
  )

  const cartItems = cart.filter(c => c.businessId === biz.id)
  const cartTotal = cartItems.reduce((s, c) => s + c.product.price * c.qty, 0)
  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0)

  const handleAdd = (product: Product) => {
    addToCart({ product, qty: 1, businessId: biz.id })
  }

  return (
    <div className="pb-32">
      {/* ── Hero Image ──────────────────────────────────────────────────── */}
      <div className="relative">
        <img src={biz.image} alt={biz.name} className="w-full h-60 object-cover" />
        {/* Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-12 left-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md text-gray-700 hover:bg-white transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── Business Info Card ───────────────────────────────────────────── */}
      <div className="bg-white -mt-6 rounded-t-3xl relative z-10 px-4 pt-5 pb-3 shadow-sm">
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex-1 pr-2">
            <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">{biz.name}</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{biz.description}</p>
          </div>
          <span className="bg-[#1B4332] text-white text-[10px] font-bold px-2.5 py-1 rounded-full mt-1 tracking-wide uppercase flex-shrink-0">
            Open
          </span>
        </div>

        {/* Rating + tags */}
        <div className="flex items-center gap-2 flex-wrap mb-3 mt-2">
          <span className="font-bold text-[13px] text-amber-500">{biz.rating} ★</span>
          <span className="text-gray-300 text-xs">·</span>
          <span className="text-gray-400 text-[12px]">{biz.reviews} reviews</span>
          <span className="text-gray-300 text-xs">·</span>
          {biz.tags.map(t => (
            <span key={t} className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{t}</span>
          ))}
        </div>

        {/* Delivery info row — SVG icons */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 text-[12px] text-gray-500">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
              <polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <DeliveryTime time={biz.deliveryTime} />
          </span>
          <span className="text-gray-200">|</span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400">
              <circle cx="5.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
              <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M8 17.5H13V5H5L2 11v6.5h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 17.5h2V9.5l5 2v6h-2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {biz.deliveryFee > 0 ? `$${biz.deliveryFee} delivery` : <span className="text-[#1B4332] font-semibold">Free delivery</span>}
          </span>
          {biz.minOrder > 0 && (
            <>
              <span className="text-gray-200">|</span>
              <span>${biz.minOrder} min order</span>
            </>
          )}
        </div>
      </div>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <div className="px-4 pt-4">
        <h2 className="text-[16px] font-bold text-gray-900 mb-3 tracking-tight">Menu</h2>
        <div className="space-y-3">
          {biz.products.map(product => {
            const cartItem = cart.find(c => c.product.id === product.id)
            return (
              <div key={product.id} className="bg-white rounded-2xl flex gap-3 p-3 shadow-sm overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-[14px] leading-tight">{product.name}</h3>
                    <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-extrabold text-gray-900 text-[15px]">${product.price}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg transition-all shadow-sm
                        ${cartItem
                          ? 'bg-[#1B4332] text-white'
                          : 'bg-[#FF6B35] text-white hover:bg-[#E85520] active:scale-90'
                        }`}
                    >
                      {cartItem ? cartItem.qty : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                          <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Floating Cart Bar ────────────────────────────────────────────── */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-transparent z-40">
          <button
            onClick={onViewCart}
            className="w-full bg-[#FF6B35] text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 shadow-xl hover:bg-[#E85520] active:scale-95 transition-all"
          >
            <span className="bg-white/20 rounded-lg px-2.5 py-0.5 text-sm font-bold tabular-nums">{cartCount}</span>
            <span className="text-[15px]">View Cart</span>
            <span className="font-bold text-[15px]">${cartTotal.toFixed(0)}</span>
          </button>
        </div>
      )}
    </div>
  )
}
