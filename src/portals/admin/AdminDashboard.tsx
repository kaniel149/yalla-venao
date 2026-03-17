import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

const statusColor: Record<string, string> = {
  delivered: 'bg-green-100 text-green-700',
  pending: 'bg-blue-100 text-blue-600',
  preparing: 'bg-orange-100 text-orange-600',
  ready: 'bg-green-100 text-green-700',
  picked_up: 'bg-purple-100 text-purple-600',
  cancelled: 'bg-red-100 text-red-600',
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [stats, setStats] = useState(orderStore.getStats())

  useEffect(() => {
    setOrders(orderStore.getAll())
    setStats(orderStore.getStats())
  }, [])

  const todayOrders = orders.filter(o => {
    return new Date(o.createdAt).toDateString() === new Date().toDateString()
  })

  const kpis = [
    { label: 'Total Orders', value: String(stats.totalOrders) },
    { label: 'GMV', value: `$${stats.totalRevenue}` },
    { label: 'Delivery Fees', value: `$${stats.totalDeliveryFees}` },
    { label: 'Today', value: String(todayOrders.length) },
  ]

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-400 text-sm mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} · Playa Venao
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">{kpi.label}</p>
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Per-Business Breakdown */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900">Deliveries per Business</h3>
        </div>
        {stats.byBusiness.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No deliveries yet</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {stats.byBusiness.map(biz => (
              <div key={biz.businessId} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{biz.name}</p>
                  <p className="text-xs text-gray-400">{biz.count} delivery{biz.count !== 1 ? 's' : ''}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#FF6B35]">${biz.revenue}</p>
                  <p className="text-[10px] text-gray-400">${biz.count * 5} in delivery fees</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent orders */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Orders</h3>
          <span className="text-xs text-gray-400">{orders.length} total</span>
        </div>
        {orders.length === 0 ? (
          <div className="px-5 py-8 text-center text-gray-400 text-sm">No orders yet. They'll appear here when customers place them.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['Order', 'Customer', 'Business', 'Amount', 'Channel', 'Status'].map(h => (
                    <th key={h} className="text-left px-4 py-3 font-semibold text-gray-400 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.slice(0, 20).map(o => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
