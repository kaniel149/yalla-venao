import { useState } from 'react'

type Status = 'active' | 'pending' | 'rejected'

const initialCouriers = [
  { id: 'c1', name: 'Carlos M.', vehicle: '🏍️ Motorcycle', rating: 4.9, deliveries: 156, earnings: '$892', status: 'active' as Status },
  { id: 'c2', name: 'Diego R.', vehicle: '🚲 Bicycle', rating: 4.7, deliveries: 89, earnings: '$534', status: 'active' as Status },
  { id: 'c3', name: 'Ana L.', vehicle: '🏍️ Motorcycle', rating: 4.8, deliveries: 44, earnings: '$288', status: 'active' as Status },
  { id: 'c4', name: 'Marco V.', vehicle: '🛵 Scooter', rating: 4.5, deliveries: 23, earnings: '$156', status: 'active' as Status },
  { id: 'c5', name: 'Sofia P.', vehicle: '🏍️ Motorcycle', rating: 0, deliveries: 0, earnings: '$0', status: 'pending' as Status },
  { id: 'c6', name: 'Luis G.', vehicle: '🚲 Bicycle', rating: 0, deliveries: 0, earnings: '$0', status: 'pending' as Status },
]

const statusConfig: Record<Status, { color: string; bg: string; label: string }> = {
  active: { color: 'text-green-700', bg: 'bg-green-100', label: 'Active' },
  pending: { color: 'text-yellow-700', bg: 'bg-yellow-100', label: 'Pending' },
  rejected: { color: 'text-red-700', bg: 'bg-red-100', label: 'Rejected' },
}

export default function AdminCouriers() {
  const [couriers, setCouriers] = useState(initialCouriers)

  const updateStatus = (id: string, status: Status) => {
    setCouriers(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Couriers</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-full">
            {couriers.filter(c => c.status === 'active').length} active
          </span>
          <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-1 rounded-full">
            {couriers.filter(c => c.status === 'pending').length} pending
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Name', 'Vehicle', 'Rating', 'Deliveries', 'Earnings', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {couriers.map(c => {
                const s = statusConfig[c.status]
                return (
                  <tr key={c.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{c.name}</td>
                    <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.vehicle}</td>
                    <td className="px-4 py-3">{c.rating > 0 ? `⭐ ${c.rating}` : '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{c.deliveries}</td>
                    <td className="px-4 py-3 font-bold text-[#1B4332]">{c.earnings}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.bg} ${s.color}`}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {c.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(c.id, 'active')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold hover:bg-green-200 transition-all"
                            >Approve</button>
                            <button
                              onClick={() => updateStatus(c.id, 'rejected')}
                              className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold hover:bg-red-200 transition-all"
                            >Reject</button>
                          </>
                        )}
                        {c.status === 'active' && (
                          <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold hover:bg-gray-200 transition-all">View</button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
