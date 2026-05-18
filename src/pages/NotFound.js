import React from 'react'
import { Link } from 'react-router'
import Header from '../components/header'
import Footer from '../components/footer'
import CartPanel from '../components/panels/CartPanel'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <Header />
      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-950">
          <h1 className="text-4xl font-semibold">Page not found</h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">The route you followed doesn’t exist. Return to the homepage or shop for fresh chai blends.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/" className="rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600">Home</Link>
            <Link to="/shop" className="rounded-full bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">Shop</Link>
          </div>
        </div>
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}
