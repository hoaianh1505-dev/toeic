'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'

interface ToeicQuestion {
  _id: string
  part: number
  category: string
  passage?: string
  questionText: string
  choices: string[]
  correctAnswer: string
  explanation?: string
  sourcePdf?: string
}

const PART_INFO = [
  {
    part: 5,
    title: 'Part 5: Incomplete Sentences',
    desc: 'Luyen cac cau dien tu va ngu phap tu bo noi dung trong folder pdf.',
    icon: '✏️',
  },
  {
    part: 6,
    title: 'Part 6: Text Completion',
    desc: 'Lam bai theo doan van trich tu file dap an trong folder pdf.',
    icon: '📄',
  },
  {
    part: 7,
    title: 'Part 7: Reading Comprehension',
    desc: 'Doc hieu va tra loi cau hoi tu bo reading practice trich tu pdf.',
    icon: '📚',
  },
] as const

export default function PracticePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  const [activePart, setActivePart] = useState<number | null>(null)
  const [questions, setQuestions] = useState<ToeicQuestion[]>([])
  const [passageGroups, setPassageGroups] = useState<any[]>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [questionLimit, setQuestionLimit] = useState<number>(20)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [authLoading, router, user])

  useEffect(() => {
    if (!isTesting || isFinished) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isFinished, isTesting])

  async function startPractice(part: number) {
    setLoading(true)
    setActivePart(part)
    setCurrentIdx(0)
    setAnswers({})
    setIsFinished(false)
    setTimeElapsed(0)

    try {
      const res = await fetch(`/api/toeic-questions?part=${part}&limit=${questionLimit}`)
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Khong the tai du lieu luyen thi')
      }

      const rawQuestions = data.questions || []
      setQuestions(rawQuestions)

      // Group questions by passage
      const groups: any[] = []
      rawQuestions.forEach((q: any) => {
        if (q.passage && (part === 6 || part === 7)) {
          const existing = groups.find((g) => g.passage === q.passage)
          if (existing) {
            existing.questions.push(q)
          } else {
            groups.push({
              passage: q.passage,
              sourcePdf: q.sourcePdf,
              questions: [q],
            })
          }
        } else {
          groups.push({
            passage: '',
            sourcePdf: q.sourcePdf,
            questions: [q],
          })
        }
      })

      setPassageGroups(groups)
      setIsTesting(true)
    } catch (error) {
      console.error(error)
      alert('Khong the tai bo cau hoi tu folder pdf.')
      setActivePart(null)
      setIsTesting(false)
    } finally {
      setLoading(false)
    }
  }

  function chooseAnswer(questionId: string, answer: string) {
    if (isFinished) return
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  function submitTest() {
    const unanswered = questions.length - Object.keys(answers).length
    if (unanswered > 0) {
      const confirmed = confirm(`Ban con ${unanswered} cau chua tra loi. Ban van muon nop bai?`)
      if (!confirmed) return
    }
    setIsFinished(true)
  }

  function resetPractice() {
    setActivePart(null)
    setQuestions([])
    setPassageGroups([])
    setCurrentIdx(0)
    setAnswers({})
    setIsTesting(false)
    setIsFinished(false)
    setTimeElapsed(0)
  }

  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const currentGroup = passageGroups[currentIdx]

  const score = useMemo(
    () => questions.filter((question) => answers[question._id] === question.correctAnswer).length,
    [answers, questions]
  )
  const percent = questions.length ? Math.round((score / questions.length) * 100) : 0

  if (authLoading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Dang tai trang luyen thi...</p>
      </div>
    )
  }

  if (!user) return null

  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Dang doc du lieu tu folder pdf...</p>
      </div>
    )
  }

  if (!isTesting) {
    return (
      <div className="vocab-container animate-fade-up" style={{ maxWidth: '1180px', margin: '0 auto' }}>
        <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            PDF Reading Mode
          </div>
          <h1 style={{ margin: '8px 0 12px', fontSize: '1.8rem' }}>Luyen thi TOEIC Part 5, 6, 7</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Tinh nang nay da duoc lam lai de bo phan luyen thi chi dung noi dung trich tu folder <code>pdf/</code>.
            Hien tai bo cau hoi dang lay tu <code>DA2.pdf</code> va tap trung vao phan Reading.
          </p>
        </div>

        <div className="card" style={{ padding: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Số lượng câu hỏi mỗi lượt luyện</h3>
            <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Chọn số lượng câu hỏi bạn muốn làm trong bài test này.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[10, 20, 30, 50].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setQuestionLimit(num)}
                className={`btn ${questionLimit === num ? 'btn-primary' : 'btn-ghost'}`}
                style={{ minWidth: '70px', padding: '8px 12px', fontSize: '0.9rem' }}
              >
                {num} câu
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {PART_INFO.map((part) => (
            <div key={part.part} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '2.2rem' }}>{part.icon}</div>
              <h2 style={{ margin: 0, fontSize: '1.15rem' }}>{part.title}</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{part.desc}</p>
              <button className="btn btn-primary" onClick={() => startPractice(part.part)} style={{ marginTop: 'auto' }}>
                Vao luyen Part {part.part}
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="vocab-container animate-fade-up" style={{ maxWidth: '1240px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            PDF Practice Set
          </div>
          <h2 style={{ margin: '6px 0 0', fontSize: '1.4rem' }}>
            {PART_INFO.find((item) => item.part === activePart)?.title}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              background: 'var(--bg-card)',
              fontFamily: 'monospace',
              fontWeight: 700,
            }}
          >
            {formatTime(timeElapsed)}
          </div>
          <button className="btn btn-ghost" onClick={resetPractice}>
            Quay lai
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }} className="tips-layout">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isFinished && (
            <div className="card" style={{ padding: '24px', background: 'rgba(16,185,129,0.06)', borderColor: 'rgba(16,185,129,0.25)' }}>
              <h3 style={{ margin: 0, fontSize: '1.35rem' }}>Ket qua</h3>
              <p style={{ margin: '8px 0 0', color: 'var(--text-secondary)' }}>
                Ban dung {score}/{questions.length} cau ({percent}%). Thoi gian lam bai: {formatTime(timeElapsed)}.
              </p>
            </div>
          )}
          {currentGroup?.passage && (
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '10px' }}>
                Passage
              </div>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'inherit',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                }}
              >
                {currentGroup.passage}
              </pre>
            </div>
          )}

          {currentGroup ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>
                  {currentGroup.passage ? `Đoạn văn ${currentIdx + 1}/${passageGroups.length}` : `Câu hỏi ${currentIdx + 1}/${passageGroups.length}`}
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Nguồn: {currentGroup.sourcePdf || 'pdf/'}
                </span>
              </div>

              {currentGroup.questions.map((question: any) => {
                const globalIdx = questions.findIndex((q) => q._id === question._id)
                return (
                  <div key={question._id} id={`q-${question._id}`} className="card animate-fade-up" style={{ padding: '28px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '18px' }}>
                      <strong>
                        Câu hỏi {globalIdx + 1}
                      </strong>
                    </div>

                    <h3 style={{ margin: '0 0 18px', lineHeight: 1.6, fontSize: '1.05rem' }}>
                      {question.questionText}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {question.choices.map((choice: string, index: number) => {
                        const label = String.fromCharCode(65 + index)
                        const selected = answers[question._id] === label
                        const isCorrect = question.correctAnswer === label

                        let border = '1px solid var(--border)'
                        let background = 'transparent'
                        let color = 'var(--text-primary)'

                        if (isFinished) {
                          if (isCorrect) {
                            border = '2px solid #10b981'
                            background = 'rgba(16,185,129,0.08)'
                            color = '#10b981'
                          } else if (selected) {
                            border = '2px solid #ef4444'
                            background = 'rgba(239,68,68,0.08)'
                            color = '#ef4444'
                          }
                        } else if (selected) {
                          border = '2px solid var(--primary)'
                          background = 'rgba(108,99,255,0.08)'
                          color = 'var(--primary)'
                        }

                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => chooseAnswer(question._id, label)}
                            disabled={isFinished}
                            style={{
                              textAlign: 'left',
                              padding: '15px 18px',
                              borderRadius: '10px',
                              border,
                              background,
                              color,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              cursor: isFinished ? 'default' : 'pointer',
                            }}
                          >
                            <span
                              style={{
                                width: '28px',
                                height: '28px',
                                borderRadius: '50%',
                                border: '1px solid currentColor',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 800,
                                flexShrink: 0,
                              }}
                            >
                              {label}
                            </span>
                            <span>{choice}</span>
                          </button>
                        )
                      })}
                    </div>

                    {isFinished && question.explanation && (
                      <div
                        style={{
                          marginTop: '20px',
                          padding: '18px',
                          borderRadius: '10px',
                          background: 'rgba(14,165,233,0.08)',
                          borderLeft: '4px solid #0ea5e9',
                        }}
                      >
                        <div style={{ fontWeight: 800, marginBottom: '8px' }}>
                          Đáp án đúng: {question.correctAnswer}
                        </div>
                        <pre style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.7, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
                          {question.explanation}
                        </pre>
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="card" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setCurrentIdx((prev) => Math.max(prev - 1, 0))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={currentIdx === 0}
                >
                  Đoạn trước
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setCurrentIdx((prev) => Math.min(prev + 1, passageGroups.length - 1))
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  disabled={currentIdx === passageGroups.length - 1}
                >
                  Đoạn tiếp
                </button>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: '24px' }}>
              Không có câu hỏi hợp lệ cho phần này.
            </div>
          )}
        </div>

        <div className="card" style={{ padding: '20px', position: 'sticky', top: '20px', height: 'fit-content' }}>
          <h3 style={{ marginTop: 0, fontSize: '1rem' }}>Bảng câu hỏi</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {questions.map((question, index) => {
              const active = currentGroup?.questions.some((q: any) => q._id === question._id)
              const answered = Boolean(answers[question._id])
              const correct = answers[question._id] === question.correctAnswer

              let background = 'transparent'
              let border = '1px solid var(--border)'
              let color = 'var(--text-secondary)'

              if (isFinished) {
                background = correct ? 'rgba(16,185,129,0.18)' : 'rgba(239,68,68,0.18)'
                border = correct ? '1px solid #10b981' : '1px solid #ef4444'
                color = correct ? '#10b981' : '#ef4444'
              } else if (active) {
                border = '2px solid var(--primary)'
                color = 'var(--primary)'
              } else if (answered) {
                background = 'var(--primary)'
                border = '1px solid var(--primary)'
                color = 'white'
              }

              return (
                <button
                  key={question._id}
                  onClick={() => {
                    const groupIdx = passageGroups.findIndex((g) => g.questions.some((q) => q._id === question._id))
                    if (groupIdx !== -1) {
                      setCurrentIdx(groupIdx)
                      setTimeout(() => {
                        const el = document.getElementById(`q-${question._id}`)
                        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }, 100)
                    }
                  }}
                  style={{
                    height: '42px',
                    borderRadius: '8px',
                    background,
                    border,
                    color,
                    fontWeight: 800,
                  }}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>

          <div style={{ marginTop: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isFinished ? (
              <button className="btn btn-primary" onClick={submitTest}>
                Nộp bài
              </button>
            ) : (
              <button className="btn btn-primary" onClick={resetPractice}>
                Làm bộ khác
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
