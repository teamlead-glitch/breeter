'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'
import { createRazorpayOrder, fetchOrderStatus } from '@/lib/payments'
import { loadRazorpayScript } from '@/lib/razorpay'
import { RazorpayPaymentType, TravellerInfo } from '@/types/payments'

const POLL_INTERVAL_MS = 3000
const MAX_POLL_ATTEMPTS = 20 // ~60s of polling before we tell the user it's still processing

type Status = 'creating-order' | 'confirming' | 'error' | 'cancelled' | 'timeout'

export default function PaymentModal({
  onClose,
  bookingId,
  type,
  traveller,
  cabCategoryName,
}: {
  onClose: () => void
  bookingId: number
  type: RazorpayPaymentType
  traveller: TravellerInfo
  cabCategoryName?: string
}) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>('creating-order')
  const [errorMessage, setErrorMessage] = useState('')
  const paymentHandledRef = useRef(false)
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  const pollOrderStatus = (id: string | number) => {
    let attempts = 0
    const tick = async () => {
      attempts += 1
      const res = await fetchOrderStatus(id)
      if (!mountedRef.current) return

      if (res.data?.data.status === 'paid') {
        const params = new URLSearchParams({ booking_id: String(res.data.data.booking_id) })
        if (traveller.email) params.set('email', traveller.email)
        router.push(`/book/success?${params.toString()}`)
        return
      }
      if (res.data?.data.status === 'failed') {
        setErrorMessage('Payment could not be confirmed. Please try again or contact support.')
        setStatus('error')
        return
      }
      if (attempts >= MAX_POLL_ATTEMPTS) {
        setStatus('timeout')
        return
      }
      pollTimerRef.current = setTimeout(tick, POLL_INTERVAL_MS)
    }
    tick()
  }

  // Assumes status is already 'creating-order' and errorMessage cleared — true on mount by
  // initial state, and callers that retry (an event handler, not this effect) reset both first.
  const startPayment = async () => {
    paymentHandledRef.current = false

    try {
      await loadRazorpayScript()
    } catch {
      setErrorMessage('Could not load the payment window. Check your connection and try again.')
      setStatus('error')
      return
    }

    const res = await createRazorpayOrder({ booking_id: bookingId, type })
    if (!mountedRef.current) return
    if (res.error || !res.data) {
      setErrorMessage(res.error || 'Could not start the payment. Please try again.')
      setStatus('error')
      return
    }

    const { order_id, amount: paiseAmount, currency, key, payment_id } = res.data.data

    const Razorpay = window.Razorpay
    if (!Razorpay) {
      setErrorMessage('Could not load the payment window. Check your connection and try again.')
      setStatus('error')
      return
    }

    const rzp = new Razorpay({
      key,
      amount: paiseAmount,
      currency,
      name: 'Breeter',
      description: cabCategoryName ? `${cabCategoryName} booking` : 'Cab booking',
      order_id,
      prefill: { name: traveller.name, email: traveller.email, contact: traveller.phone },
      theme: { color: '#1B7A33' },
      modal: {
        ondismiss: () => {
          if (!paymentHandledRef.current && mountedRef.current) setStatus('cancelled')
        },
      },
      // This callback is NOT proof of payment — Razorpay's client SDK can be spoofed.
      // The real confirmation comes from the backend webhook, so we poll our own status endpoint instead.
      handler: () => {
        paymentHandledRef.current = true
        if (!mountedRef.current) return
        setStatus('confirming')
        pollOrderStatus(payment_id)
      },
    })

    rzp.on('payment.failed', event => {
      if (!mountedRef.current) return
      setErrorMessage(event.error?.description || 'Payment failed. Please try again.')
      setStatus('error')
    })

    rzp.open()
  }

  useEffect(() => {
    // React Strict Mode runs this effect, its cleanup, then this effect again on mount —
    // without resetting the ref here, the cleanup's `false` from the first pass sticks
    // around and silently drops the real request's response when it lands.
    mountedRef.current = true
    document.body.style.overflow = 'hidden'
    startPayment()
    return () => {
      mountedRef.current = false
      document.body.style.overflow = ''
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={status === 'confirming' ? undefined : onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        {status !== 'confirming' && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
            <X size={18} />
          </button>
        )}

        {(status === 'creating-order' || status === 'confirming') && (
          <div className="text-center py-4">
            <Loader2 size={30} className="mx-auto mb-5 animate-spin text-cta" />
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">
              {status === 'creating-order' ? 'Starting secure payment…' : 'Confirming your payment…'}
            </h2>
            <p className="text-ink-faint text-sm">
              {status === 'creating-order'
                ? "Hang tight, we're opening the payment window."
                : "This can take a few seconds — please don't close this window."}
            </p>
          </div>
        )}

        {(status === 'error' || status === 'cancelled') && (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500">
              <AlertCircle size={26} />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">
              {status === 'cancelled' ? 'Payment not completed' : 'Payment failed'}
            </h2>
            <p className="text-ink-faint text-sm mb-6">
              {status === 'cancelled' ? "You closed the payment window before it finished. No amount was charged." : errorMessage}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-ivory hover:bg-ivory-dark text-ink font-bold py-3.5 rounded-xl text-sm transition-colors">
                Cancel
              </button>
              <button
                onClick={() => { setStatus('creating-order'); setErrorMessage(''); startPayment() }}
                className="flex-1 bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
                Try again
              </button>
            </div>
          </div>
        )}

        {status === 'timeout' && (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cta/10 text-cta">
              <ShieldCheck size={26} />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Still confirming…</h2>
            <p className="text-ink-faint text-sm mb-6">
              Your payment is taking longer than usual to confirm. We&apos;ll email and SMS you the booking confirmation as soon as it&apos;s done.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
