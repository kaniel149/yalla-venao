const kpis = [
  { label: 'GMV Today', value: '$1,240', change: '+18%', up: true },
  { label: 'Orders', value: '67', change: '+12%', up: true },
  { label: 'Active Couriers', value: '4', change: '0', up: null },
  { label: 'Commission', value: '$248', change: '+18%', up: true },
]

const recentOrders = [
  { id: 'ord-067', customer: 'Alex B.', business: 'La Lora', amount: '$27', status: 'delivered' },
  { id: 'ord-066', customer: 'Maria S.', business: 'Surf Shack Bar', amount: '$14', status: 'active' },
  { id: 'ord-065', customer: 'Jake T.', business: 'Minisuper Venao', amount: '$36', status: 'active' },
  { id: 'ord-064', customer: 'Chloe R.', business: 'Venao Wellness', amount: '$65', status: 'pending' },
  { id: 'ord-063', customer: 'Diego M.', business: 'La Lora', amount: '$40', status: 'delivered' },
]

const statusColor: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  active: 'bg-orange-100 text-orange-600',
  pending: 'bg-blue-100 text-blue-600',
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-400 text-sm mt-0.5">Thursday, Feb 19 · Playa Venao</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{kpi.label}</p>
              {kpi.up !== null && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kpi.up ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                  {kpi.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <span className="text-xs text-[#FF6B35] font-semibold cursor-pointer hover:underline">View all</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Order', 'Customer', 'Business', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{o.customer}</td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{o.business}</td>
                  <td className="px-4 py-3 font-bold text-[#FF6B35]">{o.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${statusColor[o.status]}`}>{o.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all border border-amber-100 hover:border-amber-300 active:scale-95">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-gray-900 text-sm">Approve Businesses</p>
            <p className="text-xs text-amber-600">2 awaiting review</p>
          </div>
        </button>
        <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all border border-red-100 hover:border-red-300 active:scale-95">
          <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="text-left">
            <p className="font-bold text-gray-900 text-sm">Flagged Orders</p>
            <p className="text-xs text-red-500">1 flagged order</p>
          </div>
        </button>
      </div>
    </div>
  )
}
