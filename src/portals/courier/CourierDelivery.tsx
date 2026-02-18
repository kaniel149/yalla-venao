import { useState } from 'react'

export default function CourierDelivery() {
  const [pickedUp, setPickedUp] = useState(false)
  const [delivered, setDelivered] = useState(false)

  if (delivered) {
    return (
      <div className="pb-8 pt-4 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-8xl mb-4">🎉</div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Order Delivered!</h2>
        <p className="text-gray-500 mb-2">You earned <span className="font-bold text-[#FF6B35]">$8.50</span></p>
        <p className="text-gray-400 text-sm mb-6">Great job! 🏍️</p>
        <button onClick={() => { setPickedUp(false); setDelivered(false) }} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="pb-8 pt-4 px-4">
      <h2 className="font-bold text-gray-900 text-xl mb-4">Active Delivery</h2>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-5">
        <div className={`flex-1 h-2 rounded-full ${pickedUp ? 'bg-[#1B4332]' : 'bg-[#FF6B35]'} transition-all`} />
        <div className={`flex-1 h-2 rounded-full ${pickedUp ? 'bg-[#FF6B35]' : 'bg-gray-200'} transition-all`} />
      </div>
      <p className="text-sm font-semibold text-gray-500 mb-4">{pickedUp ? 'Step 2: Deliver to customer' : 'Step 1: Pickup from restaurant'}</p>

      {/* Pickup Card */}
      <div className={`card p-4 mb-4 transition-all ${pickedUp ? 'opacity-50' : 'border-2 border-[#FF6B35]'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🍽️</span>
          <div>
            <p className="text-xs text-gray-500">Pickup from</p>
            <p className="font-extrabold text-gray-900">La Palapa Grill</p>
          </div>
          {pickedUp && <span className="ml-auto text-green-600 font-bold">✅ Done</span>}
        </div>
        <p className="text-sm text-gray-500 mb-1">📍 Playa Venao Beach Road, km 2</p>
        <p className="text-sm text-gray-600 mb-3 bg-gray-50 rounded-xl p-2">
          <strong>Order:</strong> Venao Burger ×2 — $27
        </p>
        {!pickedUp && (
          <button
            onClick={() => setPickedUp(true)}
            className="w-full btn-primary py-3"
          >
            I'm here — Picked up ✓
          </button>
        )}
      </div>

      {/* Delivery Card */}
      <div className={`card p-4 mb-4 transition-all ${!pickedUp ? 'opacity-40' : 'border-2 border-[#1B4332]'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">📍</span>
          <div>
            <p className="text-xs text-gray-500">Deliver to</p>
            <p className="font-extrabold text-gray-900">Alex B.</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">Surf Camp Venao, Bungalow 4</p>
        <p className="text-sm text-gray-500 mb-3">📞 +507 6123-4567</p>
        {pickedUp && (
          <button
            onClick={() => setDelivered(true)}
            className="w-full py-3 bg-[#1B4332] text-white font-bold rounded-full hover:bg-[#27AE60] active:scale-95 transition-all"
          >
            Delivered ✓
          </button>
        )}
      </div>

      {/* Map Placeholder */}
      <div className="card overflow-hidden">
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex flex-col items-center justify-center gap-2 relative">
          <span className="text-4xl">🗺️</span>
          <p className="font-semibold text-gray-600">Navigation Map</p>
          <p className="text-xs text-gray-500">{pickedUp ? '📍 1.2 km to customer' : '📍 0.3 km to restaurant'}</p>
          <div className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-[#FF6B35] shadow">
            {pickedUp ? '~6 min' : '~2 min'}
          </div>
        </div>
      </div>
    </div>
  )
}
