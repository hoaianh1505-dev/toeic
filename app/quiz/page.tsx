'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

interface Question {
  _id: string
  word: string
  phonetic: string
  type: string
  correctAnswer: string
  choices: string[]
}

type AnswerState = {
  selected: string
  correct: boolean
} | null

export default function QuizPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<AnswerState[]>([])
  const [loading, setLoading] = useState(true)
  const [finished, setFinished] = useState(false)
  const [quizCount, setQuizCount] = useState(10)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])


  useEffect(() => {
    fetchQuiz()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchQuiz(count = quizCount) {
    setLoading(true)
    setFinished(false)
    setAnswers([])
    setCurrent(0)
    try {
      const res = await fetch(`/api/quiz?count=${count}`)
      const data = await res.json()
      if (data.error) {
        alert(data.error)
      } else {
        setQuestions(data.questions || [])
      }
    } catch {
      alert('Lỗi khi tải câu hỏi. Hãy đảm bảo đã seed dữ liệu.')
    } finally {
      setLoading(false)
    }
  }

  function handleAnswer(choice: string) {
    if (answers[current]) return // already answered

    const question = questions[current]
    const isCorrect = choice === question.correctAnswer

    const newAnswers = [...answers]
    newAnswers[current] = { selected: choice, correct: isCorrect }
    setAnswers(newAnswers)

    // Auto advance after 1.2s
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1)
      } else {
        setFinished(true)
      }
    }, 1200)
  }

  function getChoiceClass(choice: string): string {
    const answer = answers[current]
    if (!answer) return ''
    if (choice === questions[current].correctAnswer) return 'correct'
    if (choice === answer.selected && !answer.correct) return 'wrong'
    return ''
  }

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang tạo câu hỏi...</p>
      </div>
    )
  }

  // Result screen
  if (finished) {
    const score = answers.filter((a) => a?.correct).length
    const percent = Math.round((score / questions.length) * 100)
    const emoji = percent >= 80 ? '🏆' : percent >= 60 ? '😊' : percent >= 40 ? '😐' : '😅'
    const label = percent >= 80 ? 'Xuất sắc!' : percent >= 60 ? 'Tốt lắm!' : percent >= 40 ? 'Cần cố gắng thêm' : 'Ôn luyện thêm nhé!'

    return (
      <div className="quiz-container">
        <div className="quiz-result animate-fade-up">
          <div style={{ fontSize: '5rem', marginBottom: '16px' }}>{emoji}</div>
          <div className="result-score">{score}/{questions.length}</div>
          <div className="result-label">{label}</div>
          <div className="result-sub">
            Bạn trả lời đúng {score}/{questions.length} câu ({percent}%)
          </div>

          {/* Score breakdown */}
          <div className="stats-grid" style={{ marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px' }}>
            <div className="stat-card">
              <div className="stat-number" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {score}
              </div>
              <div className="stat-label">✅ Đúng</div>
            </div>
            <div className="stat-card">
              <div className="stat-number" style={{ background: 'linear-gradient(135deg, #EF4444, #F87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {questions.length - score}
              </div>
              <div className="stat-label">❌ Sai</div>
            </div>
          </div>

          {/* Review wrong answers */}
          {answers.some((a) => !a?.correct) && (
            <div style={{ marginBottom: '32px', textAlign: 'left' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '1rem', color: 'var(--text-secondary)' }}>
                📋 Các câu sai:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {questions.map((q, i) =>
                  answers[i] && !answers[i]!.correct ? (
                    <div
                      key={q._id}
                      className="card"
                      style={{ padding: '14px 18px', borderColor: 'rgba(239,68,68,0.3)' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: 'var(--primary-light)' }}>{q.word}</span>
                        <span style={{ fontSize: '0.85rem', color: '#34D399' }}>✅ {q.correctAnswer}</span>
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#F87171', marginTop: '4px' }}>
                        Bạn chọn: {answers[i]?.selected}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              id="retry-btn"
              className="btn btn-primary btn-lg"
              onClick={() => fetchQuiz(quizCount)}
            >
              🔄 Làm lại
            </button>
            <Link href="/" className="btn btn-ghost btn-lg">
              🏠 Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="empty-state">
          <div className="empty-icon">❓</div>
          <div className="empty-title">Không có câu hỏi</div>
          <div className="empty-sub">Hãy seed dữ liệu từ trang Dashboard trước.</div>
          <Link href="/" className="btn btn-primary">← Về Dashboard</Link>
        </div>
      </div>
    )
  }

  const question = questions[current]
  const progressPercent = Math.round(((current + 1) / questions.length) * 100)
  const answered = answers[current]

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <h1 className="section-title" style={{ fontSize: '1.3rem' }}>📝 Trắc Nghiệm</h1>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <select
            id="quiz-count-select"
            className="filter-select"
            value={quizCount}
            onChange={(e) => setQuizCount(Number(e.target.value))}
          >
            <option value={10}>10 câu</option>
            <option value={20}>20 câu</option>
            <option value={30}>30 câu</option>
            <option value={50}>50 câu</option>
          </select>
          <button className="btn btn-ghost btn-sm" onClick={() => fetchQuiz(quizCount)}>
            🔄 Đề mới
          </button>
        </div>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Câu {current + 1}/{questions.length}
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ✅ {answers.filter((a) => a?.correct).length} đúng
          </span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="quiz-question animate-fade">
        <div className="quiz-word">{question.word}</div>
        <div className="quiz-phonetic">{question.phonetic}</div>
        <div style={{ marginTop: '12px' }}>
          <span className="badge badge-purple">{question.type}</span>
        </div>
        <div style={{ marginTop: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Chọn nghĩa đúng của từ trên:
        </div>
      </div>

      {/* Choices */}
      <div className="quiz-choices">
        {question.choices.map((choice, i) => (
          <button
            key={i}
            id={`choice-${i}`}
            className={`quiz-choice ${getChoiceClass(choice)}`}
            onClick={() => handleAnswer(choice)}
            disabled={!!answered}
          >
            <span style={{ color: 'var(--text-muted)', marginRight: '8px', fontWeight: '700', fontSize: '0.85rem' }}>
              {String.fromCharCode(65 + i)}.
            </span>
            {choice}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {answered && (
        <div className="animate-fade" style={{ textAlign: 'center', marginTop: '8px' }}>
          {answered.correct ? (
            <p style={{ color: 'var(--success)', fontWeight: '600' }}>
              🎉 Chính xác! Câu tiếp theo đang tải...
            </p>
          ) : (
            <p style={{ color: 'var(--danger)', fontWeight: '600' }}>
              ❌ Sai rồi! Đáp án đúng: <span style={{ color: '#34D399' }}>{question.correctAnswer}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}
