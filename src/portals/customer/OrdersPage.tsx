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

export default function OrdersPage({ onTrack }: Props) {
  return (
    <div className="pb-24 pt-5 px-4 bg-theme min-h-screen">
      <h1 className="text-[22px] font-extrabold text-theme-primary mb-1 tracking-tight">Orders</h1>
      <p className="text-theme-muted text-sm mb-5">Your delivery history.</p>

      {/* ── Active Order ─────────────────────────────────────────────────── */}
      <div className="card p-4 mb-4" style={{ borderLeft: '4px solid #FF6B35' }}>
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-bold text-theme-primary">La Lora</span>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
            On the way
          </span>
        </div>
        <p className="text-sm text-theme-muted mb-1">Ceviche de Corvina × 2, Fish Tacos × 1</p>
        <p className="font-bold text-[#FF6B35] text-[15px] mb-3">$35.00</p>
        <button
          onClick={onTrack}
          className="w-full bg-[#FF6B35] text-white font-bold py-3 rounded-xl text-[13px] hover:bg-[#E85520] active:scale-95 transition-all"
        >
          Track order · ~8 min
        </button>
      </div>

      {/* ── Past Orders ──────────────────────────────────────────────────── */}
      <h2 className="text-[13px] font-semibold text-theme-muted uppercase tracking-wide mb-3">Past orders</h2>

      {[
        {
          business: 'Venao Burger Co',
          items: 'Venao Smash × 2',
          total: '$26.00',
          date: 'Yesterday',
        },
        {
          business: 'Venao Wellness',
          items: 'Swedish Relaxation (60 min) × 1',
          total: '$55.00',
          date: 'Feb 17',
        },
        {
          business: 'Minisuper Venao',
          items: 'Tropical Fruit Box × 1, Cold Beer × 1',
          total: '$19.00',
          date: 'Feb 16',
        },
      ].map((order, i) => (
        <div key={i} className="card p-4 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-theme-primary text-[14px]">{order.business}</span>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1" style={{ background: 'rgba(27,67,50,0.12)', color: '#1B4332' }}>
              <CheckIcon /> Delivered
            </span>
          </div>
          <p className="text-sm text-theme-muted mb-2">{order.items}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-theme-primary text-[14px]">{order.total}</span>
              <span className="text-theme-muted text-[11px] ml-2">{order.date}</span>
            </div>
            <button className="text-[12px] text-[#FF6B35] font-semibold hover:underline">
              Reorder
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
