import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ToeicQuestion from '@/models/ToeicQuestion'

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const partParam = searchParams.get('part')
    const part = Number(partParam)

    if (![5, 6, 7].includes(part)) {
      return NextResponse.json(
        { error: 'Chỉ hỗ trợ Part 5, 6, 7 cho chế độ luyện thi.' },
        { status: 400 }
      )
    }

    // Query questions from MongoDB
    const questions = await ToeicQuestion.find({ part })
    
    return NextResponse.json({
      part,
      total: questions.length,
      source: 'MongoDB Collection (pdf/ import)',
      questions,
    })
  } catch (error) {
    console.error('GET /api/toeic-questions error:', error)
    return NextResponse.json({ error: 'Failed to fetch TOEIC questions' }, { status: 500 })
  }
}
