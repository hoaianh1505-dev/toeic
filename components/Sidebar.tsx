'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from './ThemeContext'
import { useAuth } from './AuthContext'
import Logo from './Logo'

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  // Auto-collapse sidebar on smaller screens
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
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/flashcard', label: 'Flash Card', icon: '🃏' },
    { href: '/quiz', label: 'Trắc Nghiệm', icon: '📝' },
    { href: '/vocabulary', label: 'Từ Vựng', icon: '📚' },
    { href: '/tips', label: 'Cấu trúc đề thi', icon: '📊' },
  ]


  return (

    <>
      {/* Mobile Top Navbar (Visible only on mobile/tablet) */}
      <div className="mobile-header">
        <Link href="/" className="navbar-brand">
          <Logo size={32} />
          TOEIC Master
        </Link>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          {user ? (
            <button onClick={logout} className="btn btn-ghost btn-sm" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              🚪 Đăng xuất
            </button>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
              🔑 Login
            </Link>
          )}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            style={{ width: '38px', height: '38px', margin: 0 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Main Sidebar (Desktop layout) */}
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
        <div className="sidebar-brand">
          <Link href="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Logo size={36} />
            {!collapsed && <span className="brand-text">TOEIC Master</span>}
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
                  >
                    <span className="sidebar-icon">{item.icon}</span>
                    {!collapsed && <span className="sidebar-label">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Area with Profile, Theme Toggle and Collapse Button */}
        <div className="sidebar-footer">
          {/* User Profile Card */}
          {!collapsed && (
            <div className="sidebar-profile-card">
              {user ? (
                <>
                  <div className="profile-name">👋 Hi, {user.name}</div>
                  <div className="profile-email">{user.email}</div>
                  <button onClick={logout} className="logout-btn">
                    🚪 Đăng xuất
                  </button>
                </>
              ) : (
                <>
                  <div className="profile-name">Bạn chưa đăng nhập</div>
                  <Link href="/login" className="login-btn-sidebar">
                    🔑 Đăng nhập ngay
                  </Link>
                </>
              )}
            </div>
          )}

          {collapsed && (
            user ? (
              <button onClick={logout} className="theme-toggle-btn" title="Đăng xuất">
                🚪
              </button>
            ) : (
              <Link href="/login" className="theme-toggle-btn" title="Đăng nhập">
                🔑
              </Link>
            )
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
            title={collapsed ? 'Mở rộng menu' : 'Thu nhỏ menu'}
          >
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
      </aside>
    </>
  )
}
