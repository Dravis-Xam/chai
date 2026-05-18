import React, { useState, useEffect } from "react"
import Header from "./components/header"
import Footer from "./components/footer"
import CartPanel from "./components/panels/CartPanel"
import ProductCard from "./components/cards/ProductCard"
import { preloadImages } from "./utils/preloadImages"

const sampleItems = [
  {
    id: "item-1",
    name: "Masala Chai",
    category: "Beverages",
    description: "Authentic Indian spiced tea with a rich blend of black tea, ginger, cardamom, and cloves.",
    amountRemaining: 45,
    price: 12.99,
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "item-2",
    name: "Green Tea",
    category: "Beverages",
    description: "Pure, antioxidant-rich green tea leaves sourced from organic gardens.",
    amountRemaining: 60,
    price: 9.99,
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1627435601357-3f6c7c50a52f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "item-3",
    name: "Herbal Infusions",
    category: "Beverages",
    description: "A caffeine-free blend of chamomile, peppermint, and hibiscus for ultimate relaxation.",
    amountRemaining: 30,
    price: 14.50,
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1574125812973-ac8004089d31?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "item-4",
    name: "Chai Cups",
    category: "Accessories",
    description: "Traditional clay-style ceramic cups, perfect for enjoying a hot brew.",
    amountRemaining: 15,
    price: 24.99,
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "item-5",
    name: "Loose Leaf",
    category: "Beverages",
    description: "Premium, whole-leaf Assam black tea for a robust and bold flavor profile.",
    amountRemaining: 50,
    price: 18.00,
    isFeatured: false,
    imageUrl: "https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "item-6",
    name: "Tea Sets",
    category: "Accessories",
    description: "Elegant porcelain tea set including a teapot, four cups, and a serving tray.",
    amountRemaining: 8,
    price: 85.00,
    isFeatured: true,
    imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=600"
  }
];


export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    preloadImages(sampleItems).then(() => {
      setIsLoading(false)
    }).catch((error) => {
      console.error("Error preloading images:", error)
      setIsLoading(false)
    })
  }, [])

  return (
    <div id="homepage" className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <section id="shop" className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Shop</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Explore curated blends, loose leaf collections, and accessories created for cozy mornings and calm evenings.
          </p>
          <div className="m-2 p-1 w-full flex flex-wrap gap-6">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-12">
                <div className="text-center">
                  <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-amber-500 dark:border-gray-800 dark:border-t-amber-400"></div>
                </div>
              </div>
            ) : (
              sampleItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))
            )}
          </div>
        </section>

        <section id="cart" className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Cart</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Your cart is ready for checkout. Add your favorite teas and accessories, then head to checkout when you are ready.
          </p>
        </section>

        <section id="profile" className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
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
