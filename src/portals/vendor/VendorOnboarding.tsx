import { useState } from 'react'

const STORAGE_KEY = 'yv_vendor_setup'

type SetupData = {
  step: number
  businessName: string
  category: string
  whatsapp: string
  description: string
  openTime: string
  closeTime: string
  location: string
}

const defaultData: SetupData = {
  step: 1,
  businessName: '',
  category: '',
  whatsapp: '',
  description: '',
  openTime: '8am',
  closeTime: '6pm',
  location: '',
}

const timeOptions = ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm','12am']
const categories = ['Food', 'Drinks', 'Grocery', 'Wellness', 'Surf']

type Props = { onComplete: () => void }

export default function VendorOnboarding({ onComplete }: Props) {
  const [data, setData] = useState<SetupData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : defaultData
    } catch {
      return defaultData
    }
  })

  const save = (updates: Partial<SetupData>) => {
    const next = { ...data, ...updates }
    setData(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  const nextStep = () => save({ step: data.step + 1 })
  const prevStep = () => save({ step: data.step - 1 })

  const finish = () => {
    save({ step: 3 })
    onComplete()
  }

  const step = data.step

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-[#1B4332] px-4 pt-12 pb-6 text-center">
          <p className="text-white/60 text-[10px] font-semibold uppercase tracking-widest mb-1">Vendor Portal</p>
          <h1 className="text-white text-2xl font-bold">Yalla Venao</h1>
          <p className="text-white/70 text-sm mt-1">Set up your business</p>
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 py-5">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                s <= step ? 'bg-[#1B4332]' : 'bg-gray-300'
              } ${s === step ? 'scale-125' : ''}`}
            />
          ))}
        </div>

        {/* Step content */}
        <div className="flex-1 px-4 pb-8">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="card p-5 space-y-4">
              <div>
                <p className="text-xs font-bold text-[#1B4332] uppercase tracking-widest mb-1">Step 1 of 3</p>
                <h2 className="text-xl font-bold text-gray-900">About your business</h2>
                <p className="text-sm text-gray-500 mt-1">Tell us a bit about what you offer</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Business name</label>
                <input
                  type="text"
                  value={data.businessName}
                  onChange={e => save({ businessName: e.target.value })}
                  placeholder="e.g. Venao Beach Bites"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Category</label>
                <select
                  value={data.category}
                  onChange={e => save({ category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors bg-white"
                >
                  <option value="">Select a category...</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">WhatsApp number</label>
                <input
                  type="tel"
                  value={data.whatsapp}
                  onChange={e => save({ whatsapp: e.target.value })}
                  placeholder="+507 6XXX-XXXX"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                  Description
                  <span className="text-gray-400 font-normal ml-1">({data.description.length}/120)</span>
                </label>
                <textarea
                  rows={3}
                  value={data.description}
                  maxLength={120}
                  onChange={e => save({ description: e.target.value })}
                  placeholder="What makes your business special..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors resize-none"
                />
              </div>

              <button
                onClick={nextStep}
                disabled={!data.businessName.trim() || !data.category}
                className="w-full py-3.5 bg-[#1B4332] text-white rounded-xl font-bold text-sm disabled:opacity-40 transition-opacity"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="card p-5 space-y-4">
              <div>
                <p className="text-xs font-bold text-[#1B4332] uppercase tracking-widest mb-1">Step 2 of 3</p>
                <h2 className="text-xl font-bold text-gray-900">Hours & Location</h2>
                <p className="text-sm text-gray-500 mt-1">When and where can customers find you?</p>
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Opens at</label>
                  <select
                    value={data.openTime}
                    onChange={e => save({ openTime: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors bg-white"
                  >
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Closes at</label>
                  <select
                    value={data.closeTime}
                    onChange={e => save({ closeTime: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors bg-white"
                  >
                    {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Location in Venao</label>
                <input
                  type="text"
                  value={data.location}
                  onChange={e => save({ location: e.target.value })}
                  placeholder="e.g. near El Sitio Hotel"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1B4332] transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  onClick={prevStep}
                  className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  disabled={!data.location.trim()}
                  className="flex-1 py-3.5 bg-[#1B4332] text-white rounded-xl font-bold text-sm disabled:opacity-40 transition-opacity"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="card p-5 text-center space-y-5">
              <div>
                <p className="text-xs font-bold text-[#1B4332] uppercase tracking-widest mb-4">Step 3 of 3</p>
                <div className="w-20 h-20 bg-[#1B4332]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">You're almost ready!</h2>
                <p className="text-gray-500 text-sm mt-2">
                  <strong className="text-gray-700">{data.businessName || 'Your business'}</strong> is set up and ready to go.
                </p>
              </div>

              <div className="bg-[#F5F3EE] rounded-xl p-4 text-left">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-lg">📍</span>
                  <span>{data.location || 'Location set'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                  <span className="text-lg">🕐</span>
                  <span>{data.openTime} – {data.closeTime}</span>
                </div>
              </div>

              <button
                onClick={finish}
                className="w-full py-4 bg-[#1B4332] text-white rounded-xl font-bold text-sm"
              >
                Go to Dashboard
              </button>

              <p className="text-xs text-gray-400">You can add menu items from the Menu tab</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
