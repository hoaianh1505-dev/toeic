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
      // We sample passages (blocks) first, then retrieve all questions matching those blocks.
      
      let passageCount = 4 // Default for 20 questions
      if (limit <= 10) passageCount = 2
      else if (limit <= 30) passageCount = 6
      else if (limit <= 50) passageCount = 10

      // Get random block IDs
      const sampledBlocks = await ToeicQuestion.aggregate([
        { $match: { part, blockId: { $ne: null, $ne: "" } } },
        { $group: { _id: "$blockId" } },
        { $sample: { size: passageCount } }
      ])

      const blockIds = sampledBlocks.map(b => b._id)

      // Fetch all questions for these blocks, ordered by insertion order (_id)
      questions = await ToeicQuestion.find({
        part,
        blockId: { $in: blockIds }
      }).sort({ _id: 1 })
    }
    
    return NextResponse.json({
      part,
      total: questions.length,
      source: 'MongoDB (Grouped Blocks)',
      questions,
    })
  } catch (error) {
    console.error('GET /api/toeic-questions error:', error)
    return NextResponse.json({ error: 'Failed to fetch TOEIC questions' }, { status: 500 })
  }
}
