import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('session_token')
    return NextResponse.json({ message: 'Đăng xuất thành công!' })
  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 })
  }
}
