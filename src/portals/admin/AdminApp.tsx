import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import AdminBusinesses from './AdminBusinesses'
import AdminCouriers from './AdminCouriers'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

const navItems = [
  { label: 'Dashboard', path: '/admin' },
  { label: 'Businesses', path: '/admin/businesses' },
  { label: 'Couriers', path: '/admin/couriers' },
  { label: 'Orders', path: '/admin/orders' },
]

export default function AdminApp() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      {/* Top Header */}
      <div className="bg-[#1B4332] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#FF6B35] rounded-lg flex items-center justify-center font-bold text-white text-sm tracking-tight">Y</div>
          <div>
            <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest leading-none">Admin Portal</p>
            <span className="text-white font-bold text-base">Yalla Venao</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <span className="text-white/60 text-sm hidden sm:block">Admin</span>
        </div>
      </div>

      <div className="flex flex-1 max-w-6xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="w-52 bg-white border-r border-gray-100 min-h-full sticky top-16 self-start hidden md:block">
          <div className="p-4 pt-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">Navigation</p>
            {navItems.map(item => {
              const active = location.pathname === item.path
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold mb-1 transition-all ${
                    active ? 'bg-[#FF6B35]/10 text-[#FF6B35]' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </aside>

        {/* Mobile nav */}
        <div className="md:hidden w-full border-b border-gray-100 bg-white flex overflow-x-auto sticky top-16 z-40">
          {navItems.map(item => {
            const active = location.pathname === item.path
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex-shrink-0 px-4 py-3 text-xs font-semibold border-b-2 transition-all ${
                  active ? 'text-[#FF6B35] border-[#FF6B35]' : 'text-gray-500 border-transparent'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/businesses" element={<AdminBusinesses />} />
            <Route path="/couriers" element={<AdminCouriers />} />
            <Route path="/orders" element={<AdminOrdersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

function AdminOrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([])

  useEffect(() => {
    setOrders(orderStore.getAll())
  }, [])

  const updateStatus = (id: string, status: StoredOrder['status']) => {
    orderStore.updateStatus(id, status)
    setOrders(orderStore.getAll())
  }

  const statusColor: Record<string, string> = {
    delivered: 'bg-green-100 text-green-700',
    pending: 'bg-blue-100 text-blue-600',
    confirmed: 'bg-blue-100 text-blue-600',
    preparing: 'bg-orange-100 text-orange-600',
    ready: 'bg-green-100 text-green-700',
    picked_up: 'bg-purple-100 text-purple-600',
    cancelled: 'bg-red-100 text-red-600',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">All Orders</h2>
        <span className="text-sm text-gray-400">{orders.length} total</span>
      </div>
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400 text-sm">No orders yet</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order', 'Customer', 'Business', 'Amount', 'Channel', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{o.customerName}</td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{o.businessName}</td>
                    <td className="px-4 py-3 font-bold text-[#FF6B35]">${o.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${o.channel === 'whatsapp' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {o.channel === 'whatsapp' ? 'WA' : 'App'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColor[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      {o.status === 'pending' && (
                        <button onClick={() => updateStatus(o.id, 'preparing')} className="text-xs font-bold text-[#1B4332] hover:underline">Accept</button>
                      )}
                      {o.status === 'preparing' && (
                        <button onClick={() => updateStatus(o.id, 'ready')} className="text-xs font-bold text-[#FF6B35] hover:underline">Ready</button>
                      )}
                      {o.status === 'ready' && (
                        <button onClick={() => updateStatus(o.id, 'delivered')} className="text-xs font-bold text-green-700 hover:underline">Delivered</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
