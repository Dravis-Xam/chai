import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/CartContext'
import { useLanguage } from '../hooks/LanguageContext'
import Header from '../components/header'
import Footer from '../components/footer'
import CartPanel from '../components/panels/CartPanel'

const pickupPoints = [
  { id: 1, label: 'Chai Central', city: 'Nairobi', street: 'Moi Ave', location: 'Downtown', description: 'Corner of Moi Ave and Kenyatta Avenue.' },
  { id: 2, label: 'Tea Terrace', city: 'Nairobi', street: 'University Way', location: 'CBD', description: 'Next to the central library stop.' },
  { id: 3, label: 'Kilimani Kiosk', city: 'Nairobi', street: 'Hatheru Rd', location: 'Kilimani', description: 'Inside the Kilimani shopping precinct.' },
  { id: 4, label: 'Mombasa Road Hub', city: 'Nairobi', street: 'Mombasa Rd', location: 'Embakasi', description: 'Across from the petrol station.' },
  { id: 5, label: 'Westlands Pantry', city: 'Nairobi', street: 'Chiromo Rd', location: 'Westlands', description: 'Beside the bookstore.' },
]

const paymentMethods = [
  { id: 'mpesa', label: 'M-Pesa', type: 'phone' },
  { id: 'airtelmoney', label: 'Airtel Money', type: 'phone' },
  { id: 'paypal', label: 'PayPal', type: 'email' },
  { id: 'stripe', label: 'Stripe', type: 'email' },
  { id: 'creditcard', label: 'Credit Card', type: 'card' },
]

function DeliveryTab({ data, setData, availablePoints }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          Location
          <input
            value={data.location}
            onChange={(event) => setData({ ...data, location: event.target.value })}
            placeholder="Location / neighborhood"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          City / Town
          <input
            value={data.cityTown}
            onChange={(event) => setData({ ...data, cityTown: event.target.value })}
            placeholder="Nairobi"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          Street
          <input
            value={data.street}
            onChange={(event) => setData({ ...data, street: event.target.value })}
            placeholder="Street name"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          Contact phone
          <input
            value={data.contact}
            onChange={(event) => setData({ ...data, contact: event.target.value })}
            placeholder="Phone number"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      </div>
    </div>
  )
}

function PickupTab({ availablePoints }) {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/70">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">Pickup point lookup</p>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Available locations around the chosen city and street.</p>
          </div>
          <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
            Map view
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-52 rounded-3xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
            <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Map preview</div>
            <div className="relative h-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-gray-800 dark:to-gray-900">
              <div className="absolute left-6 top-6 h-10 w-10 rounded-2xl bg-amber-500/15 text-center leading-10 text-xs font-semibold text-amber-700">A</div>
              <div className="absolute right-8 top-16 h-10 w-10 rounded-2xl bg-amber-500/15 text-center leading-10 text-xs font-semibold text-amber-700">B</div>
              <div className="absolute left-14 bottom-12 h-10 w-10 rounded-2xl bg-amber-500/15 text-center leading-10 text-xs font-semibold text-amber-700">C</div>
              <div className="absolute inset-x-8 bottom-8 h-24 rounded-3xl border border-dashed border-amber-300/60" />
            </div>
          </div>

          <div className="space-y-4">
            {availablePoints.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-4 text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
                No pickup points were found for this location yet. Try broadening your city or street.
              </div>
            ) : (
              availablePoints.map((point) => (
                <div key={point.id} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                  <p className="font-semibold text-gray-900 dark:text-white">{point.label}</p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{point.description}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-amber-600 dark:text-amber-300">{point.city} · {point.street}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentTab({ data, setData, selectedMethod, setSelectedMethod, openPaymentQr, setCheckoutStatus }) {
  const { t } = useLanguage()
  const method = paymentMethods.find((item) => item.id === selectedMethod) || paymentMethods[0]

  const handleSubmit = (event) => {
    event.preventDefault()
    if (method.type === 'phone' && !data.paymentPhone) {
      setCheckoutStatus('failed')
      return
    }
    if (method.type === 'email' && !data.paymentEmail) {
      setCheckoutStatus('failed')
      return
    }
    if (method.type === 'card' && (!data.cardNumber || !data.cardName || !data.cardExpiry || !data.cardCvc)) {
      setCheckoutStatus('failed')
      return
    }
    setCheckoutStatus('success')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        {paymentMethods.map((option) => (
          <label key={option.id} className={`flex cursor-pointer select-none items-center gap-3 rounded-3xl border p-4 transition ${selectedMethod === option.id ? 'border-amber-500 bg-amber-50/70 dark:border-amber-500 dark:bg-amber-500/10' : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950'}`}>
            <input
              type="radio"
              name="paymentMethod"
              value={option.id}
              checked={selectedMethod === option.id}
              onChange={() => setSelectedMethod(option.id)}
              className="h-4 w-4 text-amber-500 accent-amber-500"
            />
            <span className="text-sm font-medium text-gray-900 dark:text-white">{option.label}</span>
          </label>
        ))}
      </div>

      {method.type === 'phone' && (
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          Phone number
          <input
            value={data.paymentPhone}
            onChange={(event) => setData({ ...data, paymentPhone: event.target.value })}
            placeholder="07XX XXX XXX"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      )}

      {method.type === 'email' && (
        <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          Email
          <input
            value={data.paymentEmail}
            onChange={(event) => setData({ ...data, paymentEmail: event.target.value })}
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      )}

      {method.type === 'card' && (
        <div className="grid gap-4">
          <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            Cardholder name
            <input
              value={data.cardName}
              onChange={(event) => setData({ ...data, cardName: event.target.value })}
              placeholder="Name on card"
              className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            Card number
            <input
              value={data.cardNumber}
              onChange={(event) => setData({ ...data, cardNumber: event.target.value })}
              placeholder="1234 5678 9012 3456"
              className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
            />
          </label>
          <div className="grid gap-4 lg:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              Expiry
              <input
                value={data.cardExpiry}
                onChange={(event) => setData({ ...data, cardExpiry: event.target.value })}
                placeholder="MM/YY"
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </label>
            <label className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              CVC
              <input
                value={data.cardCvc}
                onChange={(event) => setData({ ...data, cardCvc: event.target.value })}
                placeholder="123"
                className="w-full rounded-3xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
              />
            </label>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-3xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('checkout.paymentTab.alternateFlow')}</p>
        <button
          type="button"
          onClick={openPaymentQr}
          className="inline-flex items-center justify-center rounded-full bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
        >
          {t('checkout.paymentTab.openQr')}
        </button>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-amber-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-amber-600"
      >
        {t('checkout.paymentTab.confirmPaymentDetails')}
      </button>
    </form>
  )
}

function CompletionTab({ status, onRetry }) {
  const { t } = useLanguage()
  if (!status) {
    return (
      <div className="rounded-3xl border border-dashed border-gray-300 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
        <p className="text-sm text-gray-500 dark:text-gray-400">{t('checkout.completion.intro')}</p>
      </div>
    )
  }

  const isSuccess = status === 'success'
  return (
    <div className="rounded-3xl border p-8 text-center shadow-sm dark:border-gray-800 dark:bg-gray-950">
      <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${isSuccess ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
        <span className="text-4xl">{isSuccess ? '✓' : '✕'}</span>
      </div>
      <h2 className={`text-2xl font-semibold ${isSuccess ? 'text-gray-900 dark:text-white' : 'text-red-600'}`}>
        {isSuccess ? t('checkout.completion.successTitle') : t('checkout.completion.errorTitle')}
      </h2>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        {isSuccess ? t('checkout.completion.successCopy') : t('checkout.completion.errorCopy')}
      </p>
      {!isSuccess && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-amber-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-600"
        >
          {t('checkout.completion.retry')}
        </button>
      )}
    </div>
  )
}

export default function Checkout() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { getTotal } = useCart()
  const [activeTab, setActiveTab] = useState(1)
  const [checkoutStatus, setCheckoutStatus] = useState(null)
  const [deliveryInfo, setDeliveryInfo] = useState({ location: '', cityTown: '', street: '', contact: '' })
  const [paymentInfo, setPaymentInfo] = useState({ paymentPhone: '', paymentEmail: '', cardName: '', cardNumber: '', cardExpiry: '', cardCvc: '' })
  const [selectedMethod, setSelectedMethod] = useState('mpesa')

  const availablePoints = useMemo(() => {
    const cityValue = deliveryInfo.cityTown.trim().toLowerCase()
    const streetValue = deliveryInfo.street.trim().toLowerCase()
    return pickupPoints.filter((point) => {
      const matchesCity = cityValue ? point.city.toLowerCase().includes(cityValue) : true
      const matchesStreet = streetValue ? point.street.toLowerCase().includes(streetValue) : true
      return matchesCity && matchesStreet
    })
  }, [deliveryInfo.cityTown, deliveryInfo.street])

  const openPaymentQr = () => {
    // Build payment payload from cart total and a reference id
    const amount = (typeof getTotal === 'function' ? getTotal() : 0).toFixed(2)
    const ref = `ORDER-${Date.now()}`
    const url = `${window.location.origin}/payment-qr?amount=${encodeURIComponent(amount)}&ref=${encodeURIComponent(ref)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main className="mx-auto w-full max-w-7xl px-3 py-6 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 lg:mb-8 lg:gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl dark:text-white">{t('checkout.title')}</h1>
            <p className="mt-2 max-w-2xl text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {t('checkout.description')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-amber-300 hover:bg-amber-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-amber-500 dark:hover:bg-amber-950"
          >
            {t('checkout.backToShop')}
          </button>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 rounded-xl sm:rounded-[2rem] border border-gray-200 bg-white p-4 sm:p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950 -translate-x-[8px]">
            <div className="min-w-0 w-full max-w-full overflow-x-auto pb-2 sm:pb-3">
              <div className="inline-flex w-max gap-2 sm:gap-3 whitespace-nowrap">
                {[1, 2, 3, 4].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`flex-shrink-0 min-w-[5.5rem] sm:min-w-[7rem] rounded-full px-3 sm:px-4 py-2 sm:py-3 text-[11px] sm:text-sm font-semibold transition ${activeTab === tab ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'}`}
                  >
                    <span className="hidden sm:inline">
                      {tab === 1 ? t('checkout.tabs.delivery') : tab === 2 ? t('checkout.tabs.pickup') : tab === 3 ? t('checkout.tabs.payment') : t('checkout.tabs.confirmation')}
                    </span>
                    <span className="sm:hidden">
                      {tab === 1 ? t('checkout.tabs.deliveryShort') : tab === 2 ? t('checkout.tabs.pickupShort') : tab === 3 ? t('checkout.tabs.paymentShort') : t('checkout.tabs.confirmationShort')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              {activeTab === 1 && (
                <DeliveryTab data={deliveryInfo} setData={setDeliveryInfo} availablePoints={availablePoints} />
              )}
              {activeTab === 2 && (
                <PickupTab availablePoints={availablePoints} />
              )}
              {activeTab === 3 && (
                <PaymentTab data={paymentInfo} setData={setPaymentInfo} selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} openPaymentQr={openPaymentQr} setCheckoutStatus={setCheckoutStatus} />
              )}
              {activeTab === 4 && <CompletionTab status={checkoutStatus} onRetry={() => setActiveTab(3)} />}
            </div>

            <div className="flex gap-2 sm:gap-3 border-t border-gray-200 pt-4 sm:pt-6 dark:border-gray-800">
              {activeTab > 1 && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab - 1)}
                  className="flex-1 rounded-full border border-gray-200 bg-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  {t('checkout.buttons.back')}
                </button>
              )}
              {activeTab < 4 && (
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab + 1)}
                  className="flex-1 rounded-full bg-amber-500 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-amber-600"
                >
                  {activeTab === 3 ? t('checkout.buttons.complete') : t('checkout.buttons.next')}
                </button>
              )}
            </div>
          </div>

          <aside className="hidden lg:block space-y-6 rounded-[2rem] border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900/80">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-gray-950">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-600">{t('checkout.section.orderSummary')}</p>
              <h2 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">{t('checkout.section.reviewCheckout')}</h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{t('checkout.section.reviewCopy')}</p>
            </div>

            <div className="space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t('checkout.section.deliveryAddress')}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{deliveryInfo.location || t('checkout.summary.locationNotEntered')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{deliveryInfo.cityTown || t('checkout.summary.cityNotEntered')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{deliveryInfo.street || t('checkout.summary.streetNotEntered')}</p>
                <p className="mt-1 text-sm font-medium text-amber-600 dark:text-amber-300">{t('checkout.summary.contactLabel')} {deliveryInfo.contact || t('checkout.summary.notProvided')}</p>
              </div>

              <div className="rounded-3xl bg-amber-50 p-4 dark:bg-amber-500/10">
                <p className="text-sm font-semibold text-amber-700 dark:text-amber-200">{t('checkout.section.payment')}</p>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{paymentMethods.find((method) => method.id === selectedMethod)?.label}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{selectedMethod === 'creditcard' ? t('checkout.summary.creditCardDetails') : selectedMethod === 'paypal' || selectedMethod === 'stripe' ? t('checkout.summary.emailPayment') : t('checkout.summary.mobileMoneyPayment')}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab(4)}
              className="w-full rounded-full bg-amber-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-amber-600"
            >
              {t('checkout.buttons.viewConfirmation')}
            </button>
          </aside>
        </div>
      </main>
      <Footer />
      <CartPanel />
    </div>
  )
}
