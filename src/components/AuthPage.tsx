import { useState } from 'react'
import { useAuth } from '../data/dataAdapter'

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignup) {
        await signup(email, password, fullName)
      } else {
        await login(email, password)
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--fg)]">🌴 Yalla Venao</h1>
          <p className="text-[var(--fg-muted)] mt-2">Delivery & services in Playa Venao</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-4 py-3 rounded-xl bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--accent)] text-white font-semibold disabled:opacity-50"
          >
            {loading ? '...' : isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-[var(--fg-muted)] mt-4 text-sm">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => setIsSignup(!isSignup)} className="text-[var(--accent)] font-medium">
            {isSignup ? 'Log in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  )
}
