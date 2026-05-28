import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../../hooks/CartContext'
import { useLanguage } from '../../hooks/LanguageContext'

export default function CartPanel() {
  const { cartItems, isOpen, setIsOpen, updateQuantity, removeFromCart, clearCart, getTotal, shippingCost } = useCart()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedItems, setSelectedItems] = useState(new Set())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (selectedItems.size === 0) return

    const currentIds = new Set(cartItems.map((item) => item.id))
    const cleaned = new Set(Array.from(selectedItems).filter((id) => currentIds.has(id)))
    if (cleaned.size !== selectedItems.size) {
      setSelectedItems(cleaned)
    }
  }, [cartItems, selectedItems])

  const handleClearCart = () => {
    clearCart()
    setIsEditMode(false)
    setSelectedItems(new Set())
  }

  const toggleSelectItem = (itemId) => {
    const newSelected = new Set(selectedItems)
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId)
    } else {
      newSelected.add(itemId)
    }
    setSelectedItems(newSelected)
  }

  const selectAll = () => {
    if (selectedItems.size === cartItems.length) {
      setSelectedItems(new Set())
    } else {
      setSelectedItems(new Set(cartItems.map((item) => item.id)))
    }
  }

  const deleteSelected = () => {
    selectedItems.forEach((itemId) => removeFromCart(itemId))
    setSelectedItems(new Set())
  }

  const shareItems = () => {
    const itemsList = Array.from(selectedItems)
      .map((id) => {
        const item = cartItems.find((i) => i.id === id)
        return `${item.name} (x${item.quantity})`
      })
      .join(', ')
    const shareUrl = `${window.location.origin}?cart=${encodeURIComponent(itemsList)}`

    if (navigator.share) {
      navigator.share({
        title: 'Check out my Chai items!',
        text: `I found these great items: ${itemsList}`,
        url: shareUrl,
      }).catch((err) => console.log('Share cancelled or failed:', err))
    } else {
      navigator.clipboard.writeText(shareUrl)
      alert('Share link copied to clipboard!')
    }
  }

  const total = getTotal()
  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const panelClasses = isMobile
    ? 'fixed bottom-0 left-0 right-0 z-40 max-h-[80vh] rounded-t-3xl'
    : 'fixed top-0 left-0 z-40 h-screen w-full sm:w-[400px] lg:w-[450px]'

  const overlayClasses = 'fixed inset-0 bg-black/50 z-30'


  return (
    <>
      {isOpen && (
        <div
          className={overlayClasses}
          onClick={() => {
            setIsOpen(false)
            setIsEditMode(false)
            setSelectedItems(new Set())
          }}
          role="button"
          tabIndex={0}
          aria-label={t('closeCart')}
        />
      )}

      <div
        className={`transform transition-all duration-300 ease-out ${
          isOpen
            ? isMobile
              ? 'translate-y-0 pb-20 mb-0'
              : 'translate-x-0'
            : isMobile
            ? 'translate-y-full pb-20 mb-0'
            : '-translate-x-full'
        } ${panelClasses} bg-white dark:bg-gray-950 shadow-2xl flex flex-col overflow-hidden`}
      >
        <div className="flex flex-col items-start border-b border-gray-200 dark:border-gray-800 px-6 py-4">
          <div className="flex w-full items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('Cart')}</h2>
            <button
              onClick={() => {
                setIsOpen(false)
                setIsEditMode(false)
                setSelectedItems(new Set())
              }}
              className="rounded-lg p-2 text-gray-600 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={t && t('closeCart')}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex w-full items-center justify-around gap-2">
            {!isEditMode ? (
              <>
                <button
                  onClick={() => setIsEditMode(true)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t && t('editCart')}
                </button>

                <button
                  onClick={handleClearCart}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m2 0a2 2 0 002-2V7a2 2 0 00-2-2h-3.5l-1-1h-5l-1 1H5a2 2 0 00-2 2v4a2 2 0 002 2h14z" />
                  </svg>
                  {t &&t('clearAll')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={selectAll}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                    selectedItems.size === cartItems.length && cartItems.length > 0
                      ? 'bg-amber-500 text-white hover:bg-amber-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {t && t('selectAll')}
                </button>

                {selectedItems.size > 0 && (
                  <>
                    <button
                      onClick={deleteSelected}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-all hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {t && t('deleteSelected')}
                    </button>

                    <button
                      onClick={shareItems}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-all hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.938 10 12.006 10 11c0-1.105-.895-2-2-2s-2 .895-2 2c0 1.006.411 1.938 1.316 2.342m9.368-6.026a10 10 0 10-14.106 12.754m4.736-2.569a2 2 0 11-2.828 2.828m9.368-6.183a10.003 10.003 0 01-14.106 12.754" />
                      </svg>
                      {t && t('share')}
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    setIsEditMode(false)
                    setSelectedItems(new Set())
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  {t && t('done')}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg className="mb-4 h-16 w-16 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t('emptyCart')}</p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">{t('emptyCartSubtext')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white p-3 transition-all hover:shadow-md dark:bg-gray-900/50"
                >
                  {isEditMode && (
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
                    />
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Ksh. {item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      aria-label={t('decreaseQuantity')}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <span className="w-6 text-center text-sm font-medium text-gray-900 dark:text-white">{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded p-1 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                      aria-label={t('increaseQuantity')}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded p-1 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30"
                      aria-label={t && t('removeItem')}
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 px-6 py-4 space-y-3 dark:bg-gray-900/50">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('subtotal')}</span>
              <span className="font-medium text-gray-900 dark:text-white">Ksh. {itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('shipping')}</span>
              <span className="font-medium text-gray-900 dark:text-white">Ksh. {(shippingCost || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('total')}</span>
              <span className="font-medium text-gray-900 dark:text-white">Ksh. {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('items')}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                navigate('/checkout')
              }}
              className="w-full rounded-lg bg-amber-500 px-4 py-3 font-medium text-white transition-all hover:bg-amber-600 hover:shadow-lg active:scale-98 flex items-center justify-center gap-2"
            >
              {t('proceedToCheckout')}
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
