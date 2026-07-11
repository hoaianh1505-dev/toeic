'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { useAuth } from './AuthContext'
import Logo from './Logo'

export default function AdminSidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const menuItems = [
    { href: '/admin', label: 'Quản Lý Từ Vựng', icon: '⚙️' },
    { href: '/', label: 'Về Dashboard học viên', icon: '🏠' },
  ]

  return (
    <>
      {/* Mobile Header for Admin */}
      <div className="mobile-header">
        <Link href="/admin" className="navbar-brand">
          <Logo size={32} />
          Admin Panel
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={logout} className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
            🚪 Đăng xuất
          </button>
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ width: '38px', height: '38px', margin: 0 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Admin Sidebar */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="admin-sidebar">
        <div className="sidebar-brand">
          <Link href="/admin" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Logo size={36} />
            {!collapsed && <span className="brand-text" style={{ color: 'var(--accent)' }}>Admin Panel</span>}
          </Link>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    title={collapsed ? item.label : ''}
                    style={{
                      background: isActive ? 'var(--accent)' : '',
                      boxShadow: isActive ? '0 4px 14px rgba(14, 165, 233, 0.3)' : ''
                    }}
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar-label">{item.label}</span>}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          {!collapsed && (
            <div className="sidebar-profile-card" style={{ borderColor: 'var(--accent)' }}>
              <div className="profile-name">🛡️ {user?.name || 'Admin'}</div>
              <div className="profile-email" style={{ marginBottom: '8px' }}>{user?.email}</div>
              <button onClick={logout} className="logout-btn">
                🚪 Đăng xuất
              </button>
            </div>
          )}

          {collapsed && (
            <button onClick={logout} className="theme-toggle-btn" title="Đăng xuất">
              🚪
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ width: collapsed ? '42px' : '100%', borderRadius: collapsed ? '50%' : 'var(--radius-sm)' }}
          >
            {theme === 'dark' ? '☀️ ' : '🌙 '}
            {!collapsed && (theme === 'dark' ? 'Giao diện Sáng' : 'Giao diện Tối')}
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-collapse-btn"
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
      </aside>
    </>
  )
}
