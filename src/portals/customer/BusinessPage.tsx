import { useParams, useNavigate } from 'react-router-dom'
import { businesses } from '../../data/mockData'
import type { CartItem, Product } from '../../data/mockData'

interface Props {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  onViewCart: () => void
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
      {/* Hero Image */}
      <div className="relative">
        <img src={biz.image} alt={biz.name} className="w-full h-56 object-cover" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md text-gray-700 font-bold hover:bg-gray-50 transition-all"
        >
          ‹
        </button>
      </div>

      {/* Business Info Card */}
      <div className="bg-white -mt-6 rounded-t-3xl relative z-10 px-4 pt-5 pb-4 shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">{biz.name}</h1>
            <p className="text-sm text-gray-500 mt-0.5">{biz.description}</p>
          </div>
          <span className="bg-[#1B4332] text-white text-xs font-bold px-2 py-1 rounded-full mt-1">Open</span>
        </div>

        {/* Rating + Tags */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-semibold text-sm">⭐ {biz.rating}</span>
          <span className="text-gray-400 text-xs">({biz.reviews} reviews)</span>
          <span className="text-gray-300">·</span>
          {biz.tags.map(t => (
            <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
          ))}
        </div>

        {/* Delivery info */}
        <div className="flex items-center gap-4 py-3 border-t border-gray-100 text-sm text-gray-600">
          <span>⏱️ {biz.deliveryTime} min</span>
          <span className="text-gray-200">|</span>
          <span>🛵 ${biz.deliveryFee} delivery</span>
          {biz.minOrder > 0 && (
            <>
              <span className="text-gray-200">|</span>
              <span>💵 ${biz.minOrder} min</span>
            </>
          )}
        </div>
      </div>

      {/* Products */}
      <div className="px-4 pt-2">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Menu</h2>
        <div className="space-y-3">
          {biz.products.map(product => {
            const cartItem = cart.find(c => c.product.id === product.id)
            return (
              <div key={product.id} className="card flex gap-3 p-3">
                <img src={product.image} alt={product.name} className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-gray-900">${product.price}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center text-white font-bold text-lg hover:bg-[#E85520] active:scale-90 transition-all shadow-sm"
                    >
                      {cartItem ? cartItem.qty : '+'}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating Cart Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md p-4 bg-transparent z-40">
          <button
            onClick={onViewCart}
            className="w-full bg-[#FF6B35] text-white font-bold py-4 rounded-2xl flex items-center justify-between px-5 shadow-xl hover:bg-[#E85520] active:scale-95 transition-all"
          >
            <span className="bg-white/20 rounded-lg px-2 py-0.5 text-sm">{cartCount}</span>
            <span>View Cart</span>
            <span className="font-bold">${cartTotal.toFixed(0)}</span>
          </button>
        </div>
      )}
    </div>
  )
}
