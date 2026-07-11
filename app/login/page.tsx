'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Logo from '@/components/Logo'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user, loading: authLoading, login } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!authLoading && user) {
      router.push('/')
    }
  }, [user, authLoading, router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (res.ok) {
        login(data.user)
        router.push('/')
        router.refresh()
      } else {
        setError(data.error || 'Đăng nhập không thành công')
      }
    } catch {
      setError('Đã xảy ra lỗi kết nối')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '440px', padding: '40px', background: 'var(--glass)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-card)', backdropFilter: 'blur(20px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '16px' }}>
            <Logo size={48} />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-primary)' }}>Chào mừng trở lại!</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '6px' }}>Đăng nhập để lưu tiến trình học tập của bạn</p>
        </div>


        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.88rem', marginBottom: '20px', textAlign: 'center' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</label>
            <input
              type="email"
              className="search-input"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Mật khẩu</label>
            <input
              type="password"
              className="search-input"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '14px', marginTop: '8px' }}
            disabled={loading}
          >
            {loading ? '⏳ Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          Chưa có tài khoản?{' '}
          <Link href="/register" style={{ color: 'var(--primary-light)', fontWeight: '700', textDecoration: 'none' }}>
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  )
}
