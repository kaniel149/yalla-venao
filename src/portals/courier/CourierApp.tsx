import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CourierDashboard from './CourierDashboard'
import CourierDelivery from './CourierDelivery'

export default function CourierApp() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-[#1A1A2E] px-4 pt-10 pb-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-extrabold text-xl">🏍️ Courier</h1>
              <p className="text-white/50 text-xs">Carlos M.</p>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs">Today</p>
              <p className="text-white font-bold">$42 earned</p>
            </div>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => navigate('/courier')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${location.pathname === '/courier' ? 'bg-[#FF6B35] text-white' : 'bg-white/10 text-white/60'}`}
            >Dashboard</button>
            <button
              onClick={() => navigate('/courier/delivery')}
              className={`flex-1 py-2 rounded-full text-sm font-bold transition-all ${location.pathname === '/courier/delivery' ? 'bg-[#FF6B35] text-white' : 'bg-white/10 text-white/60'}`}
            >Active Delivery</button>
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
