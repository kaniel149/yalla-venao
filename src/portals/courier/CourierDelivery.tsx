import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CourierDelivery() {
  const [pickedUp, setPickedUp] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const navigate = useNavigate()

  if (delivered) {
    return (
      <div className="pb-8 pt-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-[#1B4332] rounded-full flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h2 className="serif text-2xl text-gray-900 mb-2">Delivered</h2>
        <p className="text-gray-500 mb-1">You earned <span className="font-bold text-[#FF6B35]">$8.50</span></p>
        <p className="text-gray-400 text-sm mb-8">Great job, Carlos.</p>
        <button
          onClick={() => { setPickedUp(false); setDelivered(false); navigate('/courier') }}
          className="btn-primary px-8"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="pb-8 pt-6 px-4">
      <h2 className="font-bold text-gray-900 text-[17px] mb-5">Active delivery</h2>

      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-2">
        <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${pickedUp ? 'bg-[#1B4332]' : 'bg-[#FF6B35]'}`} />
        <div className={`flex-1 h-1.5 rounded-full transition-all duration-500 ${pickedUp ? 'bg-[#FF6B35]' : 'bg-gray-200'}`} />
      </div>
      <p className="text-[11px] text-gray-400 font-medium mb-5 uppercase tracking-wide">
        {pickedUp ? 'Step 2 of 2 — drop off' : 'Step 1 of 2 — pick up'}
      </p>

      {/* Pickup card */}
      <div className={`bg-white rounded-2xl p-4 mb-3 transition-all ${!pickedUp ? 'border-2 border-[#FF6B35]' : 'opacity-50'}`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 11l19-9-9 19-2-8-8-2z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Pick up from</p>
            <p className="font-bold text-gray-900">La Lora</p>
            <p className="text-[12px] text-gray-400 mt-0.5">Playa Venao Beach Road, km 2</p>
          </div>
          {pickedUp && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          )}
        </div>
        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <p className="text-[12px] font-semibold text-gray-700">Ceviche de Corvina ×2</p>
          <p className="text-[11px] text-gray-400 mt-0.5">$24.00</p>
        </div>
        {!pickedUp && (
          <button
            onClick={() => setPickedUp(true)}
            className="w-full bg-[#FF6B35] text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95"
          >
            Picked up — continue
          </button>
        )}
      </div>

      {/* Drop-off card */}
      <div className={`bg-white rounded-2xl p-4 mb-4 transition-all ${pickedUp ? 'border-2 border-[#1B4332]' : 'opacity-40'}`}>
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 bg-[#1B4332]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Drop off at</p>
            <p className="font-bold text-gray-900">Alex B.</p>
            <p className="text-[12px] text-gray-400 mt-0.5">Surf Camp Venao, Bungalow 4</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[12px] text-gray-400 mb-3">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.07 6.07l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z"/>
          </svg>
          <span>+507 6123-4567</span>
        </div>
        {pickedUp && (
          <button
            onClick={() => setDelivered(true)}
            className="w-full bg-[#1B4332] text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95"
          >
            Confirm delivery
          </button>
        )}
      </div>

      {/* Map placeholder — real photo */}
      <div className="rounded-2xl overflow-hidden relative h-44">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
          alt="Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="text-xs font-bold text-gray-800">{pickedUp ? '1.2 km · ~6 min' : '0.3 km · ~2 min'}</span>
        </div>
      </div>
    </div>
  )
}
