import { NextResponse } from 'next/server'
import tipsData from '@/data/toeic_tips.json'

export async function GET() {
  try {
    return NextResponse.json(tipsData)
  } catch (error) {
    console.error('GET /api/tips error:', error)
    return NextResponse.json({ error: 'Failed to fetch tips' }, { status: 500 })
  }
}
