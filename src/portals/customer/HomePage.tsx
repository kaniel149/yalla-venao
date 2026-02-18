import { businesses, categories } from '../../data/mockData'

interface Props {
  onBusinessClick: (id: string) => void
}

export default function HomePage({ onBusinessClick }: Props) {
  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-[#1B4332] px-4 pt-10 pb-6">
        <div className="flex items-center gap-1 text-white/80 text-sm mb-2">
          <span>📍</span>
          <span>Playa Venao, Panama</span>
          <span className="text-white/50 ml-1">▾</span>
        </div>
        <h2 className="text-white text-2xl font-bold mb-3">What are you craving?</h2>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search food, drinks, services..."
            className="w-full bg-white rounded-full pl-9 pr-4 py-3 text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
          />
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Hero Banner */}
        <div className="rounded-2xl overflow-hidden mb-5 bg-gradient-to-r from-[#FF6B35] to-[#E85520] p-5 flex items-center justify-between shadow-md">
          <div>
            <h1 className="text-white text-2xl font-extrabold leading-tight">Yalla Venao</h1>
            <p className="text-white/80 text-sm mt-1">Delivered in 20 min</p>
            <p className="text-white/60 text-xs mt-2">Paradise, on demand 🌴</p>
          </div>
          <div className="text-5xl">🌊</div>
        </div>

        {/* Categories */}
        <h3 className="text-gray-900 font-bold text-lg mb-3">Browse by category</h3>
        <div className="grid grid-cols-3 gap-3 mb-6">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="rounded-2xl p-3 flex flex-col items-center gap-1 cursor-pointer hover:scale-105 transition-all active:scale-95 shadow-sm"
              style={{ backgroundColor: cat.color + '18', border: `1px solid ${cat.color}22` }}
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-gray-700">{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Popular near you — horizontal scroll */}
        <h3 className="text-gray-900 font-bold text-lg mb-3">Popular near you 🔥</h3>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 mb-5 scrollbar-hide">
          {businesses.map(biz => (
            <div
              key={biz.id}
              className="flex-shrink-0 w-64 card cursor-pointer hover:shadow-md transition-all active:scale-95"
              onClick={() => onBusinessClick(biz.id)}
            >
              <div className="relative">
                <img src={biz.image} alt={biz.name} className="w-full h-36 object-cover" />
                <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Open</span>
              </div>
              <div className="p-3">
                <h4 className="font-bold text-gray-900 text-sm mb-1">{biz.name}</h4>
                <div className="flex gap-1 flex-wrap mb-2">
                  {biz.tags.slice(0, 2).map(t => (
                    <span key={t} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="text-yellow-500 font-semibold">⭐ {biz.rating}</span>
                  <span>·</span>
                  <span>⏱️ {biz.deliveryTime} min</span>
                  <span>·</span>
                  <span>🛵 ${biz.deliveryFee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* All businesses */}
        <h3 className="text-gray-900 font-bold text-lg mb-3">All businesses</h3>
        <div className="space-y-3">
          {businesses.map(biz => (
            <div
              key={biz.id}
              className="card cursor-pointer hover:shadow-md transition-all active:scale-[0.99]"
              onClick={() => onBusinessClick(biz.id)}
            >
              <div className="relative">
                <img src={biz.image} alt={biz.name} className="w-full h-40 object-cover" />
                <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Open</span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-bold text-gray-900">{biz.name}</h4>
                  <span className="text-yellow-500 font-semibold text-sm">⭐ {biz.rating}</span>
                </div>
                <p className="text-sm text-gray-500 mb-2">{biz.description}</p>
                <div className="flex gap-1 flex-wrap mb-2">
                  {biz.tags.map(t => (
                    <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>⏱️ {biz.deliveryTime} min</span>
                  <span>🛵 ${biz.deliveryFee} delivery</span>
                  {biz.minOrder > 0 && <span>💵 ${biz.minOrder} min</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
