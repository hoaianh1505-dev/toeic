'use client'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

interface Word {
  _id: string
  stt: number
  word: string
  type: string
  phonetic: string
  meaning: string
  page: number
}

const TYPE_OPTIONS = [
  { value: '', label: 'Tất cả từ loại' },
  { value: 'n', label: 'Danh từ (n)' },
  { value: 'v', label: 'Động từ (v)' },
  { value: 'adj', label: 'Tính từ (adj)' },
  { value: 'adv', label: 'Trạng từ (adv)' },
  { value: 'prep', label: 'Giới từ (prep)' },
]

const TYPE_LABELS: Record<string, string> = {
  n: 'Danh từ', v: 'Động từ', adj: 'Tính từ',
  adv: 'Trạng từ', prep: 'Giới từ', conj: 'Liên từ',
}

function getTypeBadgeClass(type: string): string {
  if (type.includes('n')) return 'badge-blue'
  if (type.includes('v')) return 'badge-green'
  if (type.includes('adj')) return 'badge-yellow'
  if (type.includes('adv')) return 'badge-purple'
  return 'badge-blue'
}

export default function VocabularyPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 20

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])


  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        search,
        type: typeFilter,
      })
      const res = await fetch(`/api/words?${params}`)
      const data = await res.json()
      setWords(data.words || [])
      setTotalPages(data.totalPages || 1)
      setTotal(data.total || 0)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [page, search, typeFilter])

  useEffect(() => {
    fetchWords()
  }, [fetchWords])

  // Reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [search, typeFilter])

  const pageNumbers = () => {
    const pages = []
    const start = Math.max(1, page - 2)
    const end = Math.min(totalPages, page + 2)
    for (let i = start; i <= end; i++) pages.push(i)
    return pages
  }

  return (
    <div className="vocab-container">
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 className="section-title">📚 Danh Sách Từ Vựng TOEIC</h1>
        <p className="section-sub">
          {total > 0 ? `${total.toLocaleString()} từ vựng` : 'Đang tải...'} — Tìm kiếm và lọc theo từ loại
        </p>
      </div>

      {/* Filters */}
      <div className="vocab-filters">
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="🔍 Tìm từ hoặc nghĩa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          id="type-filter"
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-center">
          <div className="spinner" />
          <p>Đang tải từ vựng...</p>
        </div>
      ) : words.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <div className="empty-title">Không tìm thấy từ nào</div>
          <div className="empty-sub">Thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc</div>
          <button className="btn btn-ghost" onClick={() => { setSearch(''); setTypeFilter('') }}>
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <>
          <table className="vocab-table" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th style={{ width: '180px' }}>Từ vựng</th>
                <th style={{ width: '130px' }}>Từ loại</th>
                <th style={{ width: '180px' }}>Phiên âm</th>
                <th style={{ width: 'auto' }}>Nghĩa tiếng Việt</th>
              </tr>
            </thead>

            <tbody>
              {words.map((word) => (
                <tr key={word._id} id={`word-${word.stt}`}>
                  <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {word.stt}
                  </td>
                  <td className="word-cell">{word.word}</td>
                  <td>
                    <span className={`badge ${getTypeBadgeClass(word.type)}`}>
                      {TYPE_LABELS[word.type] || word.type}
                    </span>
                  </td>
                  <td className="phonetic-cell">{word.phonetic}</td>
                  <td style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>
                    {word.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => setPage(1)}
                disabled={page === 1}
                aria-label="Trang đầu"
              >
                «
              </button>
              <button
                className="page-btn"
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                aria-label="Trang trước"
              >
                ‹
              </button>

              {pageNumbers().map((p) => (
                <button
                  key={p}
                  id={`page-${p}`}
                  className={`page-btn ${p === page ? 'active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}

              <button
                className="page-btn"
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                aria-label="Trang sau"
              >
                ›
              </button>
              <button
                className="page-btn"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}
                aria-label="Trang cuối"
              >
                »
              </button>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: '16px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Trang {page} / {totalPages} — Hiển thị {words.length} / {total} từ
          </p>
        </>
      )}
    </div>
  )
}
