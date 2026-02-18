import { useState } from 'react'

type Status = 'approved' | 'pending' | 'suspended'

const initialBusinesses = [
  { id: '1', name: 'La Palapa Grill', category: 'Food', rating: 4.8, orders: 234, status: 'approved' as Status },
  { id: '2', name: 'Surf & Sip Bar', category: 'Drinks', rating: 4.9, orders: 187, status: 'approved' as Status },
  { id: '3', name: 'Venao Market', category: 'Grocery', rating: 4.6, orders: 312, status: 'approved' as Status },
  { id: '4', name: 'Zen Massage Venao', category: 'Massage', rating: 5.0, orders: 89, status: 'approved' as Status },
  { id: '5', name: 'El Rancho Hotel', category: 'Stay', rating: 0, orders: 0, status: 'pending' as Status },
  { id: '6', name: 'Venao Surf School', category: 'Surf', rating: 0, orders: 0, status: 'pending' as Status },
  { id: '7', name: 'Old Beach Bar', category: 'Drinks', rating: 3.2, orders: 12, status: 'suspended' as Status },
]

const statusConfig: Record<Status, { color: string; bg: string; label: string }> = {
  approved: { color: 'text-green-700', bg: 'bg-green-100', label: 'Approved' },
  pending: { color: 'text-yellow-700', bg: 'bg-yellow-100', label: 'Pending' },
  suspended: { color: 'text-red-700', bg: 'bg-red-100', label: 'Suspended' },
}

export default function AdminBusinesses() {
  const [businesses, setBusinesses] = useState(initialBusinesses)

  const updateStatus = (id: string, status: Status) => {
    setBusinesses(prev => prev.map(b => b.id === id ? { ...b, status } : b))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-gray-900">Businesses</h2>
        <span className="text-sm text-gray-500">{businesses.length} total</span>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {['Business', 'Category', 'Rating', 'Orders', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {businesses.map(b => {
                const s = statusConfig[b.status]
                return (
                  <tr key={b.id} className="hover:bg-gray-50 transition-all">
                    <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">{b.name}</td>
                    <td className="px-4 py-3 text-gray-600">{b.category}</td>
                    <td className="px-4 py-3">{b.rating > 0 ? `⭐ ${b.rating}` : '—'}</td>
                    <td className="px-4 py-3 text-gray-600">{b.orders}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${s.bg} ${s.color}`}>{s.label}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {b.status !== 'approved' && (
                          <button
                            onClick={() => updateStatus(b.id, 'approved')}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold hover:bg-green-200 transition-all"
                          >Approve</button>
                        )}
                        {b.status !== 'suspended' && (
                          <button
                            onClick={() => updateStatus(b.id, 'suspended')}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold hover:bg-red-200 transition-all"
                          >Suspend</button>
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
