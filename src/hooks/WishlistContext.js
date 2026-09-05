import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const WISHLIST_STORAGE_KEY = 'chai-wishlist-items'
const WishlistContext = createContext()

function loadWishlist() {
  try {
    const stored = localStorage.getItem(WISHLIST_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => loadWishlist())

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  const isInWishlist = useCallback(
    (itemId) => wishlistItems.some((item) => item.id === itemId),
    [wishlistItems]
  )

  const toggleWishlist = useCallback((item) => {
    setWishlistItems((current) => (
      current.some((entry) => entry.id === item.id)
        ? current.filter((entry) => entry.id !== item.id)
        : [...current, item]
    ))
  }, [])

  return (
    <WishlistContext.Provider value={{ wishlistItems, isInWishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}