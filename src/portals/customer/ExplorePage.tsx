import { useState } from 'react'
import { businesses, categories } from '../../data/mockData'

interface Props {
  onBusinessClick: (id: string) => void
}

export default function ExplorePage({ onBusinessClick }: Props) {
  const [selected, setSelected] = useState('all')
  const filtered = selected === 'all' ? businesses : businesses.filter(b => b.category === selected)

  return (
    <div className="pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Explore</h1>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-1 px-1">
        <button
          onClick={() => setSelected('all')}
          className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selected === 'all' ? 'bg-[#FF6B35] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}
        >All</button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selected === c.id ? 'bg-[#FF6B35] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200'}`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="text-xs text-gray-400 mb-3">{filtered.length} results</p>
      <div className="space-y-3">
        {filtered.map(b => (
          <div key={b.id} className="card cursor-pointer hover:shadow-md transition-all active:scale-[0.99]" onClick={() => onBusinessClick(b.id)}>
            <div className="relative">
              <img src={b.image} alt={b.name} className="w-full h-36 object-cover" />
              <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Open</span>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-900">{b.name}</h3>
                <span className="text-yellow-500 font-semibold text-sm">⭐ {b.rating}</span>
              </div>
              <p className="text-xs text-gray-500 mb-2">{b.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span>⏱️ {b.deliveryTime} min</span>
                <span>🛵 ${b.deliveryFee}</span>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🏄</div>
            <p className="text-gray-500 font-medium">No results in this category</p>
            <p className="text-gray-400 text-sm mt-1">More vendors coming soon!</p>
          </div>
        )}
      </div>
    </div>
  )
}
