import crypto from 'crypto'
import { cookies } from 'next/headers'

// Encryption configs
const ENCRYPTION_KEY = process.env.SESSION_SECRET || 'd6F3E0A6F4E8D9C1A0B2C3D4E5F6A7B8' // 32 characters
const IV_LENGTH = 16

// 1. Password Hashing (using native scrypt)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const derivedKey = crypto.scryptSync(password, salt, 64)
  return `${salt}:${derivedKey.toString('hex')}`
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, key] = hash.split(':')
  const derivedKey = crypto.scryptSync(password, salt, 64)
  return crypto.timingSafeEqual(Buffer.from(key, 'hex'), derivedKey)
}

// 2. Encryption for Session Cookie (AES-256-CBC)
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export function decrypt(text: string): string {
  const textParts = text.split(':')
  const ivHex = textParts.shift()
  if (!ivHex) return ''
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

// 3. User session helper
export interface SessionUser {
  id: string
  email: string
  name: string
  role: 'user' | 'admin'
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session_token')?.value
    if (!token) return null

    const decrypted = decrypt(token)
    if (!decrypted) return null

    return JSON.parse(decrypted) as SessionUser
  } catch (e) {
    console.error('getCurrentUser error:', e)
    return null
  }
}
