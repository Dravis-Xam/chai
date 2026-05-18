import React, { createContext, useContext, useState, useMemo } from 'react';

// Initialize the Context
const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 1. Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if the item already exists in the cart
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Check stock availability before incrementing
        if (existingItem.quantity >= product.amountRemaining) {
          alert(`Sorry, only ${product.amountRemaining} units available.`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }

      // If it's a new item, add it with a quantity of 1
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // 2. Remove item completely from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // 3. Update quantity (handles typing input or increment/decrement buttons)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          // Prevent exceeding the stock limit
          if (newQuantity > item.amountRemaining) {
            alert(`Cannot exceed available stock (${item.amountRemaining} remaining).`);
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // 4. Clear entire cart
  const clearCart = () => setCart([]);

  // 5. Derived State (Totals calculated efficiently using useMemo)
  const cartItemCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cart]);

  // Context value payload
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartItemCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook for cleaner imports in your components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};