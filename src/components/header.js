import React, { useState, useEffect, useRef } from 'react'
import chaiDark from "../assets/chai_logo_dark.png"
import chaiLight from "../assets/chai_logo_light.png"
import { useTheme } from "../hooks/ThemeContext"

const navItems = [
  { name: 'Shop', href: '#shop' },
  { name: 'Cart', href: '#cart' },
  { name: 'Profile', href: '#profile' },
]

const sampleSearchItems = [
  'Masala Chai',
  'Green Tea',
  'Herbal Infusions',
  'Chai Cups',
  'Loose Leaf',
  'Tea Sets',
]

export default function Header() {
  const { isDarkMode, toggleTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const dropdownRef = useRef(null)

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
        setMobileMenuOpen(false)
        setShowNotifications(false)
      }
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const filteredSearchItems = sampleSearchItems.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNavClick = (href) => {
    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setMobileMenuOpen(false)
  }

  const handleSearchSelect = (item) => {
    setSearchTerm(item)
    setIsSearchOpen(false)
  }

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'pt-2 px-2' : ''}`}>
      <div
        className={`mx-auto w-full transition-all duration-300 ${
          isScrolled
            ? 'max-w-6xl rounded-2xl shadow-lg backdrop-blur-xl bg-white/0 dark:bg-gray-950/0'
            : 'bg-transparent dark:bg-transparent backdrop-blur-sm'
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Chai
            </span>
            <img src={!isDarkMode ? chaiLight : chaiDark} alt="Chai Logo" className="h-8 w-auto sm:h-10" />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => handleNavClick(item.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              >
                {item.name}
              </button>
            ))}
          </nav>

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
                    className="w-32 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-amber-500 sm:w-48 lg:w-64"
                    autoFocus
                  />
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300"
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
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-full z-20 mt-2 w-72 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl">
                  <div className="border-b border-gray-100 dark:border-gray-800 px-4 py-3">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</p>
                  </div>
                  <div className="space-y-2 px-4 py-3">
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-3 text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">New blend dropped</p>
                      <p className="mt-1">Try our limited edition Rose Chai.</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-3 text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Cart reminder</p>
                      <p className="mt-1">You have 2 items waiting in your cart.</p>
                    </div>
                    <div className="rounded-2xl bg-gray-50 dark:bg-gray-900 p-3 text-sm text-gray-700 dark:text-gray-300">
                      <p className="font-medium">Profile tip</p>
                      <p className="mt-1">Update your preferences to get fresh recommendations.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {isSearchOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-full max-w-md rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-sm shadow-xl md:right-2">
              <div className="space-y-2 px-4 py-4">
                {searchTerm ? (
                  filteredSearchItems.length > 0 ? (
                    filteredSearchItems.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSearchSelect(item)}
                        className="w-full rounded-2xl px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        {item}
                      </button>
                    ))
                  ) : (
                    <p className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      No matches found. Try another flavor.
                    </p>
                  )
                ) : (
                  <p className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Search our shop by name, blend, or item.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 shadow-lg">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
