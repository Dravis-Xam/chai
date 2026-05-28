import React, { useState } from 'react'
import { useLanguage } from '../hooks/LanguageContext'

export default function LanguageSwitcher() {
  const { language, languages, switchLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = languages.find((lang) => lang.code === language) || languages[0]
  const m = null // Hide the language switcher for now, as we only have English. This will be enabled once we add more languages in the future. 

  return (
    <>
    {m && <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        aria-label="Change language"
      >
        <span>{currentLang.flag}</span>
        <span className="hidden sm:inline">{currentLang.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-800 dark:bg-gray-950 z-50">
          <ul className="space-y-1 p-2">
            {languages.map((lang) => (
              <li key={lang.code}>
                <button
                  type="button"
                  onClick={() => {
                    switchLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    language === lang.code
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                  {language === lang.code && (
                    <svg className="ml-auto h-4 w-4 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>}
    </>
  )
}
