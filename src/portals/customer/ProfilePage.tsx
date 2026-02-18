export default function ProfilePage() {
  const menuItems = [
    { icon: '📦', label: 'My Orders', desc: '3 orders placed' },
    { icon: '📍', label: 'Saved Addresses', desc: 'Playa Venao, Surf Camp' },
    { icon: '💳', label: 'Payment Methods', desc: 'Visa ending in 4242' },
    { icon: '🔔', label: 'Notifications', desc: 'All notifications on' },
    { icon: '🎁', label: 'Promotions', desc: 'Get $5 off your next order' },
    { icon: '❓', label: 'Help & Support', desc: '' },
    { icon: '🚪', label: 'Log Out', desc: '' },
  ]

  return (
    <div className="pb-24 pt-4 px-4">
      {/* Profile Header */}
      <div className="card p-5 flex items-center gap-4 mb-5">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#E85520] flex items-center justify-center text-3xl shadow-sm">🤙</div>
        <div className="flex-1">
          <h1 className="text-xl font-extrabold text-gray-900">Surf Traveler</h1>
          <p className="text-sm text-gray-500">surfer@venao.com</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs bg-[#FF6B35]/10 text-[#FF6B35] font-semibold px-2 py-0.5 rounded-full">3 Orders</span>
            <span className="text-xs bg-[#1B4332]/10 text-[#1B4332] font-semibold px-2 py-0.5 rounded-full">⭐ 5.0</span>
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-[#FFD166] to-[#FF6B35] rounded-2xl p-4 mb-5 flex items-center justify-between">
        <div>
          <p className="font-bold text-gray-900">Invite friends!</p>
          <p className="text-sm text-gray-800">Get $5 off for each referral 🎉</p>
        </div>
        <button className="bg-white text-[#FF6B35] font-bold text-sm px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all">Share</button>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map(item => (
          <div key={item.label} className="card p-4 flex items-center gap-3 cursor-pointer hover:shadow-md transition-all active:scale-[0.99]">
            <span className="text-xl w-8 text-center">{item.icon}</span>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
              {item.desc && <p className="text-xs text-gray-400">{item.desc}</p>}
            </div>
            <span className="text-gray-300 font-bold">›</span>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">Yalla Venao v1.0 · Made with ❤️ in Playa Venao</p>
    </div>
  )
}
