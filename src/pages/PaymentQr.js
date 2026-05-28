import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useCart } from '../hooks/CartContext'
import QRCode from 'qrcode'
import { useLanguage } from '../hooks/LanguageContext'

export default function PaymentQr() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { getTotal } = useCart()
  const [amount, setAmount] = useState(null)
  const [reference, setReference] = useState(null)
  const [qrSrc, setQrSrc] = useState(null)

  const generateQRFor = async (amt, ref) => {
    const payloadObj = { amount: (amt || '0.00'), reference: (ref || `CHAI-QR-${Date.now()}`) }
    const payload = JSON.stringify(payloadObj)
    setQrSrc(null)
    try {
      const dataUrl = await QRCode.toDataURL(payload, { width: 300, margin: 1 })
      setQrSrc(dataUrl)
      setAmount(payloadObj.amount)
      setReference(payloadObj.reference)
    } catch (err) {
      console.error('QR generation failed', err)
      alert('Failed to generate QR code')
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const paramAmount = params.get('amount')
    const paramRef = params.get('ref')
    if (paramAmount || paramRef) {
      generateQRFor(paramAmount || '0.00', paramRef || `CHAI-QR-${Date.now()}`)
    } else {
      // fallback to cart total if available
      try {
        const amt = (typeof getTotal === 'function' ? getTotal() : 0).toFixed(2)
        generateQRFor(amt, `CHAI-QR-${Date.now()}`)
      } catch (e) {
        // no cart available, leave empty
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-6 text-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          {t('paymentQr.back')}
        </button>

        <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <h1 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">{t('paymentQr.title')}</h1>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">{t('paymentQr.description')}</p>

          <div id="qrcode" className="mx-auto mb-4 flex h-72 w-72 items-center justify-center rounded-lg bg-black text-white">
            {qrSrc ? (
              <img src={qrSrc} alt="QR code" className="h-56 w-56 rounded-md bg-white p-2" />
            ) : (
              <div className="text-sm text-gray-400">{t('paymentQr.noPaymentInfo')}</div>
            )}
          </div>

          <div className="mt-2 rounded-3xl bg-gray-100 p-4 text-left text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            <p><span className="font-semibold">{t('paymentQr.amountLabel')}</span> {amount ? `Ksh. ${amount}` : 'Ksh. 0.00'}</p>
            <p className="mt-1"><span className="font-semibold">{t('paymentQr.referenceLabel')}</span> {reference || 'CHAI-QR-XXXX'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
