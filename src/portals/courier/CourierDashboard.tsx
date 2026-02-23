import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const availableOrders = [
  { id: 'o1', from: 'La Quincha', to: 'Surf Camp Bungalow 4', pay: 8.50, distance: '1.2 km', eta: '8 min', customerPhone: '50766112233' },
  { id: 'o2', from: 'Wao Beach Bar', to: 'El Sitio Hotel Room 12', pay: 5.00, distance: '0.6 km', eta: '5 min', customerPhone: '50766223344' },
  { id: 'o3', from: 'Pizza Gavilan', to: 'Hostel La Vida', pay: 7.00, distance: '0.9 km', eta: '7 min', customerPhone: '50766334455' },
]

export default function CourierDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [dismissedOrders, setDismissedOrders] = useState<string[]>([])
  const navigate = useNavigate()

  const visibleOrders = availableOrders.filter(o => !dismissedOrders.includes(o.id))

  function acceptOrder(_id: string) {
    navigate('/courier/delivery')
  }

  function dismissOrder(id: string) {
    setDismissedOrders(prev => [...prev, id])
  }

  return (
    <div className="pb-8 pt-6 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-2xl text-gray-900">Hey, Miguel</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Playa Venao · Thursday</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-[#1B4332]/10 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
          </svg>
        </div>
      </div>

      {/* Online toggle */}
      <button
        onClick={() => setIsOnline(!isOnline)}
        className={`w-full py-4 rounded-2xl font-bold text-base mb-5 transition-all duration-300 ${
          isOnline
            ? 'bg-[#1B4332] text-white shadow-lg shadow-green-900/20'
            : 'bg-gray-100 text-gray-500'
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-green-300 animate-pulse-dot' : 'bg-gray-400'}`} />
          {isOnline ? 'Online — ready for orders' : 'Offline — tap to go online'}
        </div>
      </button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-2">
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">7</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Deliveries</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">$50</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Earned</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">4.9</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Rating</p>
        </div>
      </div>

      {/* Available orders — when online */}
      {isOnline && visibleOrders.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-gray-900 text-base mb-3">Available orders</h3>
          {visibleOrders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl p-4 mb-3 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-bold text-gray-900">{order.from}</p>
                  <p className="text-xs text-gray-500">→ {order.to}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#1B4332]">${order.pay.toFixed(2)}</p>
                  <p className="text-xs text-gray-400">{order.distance}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>~{order.eta}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => acceptOrder(order.id)}
                  className="flex-1 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold transition-all active:scale-95"
                >
                  Accept
                </button>
                <button
                  onClick={() => dismissOrder(order.id)}
                  className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isOnline && visibleOrders.length === 0 && (
        <div className="mt-4 bg-[#1B4332]/5 rounded-2xl p-5 text-center">
          <p className="text-[#1B4332] font-semibold text-sm">All caught up!</p>
          <p className="text-gray-400 text-xs mt-1">No available orders right now</p>
        </div>
      )}

      {!isOnline && (
        <div className="mt-4 rounded-2xl overflow-hidden relative h-40">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
            alt="Playa Venao"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-white/80 text-sm font-medium">Go online to receive orders</p>
          </div>
        </div>
      )}

      {/* Earnings breakdown */}
      <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Today's earnings</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">7 deliveries × avg $6</span>
            <span className="font-medium text-gray-900">$42.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Tips received</span>
            <span className="font-medium text-[#1B4332]">$8.00</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>$50.00</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Payout every Sunday via YAPPY / cash pickup</p>
      </div>

    </div>
  )
}
