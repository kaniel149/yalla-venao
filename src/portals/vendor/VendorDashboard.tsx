import { useState } from 'react'

const mockOrders = [
  { id: 'ord-001', customer: 'Alex B.', items: 'Venao Burger ×2', total: 27, time: '2 min ago', status: 'pending' },
  { id: 'ord-002', customer: 'Maria S.', items: 'Tuna Poke Bowl ×1, Tacos ×2', total: 34, time: '8 min ago', status: 'preparing' },
  { id: 'ord-003', customer: 'Jake T.', items: 'Venao Burger ×1', total: 15, time: '15 min ago', status: 'ready' },
]

type OrderStatus = 'pending' | 'preparing' | 'ready'

export default function VendorDashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const [orders, setOrders] = useState(mockOrders)

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  const stats = [
    { label: "Today's Orders", value: '12', icon: '📦' },
    { label: 'Revenue', value: '$340', icon: '💵' },
    { label: 'Rating', value: '4.8 ⭐', icon: '🌟' },
  ]

  return (
    <div className="pb-8 pt-4 px-4">
      {/* Business header + toggle */}
      <div className="card p-4 mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-gray-900 text-lg">La Palapa Grill</h2>
          <p className="text-sm text-gray-500">Playa Venao, Panama</p>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${isOpen ? 'bg-[#1B4332]' : 'bg-gray-300'}`}
        >
          <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all duration-300 ${isOpen ? 'left-7' : 'left-0.5'}`} />
        </button>
      </div>
      <p className={`text-xs font-semibold mb-4 text-center ${isOpen ? 'text-[#1B4332]' : 'text-gray-500'}`}>
        {isOpen ? '🟢 Restaurant is OPEN' : '🔴 Restaurant is CLOSED'}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map(stat => (
          <div key={stat.label} className="card p-3 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="font-extrabold text-gray-900 text-lg">{stat.value}</div>
            <div className="text-[10px] text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Active orders */}
      <h3 className="font-bold text-gray-900 text-base mb-3">Active Orders</h3>
      <div className="space-y-3">
        {orders.map(order => (
          <div key={order.id} className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="font-bold text-gray-900">{order.customer}</span>
                <span className="text-xs text-gray-400 ml-2">{order.time}</span>
              </div>
              <span className="font-bold text-[#FF6B35]">${order.total}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{order.items}</p>
            <div className="flex gap-2">
              <button
                onClick={() => updateStatus(order.id, 'pending')}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${order.status === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-blue-50'}`}
              >Confirm ✓</button>
              <button
                onClick={() => updateStatus(order.id, 'preparing')}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${order.status === 'preparing' ? 'bg-[#FF6B35] text-white' : 'bg-gray-100 text-gray-500 hover:bg-orange-50'}`}
              >Preparing 🍳</button>
              <button
                onClick={() => updateStatus(order.id, 'ready')}
                className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${order.status === 'ready' ? 'bg-[#1B4332] text-white' : 'bg-gray-100 text-gray-500 hover:bg-green-50'}`}
              >Ready 📦</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
