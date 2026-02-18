import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourierDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [orderAccepted, setOrderAccepted] = useState(false)
  const navigate = useNavigate()

  const stats = [
    { label: 'Deliveries', value: '7', icon: '📦' },
    { label: 'Earnings', value: '$42', icon: '💵' },
    { label: 'Rating', value: '4.9 ⭐', icon: '🌟' },
  ]

  return (
    <div className="pb-8 pt-4 px-4">
      {/* Online / Offline toggle */}
      <button
        onClick={() => setIsOnline(!isOnline)}
        className={`w-full py-5 rounded-2xl text-white font-extrabold text-xl mb-4 transition-all duration-300 shadow-lg active:scale-95 ${isOnline ? 'bg-gradient-to-r from-[#1B4332] to-[#27AE60]' : 'bg-gradient-to-r from-gray-500 to-gray-400'}`}
      >
        {isOnline ? '🟢 ONLINE — Ready for orders' : '⚫ OFFLINE — Tap to go online'}
      </button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(stat => (
          <div key={stat.label} className="card p-3 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="font-extrabold text-gray-900 text-lg">{stat.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Available order */}
      {isOnline && !orderAccepted && (
        <div className="card p-4 border-2 border-[#FF6B35] shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-extrabold text-gray-900 text-base">New Order! 🔔</h3>
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] font-bold text-sm px-3 py-1 rounded-full">$8.50</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-[#1B4332]/10 rounded-full flex items-center justify-center text-sm">🍽️</div>
            <div>
              <p className="text-xs text-gray-500">Pickup</p>
              <p className="font-semibold text-gray-900 text-sm">La Palapa Grill</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-sm">📍</div>
            <div>
              <p className="text-xs text-gray-500">Deliver to</p>
              <p className="font-semibold text-gray-900 text-sm">Surf Camp Venao, Bungalow 4</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-4 bg-gray-50 rounded-xl p-2">
            <span>📏 1.2 km</span>
            <span>⏱️ ~8 min</span>
            <span className="font-bold text-[#1B4332]">💵 $8.50 payout</span>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 py-3 rounded-full border-2 border-gray-300 text-gray-600 font-bold text-sm hover:border-red-300 hover:text-red-500 transition-all">
              Decline
            </button>
            <button
              onClick={() => { setOrderAccepted(true); navigate('/courier/delivery') }}
              className="flex-1 py-3 rounded-full bg-[#FF6B35] text-white font-bold text-sm hover:bg-[#E85520] active:scale-95 transition-all shadow-md"
            >
              Accept ✓
            </button>
          </div>
        </div>
      )}

      {isOnline && orderAccepted && (
        <div className="card p-4 bg-green-50 border border-green-200 text-center">
          <p className="text-green-700 font-bold">✅ Order accepted! Head to pickup.</p>
          <button onClick={() => navigate('/courier/delivery')} className="btn-primary mt-3 text-sm py-2">View Delivery</button>
        </div>
      )}

      {!isOnline && (
        <div className="text-center py-10">
          <div className="text-5xl mb-3">😴</div>
          <p className="text-gray-500 font-medium">You're offline</p>
          <p className="text-gray-400 text-sm mt-1">Go online to start receiving orders</p>
        </div>
      )}

      {/* Earnings summary */}
      <div className="card p-4 mt-4">
        <h3 className="font-bold text-gray-900 mb-3">This Week</h3>
        {[
          { day: 'Mon', deliveries: 5, earn: '$32' },
          { day: 'Tue', deliveries: 8, earn: '$51' },
          { day: 'Wed', deliveries: 6, earn: '$38' },
          { day: 'Thu', deliveries: 7, earn: '$42' },
        ].map(d => (
          <div key={d.day} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm font-medium text-gray-700 w-10">{d.day}</span>
            <div className="flex-1 mx-3 bg-gray-100 rounded-full h-2 overflow-hidden">
              <div className="bg-[#FF6B35] h-2 rounded-full" style={{ width: `${(d.deliveries / 10) * 100}%` }} />
            </div>
            <span className="text-sm text-gray-500 w-12 text-right">{d.deliveries} drops</span>
            <span className="font-bold text-[#1B4332] w-12 text-right">{d.earn}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
