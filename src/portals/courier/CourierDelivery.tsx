import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'
import { businesses } from '../../data/mockData'

export default function CourierDelivery() {
  const navigate = useNavigate()
  const location = useLocation()

  const orderId = new URLSearchParams(location.search).get('id')

  const [order, setOrder] = useState<StoredOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [pickedUp, setPickedUp] = useState(false)
  const [delivered, setDelivered] = useState(false)
  const [locationSharing, setLocationSharing] = useState(false)
  const [watchId, setWatchId] = useState<number | null>(null)
  const lastLocationUpdateRef = useRef<number>(0)

  // Load order from store
  useEffect(() => {
    if (!orderId) { setLoading(false); return }
    orderStore.getById(orderId).then(found => {
      setOrder(found)
      setLoading(false)
    })
  }, [orderId])

  // GPS tracking — starts when order is loaded
  useEffect(() => {
    if (!order) return
    if (!navigator.geolocation) return

    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setLocationSharing(true)
        const now = Date.now()
        if (now - lastLocationUpdateRef.current >= 15_000) {
          lastLocationUpdateRef.current = now
          orderStore.updateCourierLocation(
            order.id,
            pos.coords.latitude,
            pos.coords.longitude
          )
        }
      },
      (err) => {
        console.warn('Geolocation error:', err)
        setLocationSharing(false)
      },
      { enableHighAccuracy: true, maximumAge: 10_000 }
    )
    setWatchId(id)

    return () => {
      navigator.geolocation.clearWatch(id)
    }
  }, [order?.id])

  async function handleConfirmDelivery() {
    if (!order) return
    await orderStore.updateStatus(order.id, 'delivered')
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId)
      setWatchId(null)
    }
    setDelivered(true)
  }

  // ─── No order ID in URL ────────────────────────────────────────────────────
  if (!orderId) {
    return (
      <div className="pb-8 pt-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg mb-1">No active delivery</h2>
        <p className="text-sm text-gray-400 mb-6">Accept an order from the dashboard first.</p>
        <button onClick={() => navigate('/courier')} className="btn-primary px-8">
          Back to dashboard
        </button>
      </div>
    )
  }

  // ─── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pb-8 pt-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#1B4332] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm text-gray-400">Loading order...</p>
      </div>
    )
  }

  // ─── Order not found ───────────────────────────────────────────────────────
  if (!order) {
    return (
      <div className="pb-8 pt-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </div>
        <h2 className="font-bold text-gray-900 text-lg mb-1">Order not found</h2>
        <p className="text-sm text-gray-400 mb-6">Order #{orderId} could not be loaded.</p>
        <button onClick={() => navigate('/courier')} className="btn-primary px-8">
          Back to dashboard
        </button>
      </div>
    )
  }

  // ─── Success screen ────────────────────────────────────────────────────────
  if (delivered) {
    return (
      <div className="pb-8 pt-12 px-4 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-20 h-20 bg-[#1B4332] rounded-full flex items-center justify-center mb-6">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>
        <h2 className="serif text-2xl text-gray-900 mb-2">Delivered!</h2>
        <p className="text-gray-500 mb-1">
          You earned <span className="font-bold text-[#FF6B35]">${order.deliveryFee.toFixed(2)}</span>
        </p>
        <p className="text-gray-400 text-sm mb-8">
          {order.courierName ? `Great job, ${order.courierName}.` : 'Great job!'}
        </p>
        <button
          onClick={() => navigate('/courier')}
          className="btn-primary px-8"
        >
          Back to dashboard
        </button>
      </div>
    )
  }

  // ─── Delivery flow ─────────────────────────────────────────────────────────

  // Look up business coordinates from mockData (for Maps link)
  const biz = businesses.find(b => b.id === order.businessId)
  const bizCoords = biz?.coordinates

  const pickupMapsUrl = bizCoords
    ? `https://maps.google.com/?q=${bizCoords.lat},${bizCoords.lng}`
    : `https://maps.google.com/?q=${encodeURIComponent(order.businessName + ' Playa Venao')}`

  const dropoffMapsUrl = `https://maps.google.com/?q=${encodeURIComponent(order.deliveryLocation + ', Playa Venao')}`

  const step = pickedUp ? 'dropoff' : 'pickup'

  return (
    <div className="pb-8 pt-6 px-4">
      <h2 className="font-bold text-gray-900 text-[17px] mb-1">Active delivery</h2>

      {/* Location sharing indicator */}
      <div className={`flex items-center gap-1.5 mb-4 text-[11px] font-medium ${locationSharing ? 'text-green-600' : 'text-gray-400'}`}>
        <span className={`w-2 h-2 rounded-full ${locationSharing ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
        {locationSharing ? 'Location sharing active' : 'Requesting location...'}
      </div>

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
            <p className="font-bold text-gray-900">{order.businessName}</p>
            {bizCoords && (
              <p className="text-[12px] text-gray-400 mt-0.5">
                {bizCoords.lat.toFixed(4)}, {bizCoords.lng.toFixed(4)}
              </p>
            )}
          </div>
          {pickedUp && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          )}
        </div>

        {/* Items list */}
        <div className="bg-gray-50 rounded-xl p-3 mb-3 space-y-1.5">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <p className="text-[12px] font-semibold text-gray-700">
                {item.name} <span className="text-gray-400 font-normal">x{item.qty}</span>
              </p>
              <p className="text-[11px] text-gray-400">${(item.price * item.qty).toFixed(2)}</p>
            </div>
          ))}
          <div className="border-t border-gray-200 pt-1.5 mt-1.5 flex justify-between">
            <p className="text-[11px] text-gray-400 font-semibold">Total</p>
            <p className="text-[11px] text-gray-700 font-bold">${order.total.toFixed(2)}</p>
          </div>
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
            <p className="font-bold text-gray-900">{order.customerName}</p>
            <p className="text-[12px] text-gray-400 mt-0.5">{order.deliveryLocation}</p>
          </div>
        </div>

        {pickedUp && (
          <button
            onClick={handleConfirmDelivery}
            className="w-full bg-[#1B4332] text-white font-bold py-3 rounded-xl text-sm transition-all active:scale-95 mb-3"
          >
            Confirm delivery
          </button>
        )}
      </div>

      {/* Navigation section */}
      <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-1 tracking-wide">
          {step === 'pickup' ? 'Pickup location' : 'Delivery address'}
        </p>
        <p className="font-bold text-gray-900 mb-1">
          {step === 'pickup' ? order.businessName : order.customerName}
        </p>
        <p className="text-sm text-gray-500 mb-3">
          {step === 'pickup'
            ? (bizCoords ? `${bizCoords.lat.toFixed(4)}, ${bizCoords.lng.toFixed(4)}` : 'Playa Venao')
            : order.deliveryLocation}
        </p>
        <a
          href={step === 'pickup' ? pickupMapsUrl : dropoffMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-[#1B4332] text-white rounded-xl font-bold text-sm transition-all active:scale-95"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  )
}
