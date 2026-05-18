import React from 'react'
import { useParams, Link } from 'react-router'
import { useCart } from '../hooks/CartContext'
import { findProduct } from '../data/products'
import Header from '../components/header'
import Footer from '../components/footer'
import CartPanel from '../components/panels/CartPanel'

export default function ProductDetails() {
  const { id } = useParams()
  const product = findProduct(id)
  const { addToCart, cartItems, updateQuantity } = useCart()

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <Header />
        <main className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h1 className="text-3xl font-semibold">Product not found</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">We couldn’t find that product. Try browsing the shop instead.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600">
              Back to Shop
            </Link>
          </div>
        </main>
        <Footer />
        <CartPanel />
      </div>
    )
  }

  const cartEntry = cartItems.find((entry) => entry.id === product.id)
  const quantity = cartEntry ? cartEntry.quantity : 0

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl min-h-[85vh] rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <div className="grid min-h-[75vh] gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <div className="space-y-6">
              <img src={product.imageUrl} alt={product.name} className="h-[60vh] w-full rounded-3xl object-cover shadow-xl" />
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                  {product.category}
                </span>
                <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">{product.name}</h1>
                <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">{product.description}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">Ksh. {product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{product.amountRemaining} left</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {quantity === 0 && <button
                    onClick={() => addToCart(product)}
                    className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
                  >
                    Add to Cart
                  </button>}
                  {quantity !== 0 && <><button
                    onClick={() => updateQuantity(product.id, Math.max(quantity - 1, 0))}
                    className="rounded-full bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="rounded-full bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    +
                  </button></>}
                </div>
              </div>
            </div>

            <aside className="space-y-6 rounded-3xl border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/80 lg:sticky lg:top-24">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Product details</h2>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Use this page to explore the product and add it to your cart before checkout.</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span>Stock</span>
                  <span>{product.amountRemaining}</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>Ksh. {product.price.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/shop" className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">
                Back to Shop
              </Link>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}
