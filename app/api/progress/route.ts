import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Progress from '@/models/Progress'
import { getCurrentUser } from '@/lib/auth'
import mongoose from 'mongoose'

// GET progress stats linked to current user
export async function GET() {
  try {
    await connectDB()
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ stats: { known: 0, unknown: 0, learning: 0 }, progress: [] })
    }

    const userIdObj = new mongoose.Types.ObjectId(user.id)

    const stats = await Progress.aggregate([
      { $match: { userId: userIdObj } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const result = { known: 0, unknown: 0, learning: 0 }
    stats.forEach((s) => {
      if (s._id in result) {
        result[s._id as keyof typeof result] = s.count
      }
    })

    const allProgress = await Progress.find({ userId: userIdObj }).select('wordId status')

    return NextResponse.json({ stats: result, progress: allProgress })
  } catch (error) {
    console.error('GET /api/progress error:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}

// POST - update word status for current user
export async function POST(request: Request) {
  try {
    await connectDB()
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized. Please login to save progress.' }, { status: 401 })
    }

    const body = await request.json()
    const { wordId, word, status } = body

    if (!wordId || !status) {
      return NextResponse.json({ error: 'Missing wordId or status' }, { status: 400 })
    }

    const progress = await Progress.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(user.id), wordId },
      {
        userId: new mongoose.Types.ObjectId(user.id),
        wordId,
        word,
        status,
        $inc: { reviewCount: 1 },
        lastReviewed: new Date(),
      },
      { upsert: true, new: true }
    )

    return NextResponse.json({ progress })
  } catch (error) {
    console.error('POST /api/progress error:', error)
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
  }
}
