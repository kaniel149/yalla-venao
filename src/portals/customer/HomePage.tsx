import { useState } from 'react'
import { businesses, categories } from '../../data/dataAdapter'
import { isOpen, distanceKm, formatDistance } from '../../utils/businessUtils'
import { useUserLocation } from '../../hooks/useUserLocation'

interface Props {
  onBusinessClick: (id: string) => void
}

// Delivery time display — handles 'On request' and time ranges
function DeliveryTime({ time }: { time: string }) {
  if (time === 'On request') return <span>On request</span>
  return <span>{time} min</span>
}

// Top-level tabs definition
const topTabs = [
  { id: 'all',        label: 'All',         emoji: '🌴' },
  { id: 'food',       label: 'Food',        emoji: '🍽️' },
  { id: 'drinks',     label: 'Drinks',      emoji: '🍹' },
  { id: 'grocery',    label: 'Grocery',     emoji: '🛒' },
  { id: 'experience', label: 'Experiences', emoji: '🏄' },
  { id: 'stay',       label: 'Stay',        emoji: '🏕️' },
]

export default function HomePage({ onBusinessClick }: Props) {
  const [activeTab, setActiveTab] = useState<string>('all')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const userPos = useUserLocation()

  // Filtering logic
  const filtered = (() => {
    if (activeTab === 'experience') return businesses.filter(b => b.vertical === 'experience')
    if (activeTab === 'stay') return businesses.filter(b => b.vertical === 'stay')
    if (activeTab !== 'all') {
      // food sub-category tabs (food, drinks, grocery, etc.)
      return businesses.filter(b => b.category === activeTab)
    }
    // All tab: apply photo-grid category filter if set
    if (activeCategory) return businesses.filter(b => b.category === activeCategory)
    return businesses
  })()

  // Show photo grid only on "All" tab (food sub-categories don't apply to exp/stay)
  const showPhotoGrid = activeTab === 'all'

  const handleTopTab = (tabId: string) => {
    setActiveTab(tabId)
    setActiveCategory(null)
  }

  const handleCategoryTile = (catId: string) => {
    if (catId === activeCategory) {
      setActiveCategory(null)
    } else {
      setActiveCategory(catId)
      setActiveTab('all')
    }
  }

  // Compute heading label
  const headingLabel = (() => {
    if (activeTab === 'experience') return `Experiences (${filtered.length})`
    if (activeTab === 'stay') return `Stays (${filtered.length})`
    if (activeTab !== 'all') return `${topTabs.find(t => t.id === activeTab)?.label} (${filtered.length})`
    if (activeCategory) return `${categories.find(c => c.id === activeCategory)?.label} (${filtered.length})`
    return 'All in Venao'
  })()

  return (
    <div className="pb-24 bg-theme min-h-screen">
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="bg-[#1B4332] px-4 pt-10 pb-4">
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
            placeholder="Search food, experiences, stays…"
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] placeholder-gray-400"
          />
        </div>

        {/* ── Top-level Category Tabs ──────────────────────────────────────── */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {topTabs.map(tab => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => handleTopTab(tab.id)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                  isActive
                    ? 'bg-[#FF6B35] text-white shadow-md'
                    : 'bg-white/15 text-white/80 hover:bg-white/25'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="px-4 pt-4">

        {/* ── Hero Photo Banner ──────────────────────────────────────────────── */}
        {activeTab === 'all' && !activeCategory && (
          <div className="relative rounded-2xl overflow-hidden mb-5 h-36 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80"
              alt="Playa Venao beach"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5">
              <p className="text-white/70 text-[11px] font-semibold tracking-[0.12em] uppercase mb-1">Playa Venao · Panama</p>
              <h1 className="text-white text-2xl font-extrabold leading-tight tracking-tight">Paradise,<br />on demand.</h1>
            </div>
            <div className="absolute bottom-3 right-3 bg-[#FF6B35] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
              Delivered in 20 min
            </div>
          </div>
        )}

        {/* ── Experience Hero Banner ─────────────────────────────────────────── */}
        {activeTab === 'experience' && (
          <div className="relative rounded-2xl overflow-hidden mb-5 h-36 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=900&q=80"
              alt="Experiences in Venao"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5">
              <p className="text-white/70 text-[11px] font-semibold tracking-[0.12em] uppercase mb-1">Book your next adventure</p>
              <h1 className="text-white text-2xl font-extrabold leading-tight tracking-tight">Experiences<br />in Venao</h1>
            </div>
          </div>
        )}

        {/* ── Stay Hero Banner ───────────────────────────────────────────────── */}
        {activeTab === 'stay' && (
          <div className="relative rounded-2xl overflow-hidden mb-5 h-36 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80"
              alt="Stays in Venao"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-5">
              <p className="text-white/70 text-[11px] font-semibold tracking-[0.12em] uppercase mb-1">Find your perfect spot</p>
              <h1 className="text-white text-2xl font-extrabold leading-tight tracking-tight">Where to<br />Stay</h1>
            </div>
          </div>
        )}

        {/* ── Categories — Photo Tiles (only on All tab) ────────────────────── */}
        {showPhotoGrid && (
          <>
            <h3 className="text-gray-900 font-bold text-base mb-3 tracking-tight">Browse by category</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {categories.map(cat => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryTile(cat.id)}
                    className="relative rounded-xl overflow-hidden aspect-[4/3] group"
                  >
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 transition-opacity duration-200 ${isActive ? 'bg-[#FF6B35]/70' : 'bg-black/45 group-hover:bg-black/35'}`} />
                    <div className="absolute inset-0 flex items-end justify-start p-2">
                      <span className="text-white text-[11px] font-bold tracking-wide drop-shadow-md">
                        {cat.emoji} {cat.label}
                      </span>
                    </div>
                    {isActive && (
                      <div className="absolute inset-0 ring-2 ring-[#FF6B35] rounded-xl" />
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── Popular — Horizontal Scroll (only on All + no sub-category) ───── */}
        {activeTab === 'all' && !activeCategory && (
          <>
            <h3 className="text-gray-900 font-bold text-base mb-3 tracking-tight">Popular near you</h3>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 mb-6 scrollbar-hide">
              {businesses.slice(0, 5).map(biz => {
                const open = isOpen(biz.hours)
                return (
                  <button
                    key={biz.id}
                    className="flex-shrink-0 w-56 card text-left hover:shadow-md transition-all active:scale-95"
                    onClick={() => onBusinessClick(biz.id)}
                  >
                    <div className="relative">
                      <img src={biz.image} alt={biz.name} className="w-full h-32 object-cover" />
                      <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase ${open ? 'bg-[#1B4332]' : 'bg-gray-500'}`}>
                        {open ? 'Open' : 'Closed'}
                      </span>
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
                )
              })}
            </div>
          </>
        )}

        {/* ── Section Heading ─────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-gray-900 font-bold text-base tracking-tight">{headingLabel}</h3>
          {(activeTab !== 'all' || activeCategory) && (
            <button
              onClick={() => { setActiveTab('all'); setActiveCategory(null) }}
              className="text-xs text-[#FF6B35] font-semibold"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* ── Business List ──────────────────────────────────────────────────── */}
        <div className="space-y-3">
          {filtered.map(biz => {
            const open = isOpen(biz.hours)
            const isExperience = biz.vertical === 'experience'
            const isStay = biz.vertical === 'stay'
            return (
              <button
                key={biz.id}
                className="w-full card text-left hover:shadow-md transition-all active:scale-[0.99]"
                onClick={() => onBusinessClick(biz.id)}
              >
                <div className="relative">
                  <img src={biz.image} alt={biz.name} className="w-full h-40 object-cover" />
                  <span className={`absolute top-2 left-2 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase ${open ? 'bg-[#1B4332]' : 'bg-gray-500'}`}>
                    {open ? 'Open' : 'Closed'}
                  </span>
                  {isExperience && biz.duration && (
                    <span className="absolute top-2 right-2 bg-white/90 text-[#1B4332] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      ⏱ {biz.duration}
                    </span>
                  )}
                  {isStay && biz.priceUnit && (
                    <span className="absolute top-2 right-2 bg-white/90 text-[#1B4332] text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {biz.priceUnit}
                    </span>
                  )}
                  {!isExperience && !isStay && biz.deliveryFee === 0 && (
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
                  {userPos && biz.coordinates && (
                    <span className="text-[11px] text-gray-400">
                      {formatDistance(distanceKm(userPos.lat, userPos.lng, biz.coordinates.lat, biz.coordinates.lng))} away
                    </span>
                  )}
                  {/* Footer row: different for each vertical */}
                  {isExperience ? (
                    <div className="flex items-center gap-3 text-[12px] text-gray-500 border-t border-gray-50 pt-2 mt-2">
                      <span className="font-semibold text-gray-800">From ${biz.minOrder}/person</span>
                      {biz.duration && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span>{biz.duration}</span>
                        </>
                      )}
                      {biz.groupSize && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span>{biz.groupSize}</span>
                        </>
                      )}
                    </div>
                  ) : isStay ? (
                    <div className="flex items-center gap-3 text-[12px] text-gray-500 border-t border-gray-50 pt-2 mt-2">
                      <span className="font-semibold text-gray-800">From ${biz.minOrder} {biz.priceUnit || 'per night'}</span>
                      {biz.checkInTime && (
                        <>
                          <span className="text-gray-200">·</span>
                          <span>Check-in {biz.checkInTime}</span>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-[12px] text-gray-500 border-t border-gray-50 pt-2 mt-2">
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
                  )}
                </div>
              </button>
            )
          })}
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
