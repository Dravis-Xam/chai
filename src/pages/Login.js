import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import CartPanel from '../components/panels/CartPanel'
import { useAuth } from '../hooks/AuthContext'
import { useLanguage } from '../hooks/LanguageContext'

export default function Login() {
  const { isAuthenticated, login } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!normalizedEmail || !password) {
      setError(t('login.errorEmpty'))
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Enter a valid email address.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    login({ email: normalizedEmail, name: normalizedEmail.split('@')[0] || 'Chai Lover' })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">{t('login.title')}</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('login.description')}</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            {error && (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t('login.emailPlaceholder')}
              className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('login.passwordPlaceholder')}
              className="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
            <button className="w-full rounded-full bg-amber-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-amber-600">
              {t('login.continue')}
            </button>
          </form>

          <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
            <p>
              {t('login.noAccount')}{' '}
              <Link to="/register" className="font-semibold text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
                {t('login.createAccount')}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}
