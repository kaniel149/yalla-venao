import { useState } from 'react'
import { businesses } from '../../data/mockData'

type MenuItem = { id: string; name: string; price: number; image: string; description: string; available: boolean }

export default function VendorMenu() {
  const biz = businesses[0]
  const [items, setItems] = useState<MenuItem[]>(biz.products.map(p => ({ ...p, available: true })))

  const toggleAvailable = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item))
  }

  return (
    <div className="pb-24 pt-4 px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-xl">Menu Items</h2>
        <span className="text-sm text-gray-500">{items.filter(i => i.available).length}/{items.length} available</span>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className={`card flex gap-3 p-3 transition-all ${!item.available ? 'opacity-50' : ''}`}>
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                {/* Toggle */}
                <button
                  onClick={() => toggleAvailable(item.id)}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0 ml-2 ${item.available ? 'bg-[#1B4332]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${item.available ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
              <p className="text-xs text-gray-500 mb-1 line-clamp-1">{item.description}</p>
              <p className="font-bold text-[#FF6B35]">${item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-1/2 translate-x-[calc(50%-1rem+min(0px,calc(50vw-224px)))] w-14 h-14 bg-[#FF6B35] rounded-full flex items-center justify-center text-white text-3xl shadow-xl hover:bg-[#E85520] active:scale-90 transition-all z-40">
        +
      </button>
    </div>
  )
}
