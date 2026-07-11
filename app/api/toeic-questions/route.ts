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

    const limitParam = searchParams.get('limit')
    const limit = limitParam ? Number(limitParam) : 20

    let questions = []

    if (part === 5) {
      // Part 5 consists of single-sentence questions. We sample them individually.
      questions = await ToeicQuestion.aggregate([
        { $match: { part } },
        { $sample: { size: limit } }
      ])
    } else {
      // Part 6 & 7 consist of passages, each having multiple sub-questions.
      // We sample passages first, then retrieve all questions matching those passages.
      
      // Determine how many passages to sample based on limit:
      // Typically: Part 6 has 4 questions per passage. Part 7 has 2-5 questions per passage.
      let passageCount = 4 // Default for 20 questions
      if (limit <= 10) passageCount = 2
      else if (limit <= 30) passageCount = 6
      else if (limit <= 50) passageCount = 10

      // Get random passages
      const sampledPassages = await ToeicQuestion.aggregate([
        { $match: { part, passage: { $ne: null, $ne: "" } } },
        { $group: { _id: "$passage" } },
        { $sample: { size: passageCount } }
      ])

      const passageTexts = sampledPassages.map(p => p._id)

      // Fetch all questions for these passages, ordered by insertion order (_id)
      questions = await ToeicQuestion.find({
        part,
        passage: { $in: passageTexts }
      }).sort({ _id: 1 })
    }
    
    return NextResponse.json({
      part,
      total: questions.length,
      source: 'MongoDB (Grouped Passages)',
      questions,
    })
  } catch (error) {
    console.error('GET /api/toeic-questions error:', error)
    return NextResponse.json({ error: 'Failed to fetch TOEIC questions' }, { status: 500 })
  }
}
