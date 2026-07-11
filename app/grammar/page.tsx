'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GrammarIndexPage() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/grammar/parts-of-speech')
  }, [router])

  return (
    <div className="loading-center">
      <div className="spinner" />
      <p>Đang chuyển hướng...</p>
    </div>
  )
}
