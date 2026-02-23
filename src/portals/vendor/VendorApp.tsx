import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import VendorDashboard from './VendorDashboard'
import VendorOrders from './VendorOrders'
import VendorMenu from './VendorMenu'
import VendorOnboarding from './VendorOnboarding'

const STORAGE_KEY = 'yv_vendor_setup'

function isOnboardingComplete(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    return data.step >= 3
  } catch {
    return false
  }
}

export default function VendorApp() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => !isOnboardingComplete())

  useEffect(() => {
    if (!isOnboardingComplete()) {
      setShowOnboarding(true)
    }
  }, [])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
  }

  if (showOnboarding) {
    return <VendorOnboarding onComplete={handleOnboardingComplete} />
  }

  const tabs = [
    { label: 'Dashboard', path: '/vendor' },
    { label: 'Orders', path: '/vendor/orders' },
    { label: 'Menu', path: '/vendor/menu' },
  ]

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="bg-[#1B4332] px-4 pt-10 pb-1 sticky top-0 z-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest">Vendor Portal</p>
              <h1 className="serif text-white text-xl">Yalla Venao</h1>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem(STORAGE_KEY)
                setShowOnboarding(true)
              }}
              className="text-white/40 text-[10px] hover:text-white/70 transition-colors"
            >
              ⚙
            </button>
          </div>
          <div className="flex">
            {tabs.map(tab => {
              const active = location.pathname === tab.path
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all border-b-2 ${
                    active ? 'text-white border-[#FF6B35]' : 'text-white/50 border-transparent hover:text-white/80'
                  }`}
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
