import Header from "./components/header"
import Footer from "./components/footer"

export default function Homepage() {
  return (
    <div id="homepage" className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="space-y-16 px-4 py-10 sm:px-6 lg:px-8">
        <section id="shop" className="rounded-3xl border border-gray-200 bg-white/90 p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950/80">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Shop</h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300">
            Explore curated blends, loose leaf collections, and accessories created for cozy mornings and calm evenings.
          </p>
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
      <Footer />
    </div>
  )
}
