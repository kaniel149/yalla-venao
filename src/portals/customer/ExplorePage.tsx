import { useState } from 'react'
import { businesses, categories } from '../../data/dataAdapter'

interface Props {
  onBusinessClick: (id: string) => void
}

function DeliveryTime({ time }: { time: string }) {
  if (time === 'On request') return <span>On request</span>
  return <span>{time} min</span>
}

export default function ExplorePage({ onBusinessClick }: Props) {
  const [selected, setSelected] = useState('all')

  const filtered = selected === 'all'
    ? businesses
    : businesses.filter(b => b.category === selected)

  return (
    <div className="pb-24 pt-5 px-4 bg-theme min-h-screen">
      <h1 className="text-[22px] font-extrabold text-theme-primary mb-1 tracking-tight">Explore Venao</h1>
      <p className="text-theme-muted text-sm mb-5">Everything the beach has to offer.</p>

      {/* ── Category filter — pill style ─────────────────────────────────── */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 -mx-4 px-4 scrollbar-hide">
        <button
          onClick={() => setSelected('all')}
          className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
          style={selected === 'all'
            ? { background: '#1B4332', color: 'white', border: '1px solid #1B4332' }
            : { background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
          }
        >
          All
        </button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all"
            style={selected === c.id
              ? { background: '#1B4332', color: 'white', border: '1px solid #1B4332' }
              : { background: 'var(--surface)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }
            }
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* ── Results count ─────────────────────────────────────────────────── */}
      <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-3">
        {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
      </p>

      {/* ── Business list ─────────────────────────────────────────────────── */}
      <div className="space-y-3">
        {filtered.map(b => (
          <button
            key={b.id}
            className="w-full card text-left hover:shadow-md transition-all active:scale-[0.99]"
            onClick={() => onBusinessClick(b.id)}
          >
            <div className="relative">
              <img src={b.image} alt={b.name} className="w-full h-40 object-cover" />
              <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">Open</span>
              {b.deliveryFee === 0 && (
                <span className="absolute top-2 right-2 bg-white/90 text-[#1B4332] text-[9px] font-bold px-2 py-0.5 rounded-full">Free delivery</span>
              )}
            </div>
            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-0.5">
                <h3 className="font-bold text-gray-900 text-[15px]">{b.name}</h3>
                <span className="text-amber-500 font-semibold text-[13px] ml-2 flex-shrink-0">{b.rating} ★</span>
              </div>
              <p className="text-[12px] text-gray-500 mb-2 line-clamp-2 leading-relaxed">{b.description}</p>
              <div className="flex gap-1.5 flex-wrap mb-2">
                {b.tags.map(t => (
                  <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{t}</span>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[12px] text-gray-500 border-t border-gray-50 pt-2">
                <DeliveryTime time={b.deliveryTime} />
                <span className="text-gray-200">·</span>
                {b.deliveryFee > 0
                  ? <span>${b.deliveryFee} delivery</span>
                  : <span className="text-[#1B4332] font-medium">Free delivery</span>
                }
              </div>
            </div>
          </button>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <img
              src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=60"
              alt="Surfing"
              className="w-20 h-20 object-cover rounded-full mx-auto mb-4 opacity-40"
            />
            <p className="text-gray-500 font-medium">Nothing here yet</p>
            <p className="text-gray-400 text-sm mt-1">More vendors joining soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
