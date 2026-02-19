import { useState } from 'react'

const mockOrders = [
  { id: 'ord-001', customer: 'Alex B.', items: 'Ceviche de Corvina ×2', total: 27, time: '2 min ago', status: 'pending' },
  { id: 'ord-002', customer: 'Maria S.', items: 'Tuna Tartare ×1, Patacones ×2', total: 34, time: '8 min ago', status: 'preparing' },
  { id: 'ord-003', customer: 'Jake T.', items: 'Paella Venao ×1', total: 22, time: '15 min ago', status: 'ready' },
]

type OrderStatus = 'pending' | 'preparing' | 'ready'

const statusConfig = {
  pending:   { label: 'New',       color: 'bg-blue-500',      dot: 'bg-blue-400'  },
  preparing: { label: 'Preparing', color: 'bg-[#FF6B35]',     dot: 'bg-orange-400' },
  ready:     { label: 'Ready',     color: 'bg-[#1B4332]',     dot: 'bg-green-500' },
}

export default function VendorDashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const [orders, setOrders] = useState(mockOrders)

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div className="pb-8 pt-6 px-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="serif text-2xl text-gray-900 leading-tight">La Lora</h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Playa Venao, Panama</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            isOpen ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500'
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-300 animate-pulse-dot' : 'bg-gray-400'}`} />
          {isOpen ? 'Open' : 'Closed'}
        </button>
      </div>

      {/* Stats — clean numbers, no emoji */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">12</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Orders today</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">$340</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Revenue</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">4.9</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Rating</p>
        </div>
      </div>

      {/* Orders */}
      <h2 className="font-bold text-gray-900 text-[15px] mb-3">Live orders</h2>
      <div className="space-y-3">
        {orders.map(order => {
          const sc = statusConfig[order.status as OrderStatus]
          return (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{order.customer}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${sc.color}`}>
                    {sc.label}
                  </span>
                </div>
                <span className="font-bold text-[#FF6B35] text-sm">${order.total}</span>
              </div>
              <p className="text-[12px] text-gray-500 mb-3">{order.items}</p>
              <p className="text-[10px] text-gray-300 mb-3 font-medium">{order.time}</p>
              <div className="flex gap-2">
                {(['pending', 'preparing', 'ready'] as OrderStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order.id, s)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      order.status === s
                        ? `${statusConfig[s].color} text-white`
                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    {statusConfig[s].label}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
