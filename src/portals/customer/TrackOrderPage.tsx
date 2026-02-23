import { useNavigate } from 'react-router-dom'
import { activeOrder } from '../../data/dataAdapter'

const steps = [
  { label: 'Order confirmed', done: true },
  { label: 'Preparing your order', done: true },
  { label: 'Picked up — on the way', active: true },
  { label: 'Delivered', pending: true },
]

export default function TrackOrderPage() {
  const navigate = useNavigate()
  const order = activeOrder

  return (
    <div className="pb-24 pt-5 px-4 bg-theme min-h-screen">
      {/* ── Back header ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
          style={{ background: 'var(--surface)', color: 'var(--text-secondary)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1 className="text-[18px] font-bold text-theme-primary">Tracking order</h1>
      </div>

      {/* ── ETA Banner ───────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 h-28 shadow-md">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80"
          alt="delivery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/95 to-[#FF6B35]/60" />
        <div className="absolute inset-0 flex items-center justify-between px-5">
          <div>
            <p className="text-white/80 text-xs font-medium uppercase tracking-wide mb-0.5">Estimated arrival</p>
            <p className="text-white text-4xl font-extrabold tracking-tight">~{order.eta}</p>
          </div>
          <div className="text-right">
            <p className="text-white/70 text-xs">Miguel R.</p>
            <p className="text-white/70 text-xs mt-0.5">1.2 km away</p>
          </div>
        </div>
      </div>

      {/* ── Status steps ─────────────────────────────────────────────────── */}
      <div className="card p-4 mb-4">
        <h2 className="font-bold text-theme-primary text-[15px] mb-4">Order status</h2>
        <div className="space-y-0">
          {steps.map((step, i) => {
            const isDone = step.done
            const isActive = step.active
            const isPending = step.pending
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    isDone ? 'bg-[#1B4332]' : isActive ? 'bg-[#FF6B35]' : ''
                  }`} style={isPending ? { background: 'var(--surface-2)' } : {}}>
                    {isDone && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {isActive && (
                      <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    )}
                    {isPending && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--text-muted)' }} />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 my-1" style={{ minHeight: 20, background: isDone ? 'rgba(27,67,50,0.4)' : 'var(--border)' }} />
                  )}
                </div>
                <div className="pt-1.5 pb-3">
                  <p className={`text-sm font-semibold ${
                    isDone ? 'text-theme-primary' : isActive ? 'text-[#FF6B35]' : 'text-theme-muted'
                  }`}>
                    {step.label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Courier ──────────────────────────────────────────────────────── */}
      <div className="card p-4 mb-4">
        <h2 className="font-bold text-theme-primary text-[15px] mb-3">Your courier</h2>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#1B4332] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-theme-primary">{order.courier.name}</p>
            <p className="text-sm text-theme-muted">Moto · {order.courier.rating} ★ · On the way</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-theme-muted" style={{ border: '1px solid var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-all text-theme-muted" style={{ border: '1px solid var(--border)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Map placeholder ──────────────────────────────────────────────── */}
      <div className="card overflow-hidden mb-4">
        <div className="relative h-44">
          <img
            src="https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=60"
            alt="map view"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="white"/>
                <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" strokeDasharray="2 2"/>
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-[#1B4332] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <svg width="12" height="14" viewBox="0 0 10 12" fill="none">
                <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5 1.5 1.5 0 0 1 5 6.5z" fill="white"/>
              </svg>
            </div>
          </div>
          <div className="absolute bottom-3 left-3 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold shadow" style={{ background: 'rgba(255,255,255,0.9)', color: '#111827' }}>
            Miguel · 1.2 km away
          </div>
        </div>
      </div>

      {/* ── Order Summary ─────────────────────────────────────────────────── */}
      <div className="card p-4">
        <h2 className="font-bold text-theme-primary text-[15px] mb-3">Order summary</h2>
        <div className="space-y-1.5">
          {order.items.map(({ product, qty }) => (
            <div key={product.id} className="flex justify-between text-sm">
              <span className="text-theme-muted">{product.name} × {qty}</span>
              <span className="font-semibold text-theme-primary">${product.price * qty}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 space-y-1" style={{ borderTop: '1px solid var(--border)' }}>
          <div className="flex justify-between text-sm text-theme-muted">
            <span>Delivery</span>
            <span>${order.deliveryFee}</span>
          </div>
          <div className="flex justify-between text-sm text-theme-muted">
            <span>Tip</span>
            <span>${order.tip}</span>
          </div>
          <div className="flex justify-between font-bold text-theme-primary pt-1">
            <span>Total</span>
            <span className="text-[#FF6B35]">${order.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
