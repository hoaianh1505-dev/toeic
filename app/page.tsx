'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

interface Stats {
  known: number
  unknown: number
  learning: number
}

export default function HomePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({ known: 0, unknown: 0, learning: 0 })
  const [totalWords, setTotalWords] = useState(0)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    } else if (user) {
      fetchData()
    }
  }, [user, authLoading, router])


  async function fetchData() {
    try {
      const [wordsRes, progressRes] = await Promise.all([
        fetch('/api/words?limit=1'),
        fetch('/api/progress'),
      ])
      const wordsData = await wordsRes.json()
      const progressData = await progressRes.json()
      setTotalWords(wordsData.total || 0)
      setStats(progressData.stats || { known: 0, unknown: 0, learning: 0 })
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleSeed() {
    setSeeding(true)
    setSeedMsg('')
    try {
      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' }),
      })
      const data = await res.json()
      setSeedMsg(data.message || 'Done!')
      await fetchData()
    } catch {
      setSeedMsg('Lỗi khi seed dữ liệu')
    } finally {
      setSeeding(false)
    }
  }

  const knownPercent = totalWords > 0 ? Math.round((stats.known / totalWords) * 100) : 0
  const studiedTotal = stats.known + stats.unknown + stats.learning

  return (
    <div className="container">
      <section className="dashboard-hero animate-fade-up">
        <div className="hero-badge">
          <span>🎯</span>
          <span>TOEIC Vocabulary Master</span>
        </div>
        <h1 className="hero-title">
          Học từ vựng TOEIC<br />hiệu quả & thú vị
        </h1>
        <p className="hero-subtitle">
          1000+ từ vựng TOEIC chuẩn với Flash Card 3D, trắc nghiệm thông minh
          và theo dõi tiến độ học tập của bạn.
        </p>

        {/* Seed button nếu chưa có data */}
        {!loading && totalWords === 0 && (
          <div style={{ marginBottom: '32px' }}>
            <button
              id="seed-btn"
              className="btn btn-primary btn-lg"
              onClick={handleSeed}
              disabled={seeding}
            >
              {seeding ? '⏳ Đang tải dữ liệu...' : '🚀 Khởi tạo 1000 từ vựng TOEIC'}
            </button>
            {seedMsg && (
              <p style={{ marginTop: '12px', color: 'var(--success)', fontSize: '0.9rem' }}>
                ✅ {seedMsg}
              </p>
            )}
          </div>
        )}

        {seedMsg && totalWords > 0 && (
          <p style={{ color: 'var(--success)', marginBottom: '20px', fontSize: '0.9rem' }}>
            ✅ {seedMsg}
          </p>
        )}
      </section>

      {/* Stats */}
      <div className="stats-grid animate-fade-up">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-number">{loading ? '...' : totalWords.toLocaleString()}</div>
          <div className="stat-label">Tổng từ vựng</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-number" style={{ color: 'var(--success)' }}>
            {loading ? '...' : stats.known}
          </div>
          <div className="stat-label">Đã thuộc</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📖</div>
          <div className="stat-number" style={{ color: 'var(--warning)' }}>
            {loading ? '...' : stats.learning}
          </div>

          <div className="stat-label">Đang học</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-number">{loading ? '...' : `${knownPercent}%`}</div>
          <div className="stat-label">Hoàn thành</div>
        </div>
      </div>

      {/* Progress bar */}
      {!loading && totalWords > 0 && (
        <div style={{ maxWidth: '600px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Tiến độ tổng thể
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--primary-light)' }}>
              {stats.known}/{totalWords} từ
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${knownPercent}%` }} />
          </div>
        </div>
      )}

      {/* Feature cards */}
      <div className="features-grid animate-fade-up">
        <Link
          href="/flashcard"
          id="flashcard-link"
          className="feature-card"
          style={{ '--glow-color': 'rgba(108,99,255,0.12)' } as React.CSSProperties}
        >
          <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.3), rgba(108,99,255,0.1))' }}>
            🃏
          </div>
          <div>
            <div className="feature-title">Flash Card</div>
            <div className="feature-desc">
              Học từ vựng qua thẻ lật 3D. Click để lật và xem nghĩa, đánh dấu đã biết hoặc cần ôn thêm.
            </div>
          </div>
          <div className="feature-cta" style={{ color: 'var(--primary-light)' }}>
            Bắt đầu học →
          </div>
        </Link>

        <Link
          href="/quiz"
          id="quiz-link"
          className="feature-card"
          style={{ '--glow-color': 'rgba(14,165,233,0.12)' } as React.CSSProperties}
        >
          <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(14,165,233,0.3), rgba(14,165,233,0.1))' }}>
            📝
          </div>
          <div>
            <div className="feature-title">Trắc Nghiệm</div>
            <div className="feature-desc">
              10 câu hỏi ngẫu nhiên với 4 đáp án. Kiểm tra kiến thức từ vựng và xem điểm số của bạn.
            </div>
          </div>
          <div className="feature-cta" style={{ color: 'var(--accent-light)' }}>
            Làm bài ngay →
          </div>
        </Link>

        <Link
          href="/vocabulary"
          id="vocab-link"
          className="feature-card"
          style={{ '--glow-color': 'rgba(16,185,129,0.12)' } as React.CSSProperties}
        >
          <div className="feature-icon" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))' }}>
            📚
          </div>
          <div>
            <div className="feature-title">Danh Sách Từ Vựng</div>
            <div className="feature-desc">
              Xem toàn bộ 1000 từ vựng TOEIC. Tìm kiếm, lọc theo từ loại và tra cứu nhanh.
            </div>
          </div>
          <div className="feature-cta" style={{ color: '#34D399' }}>
            Xem từ vựng →
          </div>
        </Link>
      </div>

      {/* Study tips teaser */}
      <div className="card" style={{ marginBottom: '60px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '12px' }}>💡</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px' }}>
          Mẹo học TOEIC hiệu quả
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Học đều đặn mỗi ngày 20-30 từ. Ôn lại các từ chưa thuộc bằng Flash Card, kiểm tra bằng Quiz.
        </p>
      </div>
    </div>
  )
}
