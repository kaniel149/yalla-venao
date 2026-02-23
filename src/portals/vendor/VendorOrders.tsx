import { useState } from 'react'

type OrderStatus = 'new' | 'active' | 'ready' | 'rejected' | 'completed'

type Order = {
  id: string
  customer: string
  customerPhone: string
  items: string
  total: number
  time: string
  status: OrderStatus
}

const initialOrders: Order[] = [
  { id: 'ord-001', customer: 'Alex B.', customerPhone: '50766112233', items: 'Venao Burger ×2, Tacos ×1', total: 34, time: '2 min ago', status: 'new' },
  { id: 'ord-002', customer: 'Maria S.', customerPhone: '50766445566', items: 'Tuna Poke Bowl ×1', total: 14, time: '10 min ago', status: 'active' },
  { id: 'ord-003', customer: 'Jake T.', customerPhone: '50766778899', items: 'Venao Burger ×3', total: 36, time: '22 min ago', status: 'ready' },
  { id: 'ord-004', customer: 'Chloe R.', customerPhone: '50766321654', items: 'Pulled Pork Tacos ×2', total: 20, time: '45 min ago', status: 'completed' },
  { id: 'ord-005', customer: 'Diego M.', customerPhone: '50766987012', items: 'Tuna Poke Bowl ×2, Burger ×1', total: 40, time: '1 hr ago', status: 'completed' },
]

type Filter = 'all' | 'new' | 'active' | 'ready' | 'rejected' | 'completed'

const statusConfig: Record<OrderStatus, { color: string; bg: string; label: string }> = {
  new: { color: 'text-blue-600', bg: 'bg-blue-100', label: 'New' },
  active: { color: 'text-orange-600', bg: 'bg-orange-100', label: 'Active' },
  ready: { color: 'text-green-700', bg: 'bg-green-100', label: 'Ready' },
  rejected: { color: 'text-red-600', bg: 'bg-red-100', label: 'Rejected' },
  completed: { color: 'text-gray-600', bg: 'bg-gray-100', label: 'Completed' },
}

export default function VendorOrders() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [filter, setFilter] = useState<Filter>('all')

  const filters: Filter[] = ['all', 'new', 'active', 'ready', 'completed']

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  return (
    <div className="pb-8 pt-4 px-4">
      <h2 className="font-bold text-gray-900 text-xl mb-4">Orders</h2>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold capitalize transition-all ${
              filter === f ? 'bg-[#1B4332] text-white' : 'bg-white text-gray-500 border border-gray-200'
            }`}
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
              <p className="text-xs text-gray-400">{order.time} · #{order.id}</p>

              {/* NEW order actions */}
              {order.status === 'new' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(order.id, 'active')}
                    className="flex-1 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold"
                  >
                    Accept order
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, 'rejected')}
                    className="flex-1 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* ACTIVE order actions */}
              {order.status === 'active' && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => updateStatus(order.id, 'ready')}
                    className="flex-1 py-2.5 bg-[#FF6B35] text-white rounded-xl text-xs font-bold"
                  >
                    Mark Ready
                  </button>
                  <a
                    href={`https://wa.me/${order.customerPhone}?text=Your%20order%20is%20ready!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-xl text-xs font-bold text-center"
                  >
                    WhatsApp
                  </a>
                </div>
              )}

              {/* READY order badge */}
              {order.status === 'ready' && (
                <div className="mt-3">
                  <span className="inline-block px-3 py-1.5 bg-green-100 text-green-700 rounded-xl text-xs font-bold">
                    ✓ Ready for pickup
                  </span>
                </div>
              )}

              {/* REJECTED styling */}
              {order.status === 'rejected' && (
                <div className="mt-3">
                  <span className="inline-block px-3 py-1.5 bg-red-50 text-red-500 rounded-xl text-xs font-bold border border-red-200">
                    ✕ Order rejected
                  </span>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No orders in this category</div>
        )}
      </div>
    </div>
  )
}
