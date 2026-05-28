import React, { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../../hooks/CartContext'
import { useLanguage } from '../../hooks/LanguageContext'

export default function ProductCard({ item }) {
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useLanguage()

  const {
    cartItems,
    addToCart,
    updateQuantity
  } = useCart();

  const cartEntry = cartItems.find((entry) => entry.id === item.id)
  const count = cartEntry ? cartEntry.quantity : 0

  const handleAddToCart = () => {
    addToCart(item);
  };

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div
      className="group relative w-64 overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl dark:bg-gray-950"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Zoom Effect */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        
        {/* Category Badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur-sm dark:bg-gray-900/90 dark:text-gray-300">
          {item.category}
        </div>
        
        {/* Price Badge */}
        <div className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
          Ksh. {item.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative p-4">
        {/* Title */}
        <h3 className="mb-1 text-lg font-semibold text-gray-900 transition-colors group-hover:text-amber-600 dark:text-white dark:group-hover:text-amber-500">
          <Link to={`/product/${item.id}`} className="hover:underline focus:outline-none focus:ring-2 focus:ring-amber-500">
            {item.name}
          </Link>
        </h3>
        {/* Description */}
        <p className="mb-3 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
          {item.description}
        </p>
        
        {/* Action Buttons */}
        <div className="space-y-3">
          {count === 0 ? (
            <button 
              className="flex-1 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-amber-600 hover:shadow-md active:scale-95"
              onClick={handleAddToCart}
            >
              {t('product.addToCart')}
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <button 
                className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => handleQuantityChange(count - 1)}
              >
                -
              </button>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {count}
              </span>
              <button 
                className="rounded-lg bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 transition-all duration-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                onClick={() => handleQuantityChange(count + 1)}
              >
                +
              </button>
            </div>
          )}
          <button 
            className="rounded-lg p-2 text-gray-500 transition-all duration-300 hover:bg-gray-100 hover:text-amber-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-amber-500"
            aria-label={t('product.addToWishlist')}
            onClick={() => {
              console.log('Added to wishlist:', item.name)
            }}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        {/* Sliding Indicator on Hover */}
        <div 
          className={`absolute bottom-0 left-0 h-0.5 bg-amber-500 transition-all duration-500 ease-out ${
            isHovered ? 'w-full' : 'w-0'
          }`}
        />
      </div>
    </div>
  )
}