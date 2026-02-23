import { useState } from 'react'
import { businesses } from '../../data/dataAdapter'

type MenuItem = {
  id: string
  name: string
  price: number
  image: string
  description: string
  available: boolean
}

type ModalMode = 'add' | 'edit'

type ModalState = {
  open: boolean
  mode: ModalMode
  editId: string | null
  name: string
  price: string
  description: string
  available: boolean
}

const emptyModal = (): ModalState => ({
  open: false,
  mode: 'add',
  editId: null,
  name: '',
  price: '',
  description: '',
  available: true,
})

export default function VendorMenu() {
  const biz = businesses[0]
  const [items, setItems] = useState<MenuItem[]>(
    biz.products.map(p => ({ ...p, available: true }))
  )
  const [modal, setModal] = useState<ModalState>(emptyModal())

  const toggleAvailable = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, available: !item.available } : item))
  }

  const openAdd = () => {
    setModal({ ...emptyModal(), open: true, mode: 'add' })
  }

  const openEdit = (item: MenuItem) => {
    setModal({
      open: true,
      mode: 'edit',
      editId: item.id,
      name: item.name,
      price: String(item.price),
      description: item.description,
      available: item.available,
    })
  }

  const closeModal = () => setModal(emptyModal())

  const handleSubmit = () => {
    if (!modal.name.trim() || !modal.price) return
    if (modal.mode === 'add') {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: modal.name.trim(),
        price: parseFloat(modal.price),
        description: modal.description.trim(),
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
        available: modal.available,
      }
      setItems(prev => [...prev, newItem])
    } else if (modal.editId) {
      setItems(prev => prev.map(item =>
        item.id === modal.editId
          ? { ...item, name: modal.name.trim(), price: parseFloat(modal.price), description: modal.description.trim(), available: modal.available }
          : item
      ))
    }
    closeModal()
  }

  return (
    <div className="pb-24 pt-4 px-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900 text-xl">Menu Items</h2>
        <span className="text-sm text-gray-500">{items.filter(i => i.available).length}/{items.length} available</span>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => openEdit(item)}
            className={`card flex gap-3 p-3 transition-all cursor-pointer active:scale-[0.98] ${!item.available ? 'opacity-50' : ''}`}
          >
            <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                {/* Toggle */}
                <button
                  onClick={e => { e.stopPropagation(); toggleAvailable(item.id) }}
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
      <button
        onClick={openAdd}
        className="fixed bottom-24 right-4 w-14 h-14 bg-[#FF6B35] rounded-full flex items-center justify-center text-white text-3xl shadow-xl hover:bg-[#E85520] active:scale-90 transition-all z-40"
      >
        +
      </button>

      {/* Modal overlay */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-end"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-md mx-auto bg-white rounded-t-2xl p-6 pb-8 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Handle bar */}
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />

            <h3 className="font-bold text-gray-900 text-lg mb-5">
              {modal.mode === 'add' ? 'Add Menu Item' : 'Edit Menu Item'}
            </h3>

            <div className="space-y-4">
              {/* Item name */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Item name</label>
                <input
                  type="text"
                  value={modal.name}
                  onChange={e => setModal(m => ({ ...m, name: e.target.value }))}
                  placeholder="e.g. Venao Burger"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Price ($)</label>
                <input
                  type="number"
                  value={modal.price}
                  onChange={e => setModal(m => ({ ...m, price: e.target.value }))}
                  placeholder="0.00"
                  min="0"
                  step="0.50"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={modal.description}
                  onChange={e => setModal(m => ({ ...m, description: e.target.value }))}
                  placeholder="Short description..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors resize-none"
                />
              </div>

              {/* Available toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Available</span>
                <button
                  onClick={() => setModal(m => ({ ...m, available: !m.available }))}
                  className={`relative w-12 h-6 rounded-full transition-all duration-300 ${modal.available ? 'bg-[#1B4332]' : 'bg-gray-300'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${modal.available ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={closeModal}
                className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl text-sm font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 py-3 bg-[#1B4332] text-white rounded-xl text-sm font-bold"
              >
                {modal.mode === 'add' ? 'Add Item' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
