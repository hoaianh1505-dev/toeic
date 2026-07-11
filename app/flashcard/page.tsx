'use client'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

interface Word {
  _id: string
  stt: number
  word: string
  type: string
  phonetic: string
  meaning: string
}

interface ProgressMap {
  [wordId: string]: 'known' | 'unknown' | 'learning'
}

export default function FlashCardPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [words, setWords] = useState<Word[]>([])
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState<ProgressMap>({})
  const [filter, setFilter] = useState<'all' | 'learning' | 'unknown'>('all')

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])


  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/words?limit=1000')
      const data = await res.json()

      const progressRes = await fetch('/api/progress')
      const progressData = await progressRes.json()

      const progressMap: ProgressMap = {}
      ;(progressData.progress || []).forEach((p: { wordId: string; status: 'known' | 'unknown' | 'learning' }) => {
        progressMap[p.wordId] = p.status
      })
      setProgress(progressMap)

      let filtered = data.words || []
      if (filter === 'learning') {
        filtered = filtered.filter((w: Word) => !progressMap[w._id] || progressMap[w._id] === 'learning')
      } else if (filter === 'unknown') {
        filtered = filtered.filter((w: Word) => progressMap[w._id] === 'unknown')
      }

      // Shuffle
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      setWords(shuffled)
      setCurrent(0)
      setFlipped(false)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  async function markWord(status: 'known' | 'unknown') {
    const word = words[current]
    if (!word) return

    // Update local progress
    setProgress((prev) => ({ ...prev, [word._id]: status }))

    // Save to DB
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wordId: word._id, word: word.word, status }),
    })

    // Move to next
    if (current < words.length - 1) {
      setCurrent((c) => c + 1)
      setFlipped(false)
    }
  }

  function goNext() {
    if (current < words.length - 1) {
      setCurrent((c) => c + 1)
      setFlipped(false)
    }
  }

  function goPrev() {
    if (current > 0) {
      setCurrent((c) => c - 1)
      setFlipped(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang tải từ vựng...</p>
      </div>
    )
  }

  if (words.length === 0) {
    return (
      <div className="flashcard-container">
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">Không có từ vựng</div>
          <div className="empty-sub">
            {filter !== 'all'
              ? 'Không có từ nào trong bộ lọc này. Hãy thử bộ lọc khác.'
              : 'Chưa có dữ liệu. Hãy seed dữ liệu từ trang Dashboard.'}
          </div>
          <Link href="/" className="btn btn-primary">← Về Dashboard</Link>
        </div>
      </div>
    )
  }

  const word = words[current]
  const wordProgress = progress[word._id]
  const progressPercent = Math.round(((current + 1) / words.length) * 100)

  return (
    <div className="flashcard-container">
      {/* Header */}
      <div className="flashcard-header">
        <div>
          <h1 className="section-title" style={{ fontSize: '1.3rem' }}>🃏 Flash Card</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {current + 1} / {words.length} từ
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            id="filter-select"
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'learning' | 'unknown')}
          >
            <option value="all">📚 Tất cả</option>
            <option value="learning">📖 Chưa học</option>
            <option value="unknown">❌ Chưa thuộc</option>
          </select>
          <button className="btn btn-ghost btn-sm" onClick={() => fetchWords()}>🔀 Shuffle</button>
        </div>
      </div>

      {/* Progress */}
      <div className="flashcard-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ✅ {Object.values(progress).filter(s => s === 'known').length} đã thuộc
          </span>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{progressPercent}%</span>
        </div>
      </div>

      {/* Flash Card */}
      <div
        className="flashcard-scene"
        onClick={() => setFlipped(!flipped)}
        role="button"
        aria-label="Click để lật thẻ"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? setFlipped(!flipped) : null}
        id="flashcard"
      >
        <div className={`flashcard-inner ${flipped ? 'flipped' : ''}`}>
          {/* Front */}
          <div className="flashcard-face flashcard-front">
            <div style={{ marginBottom: '16px' }}>
              <span className={`badge ${
                wordProgress === 'known' ? 'badge-green' :
                wordProgress === 'unknown' ? 'badge-red' : 'badge-purple'
              }`}>
                {wordProgress === 'known' ? '✅ Đã thuộc' :
                 wordProgress === 'unknown' ? '❌ Chưa thuộc' : '📖 Chưa học'}
              </span>
            </div>
            <div className="card-word">{word.word}</div>
            <div className="card-phonetic">{word.phonetic}</div>
            <div className="card-type-badge">{word.type}</div>
            <div className="card-flip-hint">👆 Click để xem nghĩa</div>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <div style={{ marginBottom: '8px' }}>
              <span className="badge badge-blue">{word.type}</span>
            </div>
            <div className="card-word" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)' }}>
              {word.word}
            </div>
            <div className="card-phonetic">{word.phonetic}</div>
            <div className="card-meaning">{word.meaning}</div>
            <div className="card-flip-hint">👆 Click để lật lại</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flashcard-actions">
        <button
          id="prev-btn"
          className="btn btn-ghost"
          onClick={goPrev}
          disabled={current === 0}
        >
          ← Trước
        </button>

        <button
          id="unknown-btn"
          className="btn btn-danger"
          onClick={() => markWord('unknown')}
        >
          ❌ Chưa thuộc
        </button>

        <button
          id="known-btn"
          className="btn btn-success"
          onClick={() => markWord('known')}
        >
          ✅ Đã thuộc
        </button>

        <button
          id="next-btn"
          className="btn btn-ghost"
          onClick={goNext}
          disabled={current === words.length - 1}
        >
          Tiếp →
        </button>
      </div>

      {/* Keyboard hint */}
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '16px', textAlign: 'center' }}>
        💡 Bấm Space hoặc Enter để lật thẻ
      </p>
    </div>
  )
}
