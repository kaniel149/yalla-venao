import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import CustomerApp from './portals/customer/CustomerApp'
import VendorApp from './portals/vendor/VendorApp'
import CourierApp from './portals/courier/CourierApp'
import AdminApp from './portals/admin/AdminApp'
import { useTheme } from './hooks/useTheme'

const portals = [
  { path: '/',        label: 'Customer', emoji: '🛍️' },
  { path: '/vendor',  label: 'Vendor',   emoji: '🏪' },
  { path: '/courier', label: 'Courier',  emoji: '🛵' },
  { path: '/admin',   label: 'Admin',    emoji: '⚙️' },
]

function PortalSwitcher() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const current = portals.find(p =>
    p.path === '/'
      ? !location.pathname.startsWith('/vendor') && !location.pathname.startsWith('/courier') && !location.pathname.startsWith('/admin')
      : location.pathname.startsWith(p.path)
  )

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed z-[9999] w-12 h-12 rounded-full shadow-2xl flex items-center justify-center text-lg transition-all active:scale-90"
        style={{
          top: 'env(safe-area-inset-top, 12px)',
          right: '12px',
          marginTop: '12px',
          background: open ? '#FF6B35' : 'rgba(27,67,50,0.95)',
          backdropFilter: 'blur(8px)',
          border: '2px solid rgba(255,255,255,0.3)',
        }}
      >
        {open ? '✕' : '⚡'}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed right-3 z-[9999] rounded-2xl shadow-2xl p-2 w-48"
          style={{ top: 'calc(env(safe-area-inset-top, 12px) + 60px)', background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)' }}
        >
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 pt-1 pb-2">Switch Portal</p>
          {portals.map(p => {
            const active = p === current
            return (
              <button
                key={p.path}
                onClick={() => { navigate(p.path); setOpen(false) }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  active ? 'bg-[#1B4332] text-white' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{p.emoji}</span>
                <span>{p.label}</span>
                {active && <span className="ml-auto text-[10px] opacity-60">here</span>}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}

export default function App() {
  useTheme()

  return (
    <BrowserRouter>
      <PortalSwitcher />
      <Routes>
        <Route path="/vendor/*" element={<VendorApp />} />
        <Route path="/courier/*" element={<CourierApp />} />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<CustomerApp />} />
      </Routes>
    </BrowserRouter>
  )
}
