import React from 'react'
import { useNavigate } from 'react-router'

export default function PaymentQr() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-6 text-center">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-8 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          Back
        </button>
        <div className="rounded-4xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-800 dark:bg-gray-950">
          <div className="mb-6 text-left">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">Pay with QR code</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Scan this QR code with your mobile payment app to complete the order.</p>
          </div>
          <div className="mx-auto grid h-72 w-72 place-items-center rounded-3xl bg-black text-white shadow-inner">
            <div className="h-56 w-56 rounded-3xl bg-white p-4 text-black">
              <div className="grid h-full w-full gap-2">
                {Array.from({ length: 7 }).map((_, row) => (
                  <div key={row} className="flex justify-between gap-2">
                    {Array.from({ length: 7 }).map((_, col) => (
                      <div
                        key={col}
                        className={`h-6 w-6 ${Math.random() > 0.5 ? 'bg-black' : 'bg-white'}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-3xl bg-gray-100 p-4 text-left text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
            <p><span className="font-semibold">Amount:</span> Ksh. 0.00</p>
            <p className="mt-1"><span className="font-semibold">Reference:</span> CHAI-QR-2026</p>
          </div>
        </div>
      </div>
    </div>
  )
}
