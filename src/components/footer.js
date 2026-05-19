import React from 'react'
import { Link } from 'react-router'
import chaiLight from "../assets/chai_logo_light.png"
import chaiDark from "../assets/chai_logo_dark.png"
import { useTheme } from "../hooks/ThemeContext"
import { useAuth } from "../hooks/AuthContext"
import { useLanguage } from "../hooks/LanguageContext"
import LanguageSwitcher from "./LanguageSwitcher"
import ScrollToTopButton from "./ScrollToTopButton"

export default function Footer() {
  const { isDarkMode } = useTheme()
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const logo = !isDarkMode ? chaiLight : chaiDark

  return (
    <>
      <footer className="mt-16 bg-transparent text-gray-700 dark:text-gray-300">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold">{t('footer.brand')}</h3>
                <div className="rounded-md">
                  <img src={logo} alt={`${t('footer.brand')} logo`} className="h-10 w-auto" />
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('footer.description')}</p>
              <div className="mt-2 text-sm space-y-1">
                <h4 className="font-medium">{t('footer.findUs')}</h4>
                <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 109.9 9.9L10 19l-4.95-5.05a7 7 0 000-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                  Murang'a County, Kenya
                </p>
                <p className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 3.5A1.5 1.5 0 013.5 2h2A1.5 1.5 0 017 3.5V5h6V3.5A1.5 1.5 0 0114.5 2h2A1.5 1.5 0 0118 3.5V16.5A1.5 1.5 0 0116.5 18h-13A1.5 1.5 0 012 16.5v-13z" /></svg>
                  <a href="tel:+254790269182" className="text-amber-600 dark:text-amber-400">+254 7 90 269 182</a>
                </p>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="md:col-span-1">
              <h4 className="text-sm font-semibold mb-3">{t('footer.navigation')}</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M3 9a1 1 0 011-1h3V5a1 1 0 112 0v3h3a1 1 0 110 2H9v3a1 1 0 11-2 0V11H4a1 1 0 01-1-1z" /></svg><Link to="/shop" className="hover:underline">{t('footer.shop')}</Link></li>
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M16 11V5a1 1 0 00-1-1h-3v2h2v4h2zM4 9v6a1 1 0 001 1h3v-2H6V9H4z" /></svg><a href="#cart" className="hover:underline">{t('footer.cart')}</a></li>
                {isAuthenticated && (
                  <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2a4 4 0 110 8 4 4 0 010-8zM2 18a8 8 0 0116 0H2z" /></svg><a href="#profile" className="hover:underline">{t('footer.profile')}</a></li>
                )}
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" /></svg><a href="/about" className="hover:underline">{t('footer.about')}</a></li>
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4 3h12v2H4V3zM4 7h12v2H4V7zM4 11h12v2H4v-2zM4 15h12v2H4v-2z" /></svg><a href="/blog" className="hover:underline">{t('footer.blog')}</a></li>
              </ul>
            </nav>

            <div>
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-semibold mb-3">{t('footer.contact')}</h4>
                <LanguageSwitcher />
              </div>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v.5l-8 5-8-5V5z" /></svg><span>Email:</span> <a className="ml-1 text-amber-600 dark:text-amber-400" href="mailto:info@gacharagetea.co.ke">info@gacharagetea.co.ke</a></li>
                <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.003 5.884l2-3A1 1 0 015 2h3a1 1 0 011 1v3a1 1 0 01-.293.707L8.414 8.414a10.04 10.04 0 004.172 4.172l1.707-1.293A1 1 0 0116 10h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a12 12 0 01-11.497-11.116z" /></svg><a className="text-amber-600 dark:text-amber-400" href="tel:+254742300580">+254 742 300 580</a></li>
              </ul>

              <div className="mt-6 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <h4 className="text-sm font-semibold mb-3">{t('footer.legals')}</h4>
                <div>{t('footer.privacy')}</div>
                <div>{t('footer.organization')}</div>
                <div>{t('footer.leadership')}</div>
                <div>{t('footer.markets')}</div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            2025 © {t('footer.brand')} — {t('footer.terms')}
          </div>
        </div>
      </footer>
      <ScrollToTopButton />
    </>
  )
}
