'use client'
import React, { useEffect, useState, useCallback } from 'react'
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
  { value: 'n', label: 'Danh từ (n)' },
  { value: 'v', label: 'Động từ (v)' },
  { value: 'adj', label: 'Tính từ (adj)' },
  { value: 'adv', label: 'Trạng từ (adv)' },
  { value: 'prep', label: 'Giới từ (prep)' },
  { value: 'conj', label: 'Liên từ (conj)' },
]

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Form states
  const [word, setWord] = useState('')
  const [type, setType] = useState('n')
  const [phonetic, setPhonetic] = useState('')
  const [meaning, setMeaning] = useState('')
  const [editId, setEditId] = useState<string | null>(null)

  // List states
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const LIMIT = 10

  const fetchWords = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
        search,
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
  }, [page, search])

  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== 'admin') {
        router.push('/')
      } else {
        fetchWords()
      }
    }
  }, [user, authLoading, router, fetchWords])

  const [activeTab, setActiveTab] = useState<'crud' | 'json'>('crud')
  const [jsonInput, setJsonInput] = useState('')
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [jsonLoading, setJsonLoading] = useState(false)

  // Reset page when searching
  useEffect(() => {
    setPage(1)
  }, [search])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!word || !meaning) return

    const url = '/api/words'
    const method = editId ? 'PUT' : 'POST'
    const payload = editId
      ? { id: editId, word, type, phonetic, meaning }
      : { word, type, phonetic, meaning }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        // Reset form
        setWord('')
        setPhonetic('')
        setMeaning('')
        setEditId(null)
        // Reload list
        fetchWords()
      } else {
        alert(data.error || 'Đã xảy ra lỗi')
      }
    } catch {
      alert('Không thể kết nối API')
    }
  }

  async function handleJsonImport() {
    if (!jsonInput.trim()) {
      setJsonError('Vui lòng nhập dữ liệu JSON')
      return
    }

    setJsonError(null)
    setJsonLoading(true)

    try {
      let parsed
      try {
        parsed = JSON.parse(jsonInput)
        if (!Array.isArray(parsed)) {
          throw new Error('Dữ liệu JSON phải là một mảng [] chứa các đối tượng từ vựng')
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'JSON không đúng định dạng'
        setJsonError(`Lỗi cú pháp JSON: ${errorMsg}`)
        setJsonLoading(false)
        return
      }

      const res = await fetch('/api/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'import_json',
          jsonData: parsed
        })
      })

      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        setJsonInput('')
        fetchWords()
      } else {
        setJsonError(data.error || 'Lỗi không rõ khi nhập JSON')
      }
    } catch {
      setJsonError('Không thể kết nối với máy chủ')
    } finally {
      setJsonLoading(false)
    }
  }

  function handleEdit(w: Word) {
    setEditId(w._id)
    setWord(w.word)
    setType(w.type)
    setPhonetic(w.phonetic || '')
    setMeaning(w.meaning)
    setActiveTab('crud')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc chắn muốn xóa từ vựng này không?')) return

    try {
      const res = await fetch(`/api/words?id=${id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (res.ok) {
        alert(data.message)
        fetchWords()
      } else {
        alert(data.error || 'Lỗi khi xóa từ vựng')
      }
    } catch {
      alert('Không thể kết nối API')
    }
  }

  function cancelEdit() {
    setEditId(null)
    setWord('')
    setPhonetic('')
    setMeaning('')
  }

  if (authLoading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang kiểm tra quyền truy cập...</p>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null // Redirecting
  }

  return (
    <div className="vocab-container animate-fade-up">
      {/* Top action header for Admin */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 className="section-title" style={{ margin: 0 }}>⚙️ Quản Trị Từ Vựng</h1>
          <p className="section-sub" style={{ margin: 0 }}>Thêm mới, sửa đổi hoặc nhập hàng loạt từ vựng vào hệ thống</p>
        </div>
      </div>

      {/* View switcher tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <button
          className={`btn ${activeTab === 'crud' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('crud')}
        >
          ➕ Thêm thủ công / Chỉnh sửa
        </button>
        <button
          className={`btn ${activeTab === 'json' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('json')}
        >
          📂 Nhập từ vựng bằng JSON
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '32px', alignItems: 'start' }} className="tips-layout">
        
        {/* Left Side: CRUD Form or JSON Importer */}
        <div>
          {activeTab === 'crud' ? (
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px', color: 'var(--primary)' }}>
                {editId ? '📝 Cập nhật từ vựng' : '🚀 Thêm từ vựng mới'}
              </h2>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Từ tiếng Anh</label>
                  <input
                    type="text"
                    className="search-input"
                    style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                    placeholder="Ví dụ: accept"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Từ loại</label>
                    <select
                      className="filter-select"
                      style={{ width: '100%', height: '48px' }}
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      {TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Phiên âm</label>
                    <input
                      type="text"
                      className="search-input"
                      style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                      placeholder="/əkˈsept/"
                      value={phonetic}
                      onChange={(e) => setPhonetic(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Nghĩa tiếng Việt</label>
                  <input
                    type="text"
                    className="search-input"
                    style={{ width: '100%', borderRadius: 'var(--radius-sm)' }}
                    placeholder="Ví dụ: chấp nhận, chấp thuận"
                    value={meaning}
                    onChange={(e) => setMeaning(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {editId ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                  {editId && (
                    <button type="button" className="btn btn-ghost" onClick={cancelEdit}>
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="card">
              <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '12px', color: 'var(--primary)' }}>
                📂 Nhập từ vựng bằng JSON
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
                Dán danh sách từ vựng dạng mảng JSON dưới đây để lưu hàng loạt từ mới vào hệ thống. Số thứ tự (stt) sẽ tự động được gán tiếp nối.
              </p>

              {jsonError && (
                <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '12px', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', marginBottom: '16px' }}>
                  ⚠️ {jsonError}
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <textarea
                  className="search-input"
                  style={{ width: '100%', height: '240px', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: '1.4', resize: 'vertical' }}
                  placeholder={`[\n  {\n    "word": "ability",\n    "type": "n",\n    "phonetic": "/əˈbɪl.ə.t̬i/",\n    "meaning": "năng lực, khả năng"\n  }\n]`}
                  value={jsonInput}
                  onChange={(e) => {
                    setJsonInput(e.target.value)
                    setJsonError(null)
                  }}
                />

                <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <strong>Yêu cầu cấu trúc đối tượng:</strong>
                  <ul style={{ paddingLeft: '16px', marginTop: '6px', listStyleType: 'disc' }}>
                    <li><code style={{ color: 'var(--accent)' }}>word</code>: Chuỗi văn bản tiếng Anh (Bắt buộc)</li>
                    <li><code style={{ color: 'var(--accent)' }}>type</code>: Chuỗi loại từ (n, v, adj, adv, prep...) (Bắt buộc)</li>
                    <li><code style={{ color: 'var(--accent)' }}>meaning</code>: Chuỗi định nghĩa tiếng Việt (Bắt buộc)</li>
                    <li><code style={{ color: 'var(--accent)' }}>phonetic</code>: Chuỗi phiên âm (Tùy chọn)</li>
                  </ul>
                </div>

                <button
                  onClick={handleJsonImport}
                  className="btn btn-primary"
                  disabled={jsonLoading}
                  style={{ width: '100%' }}
                >
                  {jsonLoading ? 'Đang nhập từ vựng...' : '📥 Thực hiện nhập JSON'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: List & Search View */}
        <div>
          <div style={{ marginBottom: '16px' }}>
            <input
              type="text"
              className="search-input"
              style={{ width: '100%' }}
              placeholder="🔍 Tìm nhanh từ vựng để sửa/xóa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {loading ? (
            <div className="loading-center" style={{ padding: '60px 0' }}>
              <div className="spinner" />
            </div>
          ) : words.length === 0 ? (
            <div className="empty-state">
              <div className="empty-title">Không tìm thấy từ nào</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', paddingLeft: '4px' }}>
                Tổng cộng: <strong>{total}</strong> từ vựng hệ thống
              </div>
              {words.map((w) => (
                <div key={w._id} className="card" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '800', color: 'var(--primary-light)' }}>{w.word}</span>
                      <span className="badge badge-purple" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>{w.type}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {w.meaning}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => handleEdit(w)}>✏️</button>
                    <button className="btn btn-danger btn-sm" style={{ padding: '8px 12px' }} onClick={() => handleDelete(w._id)}>🗑️</button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination" style={{ marginTop: '16px' }}>
                  <button className="page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Trang {page}/{totalPages}</span>
                  <button className="page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


