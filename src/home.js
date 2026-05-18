import React, { useState, useEffect } from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import CartPanel from "./components/panels/CartPanel"
import FeaturedSlider from "./components/FeaturedSlider"
import { preloadAsset } from "./utils/preloadImages"
import { sampleItems } from "./data/products"

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    preloadAsset(sampleItems)
      .then(() => setIsLoading(false))
      .catch((error) => {
        console.error("Error preloading images:", error)
        setIsLoading(false)
      })
  }, [])

  return (
    <div id="homepage" className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="space-y-16">
        {/* Featured slider — shows only featured items */}
        {isLoading ? (
          <div className="flex w-full items-center justify-center py-12">
            <div className="text-center">
              <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500 dark:border-gray-800 dark:border-t-amber-400"></div>
            </div>
          </div>
        ) : (
          <FeaturedSlider items={sampleItems.filter((i) => i.isFeatured)} />
        )}

        <section id="cart" className="rounded-3xl bg-white/90 p-6 shadow-sm dark:bg-gray-950/80">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Cart</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Your cart is ready for checkout. Add your favorite teas and accessories, then head to checkout when you are ready.
          </p>
        </section>

        <section id="profile" className="rounded-3xl bg-white/90 p-6 shadow-sm dark:bg-gray-950/80">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Profile</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Manage your preferences, saved blends, and delivery details from your profile section.
          </p>
        </section>
      </main>
      <CartPanel />
      <Footer />
    </div>
  )
}
