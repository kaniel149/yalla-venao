import { useState } from 'react'

const allOrders = [
  { id: 'ord-001', customer: 'Alex B.', items: 'Venao Burger ×2, Tacos ×1', total: 34, time: '2 min ago', status: 'pending' },
  { id: 'ord-002', customer: 'Maria S.', items: 'Tuna Poke Bowl ×1', total: 14, time: '10 min ago', status: 'active' },
  { id: 'ord-003', customer: 'Jake T.', items: 'Venao Burger ×3', total: 36, time: '22 min ago', status: 'active' },
  { id: 'ord-004', customer: 'Chloe R.', items: 'Pulled Pork Tacos ×2', total: 20, time: '45 min ago', status: 'completed' },
  { id: 'ord-005', customer: 'Diego M.', items: 'Tuna Poke Bowl ×2, Burger ×1', total: 40, time: '1 hr ago', status: 'completed' },
]

type Filter = 'all' | 'pending' | 'active' | 'completed'

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  pending: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'Pending' },
  active: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Active' },
  completed: { color: 'text-green-700', bg: 'bg-green-100', label: 'Completed' },
}

export default function VendorOrders() {
  const [filter, setFilter] = useState<Filter>('all')
  const filters: Filter[] = ['all', 'pending', 'active', 'completed']
  const filtered = filter === 'all' ? allOrders : allOrders.filter(o => o.status === filter)

  return (
    <div className="pb-8 pt-4 px-4">
      <h2 className="font-bold text-gray-900 text-xl mb-4">Orders</h2>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 rounded-full text-xs font-bold capitalize transition-all ${filter === f ? 'bg-[#1B4332] text-white' : 'bg-white text-gray-500 border border-gray-200'}`}
          >{f}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(order => {
          const s = statusConfig[order.status]
          return (
            <div key={order.id} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{order.customer}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.bg} ${s.color}`}>{s.label}</span>
                </div>
                <span className="font-bold text-[#FF6B35]">${order.total}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{order.items}</p>
              <p className="text-xs text-gray-400 mb-3">{order.time} · #{order.id}</p>
              {order.status !== 'completed' && (
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-[#FF6B35] text-white rounded-full text-xs font-bold hover:bg-[#E85520] transition-all">
                    Update Status
                  </button>
                  <button className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">
                    Contact Customer
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
