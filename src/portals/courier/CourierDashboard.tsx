import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourierDashboard() {
  const [isOnline, setIsOnline] = useState(false)
  const [orderAccepted, setOrderAccepted] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="pb-8 pt-6 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="serif text-2xl text-gray-900">Hey, Carlos</h1>
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
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">7</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Deliveries</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">$42</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Earned</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">4.9</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Rating</p>
        </div>
      </div>

      {/* Incoming order */}
      {isOnline && !orderAccepted && (
        <div className="bg-white rounded-2xl p-4 border-2 border-[#FF6B35] shadow-lg shadow-orange-100">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-gray-900 text-[15px]">New order</p>
            <span className="bg-[#FF6B35]/10 text-[#FF6B35] font-bold text-sm px-3 py-1 rounded-full">+$8.50</span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l19-9-9 19-2-8-8-2z"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Pick up</p>
                <p className="text-sm font-semibold text-gray-900">La Lora</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Drop off</p>
                <p className="text-sm font-semibold text-gray-900">Bungalow 12 — Venao Hotel</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-4">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>1.2 km · ~6 min</span>
          </div>

          <div className="flex gap-2">
            <button
              className="flex-1 py-3 rounded-xl bg-gray-50 text-gray-500 font-semibold text-sm"
              onClick={() => setIsOnline(false)}
            >
              Decline
            </button>
            <button
              className="flex-2 flex-1 py-3 rounded-xl bg-[#1B4332] text-white font-bold text-sm"
              onClick={() => { setOrderAccepted(true); navigate('/courier/delivery') }}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      {isOnline && orderAccepted && (
        <div className="bg-[#1B4332]/5 rounded-2xl p-4 text-center">
          <p className="text-[#1B4332] font-semibold">Order accepted — check delivery tab</p>
        </div>
      )}

      {!isOnline && (
        <div className="rounded-2xl overflow-hidden relative h-40">
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
    </div>
  )
}
