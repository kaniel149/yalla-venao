import { useState, useEffect } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

const statusConfig = {
  pending:   { label: 'New',       color: 'bg-blue-500',  dot: 'bg-blue-400' },
  preparing: { label: 'Preparing', color: 'bg-[#FF6B35]', dot: 'bg-orange-400' },
  ready:     { label: 'Ready',     color: 'bg-[#1B4332]', dot: 'bg-green-500' },
}

function getVendorBusinessId(): string | null {
  try {
    const raw = localStorage.getItem('yv_vendor_setup')
    if (!raw) return null
    return JSON.parse(raw).businessId || null
  } catch { return null }
}

export default function VendorDashboard() {
  const [isOpen, setIsOpen] = useState(true)
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const businessId = getVendorBusinessId()

  // Refresh from store
  const refresh = async () => {
    if (!businessId) {
      setOrders(await orderStore.getAll())
    } else {
      setOrders(await orderStore.getByBusiness(businessId))
    }
  }

  useEffect(() => { refresh() }, [])

  const updateStatus = async (id: string, status: StoredOrder['status']) => {
    await orderStore.updateStatus(id, status)
    refresh()
  }

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status))
  const todayOrders = orders.filter(o => {
    const d = new Date(o.createdAt)
    const now = new Date()
    return d.toDateString() === now.toDateString()
  })
  const todayRevenue = todayOrders.reduce((s, o) => s + o.total, 0)
  const totalDeliveries = orders.length

  return (
    <div className="pb-8 pt-6 px-4">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="serif text-2xl text-gray-900 leading-tight">
            {orders[0]?.businessName || 'Your Business'}
          </h1>
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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">{todayOrders.length}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Orders today</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">${todayRevenue}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Revenue</p>
        </div>
        <div className="bg-white rounded-2xl p-4">
          <p className="text-2xl font-bold text-gray-900">{totalDeliveries}</p>
          <p className="text-[11px] text-gray-400 mt-0.5 font-medium">Total deliveries</p>
        </div>
      </div>

      {/* Live orders */}
      <h2 className="font-bold text-gray-900 text-[15px] mb-3">
        Live orders {activeOrders.length > 0 && `(${activeOrders.length})`}
      </h2>
      <div className="space-y-3">
        {activeOrders.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No active orders</div>
        )}
        {activeOrders.map(order => {
          const sc = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.pending
          return (
            <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 text-sm">{order.customerName}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${sc.color}`}>
                    {sc.label}
                  </span>
                  {order.channel === 'whatsapp' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">WA</span>
                  )}
                </div>
                <span className="font-bold text-[#FF6B35] text-sm">${order.total}</span>
              </div>
              <p className="text-[12px] text-gray-500 mb-1">
                {order.items.map(i => `${i.name} ×${i.qty}`).join(', ')}
              </p>
              <p className="text-[10px] text-gray-300 mb-1 font-medium">
                {order.deliveryLocation} · {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-[10px] text-gray-300 mb-3 font-medium">
                Delivery fee: $2.50 · #{order.id}
              </p>
              <div className="flex gap-2">
                {(['pending', 'preparing', 'ready'] as const).map(s => (
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

      {/* Delivery history section */}
      {orders.filter(o => o.status === 'delivered').length > 0 && (
        <>
          <h2 className="font-bold text-gray-900 text-[15px] mb-3 mt-6">Delivery history</h2>
          <div className="space-y-2">
            {orders.filter(o => o.status === 'delivered').map(order => (
              <div key={order.id} className="bg-white rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
                  <p className="text-[11px] text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <span className="font-bold text-gray-900">${order.total}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
