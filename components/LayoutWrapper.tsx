'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'
import AdminSidebar from './AdminSidebar'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const isAdminPage = pathname.startsWith('/admin')

  if (isAuthPage) {
    return (
      <div className="auth-layout-wrapper">
        {children}
      </div>
    )
  }

  if (isAdminPage) {
    return (
      <div className="app-wrapper">
        <AdminSidebar />
        <div className="main-content-container">
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    )
  }



  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="main-content-container">
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}
