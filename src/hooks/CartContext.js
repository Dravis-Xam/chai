import React, { createContext, useState, useCallback, useEffect } from 'react'

export const CartContext = createContext()

const CART_STORAGE_KEY = 'chai-cart-items'

function loadStoredCart() {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    const parsed = stored ? JSON.parse(stored) : []
    return Array.isArray(parsed) ? parsed.filter((item) => item && item.id && item.quantity > 0) : []
  } catch (error) {
    return []
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadStoredCart())
  const [isOpen, setIsOpen] = useState(false)
  const [shippingCost, setShippingCost] = useState(0)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((item, quantity = 1) => {
    const requestedQuantity = Math.max(1, Math.floor(Number(quantity) || 1))
    const stockLimit = Number.isFinite(item.amountRemaining) ? item.amountRemaining : Infinity
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        const nextQuantity = Math.min(existing.quantity + requestedQuantity, stockLimit)
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: nextQuantity } : i
        )
      }
      return [...prev, { ...item, quantity: Math.min(requestedQuantity, stockLimit) }]
    })
  }, [])

  const removeFromCart = useCallback((itemId) => {
    setCartItems((prev) => prev.filter((i) => i.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId, quantity) => {
    const item = cartItems.find((entry) => entry.id === itemId)
    const nextQuantity = Math.floor(Number(quantity) || 0)
    if (nextQuantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prev) =>
      prev.map((i) => (
        i.id === itemId
          ? { ...i, quantity: Math.min(nextQuantity, Number.isFinite(item?.amountRemaining) ? item.amountRemaining : nextQuantity) }
          : i
      ))
    )
  }, [cartItems, removeFromCart])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const getTotal = useCallback(() => {
    const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return itemsTotal + (Number(shippingCost) || 0)
  }, [cartItems, shippingCost])

  const value = {
    cartItems,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    shippingCost,
    setShippingCost,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
