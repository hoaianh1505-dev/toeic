import { NextResponse } from 'next/server'
import { toeicPracticeFromPdf } from '@/data/toeicPracticeFromPdf'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const partParam = searchParams.get('part')
    const part = Number(partParam)

    if (![5, 6, 7].includes(part)) {
      return NextResponse.json(
        { error: 'Chi ho tro Part 5, 6, 7 cho che do luyen thi moi.' },
        { status: 400 }
      )
    }

    const questions = toeicPracticeFromPdf.filter((question) => question.part === part)

    return NextResponse.json({
      part,
      total: questions.length,
      source: 'pdf/DA2.pdf',
      questions,
    })
  } catch (error) {
    console.error('GET /api/toeic-questions error:', error)
    return NextResponse.json({ error: 'Failed to fetch TOEIC questions' }, { status: 500 })
  }
}
