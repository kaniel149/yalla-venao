const kpis = [
  { label: 'GMV Today', value: '$1,240', icon: '💰', color: '#FF6B35', change: '+18%' },
  { label: 'Orders', value: '67', icon: '📦', color: '#1B4332', change: '+12%' },
  { label: 'Active Couriers', value: '4', icon: '🏍️', color: '#3498DB', change: '0' },
  { label: 'Commission', value: '$248', icon: '🏦', color: '#9B59B6', change: '+18%' },
]

const recentOrders = [
  { id: 'ord-067', customer: 'Alex B.', business: 'La Palapa Grill', amount: '$27', status: 'delivered' },
  { id: 'ord-066', customer: 'Maria S.', business: 'Surf & Sip Bar', amount: '$14', status: 'active' },
  { id: 'ord-065', customer: 'Jake T.', business: 'Venao Market', amount: '$36', status: 'active' },
  { id: 'ord-064', customer: 'Chloe R.', business: 'Zen Massage Venao', amount: '$65', status: 'pending' },
  { id: 'ord-063', customer: 'Diego M.', business: 'La Palapa Grill', amount: '$40', status: 'delivered' },
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
        <h2 className="text-2xl font-extrabold text-gray-900">Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">Thursday, Feb 19 · Playa Venao</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{kpi.icon}</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${kpi.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Recent orders table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <span className="text-xs text-[#FF6B35] font-semibold cursor-pointer hover:underline">View all</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Order ID', 'Customer', 'Business', 'Amount', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50 transition-all">
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{o.id}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{o.customer}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{o.business}</td>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all border border-yellow-200 hover:border-yellow-400 active:scale-95">
          <span className="text-2xl">🏪</span>
          <div className="text-left">
            <p className="font-bold text-gray-900 text-sm">Approve Pending Businesses</p>
            <p className="text-xs text-yellow-600">2 awaiting review</p>
          </div>
        </button>
        <button className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-all border border-red-200 hover:border-red-400 active:scale-95">
          <span className="text-2xl">🚩</span>
          <div className="text-left">
            <p className="font-bold text-gray-900 text-sm">View Flagged Orders</p>
            <p className="text-xs text-red-500">1 flagged order</p>
          </div>
        </button>
      </div>
    </div>
  )
}
