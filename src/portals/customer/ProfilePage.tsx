// SVG icons — no emoji stand-ins
const Icons = {
  orders: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M20 7H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="10" y1="14" x2="14" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.6"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  payment: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="4" width="22" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
      <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  gift: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <polyline points="20 12 20 22 4 22 4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="7" width="20" height="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="22" x2="12" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  help: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  logout: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  chevron: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
}

const menuItems = [
  { icon: Icons.orders,   label: 'My Orders',        desc: '3 orders placed',           danger: false },
  { icon: Icons.location, label: 'Saved Addresses',  desc: 'Playa Venao, Surf Camp',    danger: false },
  { icon: Icons.payment,  label: 'Payment Methods',  desc: 'Visa ending in 4242',        danger: false },
  { icon: Icons.bell,     label: 'Notifications',    desc: 'All notifications on',       danger: false },
  { icon: Icons.gift,     label: 'Referrals',        desc: 'Get $5 off per friend',      danger: false },
  { icon: Icons.help,     label: 'Help & Support',   desc: '',                           danger: false },
  { icon: Icons.logout,   label: 'Log Out',          desc: '',                           danger: true  },
]

export default function ProfilePage() {
  return (
    <div className="pb-24 pt-5 px-4">

      {/* ── Profile header ─────────────────────────────────────────────── */}
      <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm mb-4">
        {/* Cover photo */}
        <div className="h-24 relative">
          <img
            src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=70"
            alt="Playa Venao"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
        </div>

        {/* Avatar + info */}
        <div className="px-4 pb-4 -mt-8 relative">
          <div className="w-16 h-16 rounded-full bg-[#1B4332] border-4 border-white flex items-center justify-center shadow-md mb-2">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-[18px] font-extrabold text-gray-900 leading-tight">Surf Traveler</h1>
          <p className="text-sm text-gray-500 mb-3">surfer@venao.com</p>
          <div className="flex gap-2">
            <span className="text-[11px] bg-[#FF6B35]/10 text-[#FF6B35] font-semibold px-3 py-1 rounded-full">3 orders</span>
            <span className="text-[11px] bg-[#1B4332]/10 text-[#1B4332] font-semibold px-3 py-1 rounded-full">5.0 ★ rating</span>
          </div>
        </div>
      </div>

      {/* ── Referral banner ────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden mb-5 h-20 shadow-sm">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=60"
          alt="beach"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332]/90 to-[#1B4332]/60" />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div>
            <p className="text-white font-bold text-sm">Invite friends to Venao</p>
            <p className="text-white/70 text-xs mt-0.5">You and your friend both get $5 off</p>
          </div>
          <button className="bg-[#FF6B35] text-white font-bold text-xs px-4 py-2 rounded-full flex-shrink-0 hover:bg-[#E85520] transition-all">
            Share link
          </button>
        </div>
      </div>

      {/* ── Menu ───────────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm divide-y divide-gray-50">
        {menuItems.map((item, i) => (
          <button
            key={i}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-all text-left group"
          >
            <span className={`flex-shrink-0 ${item.danger ? 'text-red-400' : 'text-gray-400 group-hover:text-[#1B4332] transition-colors'}`}>
              {item.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${item.danger ? 'text-red-500' : 'text-gray-800'}`}>
                {item.label}
              </p>
              {item.desc && (
                <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
              )}
            </div>
            <span className="text-gray-300 group-hover:text-gray-400 transition-colors">{Icons.chevron}</span>
          </button>
        ))}
      </div>

      <p className="text-center text-[11px] text-gray-400 mt-6 tracking-wide">
        Yalla Venao · Made in Playa Venao 🇵🇦
      </p>
    </div>
  )
}
