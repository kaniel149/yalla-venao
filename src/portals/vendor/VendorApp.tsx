import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import VendorDashboard from './VendorDashboard'
import VendorOrders from './VendorOrders'
import VendorMenu from './VendorMenu'

export default function VendorApp() {
  const navigate = useNavigate()
  const location = useLocation()

  const tabs = [
    { label: 'Dashboard', path: '/vendor' },
    { label: 'Orders', path: '/vendor/orders' },
    { label: 'Menu', path: '/vendor/menu' },
  ]

  return (
    <div className="min-h-screen bg-[#F8F7F4]">
      <div className="max-w-md mx-auto">
        {/* Top Nav */}
        <div className="bg-[#1B4332] px-4 pt-10 pb-1 sticky top-0 z-50">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-white font-bold text-lg">🍽️ Vendor Portal</span>
          </div>
          <div className="flex">
            {tabs.map(tab => {
              const active = location.pathname === tab.path
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all border-b-2 ${active ? 'text-white border-[#FF6B35]' : 'text-white/50 border-transparent hover:text-white/80'}`}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <Routes>
          <Route path="/" element={<VendorDashboard />} />
          <Route path="/orders" element={<VendorOrders />} />
          <Route path="/menu" element={<VendorMenu />} />
        </Routes>
      </div>
    </div>
  )
}
