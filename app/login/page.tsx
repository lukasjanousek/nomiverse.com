'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/')
      router.refresh()
    } else {
      setError('Incorrect password')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top left, #152145 0%, #0b1020 45%, #060914 100%)' }}>
      <div style={{ padding: '48px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '22px', maxWidth: '420px', width: '90%', backdropFilter: 'blur(12px)' }}>
        <img src="/nomiverse-white.png" alt="Nomiverse" style={{ height: '48px', marginBottom: '24px', display: 'block' }} />
        <h1 style={{ margin: '0 0 8px 0', color: '#f3f6ff', fontSize: '28px', letterSpacing: '-0.03em' }}>Budujeme RV Infrastructure Platform pro CEE</h1>
        <p style={{ margin: '0 0 32px 0', color: '#a8b2d1', fontSize: '15px' }}>Enter password to view the investor deck.</p>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus style={{ width: '100%', padding: '14px 16px', marginBottom: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)', color: '#f3f6ff', fontSize: '16px', outline: 'none', boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#fca5a5', fontSize: '14px', margin: '0 0 12px 0' }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #7dd3fc, #a78bfa)', color: '#0b1020', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '15px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Verifying...' : 'Access Deck'}
          </button>
        </form>
      </div>
    </div>
  )
}
