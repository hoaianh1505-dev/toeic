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
  const [grammarExpanded, setGrammarExpanded] = useState(pathname.startsWith('/grammar'))

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

  // Auto-expand grammar sub-menu when entering grammar pages
  useEffect(() => {
    if (pathname.startsWith('/grammar')) {
      setGrammarExpanded(true)
    }
  }, [pathname])

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/flashcard', label: 'Flash Card', icon: '🃏' },
    { href: '/quiz', label: 'Trắc Nghiệm', icon: '📝' },
    { href: '/vocabulary', label: 'Từ Vựng', icon: '📚' },
    { href: '/grammar', label: 'Sổ Tay Ngữ Pháp', icon: '📖' },
    { href: '/practice', label: 'Luyện Thi Từng Part', icon: '⏱️' },

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
              const isGrammarActive = item.href === '/grammar' && pathname.startsWith('/grammar')

              return (
                <li key={item.href}>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Link
                      href={item.href}
                      className={`sidebar-link ${isActive || (item.href === '/grammar' && pathname.startsWith('/grammar')) ? 'active' : ''}`}
                      title={collapsed ? item.label : ''}
                      style={{ flex: 1, paddingRight: item.href === '/grammar' && !collapsed ? '40px' : '16px' }}
                    >
                      <span className="sidebar-icon">{item.icon}</span>
                      {!collapsed && <span className="sidebar-label">{item.label}</span>}
                    </Link>

                    {/* Collapse/Expand toggle button for Sổ Tay Ngữ Pháp */}
                    {item.href === '/grammar' && !collapsed && (
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setGrammarExpanded(!grammarExpanded)
                        }}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          background: 'none',
                          border: 'none',
                          color: (isActive || pathname.startsWith('/grammar')) ? '#ffffff' : 'var(--text-secondary)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px',
                          fontSize: '0.65rem',
                          zIndex: 10
                        }}
                      >
                        {grammarExpanded ? '▼' : '▶'}
                      </button>
                    )}
                  </div>

                  {/* Dynamic sub-sidebar index for grammar topics, shown only if expanded */}
                  {item.href === '/grammar' && grammarExpanded && !collapsed && (
                    <ul style={{ listStyle: 'none', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px', marginBottom: '8px' }}>
                      {[
                        { id: 'parts-of-speech', title: 'Từ Loại', icon: '🏷️' },
                        { id: 'tenses', title: '12 Thì Tiếng Anh', icon: '⏳' },
                        { id: 'subject-verb-agreement', title: 'Hòa Hợp Chủ-Vị', icon: '🤝' },
                        { id: 'passive-voice', title: 'Câu Bị Động', icon: '🔄' },
                        { id: 'gerund-infinitive', title: 'V-ing và To-V', icon: '📝' },
                        { id: 'conditionals', title: 'Câu Điều Kiện', icon: '🌳' },
                        { id: 'relative-clauses', title: 'Mệnh Đề Quan Hệ', icon: '📎' },
                        { id: 'conjunctions-prepositions', title: 'Liên Từ & Giới Từ', icon: '🔗' },
                        { id: 'comparisons', title: 'Cấu Trúc So Sánh', icon: '📈' },
                        { id: 'tag-questions', title: 'Câu Hỏi Đuôi', icon: '❓' },
                      ].map((sub) => {
                        const isSubActive = pathname === `/grammar/${sub.id}`
                        return (
                          <li key={sub.id}>
                            <Link
                              href={`/grammar/${sub.id}`}
                              className="sidebar-sub-link"
                              style={{
                                fontSize: '0.8rem',
                                color: isSubActive ? 'var(--primary)' : 'var(--text-secondary)',
                                background: isSubActive ? 'var(--bg-card-hover)' : 'transparent',
                                textDecoration: 'none',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                borderRadius: '6px',
                                transition: 'all var(--transition-fast)'
                              }}
                            >
                              <span>{sub.icon}</span>
                              <span>{sub.title}</span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  )}
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
