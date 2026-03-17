import { useState, useEffect, useRef, useCallback } from 'react'
import { orderStore } from '../../lib/orderStore'
import type { StoredOrder } from '../../lib/orderStore'

interface Props {
  onTrack: () => void
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

interface StatusConfig {
  label: string
  style: React.CSSProperties
  pulsing: boolean
  icon: string
}

const statusConfig: Record<string, StatusConfig> = {
  pending:   {
    label: 'Waiting for restaurant...',
    style: { background: 'rgba(59,130,246,0.12)', color: '#3B82F6' },
    pulsing: true,
    icon: '🕐',
  },
  confirmed: {
    label: 'Restaurant confirmed!',
    style: { background: 'rgba(34,197,94,0.12)', color: '#22C55E' },
    pulsing: false,
    icon: '✓',
  },
  preparing: {
    label: 'Being prepared...',
    style: { background: 'rgba(255,107,53,0.12)', color: '#FF6B35' },
    pulsing: true,
    icon: '👨‍🍳',
  },
  ready:     {
    label: 'Ready for pickup',
    style: { background: 'rgba(34,197,94,0.12)', color: '#22C55E' },
    pulsing: false,
    icon: '✓',
  },
  picked_up: {
    label: 'Courier on the way!',
    style: { background: 'rgba(255,107,53,0.12)', color: '#FF6B35' },
    pulsing: true,
    icon: '🛵',
  },
  delivered: {
    label: 'Delivered',
    style: { background: 'rgba(27,67,50,0.12)', color: '#1B4332' },
    pulsing: false,
    icon: '✓',
  },
  cancelled: {
    label: 'Cancelled',
    style: { background: 'rgba(239,68,68,0.12)', color: '#EF4444' },
    pulsing: false,
    icon: '✕',
  },
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative inline-flex h-2 w-2 mr-1.5">
      <span
        className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
        style={{ background: color }}
      />
      <span
        className="relative inline-flex rounded-full h-2 w-2"
        style={{ background: color }}
      />
    </span>
  )
}

export default function OrdersPage({ onTrack }: Props) {
  const [orders, setOrders] = useState<StoredOrder[]>([])
  const [updating, setUpdating] = useState(false)
  const updateFlashTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstLoad = useRef(true)

  const fetchOrders = useCallback(async () => {
    const fresh = await orderStore.getAll()
    setOrders(fresh)

    if (!isFirstLoad.current) {
      setUpdating(true)
      if (updateFlashTimer.current) clearTimeout(updateFlashTimer.current)
      updateFlashTimer.current = setTimeout(() => setUpdating(false), 800)
    }
    isFirstLoad.current = false
  }, [])

  useEffect(() => {
    fetchOrders()
    const interval = setInterval(fetchOrders, 5000)
    return () => {
      clearInterval(interval)
      if (updateFlashTimer.current) clearTimeout(updateFlashTimer.current)
    }
  }, [fetchOrders])

  const activeOrders = orders.filter(o => !['delivered', 'cancelled'].includes(o.status))
  const pastOrders = orders.filter(o => ['delivered', 'cancelled'].includes(o.status))

  return (
    <div className="pb-24 pt-5 px-4 bg-theme min-h-screen">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-[22px] font-extrabold text-theme-primary tracking-tight">Orders</h1>
        {activeOrders.length > 0 && (
          <span
            className="text-[11px] font-medium text-theme-muted transition-opacity duration-300"
            style={{ opacity: updating ? 1 : 0 }}
          >
            Updating...
          </span>
        )}
      </div>
      <p className="text-theme-muted text-sm mb-5">Your delivery history.</p>

      {orders.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--surface-2)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <p className="text-theme-secondary text-lg font-medium">No orders yet</p>
          <p className="text-theme-muted text-sm mt-1">Place your first order to see it here</p>
        </div>
      )}

      {/* Active Orders */}
      {activeOrders.map(order => {
        const cfg = statusConfig[order.status] ?? statusConfig.pending
        const hasCourierLocation =
          order.status === 'picked_up' &&
          order.courierLat != null &&
          order.courierLng != null

        return (
          <div key={order.id} className="card p-4 mb-4" style={{ borderLeft: '4px solid #FF6B35' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-theme-primary">{order.businessName}</span>
              <span
                className="text-[11px] font-bold px-3 py-1 rounded-full flex items-center"
                style={cfg.style}
              >
                {cfg.pulsing && <PulsingDot color={(cfg.style as React.CSSProperties & { color: string }).color} />}
                {!cfg.pulsing && cfg.icon === '✓' && (
                  <span className="mr-1 inline-flex"><CheckIcon /></span>
                )}
                {cfg.label}
              </span>
            </div>

            <p className="text-sm text-theme-muted mb-1">
              {order.items.map(i => `${i.name} × ${i.qty}`).join(', ')}
            </p>
            <p className="font-bold text-[#FF6B35] text-[15px] mb-1">${order.total.toFixed(2)}</p>
            <p className="text-xs text-theme-muted mb-3">
              {order.deliveryLocation} · {order.channel === 'whatsapp' ? 'WhatsApp' : 'App'}
            </p>

            {/* Courier info when picked_up */}
            {order.status === 'picked_up' && order.courierName && (
              <div
                className="flex items-center justify-between rounded-xl px-3 py-2 mb-3"
                style={{ background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)' }}
              >
                <span className="text-sm font-semibold text-theme-primary">
                  🛵 {order.courierName} is on the way!
                </span>
                {hasCourierLocation && (
                  <a
                    href={`https://maps.google.com/?q=${order.courierLat},${order.courierLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] font-bold px-3 py-1.5 rounded-lg text-white"
                    style={{ background: '#FF6B35' }}
                  >
                    Track on Map
                  </a>
                )}
              </div>
            )}

            {['preparing', 'ready', 'picked_up'].includes(order.status) && (
              <button
                onClick={onTrack}
                className="w-full bg-[#FF6B35] text-white font-bold py-3 rounded-xl text-[13px] hover:bg-[#E85520] active:scale-95 transition-all"
              >
                Track order
              </button>
            )}
          </div>
        )
      })}

      {/* Past Orders */}
      {pastOrders.length > 0 && (
        <>
          <h2 className="text-[13px] font-semibold text-theme-muted uppercase tracking-wide mb-3">Past orders</h2>
          {pastOrders.map(order => (
            <div key={order.id} className="card p-4 mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-theme-primary text-[14px]">{order.businessName}</span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1" style={{
                  background: order.status === 'cancelled' ? 'rgba(239,68,68,0.12)' : 'rgba(27,67,50,0.12)',
                  color: order.status === 'cancelled' ? '#EF4444' : '#1B4332',
                }}>
                  {order.status === 'delivered' && <CheckIcon />}
                  {order.status === 'delivered' ? 'Delivered' : 'Cancelled'}
                </span>
              </div>
              <p className="text-sm text-theme-muted mb-2">
                {order.items.map(i => `${i.name} × ${i.qty}`).join(', ')}
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-theme-primary text-[14px]">${order.total.toFixed(2)}</span>
                  <span className="text-theme-muted text-[11px] ml-2">
                    {new Date(order.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
