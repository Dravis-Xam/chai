import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router'
import chaiDark from "../assets/chai_logo_dark.png"
import chaiLight from "../assets/chai_logo_light.png"
import { useTheme } from "../hooks/ThemeContext"
import { useCart } from "../hooks/CartContext"
import { useNotifications } from "../hooks/NotificationsContext"
import { useAuth } from "../hooks/AuthContext"
import { sampleItems } from "../data/products"

const navItems = [
  { name: 'Shop', href: '/shop', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7h-4.18A3 3 0 0013 4.18V4a2 2 0 10-4 0v.18A3 3 0 008.18 7H4a1 1 0 00-1 1v1a1 1 0 001 1h1v9a2 2 0 002 2h10a2 2 0 002-2v-9h1a1 1 0 001-1V8a1 1 0 00-1-1zm-8-2a1 1 0 110-2 1 1 0 010 2zm0 3a1 1 0 110-2 1 1 0 010 2zm-6 4h12v8H6v-8z" />
    </svg>
  )},
  { name: 'Cart', href: '#cart', icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 1.5M17 13l1.5 1.5M9 21h6M12 18v3M6 21h3M15 21h3" />
    </svg>
  )},
  { name: 'Profile', href: '#profile', authOnly: true, icon: (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  )},
]

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme()
  const { setIsOpen, cartItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { notifications, selectedNotifications, unreadCount, selectAllNotifications, clearAllNotifications, markSelectedAsRead, toggleNotificationSelection, markNotificationAsRead, deleteNotification } = useNotifications()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const visibleNavItems = navItems.filter((item) => !item.authOnly || isAuthenticated)
  const [showNotifications, setShowNotifications] = useState(false)
  const [hoveredNotification, setHoveredNotification] = useState(null)
  const [activeNav, setActiveNav] = useState(location.pathname === '/shop' ? '/shop' : '#shop')
  const [hoveredNav, setHoveredNav] = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)
  const dropdownRef = useRef(null)
  const buttonRefs = useRef({})

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false)
        setShowNotifications(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  // Replace Intersection Observer with manual scroll logic
  useEffect(() => {
    const goToTop = document.getElementById("shop");
    const goToBottom = document.getElementById("profile");
    
    if (goToTop && goToBottom) {
      const handleTopClick = () => {
        goToBottom.scrollIntoView({ behavior: "smooth", block: "center" });
        setActiveNav('#profile');
      };
      
      const handleBottomClick = () => {
        goToTop.scrollIntoView({ behavior: "smooth", block: "center" });
        setActiveNav('#shop');
      };
      
      goToBottom.addEventListener("click", handleTopClick);
      goToTop.addEventListener("click", handleBottomClick);
      
      return () => {
        goToBottom.removeEventListener("click", handleTopClick);
        goToTop.removeEventListener("click", handleBottomClick);
      };
    }
  }, []);

  const searchSource = [
    ...sampleItems.map((item) => ({
      label: item.name,
      subtitle: item.category,
      type: 'product',
      id: item.id,
      href: `/product/${item.id}`,
    })),
    ...sampleItems.map((item) => ({
      label: item.category,
      subtitle: 'Browse category',
      type: 'category',
      href: '/shop',
    })),
    { label: 'Shop', subtitle: 'Browse all products', type: 'section', href: '/shop' },
    { label: 'Cart', subtitle: 'Go to cart panel', type: 'section', href: '#cart' },
    ...(isAuthenticated ? [{ label: 'Profile', subtitle: 'Open profile section', type: 'section', href: '#profile' }] : []),
  ]

  const filteredSearchItems = searchSource.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNavClick = (href) => {
    if (href.startsWith('/')) {
      navigate(href)
    } else {
      const targetId = href.replace('#', '')
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
    setActiveNav(href)
  }

  const handleSearchSelect = (item) => {
    setSearchTerm('')
    setIsSearchOpen(false)
    if (item.type === 'product') {
      navigate(item.href)
      setActiveNav('/shop')
      return
    }

    if (item.type === 'category' || item.type === 'section') {
      if (item.href.startsWith('/')) {
        navigate(item.href)
      } else {
        handleNavClick(item.href)
      }
      setActiveNav(item.href)
    }
  }

  // Update indicator position when active nav changes
  useEffect(() => {
    const updateIndicatorPosition = () => {
      const activeButton = buttonRefs.current[activeNav]
      if (activeButton && navRef.current) {
        const buttonRect = activeButton.getBoundingClientRect()
        const navRect = navRef.current.getBoundingClientRect()
        setIndicatorStyle({
          left: buttonRect.left - navRect.left + (buttonRect.width / 2) - 32,
          width: 64
        })
      }
    }
    updateIndicatorPosition()
  }, [activeNav])

  useEffect(() => {
    if (location.pathname.startsWith('/shop') || location.pathname.startsWith('/product')) {
      setActiveNav('/shop')
    } else if (location.pathname === '/') {
      setActiveNav('#shop')
    }
  }, [location.pathname])


  return (
    <>
      {/* Top Header */}
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled ? 'pt-2 px-2' : ''
      }`}>
        <div className={`mx-auto w-full transition-all duration-300 ${
          isScrolled
            ? 'max-w-6xl rounded-[150px] shadow-lg backdrop-blur-xl bg-white/80 dark:bg-gray-950/80'
            : 'border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm rounded-[150px]'
        }`}>
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            {/* Logo Section */}
            <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={()=>navigate("/")}>
              <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Chai
              </span>
              <img 
                src={!isDarkMode ? chaiLight : chaiDark} 
                alt="Chai Logo" 
                className="h-8 w-auto sm:h-10"
              />
            </div>

            {/* Center Navigation - Normal nav links */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleNavItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    if (item.name === 'Cart') {
                      setIsOpen(true)
                      setActiveNav('#cart')
                    } else {
                      handleNavClick(item.href)
                    }
                  }}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 flex items-center gap-2 relative ${
                    activeNav === item.href
                      ? 'text-amber-600 dark:text-amber-500 bg-amber-50 dark:bg-amber-950/50'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.name === 'Cart' && cartItems.length > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-xs font-semibold text-white">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right Section */}
            <div className="relative flex items-center gap-1 sm:gap-2">
              <div className="flex items-center gap-1 sm:gap-2">
                {!isSearchOpen ? (
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(true)
                      setShowNotifications(false)
                    }}
                    className="rounded-lg p-2 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Open search"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                ) : (
                  <div className="flex items-center gap-1 animate-fadeIn">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search Chai..."
                      className="w-full max-w-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 sm:w-48 lg:w-64"
                      autoFocus
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm('')}
                        className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        aria-label="Clear search"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchTerm('')
                      }}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  toggleTheme()
                  setShowNotifications(false)
                }}
                className="rounded-lg p-2 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDarkMode ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications((current) => !current)
                    setIsSearchOpen(false)
                  }}
                  className="relative rounded-lg p-2 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle notifications"
                  aria-expanded={showNotifications}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex min-w-[1.2rem] items-center justify-center rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-xl">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 px-4 py-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Tap an item or use actions</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={selectAllNotifications}
                          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                          aria-label="Select all notifications"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M8 6v14M16 6v14M4 6l2-2h12l2 2M9 10l2 2 4-4" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={markSelectedAsRead}
                          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                          aria-label="Mark selected as read"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 8l4 4L17 4" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={clearAllNotifications}
                          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                          aria-label="Clear all notifications"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12M9 6V4h6v2M7 6v12a2 2 0 002 2h6a2 2 0 002-2V6H7z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2 px-4 py-3">
                      {notifications.length === 0 ? (
                        <div className="rounded-xl bg-gray-50/80 dark:bg-gray-900/80 p-3 text-sm text-gray-700 dark:text-gray-300">
                          No notifications. You’re all caught up.
                        </div>
                      ) : (
                        notifications.map((notice) => (
                          <div
                            key={notice.id}
                            onMouseEnter={() => setHoveredNotification(notice.id)}
                            onMouseLeave={() => setHoveredNotification(null)}
                            className={`group relative rounded-xl p-3 text-sm transition-all ${notice.read ? 'bg-white dark:bg-gray-900/90' : 'bg-gray-50 dark:bg-gray-800/90'} ${selectedNotifications.includes(notice.id) ? 'ring-2 ring-amber-300 dark:ring-amber-500' : ''}`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0">
                                <span className={`inline-flex h-2.5 w-2.5 rounded-full ${notice.read ? 'bg-gray-400' : 'bg-amber-500'}`} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">{notice.title}</p>
                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{notice.subtitle}</p>
                              </div>
                              <div className={`absolute right-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 ${hoveredNotification === notice.id ? 'opacity-100' : ''}`}>
                                <button
                                  type="button"
                                  onClick={() => toggleNotificationSelection(notice.id)}
                                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  aria-label="Select notification"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16v12H4z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12l2 2 4-4" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => markNotificationAsRead(notice.id)}
                                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  aria-label="Mark notification as read"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8l4 4L17 4" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteNotification(notice.id)}
                                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                                  aria-label="Delete notification"
                                >
                                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6h12M9 6V4h6v2M7 6v12a2 2 0 002 2h6a2 2 0 002-2V6H7z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (isAuthenticated) {
                    logout()
                    navigate('/')
                  } else {
                    navigate('/login')
                  }
                }}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-amber-300 hover:bg-amber-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:bg-amber-950"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>

            {/* Search Results Panel */}
            {isSearchOpen && (
              <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-white/95 dark:bg-gray-950/95 p-4 backdrop-blur-sm text-sm shadow-xl md:relative md:top-full md:bottom-auto md:w-96 md:overflow-y-auto md:bg-white/95 dark:md:bg-gray-950/95 md:p-0 md:rounded-[150px] md:border md:border-gray-200 dark:md:border-gray-800 md:shadow-xl">
                <div className="space-y-2 px-4 py-4 md:px-0 md:py-0">
                  {searchTerm ? (
                    filteredSearchItems.length > 0 ? (
                      filteredSearchItems.map((item) => (
                        <button
                          key={`${item.type}-${item.id || item.label}`}
                          type="button"
                          onClick={() => handleSearchSelect(item)}
                          className="w-full rounded-xl px-3 py-3 text-left text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          <div className="font-medium">{item.label}</div>
                          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.subtitle}</div>
                        </button>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                        No matches found. Try another flavor.
                      </div>
                    )
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-700 px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      Search our shop by name, blend, or item.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Bottom Navigation Bar - Only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pb-4 px-4 pointer-events-none md:hidden">
        <nav 
          ref={navRef}
          className={`relative max-w-md mx-auto rounded-[150px] backdrop-blur-xl transition-all duration-300 pointer-events-auto overflow-visible
            ${isDarkMode 
              ? 'bg-black/40 hover:bg-black/60 border border-white/10' 
              : 'bg-white/40 hover:bg-white/60 border border-black/5'
            }`}
        >
          <div className="flex items-center justify-around gap-1 px-4 py-3">
            {visibleNavItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  ref={(el) => {
                    if (el) buttonRefs.current[item.href] = el
                  }}
                  type="button"
                  onClick={() => {
                    if (item.name === 'Cart') {
                      setIsOpen(true)
                      setActiveNav('#cart')
                    } else {
                      handleNavClick(item.href)
                    }
                  }}
                  onMouseEnter={() => setHoveredNav(item.name)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative rounded-lg p-3 transition-all duration-200 group ${
                    activeNav === item.href
                      ? 'text-amber-600 dark:text-amber-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                  aria-label={item.name}
                >
                  {item.icon}
                  {item.name === 'Cart' && cartItems.length > 0 && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center h-4 w-4 rounded-full bg-red-500 text-xs font-semibold text-white">
                      {cartItems.length}
                    </span>
                  )}
                  
                  {/* Tooltip on hover */}
                  {hoveredNav === item.name && (
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 dark:bg-gray-800 px-2 py-1 text-xs text-white shadow-lg animate-fadeIn">
                      {item.name}
                    </span>
                  )}
                </button>
              </div>
            ))}
          </div>
          
          {/* Sliding Indicator - Bottom underline with pointer pointing UP */}
          <div 
            className="absolute transition-all duration-300 ease-out"
            style={{
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              bottom: '-1px',
              transform: 'translateX(0)'
            }}
          >
            <div className="flex flex-col items-center">
              <svg className="w-4 h-2 text-amber-600 dark:text-amber-500" fill="currentColor" viewBox="0 0 24 12">
                <path d="M12 0L0 12h24L12 0z" />
              </svg>
              <div className="w-full h-1 bg-amber-600 dark:bg-amber-500 rounded-full -mt-0.5"></div>
            </div>
          </div>
        </nav>
      </div>

      {/* Add padding at bottom for mobile only */}
      <div className="pb-20 md:pb-0" />
    </>
  )
}