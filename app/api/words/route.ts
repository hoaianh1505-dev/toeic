import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Word, { type IWord } from '@/models/Word'
import { getCurrentUser } from '@/lib/auth'
import vocabularyData from '@/data/toeic1000.json'

type ImportWordInput = Pick<IWord, 'word' | 'type' | 'phonetic' | 'meaning' | 'page'>

// GET all words
export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const search = searchParams.get('search') || ''
    const type = searchParams.get('type') || ''

    const query: Record<string, unknown> = {}
    if (search) {
      query.$or = [
        { word: { $regex: search, $options: 'i' } },
        { meaning: { $regex: search, $options: 'i' } },
      ]
    }
    if (type) {
      query.type = { $regex: type, $options: 'i' }
    }

    const total = await Word.countDocuments(query)
    const words = await Word.find(query)
      .sort({ stt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)

    return NextResponse.json({
      words,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    console.error('GET /api/words error:', error)
    return NextResponse.json({ error: 'Failed to fetch words' }, { status: 500 })
  }
}

// POST - add new word (admin), seed database, or import batch JSON
export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json().catch(() => ({}))

    // Action 1: Seed default words
    if (body.action === 'seed') {
      const count = await Word.countDocuments()
      if (count > 0) {
        return NextResponse.json({ message: `Already seeded. ${count} words in DB.` })
      }
      await Word.insertMany(vocabularyData)
      return NextResponse.json({ message: `Seeded ${vocabularyData.length} words successfully!` })
    }

    // Action 2: Import raw JSON array
    if (body.action === 'import_json') {
      const user = await getCurrentUser()
      if (!user || user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized. Admin only.' }, { status: 403 })
      }

      const { jsonData } = body
      if (!jsonData) {
        return NextResponse.json({ error: 'Dữ liệu JSON trống!' }, { status: 400 })
      }

      let wordsArray: ImportWordInput[]
      try {
        wordsArray = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData
        if (!Array.isArray(wordsArray)) {
          throw new Error('Dữ liệu không phải là một danh sách mảng []')
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Lỗi định dạng JSON không hợp lệ'
        return NextResponse.json({ error: `JSON không hợp lệ: ${errorMsg}` }, { status: 400 })
      }

      if (wordsArray.length === 0) {
        return NextResponse.json({ error: 'Mảng JSON không có từ vựng nào!' }, { status: 400 })
      }

      // Get current max STT
      const lastWord = await Word.findOne().sort({ stt: -1 })
      let currentStt = lastWord ? lastWord.stt + 1 : 1

      // Format words with STT index
      const formattedWords = wordsArray.map((w) => {
        if (!w.word || !w.type || !w.meaning) {
          throw new Error(`Từ vựng thiếu trường bắt buộc (word, type hoặc meaning) trong đối tượng: ${JSON.stringify(w)}`)
        }
        return {
          stt: currentStt++,
          word: w.word.trim(),
          type: w.type.trim(),
          phonetic: (w.phonetic || '').trim(),
          meaning: w.meaning.trim(),
          page: Number(w.page) || 1,
        }
      })

      const result = await Word.insertMany(formattedWords)
      return NextResponse.json({ message: `Đã nhập thành công ${result.length} từ vựng mới bằng JSON!`, count: result.length })
    }

    // Action 3: Add single word
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin only.' }, { status: 403 })
    }


    const { word, type, phonetic, meaning } = body
    if (!word || !type || !meaning) {
      return NextResponse.json({ error: 'Missing required word details' }, { status: 400 })
    }

    // Auto calculate STT
    const lastWord = await Word.findOne().sort({ stt: -1 })
    const nextStt = lastWord ? lastWord.stt + 1 : 1

    const newWord = await Word.create({
      stt: nextStt,
      word,
      type,
      phonetic: phonetic || '',
      meaning,
      page: 1,
    })

    return NextResponse.json({ message: 'Thêm từ mới thành công!', word: newWord })
  } catch (error) {
    console.error('POST /api/words error:', error)
    return NextResponse.json({ error: 'Failed to add word' }, { status: 500 })
  }
}

// PUT - edit word (admin)
export async function PUT(request: Request) {
  try {
    await connectDB()
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin only.' }, { status: 403 })
    }

    const { id, word, type, phonetic, meaning } = await request.json()
    if (!id || !word || !type || !meaning) {
      return NextResponse.json({ error: 'Missing required edit fields' }, { status: 400 })
    }

    const updated = await Word.findByIdAndUpdate(
      id,
      { word, type, phonetic, meaning },
      { new: true }
    )

    if (!updated) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Cập nhật từ vựng thành công!', word: updated })
  } catch (error) {
    console.error('PUT /api/words error:', error)
    return NextResponse.json({ error: 'Failed to edit word' }, { status: 500 })
  }
}

// DELETE - delete word (admin)
export async function DELETE(request: Request) {
  try {
    await connectDB()
    const user = await getCurrentUser()
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized. Admin only.' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing word ID' }, { status: 400 })
    }

    const deleted = await Word.findByIdAndDelete(id)
    if (!deleted) {
      return NextResponse.json({ error: 'Word not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Xóa từ vựng thành công!' })
  } catch (error) {
    console.error('DELETE /api/words error:', error)
    return NextResponse.json({ error: 'Failed to delete word' }, { status: 500 })
  }
}
