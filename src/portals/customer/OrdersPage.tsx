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
    <div className="pb-24 pt-5 px-4">
      <h1 className="text-[22px] font-extrabold text-gray-900 mb-1 tracking-tight">Orders</h1>
      <p className="text-gray-500 text-sm mb-5">Your delivery history.</p>

      {/* ── Active Order ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-4 border-l-4 border-[#FF6B35]">
        <div className="p-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-gray-900">La Lora</span>
            <span className="text-[11px] bg-orange-50 text-[#FF6B35] font-bold px-3 py-1 rounded-full">
              On the way
            </span>
          </div>
          <p className="text-[13px] text-gray-500 mb-1">Ceviche de Corvina × 2, Fish Tacos × 1</p>
          <p className="font-bold text-[#FF6B35] text-[15px] mb-3">$35.00</p>
          <button
            onClick={onTrack}
            className="w-full bg-[#FF6B35] text-white font-bold py-3 rounded-xl text-[13px] hover:bg-[#E85520] active:scale-95 transition-all"
          >
            Track order · ~8 min
          </button>
        </div>
      </div>

      {/* ── Past Orders ──────────────────────────────────────────────────── */}
      <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Past orders</h2>

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
        <div key={i} className="bg-white rounded-2xl shadow-sm p-4 mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold text-gray-900 text-[14px]">{order.business}</span>
            <span className="text-[11px] bg-green-50 text-green-700 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckIcon /> Delivered
            </span>
          </div>
          <p className="text-[12px] text-gray-500 mb-2">{order.items}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-gray-800 text-[14px]">{order.total}</span>
              <span className="text-gray-400 text-[11px] ml-2">{order.date}</span>
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
