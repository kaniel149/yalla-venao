interface Props {
  onTrack: () => void
}

export default function OrdersPage({ onTrack }: Props) {
  return (
    <div className="pb-24 pt-4 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

      {/* Active Order */}
      <div className="card p-4 mb-3 border-l-4 border-[#FF6B35]">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">La Palapa Grill</span>
          <span className="text-xs bg-orange-100 text-orange-600 font-semibold px-3 py-1 rounded-full">On the way 🏍️</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">Venao Burger × 2</p>
        <p className="font-bold text-[#FF6B35] mb-3">$27.00</p>
        <button onClick={onTrack} className="btn-primary text-sm py-2.5 w-full">
          Track Order · ~8 min
        </button>
      </div>

      <h2 className="text-base font-semibold text-gray-500 mt-4 mb-3">Past Orders</h2>

      <div className="card p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">Surf & Sip Bar</span>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">Delivered ✅</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">Passion Fruit Margarita × 2</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-700">$18.00</p>
          <button className="text-sm text-[#FF6B35] font-semibold">Reorder</button>
        </div>
      </div>

      <div className="card p-4 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900">Venao Market</span>
          <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-full">Delivered ✅</span>
        </div>
        <p className="text-sm text-gray-500 mb-1">Tropical Fruit Box × 1, Local Eggs × 2</p>
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-700">$19.00</p>
          <button className="text-sm text-[#FF6B35] font-semibold">Reorder</button>
        </div>
      </div>
    </div>
  )
}
