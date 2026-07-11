'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthContext'
import Link from 'next/link'

interface ToeicQuestion {
  _id: string
  part: number
  category: string
  passage?: string
  imageUrl?: string
  audioUrl?: string
  questionText: string
  choices: string[]
  correctAnswer: string
  explanation?: string
}

const PART_INFO = [
  { part: 1, title: 'Part 1: Photographs', type: 'Listening', desc: 'Mô tả hình ảnh bằng âm thanh. Chọn phương án mô tả chính xác nhất bức tranh.', icon: '📸' },
  { part: 2, title: 'Part 2: Question-Response', type: 'Listening', desc: 'Hỏi - Đáp. Nghe một câu hỏi/phát biểu và chọn câu trả lời phù hợp nhất.', icon: '💬' },
  { part: 5, title: 'Part 5: Incomplete Sentences', type: 'Reading', desc: 'Hoàn thành câu đơn. Chọn từ loại, thì, từ vựng chính xác để điền vào chỗ trống.', icon: '✏️' },
  { part: 6, title: 'Part 6: Text Completion', type: 'Reading', desc: 'Hoàn thành đoạn văn. Điền từ loại, liên từ hoặc câu thích hợp vào đoạn văn ngắn.', icon: '📄' },
  { part: 7, title: 'Part 7: Reading Comprehension', type: 'Reading', desc: 'Đọc hiểu đoạn văn đơn hoặc đoạn văn kép, trả lời các câu hỏi thông tin liên quan.', icon: '📚' },
]

export default function PracticePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // State Management
  const [activePart, setActivePart] = useState<number | null>(null)
  const [questions, setQuestions] = useState<ToeicQuestion[]>([])
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [answers, setAnswers] = useState<Record<string, string>>({}) // questionId -> selectedChoice ('A' | 'B' | 'C' | 'D')
  const [isTesting, setIsTesting] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  
  // Audio Player State
  const [isPlayingTTS, setIsPlayingTTS] = useState<boolean>(false)
  
  // Timer State
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  // Stop TTS speech when switching questions or exiting
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlayingTTS(false)
    }
  }, [currentIdx, activePart])

  // Handle Timer
  useEffect(() => {
    if (isTesting && !isFinished) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isTesting, isFinished])

  // Load Questions for Selected Part
  async function startPractice(part: number) {
    setLoading(true)
    setActivePart(part)
    setAnswers({})
    setCurrentIdx(0)
    setTimeElapsed(0)
    setIsFinished(false)
    
    try {
      const res = await fetch(`/api/toeic-questions?part=${part}`)
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        setActivePart(null)
      } else {
        setQuestions(data.questions || [])
        setIsTesting(true)
      }
    } catch (e) {
      console.error(e)
      alert('Không thể tải đề thi. Vui lòng kiểm tra kết nối cơ sở dữ liệu.')
      setActivePart(null)
    } finally {
      setLoading(false)
    }
  }

  // Play Native TTS voice for listening tests
  function playQuestionTTS() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel() // Stop any ongoing speech
      
      const question = questions[currentIdx]
      if (!question) return

      let textToSpeak = ''
      if (question.part === 1) {
        // Read options A, B, C, D aloud for Part 1
        textToSpeak = "Look at the picture and listen to the options. " + question.choices.map((c, i) => `Option ${String.fromCharCode(65 + i)}: ${c.replace(/^\([A-D]\)\s*/, '')}`).join(". ")
      } else if (question.part === 2) {
        // Read question then choices for Part 2
        const cleanPrompt = question.questionText.replace(/^Listen to the question:\s*"/, '').replace(/"$/, '')
        textToSpeak = "Question: " + cleanPrompt + ". " + question.choices.map((c, i) => `Option ${String.fromCharCode(65 + i)}: ${c.replace(/^\([A-D]\)\s*/, '')}`).join(". ")
      } else {
        textToSpeak = question.questionText
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak)
      utterance.lang = 'en-US'
      utterance.rate = 0.88 // Slightly slower native rate for TOEIC clarity
      
      utterance.onstart = () => setIsPlayingTTS(true)
      utterance.onend = () => setIsPlayingTTS(false)
      utterance.onerror = () => setIsPlayingTTS(false)
      
      window.speechSynthesis.speak(utterance)
    } else {
      alert('Trình duyệt của bạn không hỗ trợ phát âm tự động (SpeechSynthesis).')
    }
  }

  // Stop TTS playback
  function stopTTS() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlayingTTS(false)
    }
  }

  // Auto seed database if empty
  async function forceSeed() {
    setLoading(true)
    try {
      const res = await fetch('/api/toeic-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'seed' })
      })
      const data = await res.json()
      alert(data.message || 'Seed database thành công!')
    } catch {
      alert('Có lỗi xảy ra khi seed cơ sở dữ liệu.')
    } finally {
      setLoading(false)
    }
  }

  // Format time (seconds -> MM:SS)
  function formatTime(sec: number): string {
    const mins = Math.floor(sec / 60)
    const secs = sec % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handle answer selection during test
  function selectAnswer(questionId: string, choice: string) {
    if (isFinished) return
    setAnswers(prev => ({
      ...prev,
      [questionId]: choice
    }))
  }

  // Submit test
  function submitTest() {
    // Check if there are unanswered questions
    const unansweredCount = questions.length - Object.keys(answers).length
    if (unansweredCount > 0) {
      const confirmSubmit = confirm(`Bạn còn ${unansweredCount} câu chưa trả lời. Bạn vẫn muốn nộp bài?`)
      if (!confirmSubmit) return
    }
    setIsFinished(true)
  }

  // Reset page
  function exitPractice() {
    setIsTesting(false)
    setIsFinished(false)
    setActivePart(null)
    setQuestions([])
    setAnswers({})
  }

  // Get choice styling for standard choices
  function getChoiceLabel(idx: number): string {
    return String.fromCharCode(65 + idx)
  }

  if (authLoading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang tải trang luyện thi...</p>
      </div>
    )
  }

  if (!user) return null

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-center">
        <div className="spinner" />
        <p>Đang chuẩn bị đề thi...</p>
      </div>
    )
  }

  // SCREEN 1: PART SELECTION
  if (!isTesting) {
    return (
      <div className="vocab-container animate-fade-up" style={{ maxWidth: '1250px', width: '100%', margin: '0 auto' }}>
        
        {/* Header Title */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              LUYỆN TẬP TOÀN DIỆN
            </span>
            <h1 className="section-title" style={{ marginTop: '4px', marginBottom: '8px', fontSize: '1.8rem' }}>
              📊 Thi Thử TOEIC Theo Từng Part
            </h1>
            <p className="section-sub" style={{ margin: 0 }}>Lựa chọn các Part nghe/đọc dưới đây để kiểm tra trình độ và xem lời giải ngữ pháp chi tiết.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-ghost" onClick={forceSeed} style={{ padding: '10px 18px', fontSize: '0.85rem' }}>
              🔄 Reset / Seed Lại Đề Thi
            </button>
          </div>
        </div>

        {/* Part Selection Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
          {PART_INFO.map(part => (
            <div key={part.part} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '28px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '2.5rem' }}>{part.icon}</span>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    background: part.type === 'Listening' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                    color: part.type === 'Listening' ? '#3b82f6' : '#10b981'
                  }}>
                    {part.type}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0 }}>
                  {part.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  {part.desc}
                </p>
              </div>
              <button className="btn btn-primary" onClick={() => startPractice(part.part)} style={{ width: '100%', padding: '12px 0', borderRadius: '8px', marginTop: '8px' }}>
                🚀 Vào Thi Ngay
              </button>
            </div>
          ))}
        </div>

      </div>
    )
  }

  // SCREEN 2: ACTIVE MOCK TEST (OR RESULTS INTERFACE)
  const currentQuestion = questions[currentIdx]

  // Calculate score for final screen
  const score = questions.filter(q => answers[q._id] === q.correctAnswer).length
  const passPercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="vocab-container animate-fade-up" style={{ maxWidth: '1250px', width: '100%', margin: '0 auto' }}>
      
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {isFinished ? 'KẾT QUẢ THI THỬ' : 'HỆ THỐNG THI THỬ TRỰC TUYẾN'}
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: '800', color: 'var(--text-primary)', margin: '4px 0 0 0' }}>
            {PART_INFO.find(p => p.part === activePart)?.title}
          </h2>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Timer Card */}
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            padding: '10px 18px',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '1rem',
            fontWeight: '700',
            color: 'var(--accent)'
          }}>
            ⏱️ {formatTime(timeElapsed)}
          </div>
          
          <button className="btn btn-ghost" onClick={exitPractice} style={{ padding: '10px 18px' }}>
            🚪 Thoát chế độ thi
          </button>
        </div>
      </div>

      {/* Main Grid: Passage/Question Area (Left) and Answer Grid (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }} className="tips-layout">
        
        {/* LEFT PANE: QUESTIONS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Results Overview if Finished */}
          {isFinished && (
            <div className="card animate-fade-up" style={{ padding: '28px', textAlign: 'center', background: 'rgba(108, 99, 255, 0.05)', borderColor: 'var(--primary)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '8px' }}>
                🎉 Bạn Đã Hoàn Thành Bài Thi!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '0 0 20px 0' }}>
                Kết quả thống kê chính xác bài làm của bạn.
              </p>
              
              <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{ background: 'var(--bg-card)', padding: '16px 28px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>{score} / {questions.length}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>Số câu đúng</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '16px 28px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--accent)' }}>{passPercent}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>Tỷ lệ đạt</div>
                </div>
                <div style={{ background: 'var(--bg-card)', padding: '16px 28px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--text-primary)' }}>{formatTime(timeElapsed)}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginTop: '4px' }}>Thời gian làm bài</div>
                </div>
              </div>
            </div>
          )}

          {/* Passage Container (For Part 6 and 7) */}
          {currentQuestion && currentQuestion.passage && (
            <div className="card" style={{ padding: '24px', background: 'var(--bg-card)' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: '800', background: 'var(--primary)', color: 'white', padding: '3px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>
                Đoạn văn đọc hiểu (Passage)
              </span>
              <pre style={{
                fontFamily: 'var(--font)',
                whiteSpace: 'pre-wrap',
                fontSize: '0.92rem',
                color: 'var(--text-primary)',
                lineHeight: '1.7',
                marginTop: '12px',
                margin: '12px 0 0 0'
              }}>
                {currentQuestion.passage}
              </pre>
            </div>
          )}

          {/* Active Question Details */}
          {currentQuestion ? (
            <div className="card" style={{ padding: '32px', minHeight: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Question Indicator */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: '800', color: 'var(--primary)' }}>
                  CÂU HỎI {currentIdx + 1} / {questions.length}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: 'var(--border)',
                  color: 'var(--text-muted)'
                }}>
                  Chuyên đề: {currentQuestion.category}
                </span>
              </div>

              {/* DYNAMIC AUDIO AND TTS PLAYER PANEL (For Listening Sections) */}
              {(currentQuestion.audioUrl || currentQuestion.category === 'Listening') && (
                <div style={{
                  background: 'rgba(59, 130, 246, 0.06)',
                  border: '1px solid rgba(59, 130, 246, 0.15)',
                  padding: '16px 20px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap'
                }} className="animate-fade">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🎧</span>
                    <div>
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        Băng nghe câu hỏi (Audio Track)
                      </strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {currentQuestion.audioUrl ? 'Đang sử dụng file ghi âm gốc' : 'Đang sử dụng giọng đọc bản xứ US/UK chất lượng cao'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {currentQuestion.audioUrl ? (
                      <audio src={currentQuestion.audioUrl} controls style={{ height: '36px', borderRadius: '4px' }} />
                    ) : (
                      <>
                        <button
                          onClick={playQuestionTTS}
                          className="btn btn-primary btn-sm"
                          style={{
                            padding: '8px 16px',
                            fontSize: '0.82rem',
                            borderRadius: '6px',
                            background: isPlayingTTS ? '#10b981' : 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          {isPlayingTTS ? '🔊 Đang Phát...' : '▶️ Phát Audio'}
                        </button>
                        {isPlayingTTS && (
                          <button
                            onClick={stopTTS}
                            className="btn btn-ghost btn-sm"
                            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '6px' }}
                          >
                            ⏹️ Dừng
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Part 1 Picture display */}
              {currentQuestion.imageUrl && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img
                    src={currentQuestion.imageUrl}
                    alt="TOEIC Part 1 Photograph"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '350px',
                      borderRadius: '8px',
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)'
                    }}
                  />
                </div>
              )}

              {/* Question Prompt */}
              <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: '1.5' }}>
                {currentQuestion.category === 'Listening' && currentQuestion.part === 1
                  ? 'Look at the image and select the option that best describes it.'
                  : currentQuestion.questionText
                }
              </div>

              {/* Answers Grid/List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                {currentQuestion.choices.map((choice, i) => {
                  const letter = getChoiceLabel(i)
                  const isSelected = answers[currentQuestion._id] === letter
                  
                  // Styles for review mode
                  let borderStyle = '1px solid var(--border)'
                  let bgStyle = 'transparent'
                  let textColor = 'var(--text-primary)'
                  
                  if (isFinished) {
                    const isCorrect = letter === currentQuestion.correctAnswer
                    const wasSelected = answers[currentQuestion._id] === letter
                    
                    if (isCorrect) {
                      borderStyle = '2px solid #10b981'
                      bgStyle = 'rgba(16, 185, 129, 0.08)'
                      textColor = '#10b981'
                    } else if (wasSelected) {
                      borderStyle = '2px solid #ef4444'
                      bgStyle = 'rgba(239, 68, 68, 0.08)'
                      textColor = '#ef4444'
                    }
                  } else {
                    if (isSelected) {
                      borderStyle = '2px solid var(--primary)'
                      bgStyle = 'rgba(108, 99, 255, 0.08)'
                      textColor = 'var(--primary)'
                    }
                  }

                  return (
                    <button
                      key={letter}
                      onClick={() => selectAnswer(currentQuestion._id, letter)}
                      disabled={isFinished}
                      style={{
                        padding: '16px 20px',
                        borderRadius: '8px',
                        border: borderStyle,
                        background: bgStyle,
                        color: textColor,
                        textAlign: 'left',
                        fontSize: '0.92rem',
                        fontWeight: isSelected || (isFinished && letter === currentQuestion.correctAnswer) ? '700' : '500',
                        cursor: isFinished ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        transition: 'all 0.15s ease'
                      }}
                      className={!isFinished ? 'quiz-choice-hover' : ''}
                    >
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        border: isSelected || (isFinished && letter === currentQuestion.correctAnswer) ? 'none' : '1px solid var(--border)',
                        background: isSelected ? 'var(--primary)' : (isFinished && letter === currentQuestion.correctAnswer ? '#10b981' : 'transparent'),
                        color: isSelected || (isFinished && letter === currentQuestion.correctAnswer) ? 'white' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '0.85rem'
                      }}>
                        {letter}
                      </span>
                      {choice}
                    </button>
                  )
                })}
              </div>

              {/* Explanations shown only when finished */}
              {isFinished && currentQuestion.explanation && (
                <div style={{
                  marginTop: '16px',
                  background: 'var(--bg-card)',
                  borderLeft: '4px solid var(--accent)',
                  padding: '20px',
                  borderRadius: '8px'
                }} className="animate-fade-up">
                  <h4 style={{ color: 'var(--accent)', fontWeight: '800', margin: '0 0 8px 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>💡</span> Giải thích chi tiết:
                  </h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: '1.6', margin: 0 }}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {/* Prev/Next buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '12px' }}>
                <button
                  className="btn btn-ghost"
                  onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                  disabled={currentIdx === 0}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  ◀️ Câu trước
                </button>
                <button
                  className="btn btn-ghost"
                  onClick={() => setCurrentIdx(prev => Math.min(questions.length - 1, prev + 1))}
                  disabled={currentIdx === questions.length - 1}
                  style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                >
                  Câu tiếp theo ▶️
                </button>
              </div>

            </div>
          ) : (
            <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Không có câu hỏi hợp lệ trong phần thi này.</p>
            </div>
          )}

        </div>

        {/* RIGHT PANE: TIMER & ANSWER GRID SHEET */}
        <div className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '20px' }}>
          
          <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Bảng Trả Lời (Answer Sheet)
          </h3>

          {/* Grid circles mapping questions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q._id]
              const isCurrent = currentIdx === idx
              
              let bg = 'transparent'
              let border = '1px solid var(--border)'
              let color = 'var(--text-muted)'
              
              if (isFinished) {
                const wasCorrect = answers[q._id] === q.correctAnswer
                bg = wasCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                border = wasCorrect ? '1px solid #10b981' : '1px solid #ef4444'
                color = wasCorrect ? '#10b981' : '#ef4444'
              } else {
                if (isCurrent) {
                  border = '2px solid var(--primary)'
                  color = 'var(--primary)'
                } else if (isAnswered) {
                  bg = 'var(--primary)'
                  border = '1px solid var(--primary)'
                  color = 'white'
                }
              }

              return (
                <button
                  key={q._id}
                  onClick={() => setCurrentIdx(idx)}
                  style={{
                    height: '42px',
                    borderRadius: '8px',
                    background: bg,
                    border: border,
                    color: color,
                    fontWeight: '800',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {!isFinished ? (
              <button className="btn btn-primary" onClick={submitTest} style={{ width: '100%', padding: '12px 0', borderRadius: '8px', fontWeight: '800' }}>
                📥 Nộp bài thi
              </button>
            ) : (
              <button className="btn btn-primary" onClick={exitPractice} style={{ width: '100%', padding: '12px 0', borderRadius: '8px', fontWeight: '800' }}>
                ↩️ Làm bài thi khác
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}
