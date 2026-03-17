import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CourierDashboard from './CourierDashboard'
import CourierDelivery from './CourierDelivery'
import CourierOnboarding from './CourierOnboarding'
import { orderStore } from '../../lib/orderStore'

function getCourierName(): string {
  try {
    const raw = localStorage.getItem('yv_courier_setup')
    if (!raw) return 'Courier'
    return JSON.parse(raw).name || 'Courier'
  } catch { return 'Courier' }
}

export default function CourierApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [earnings, setEarnings] = useState(0)

  const [setupDone, setSetupDone] = useState<boolean>(() => {
    return !!localStorage.getItem('yv_courier_setup')
  })

  useEffect(() => {
    if (!setupDone) return
    const load = async () => {
      const name = getCourierName()
      const orders = await orderStore.getByCourier(name)
      const today = orders.filter(o => {
        return o.status === 'delivered' && new Date(o.createdAt).toDateString() === new Date().toDateString()
      })
      setEarnings(today.reduce((s, o) => s + o.deliveryFee + o.tip, 0))
    }
    load()
    const interval = setInterval(load, 10000)
    return () => clearInterval(interval)
  }, [setupDone])

  if (!setupDone) {
    return <CourierOnboarding onComplete={() => setSetupDone(true)} />
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-[#1B4332] px-4 pt-10 pb-3 sticky top-0 z-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Courier Portal</p>
              <h1 className="serif text-white text-xl">Yalla Venao</h1>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[10px] font-medium">Today's earnings</p>
              <p className="text-white font-bold">${earnings.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/courier')}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === '/courier'
                  ? 'bg-white text-[#1B4332]'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate('/courier/delivery')}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
                location.pathname.includes('/courier/delivery')
                  ? 'bg-white text-[#1B4332]'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              Active Delivery
            </button>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<CourierDashboard />} />
          <Route path="/delivery" element={<CourierDelivery />} />
        </Routes>
      </div>
    </div>
  )
}
