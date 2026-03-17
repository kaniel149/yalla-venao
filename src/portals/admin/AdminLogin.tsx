import { useState } from 'react'

interface Props {
  onAuth: () => void
}

export default function AdminLogin({ onAuth }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      localStorage.setItem('yv_admin_auth', 'true')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#1B4332] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Enter PIN to continue</p>
        </div>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="Enter PIN"
          autoFocus
          className={`w-full border-2 rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-[0.3em] outline-none transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1B4332]'
          }`}
        />
        {error && <p className="text-red-500 text-xs text-center mt-2 font-medium">Wrong PIN</p>}
        <button
          type="submit"
          className="w-full mt-4 py-3.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#152E24] transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
