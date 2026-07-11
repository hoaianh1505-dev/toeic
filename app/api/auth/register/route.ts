import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    await connectDB()
    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ error: 'Email đã tồn tại' }, { status: 400 })
    }

    // Auto promote first user to admin
    const userCount = await User.countDocuments()
    const role = userCount === 0 ? 'admin' : 'user'

    const passwordHash = hashPassword(password)
    const newUser = await User.create({
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
    })

    return NextResponse.json({
      message: 'Đăng ký thành công!',
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error('Register API error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}
