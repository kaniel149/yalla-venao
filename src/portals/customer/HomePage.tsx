import { useState } from 'react'
import { businesses, categories } from '../../data/mockData'

interface Props {
  onBusinessClick: (id: string) => void
}

// Delivery time display — handles 'On request' and time ranges
function DeliveryTime({ time }: { time: string }) {
  if (time === 'On request') return <span>On request</span>
  return <span>{time} min</span>
}

export default function HomePage({ onBusinessClick }: Props) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = activeCategory
    ? businesses.filter(b => b.category === activeCategory)
    : businesses

  return (
    <div className="pb-24">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] px-4 pt-10 pb-5">
        <div className="flex items-center gap-1.5 text-white/60 text-xs mb-2 font-medium tracking-wide uppercase">
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none" className="opacity-70">
            <path d="M5 0C2.24 0 0 2.24 0 5c0 3.75 5 7 5 7s5-3.25 5-7c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 5 3.5 1.5 1.5 0 0 1 5 6.5z" fill="currentColor"/>
          </svg>
          <span>Playa Venao, Panama</span>
        </div>
        <h2 className="text-white text-[22px] font-bold tracking-tight mb-3">What do you need?</h2>
        <div className="relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search food, drinks, surf…"
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] placeholder-gray-400"
          />
        </div>
      </div>

      <div className="px-4 pt-4">

        {/* ── Hero Photo Banner ──────────────────────────────────────────────── */}
        <div className="relative rounded-2xl overflow-hidden mb-5 h-36 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
            alt="Playa Venao beach"
            className="w-full h-full object-cover object-center"
          />
          {/* Left-side gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-white/70 text-[11px] font-semibold tracking-[0.12em] uppercase mb-1">Playa Venao · Panama</p>
            <h1 className="text-white text-2xl font-extrabold leading-tight tracking-tight">Paradise,<br />on demand.</h1>
          </div>
          {/* Delivery badge */}
          <div className="absolute bottom-3 right-3 bg-[#FF6B35] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
            Delivered in 20 min
          </div>
        </div>

        {/* ── Categories — Photo Tiles ───────────────────────────────────────── */}
        <h3 className="text-gray-900 font-bold text-base mb-3 tracking-tight">Browse by category</h3>
        <div className="grid grid-cols-3 gap-2 mb-6">
          {categories.map(cat => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isActive ? null : cat.id)}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group"
              >
                {/* Photo */}
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Dark overlay — lighter when active */}
                <div className={`absolute inset-0 transition-opacity duration-200 ${isActive ? 'bg-[#FF6B35]/70' : 'bg-black/45 group-hover:bg-black/35'}`} />
                {/* Label */}
                <div className="absolute inset-0 flex items-end justify-start p-2">
                  <span className="text-white text-[11px] font-bold tracking-wide drop-shadow-md">
                    {cat.label}
                  </span>
                </div>
                {/* Active ring */}
                {isActive && (
                  <div className="absolute inset-0 ring-2 ring-[#FF6B35] rounded-xl" />
                )}
              </button>
            )
          })}
        </div>

        {/* ── Popular — Horizontal Scroll ────────────────────────────────────── */}
        {!activeCategory && (
          <>
            <h3 className="text-gray-900 font-bold text-base mb-3 tracking-tight">Popular near you</h3>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 mb-6 scrollbar-hide">
              {businesses.slice(0, 5).map(biz => (
                <button
                  key={biz.id}
                  className="flex-shrink-0 w-56 bg-white rounded-2xl overflow-hidden shadow-sm text-left hover:shadow-md transition-all active:scale-95"
                  onClick={() => onBusinessClick(biz.id)}
                >
                  <div className="relative">
                    <img src={biz.image} alt={biz.name} className="w-full h-32 object-cover" />
                    <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">Open</span>
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold text-gray-900 text-sm mb-0.5 truncate">{biz.name}</h4>
                    <p className="text-[11px] text-gray-500 mb-2 line-clamp-1">{biz.description}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                      <span className="text-amber-500 font-semibold">{biz.rating}</span>
                      <span className="text-gray-300">·</span>
                      <DeliveryTime time={biz.deliveryTime} />
                      {biz.deliveryFee > 0 && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span>${biz.deliveryFee} del.</span>
                        </>
                      )}
                      {biz.deliveryFee === 0 && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-[#1B4332] font-semibold">Free del.</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── All Businesses ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-bold text-base tracking-tight">
            {activeCategory
              ? `${categories.find(c => c.id === activeCategory)?.label} (${filtered.length})`
              : 'All in Venao'}
          </h3>
          {activeCategory && (
            <button
              onClick={() => setActiveCategory(null)}
              className="text-xs text-[#FF6B35] font-semibold"
            >
              Clear filter
            </button>
          )}
        </div>

        <div className="space-y-3">
          {filtered.map(biz => (
            <button
              key={biz.id}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-sm text-left hover:shadow-md transition-all active:scale-[0.99]"
              onClick={() => onBusinessClick(biz.id)}
            >
              <div className="relative">
                <img src={biz.image} alt={biz.name} className="w-full h-40 object-cover" />
                <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">Open</span>
                {biz.deliveryFee === 0 && (
                  <span className="absolute top-2 right-2 bg-white/90 text-[#1B4332] text-[9px] font-bold px-2 py-0.5 rounded-full">Free delivery</span>
                )}
              </div>
              <div className="px-4 py-3">
                <div className="flex items-start justify-between mb-0.5">
                  <h4 className="font-bold text-gray-900 text-[15px]">{biz.name}</h4>
                  <span className="text-amber-500 font-semibold text-[13px] ml-2 flex-shrink-0">{biz.rating} ★</span>
                </div>
                <p className="text-[12px] text-gray-500 mb-2 line-clamp-2 leading-relaxed">{biz.description}</p>
                <div className="flex gap-1.5 flex-wrap mb-2">
                  {biz.tags.map(t => (
                    <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-medium">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-[12px] text-gray-500 border-t border-gray-50 pt-2">
                  <span><DeliveryTime time={biz.deliveryTime} /></span>
                  <span className="text-gray-200">·</span>
                  {biz.deliveryFee > 0
                    ? <span>${biz.deliveryFee} delivery</span>
                    : <span className="text-[#1B4332] font-medium">Free delivery</span>
                  }
                  {biz.minOrder > 0 && (
                    <>
                      <span className="text-gray-200">·</span>
                      <span>${biz.minOrder} min</span>
                    </>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <img
              src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=60"
              alt="Surfing"
              className="w-24 h-24 object-cover rounded-full mx-auto mb-4 opacity-40"
            />
            <p className="text-gray-500 font-medium">Nothing here yet</p>
            <p className="text-gray-400 text-sm mt-1">More vendors joining soon</p>
          </div>
        )}

      </div>
    </div>
  )
}
