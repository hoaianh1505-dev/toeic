import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { hashPassword, verifyPassword, encrypt } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    // Auto-create default admin account if it does not exist
    let admin = await User.findOne({ email: 'admin@gmail.com' })
    if (!admin) {
      const passwordHash = hashPassword('123456')
      await User.create({
        email: 'admin@gmail.com',
        passwordHash,
        name: 'Quản Trị Viên',
        role: 'admin'
      })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    if (!user) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
    }

    const isMatch = verifyPassword(password, user.passwordHash)
    if (!isMatch) {
      return NextResponse.json({ error: 'Email hoặc mật khẩu không đúng' }, { status: 401 })
    }

    // Encrypt user payload for session
    const payload = JSON.stringify({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    })

    const token = encrypt(payload)

    // Set secure HTTP-only cookie
    const cookieStore = await cookies()
    cookieStore.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return NextResponse.json({
      message: 'Đăng nhập thành công!',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
