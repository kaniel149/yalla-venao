import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface OnboardingData {
  name: string
  phone: string
  vehicleType: string
  licensePlate: string
}

const VEHICLE_OPTIONS = [
  { value: 'motorcycle', label: '🏍️  Motorcycle' },
  { value: 'bicycle',    label: '🚲  Bicycle' },
  { value: 'foot',       label: '🚶  On foot' },
  { value: 'car',        label: '🚗  Car' },
]

export default function CourierOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<OnboardingData>({
    name: '',
    phone: '',
    vehicleType: 'motorcycle',
    licensePlate: '',
  })
  const navigate = useNavigate()

  function next() {
    setStep(s => s + 1)
  }

  function handleFinish() {
    localStorage.setItem('yv_courier_setup', JSON.stringify({ ...data, completedAt: Date.now() }))
    onComplete()
    navigate('/courier', { state: { online: true } })
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">

        {/* Header */}
        <div className="bg-[#1B4332] px-4 pt-12 pb-6">
          <p className="text-white/50 text-[10px] font-semibold uppercase tracking-widest mb-1">Courier Portal</p>
          <h1 className="serif text-white text-2xl">Yalla Venao</h1>
          <p className="text-white/70 text-sm mt-1">Join our courier team</p>

          {/* Step indicator */}
          <div className="flex gap-1.5 mt-5">
            {[1, 2, 3, 4].map(n => (
              <div
                key={n}
                className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                  n <= step ? 'bg-[#FF6B35]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wide mt-2">
            Step {step} of 4
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 px-4 py-6">

          {/* Step 1 — Who are you? */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="serif text-2xl text-gray-900 mb-1">Who are you?</h2>
                <p className="text-gray-500 text-sm">Tell us a bit about yourself</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                    Full name
                  </label>
                  <input
                    type="text"
                    value={data.name}
                    onChange={e => setData(d => ({ ...d, name: e.target.value }))}
                    placeholder="Miguel Hernández"
                    className="w-full bg-white rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 border border-gray-100 focus:outline-none focus:border-[#1B4332] text-sm font-medium transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                    WhatsApp number
                  </label>
                  <input
                    type="tel"
                    value={data.phone}
                    onChange={e => setData(d => ({ ...d, phone: e.target.value }))}
                    placeholder="+507 6XXX-XXXX"
                    className="w-full bg-white rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 border border-gray-100 focus:outline-none focus:border-[#1B4332] text-sm font-medium transition-colors"
                  />
                </div>

                <div className="bg-white rounded-xl px-4 py-3 border border-gray-100 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-700">Profile photo</p>
                    <p className="text-[11px] text-gray-400">You can add a photo later</p>
                  </div>
                </div>
              </div>

              <button
                onClick={next}
                disabled={!data.name.trim() || !data.phone.trim()}
                className="w-full py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                Continue →
              </button>
            </div>
          )}

          {/* Step 2 — Your vehicle */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="serif text-2xl text-gray-900 mb-1">Your vehicle</h2>
                <p className="text-gray-500 text-sm">How will you be making deliveries?</p>
              </div>

              <div className="space-y-2">
                {VEHICLE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setData(d => ({ ...d, vehicleType: opt.value }))}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 text-left transition-all ${
                      data.vehicleType === opt.value
                        ? 'border-[#1B4332] bg-[#1B4332]/5 text-[#1B4332]'
                        : 'border-gray-100 bg-white text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{opt.label.split('  ')[0]}</span>
                    <span className="font-semibold text-sm">{opt.label.split('  ')[1]}</span>
                    {data.vehicleType === opt.value && (
                      <svg className="ml-auto" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">
                  License plate <span className="text-gray-300 font-normal normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={data.licensePlate}
                  onChange={e => setData(d => ({ ...d, licensePlate: e.target.value }))}
                  placeholder="AAA-000"
                  className="w-full bg-white rounded-xl px-4 py-3 text-gray-900 placeholder-gray-300 border border-gray-100 focus:outline-none focus:border-[#1B4332] text-sm font-medium transition-colors"
                />
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setStep(1)}
                  className="w-12 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="flex-1 py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — How you'll earn */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="serif text-2xl text-gray-900 mb-1">How you'll earn</h2>
                <p className="text-gray-500 text-sm">Transparent pay — no surprises</p>
              </div>

              <div className="bg-white rounded-2xl p-5 space-y-4 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#1B4332]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Base pay per delivery</p>
                    <p className="text-2xl font-bold text-[#1B4332] mt-0.5">$4 – $8</p>
                    <p className="text-xs text-gray-400 mt-0.5">Based on distance & order size</p>
                  </div>
                </div>

                <div className="border-t border-gray-50" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Tips</p>
                    <p className="text-2xl font-bold text-[#FF6B35] mt-0.5">100% yours</p>
                    <p className="text-xs text-gray-400 mt-0.5">Customers can tip via app or cash</p>
                  </div>
                </div>

                <div className="border-t border-gray-50" />

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">Payout</p>
                    <p className="text-sm font-semibold text-blue-600 mt-0.5">Every Sunday</p>
                    <p className="text-xs text-gray-400 mt-0.5">Via YAPPY transfer or cash pickup</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1B4332]/5 rounded-xl px-4 py-3">
                <p className="text-xs text-[#1B4332] font-medium">
                  💡 Most couriers in Venao earn <strong>$40–$80/day</strong> on busy beach days
                </p>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-12 py-4 bg-gray-100 text-gray-500 rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="flex-1 py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm transition-all active:scale-95"
                >
                  I understand →
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Ready! */}
          {step === 4 && (
            <div className="flex flex-col items-center text-center pt-4 space-y-4">
              <div className="w-24 h-24 bg-[#1B4332] rounded-full flex items-center justify-center mb-2">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>

              <div>
                <h2 className="serif text-3xl text-gray-900 mb-2">You're set!</h2>
                <p className="text-gray-600 text-base font-medium">Start earning in Venao.</p>
                <p className="text-gray-400 text-sm mt-1">Go online anytime to receive orders</p>
              </div>

              <div className="bg-white rounded-2xl p-4 w-full border border-gray-100 text-left space-y-2 mt-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]" />
                  <p className="text-sm text-gray-700">
                    Courier: <span className="font-bold">{data.name}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]" />
                  <p className="text-sm text-gray-700">
                    Vehicle: <span className="font-bold capitalize">{VEHICLE_OPTIONS.find(v => v.value === data.vehicleType)?.label.split('  ')[1]}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#1B4332]" />
                  <p className="text-sm text-gray-700">
                    WhatsApp: <span className="font-bold">{data.phone}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full py-4 bg-[#FF6B35] text-white rounded-2xl font-bold text-base transition-all active:scale-95 shadow-lg shadow-orange-200 mt-2"
              >
                🚀  Go online now
              </button>

              <p className="text-xs text-gray-400">
                You can always go offline from the dashboard
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
