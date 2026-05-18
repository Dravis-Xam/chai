import React, { useState, useEffect } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import CartPanel from '../components/panels/CartPanel'
import ProductCard from '../components/cards/ProductCard'
import { preloadImages } from '../utils/preloadImages'
import { sampleItems } from '../data/products'

export default function Shop() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    preloadImages(sampleItems)
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error('Error preloading shop images:', error)
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="space-y-16">
        <section className="border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Shop</h1>
              <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
                Discover our full collection of chai blends, loose leaf tea, and accessories.
              </p>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-6">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-12">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500 dark:border-gray-800 dark:border-t-amber-400"></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Loading products...</p>
                </div>
              </div>
            ) : (
              sampleItems.map((item) => <ProductCard key={item.id} item={item} />)
            )}
          </div>
        </section>
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}
