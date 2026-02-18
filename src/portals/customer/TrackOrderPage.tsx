import { useNavigate } from 'react-router-dom'
import { activeOrder } from '../../data/mockData'

const steps = [
  { label: 'Order Confirmed', status: 'done', icon: '✅' },
  { label: 'Preparing your food', status: 'done', icon: '✅' },
  { label: 'Carlos picked up your order', status: 'active', icon: '🔄' },
  { label: 'Delivery', status: 'pending', icon: '⏳' },
]

export default function TrackOrderPage() {
  const navigate = useNavigate()
  const order = activeOrder

  return (
    <div className="pb-24 pt-4 px-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-gray-600 text-lg">‹</button>
        <h1 className="text-xl font-bold text-gray-900">Order Tracking</h1>
      </div>

      {/* ETA Banner */}
      <div className="bg-[#FF6B35] rounded-2xl p-4 mb-5 flex items-center justify-between shadow-md">
        <div>
          <p className="text-white/80 text-sm">Estimated arrival</p>
          <p className="text-white text-3xl font-extrabold">~{order.eta}</p>
        </div>
        <div className="text-5xl">🏍️</div>
      </div>

      {/* Status Stepper */}
      <div className="card p-4 mb-4">
        <h2 className="font-bold text-gray-900 mb-4">Order Status</h2>
        <div className="space-y-4">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${step.status === 'done' ? 'bg-[#1B4332] text-white' : step.status === 'active' ? 'bg-[#FF6B35] text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {step.status === 'active' ? (
                    <span className="animate-pulse-dot">●</span>
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-0.5 h-6 mt-1 ${step.status === 'done' ? 'bg-[#1B4332]' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="pt-1">
                <p className={`text-sm font-semibold ${step.status === 'pending' ? 'text-gray-400' : step.status === 'active' ? 'text-[#FF6B35]' : 'text-gray-900'}`}>
                  {step.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Courier Card */}
      <div className="card p-4 mb-4">
        <h2 className="font-bold text-gray-900 mb-3">Your Courier</h2>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#E85520] rounded-full flex items-center justify-center text-2xl shadow-sm">👤</div>
          <div className="flex-1">
            <p className="font-bold text-gray-900">{order.courier.name}</p>
            <p className="text-sm text-gray-500">{order.courier.vehicle} On the way — {order.eta}</p>
          </div>
          <div className="flex gap-2">
            <a href={`tel:${order.courier.phone}`}
              className="w-10 h-10 rounded-full border-2 border-[#1B4332] flex items-center justify-center text-[#1B4332] hover:bg-[#1B4332] hover:text-white transition-all"
            >📞</a>
            <button className="w-10 h-10 rounded-full border-2 border-[#FF6B35] flex items-center justify-center text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all">
              💬
            </button>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="card overflow-hidden mb-4">
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center gap-2 relative">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}/>
          <span className="text-4xl">📍</span>
          <p className="font-semibold text-gray-600">Live tracking</p>
          <p className="text-xs text-gray-500">Carlos is on his way</p>
          <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow">
            🏍️ 1.2 km away
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="card p-4">
        <h2 className="font-bold text-gray-900 mb-3">Order Summary</h2>
        {order.items.map(({ product, qty }) => (
          <div key={product.id} className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">{product.name} × {qty}</span>
            <span className="font-semibold text-gray-900">${product.price * qty}</span>
          </div>
        ))}
        <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between">
          <span className="font-bold text-gray-900">Total</span>
          <span className="font-extrabold text-[#FF6B35]">${order.total}</span>
        </div>
      </div>
    </div>
  )
}
