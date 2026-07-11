'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

// Static TOEIC Structure Data
const TOEIC_STRUCTURE = [
  { part: 'Part 1', name: 'Mô tả tranh (Photos)', items: '6 câu', type: 'Listening', time: 'Mặc định theo băng nghe', desc: 'Nghe và chọn câu mô tả đúng nhất cho bức ảnh.' },
  { part: 'Part 2', name: 'Hỏi - Đáp (Question - Response)', items: '25 câu', type: 'Listening', time: 'Mặc định theo băng nghe', desc: 'Nghe 1 câu hỏi và 3 câu trả lời, chọn đáp án đúng.' },
  { part: 'Part 3', name: 'Hội thoại ngắn (Short Conversations)', items: '39 câu', type: 'Listening', time: 'Mặc định theo băng nghe', desc: 'Nghe đoạn hội thoại giữa 2-3 người và trả lời 3 câu hỏi.' },
  { part: 'Part 4', name: 'Bài nói ngắn (Short Talks)', items: '30 câu', type: 'Listening', time: 'Mặc định theo băng nghe', desc: 'Nghe 1 người độc thoại và trả lời 3 câu hỏi liên quan.' },
  { part: 'Part 5', name: 'Hoàn thành câu (Incomplete Sentences)', items: '30 câu', type: 'Reading', time: 'Khuyên dùng: 10 - 12 phút', desc: 'Chọn đáp án đúng nhất để hoàn thành ngữ pháp hoặc từ vựng.' },
  { part: 'Part 6', name: 'Hoàn thành đoạn văn (Text Completion)', items: '16 câu', type: 'Reading', time: 'Khuyên dùng: 6 - 8 phút', desc: 'Điền từ, cụm từ hoặc câu vào chỗ trống trong đoạn văn.' },
  { part: 'Part 7', name: 'Đọc hiểu đoạn văn (Reading Comprehension)', items: '54 câu', type: 'Reading', time: 'Khuyên dùng: 50 - 55 phút', desc: 'Đọc các đoạn văn đơn, đôi hoặc ba và trả lời câu hỏi.' },
]

export default function TipsPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang tải cấu trúc đề thi...</p>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="vocab-container animate-fade-up">
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 className="section-title">📊 Cấu Trúc Đề Thi TOEIC</h1>
        <p className="section-sub">Phân tích chi tiết số câu hỏi, thời gian phân bổ khuyên dùng và kỹ năng cho từng phần thi.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Main structure table */}
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '20px', color: 'var(--primary)' }}>
            📝 Chi tiết 7 phần thi (Listening & Reading)
          </h2>
          
          <div className="vocab-table-wrapper">
            <table className="vocab-table" style={{ tableLayout: 'fixed', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ width: '80px', whiteSpace: 'nowrap' }}>Phần</th>
                  <th style={{ width: '220px' }}>Dạng bài thi</th>
                  <th style={{ width: '110px', whiteSpace: 'nowrap' }}>Số câu hỏi</th>
                  <th style={{ width: '115px' }}>Kỹ năng</th>
                  <th style={{ width: '190px' }}>Phân bổ thời gian</th>
                  <th style={{ width: 'auto' }}>Mô tả định dạng</th>
                </tr>
              </thead>
              <tbody>
                {TOEIC_STRUCTURE.map((item, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '700', color: 'var(--primary)', whiteSpace: 'nowrap' }}>{item.part}</td>
                    <td style={{ fontWeight: '700', whiteSpace: 'normal', wordBreak: 'keep-all' }}>{item.name}</td>
                    <td style={{ fontWeight: '700', color: 'var(--accent)', whiteSpace: 'nowrap' }}>{item.items}</td>
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <span className={`badge ${item.type === 'Listening' ? 'badge-blue' : 'badge-purple'}`}>
                        {item.type}
                      </span>
                    </td>
                    <td style={{ fontWeight: '600', fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'normal' }}>
                      {item.time}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', whiteSpace: 'normal' }}>
                      {item.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

        {/* Dynamic score info cards side-by-side using layout spacing */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="tips-layout">
          
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--accent)', marginBottom: '12px' }}>
              🎧 Phần nghe (Listening) — 100 câu / 45 phút
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Băng nghe phát liên tục từ Part 1 đến Part 4. Thí sinh không có thời gian dừng lại để suy nghĩ quá lâu. 
              <strong> Mẹo:</strong> Tận dụng thời gian băng đọc phần hướng dẫn (Directions) để đọc trước các câu hỏi và câu trả lời của Part 3 & 4.
            </p>
          </div>

          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '12px' }}>
              📖 Phần đọc (Reading) — 100 câu / 75 phút
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
              Thí sinh tự quản lý thời gian làm bài của mình. 
              <strong> Chiến thuật:</strong> Giải quyết nhanh Part 5 & Part 6 trong tối đa 20 phút. Dành toàn bộ 55 phút còn lại cho Part 7 vì đây là phần đọc hiểu dài, dễ bị thiếu thời gian nhất.
            </p>
          </div>

        </div>

        {/* Quick info note */}
        <div className="card" style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
          <span style={{ fontSize: '1.5rem' }}>🎯</span>
          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            Tổng số điểm của bài thi TOEIC là <strong>990 điểm</strong> chia đều cho hai phần (mỗi phần tối đa 495 điểm). Bảng quy đổi điểm thực tế sẽ dao động nhẹ tuỳ thuộc vào độ khó của từng đề thi.
          </span>
        </div>

      </div>
    </div>
  )
}
