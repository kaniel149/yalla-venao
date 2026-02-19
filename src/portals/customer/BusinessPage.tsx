import { useParams, useNavigate } from 'react-router-dom'
import { businesses } from '../../data/mockData'
import type { CartItem, Product } from '../../data/mockData'
import { isOpen } from '../../utils/businessUtils'

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

  const open = isOpen(biz.hours)

  const cartItems = cart.filter(c => c.businessId === biz.id)
  const cartTotal = cartItems.reduce((s, c) => s + c.product.price * c.qty, 0)
  const cartCount = cartItems.reduce((s, c) => s + c.qty, 0)

  const handleAdd = (product: Product) => {
    addToCart({ product, qty: 1, businessId: biz.id })
  }

  return (
    <div className="pb-32 bg-theme min-h-screen">
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
      <div className="-mt-6 rounded-t-3xl relative z-10 px-4 pt-5 pb-3 shadow-sm" style={{ background: 'var(--surface)' }}>
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex-1 pr-2">
            <h1 className="text-[22px] font-extrabold text-gray-900 tracking-tight">{biz.name}</h1>
            <p className="text-[13px] text-gray-500 mt-1 leading-relaxed">{biz.description}</p>
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full mt-1 tracking-wide uppercase flex-shrink-0 text-white ${open ? 'bg-[#1B4332]' : 'bg-gray-400'}`}>
            {open ? 'Open' : 'Closed'}
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

        {/* WhatsApp quick-contact button */}
        {biz.phone && (
          <a
            href={`https://wa.me/${biz.phone}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center gap-2 text-[12px] font-semibold text-[#25D366]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        )}
      </div>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <div className="px-4 pt-4">
        <h2 className="text-[16px] font-bold text-gray-900 mb-3 tracking-tight">Menu</h2>
        <div className="space-y-3">
          {biz.products.map(product => {
            const cartItem = cart.find(c => c.product.id === product.id)
            return (
              <div key={product.id} className="card flex gap-3 p-3">
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
