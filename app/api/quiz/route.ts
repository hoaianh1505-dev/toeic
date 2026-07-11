import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Word from '@/models/Word'

// GET random quiz questions
export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const count = parseInt(searchParams.get('count') || '10')

    const total = await Word.countDocuments()
    if (total < 4) {
      return NextResponse.json({ error: 'Not enough words in DB. Please seed first.' }, { status: 400 })
    }

    // Get random words for questions
    const questionWords = await Word.aggregate([{ $sample: { size: count } }])

    // Build quiz with 4 choices each
    const allMeanings = await Word.aggregate([
      { $sample: { size: count * 8 } },
      { $project: { meaning: 1 } },
    ])

    const questions = questionWords.map((qWord) => {
      // Get 3 wrong answers from other words
      const wrongAnswers = allMeanings
        .filter((w) => w._id.toString() !== qWord._id.toString())
        .map((w) => w.meaning)
        .slice(0, 3)

      const choices = [qWord.meaning, ...wrongAnswers].sort(() => Math.random() - 0.5)

      return {
        _id: qWord._id,
        word: qWord.word,
        phonetic: qWord.phonetic,
        type: qWord.type,
        correctAnswer: qWord.meaning,
        choices,
      }
    })

    return NextResponse.json({ questions })
  } catch (error) {
    console.error('GET /api/quiz error:', error)
    return NextResponse.json({ error: 'Failed to generate quiz' }, { status: 500 })
  }
}
