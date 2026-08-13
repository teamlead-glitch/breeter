'use client'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { X, ShieldCheck, AlertCircle, Loader2 } from 'lucide-react'
import { createRazorpayOrder, fetchOrderStatus } from '@/lib/payments'
import { loadRazorpayScript } from '@/lib/razorpay'
import { BookingDetailsRequest } from '@/types/booking'
import { TravellerInfo } from '@/types/payments'

const OTP_LENGTH = 4
const POLL_INTERVAL_MS = 3000
const MAX_POLL_ATTEMPTS = 20 // ~60s of polling before we tell the user it's still processing

type Status =
  | 'otp'
  | 'otp-verifying'
  | 'creating-order'
  | 'confirming'
  | 'success'
  | 'error'
  | 'cancelled'
  | 'timeout'

export default function OtpVerificationModal({
  onClose,
  amount,
  booking,
  traveller,
  cabCategoryName,
}: {
  onClose: () => void
  amount: number
  booking: BookingDetailsRequest
  traveller: TravellerInfo
  cabCategoryName?: string
}) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [status, setStatus] = useState<Status>('otp')
  const [errorMessage, setErrorMessage] = useState('')
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const paymentHandledRef = useRef(false)
  const pollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mountedRef = useRef(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => inputsRef.current[0]?.focus())
    return () => {
      mountedRef.current = false
      document.body.style.overflow = ''
      cancelAnimationFrame(raf)
      if (pollTimerRef.current) clearTimeout(pollTimerRef.current)
    }
  }, [])

  const code = digits.join('')
  const complete = code.length === OTP_LENGTH

  const setDigit = (i: number, value: string) => {
    const v = value.replace(/\D/g, '').slice(-1)
    setDigits(prev => {
      const next = [...prev]
      next[i] = v
      return next
    })
    if (v && i < OTP_LENGTH - 1) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) inputsRef.current[i - 1]?.focus()
  }

  const pollOrderStatus = (id: string | number) => {
    let attempts = 0
    const tick = async () => {
      attempts += 1
      const res = await fetchOrderStatus(id)
      if (!mountedRef.current) return

      if (res.data?.data.status === 'paid') {
        setStatus('success')
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

  const startPayment = async () => {
    setStatus('creating-order')
    setErrorMessage('')
    paymentHandledRef.current = false

    try {
      await loadRazorpayScript()
    } catch {
      setErrorMessage('Could not load the payment window. Check your connection and try again.')
      setStatus('error')
      return
    }

    const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    if (!key) {
      setErrorMessage('Payments are not configured yet.')
      setStatus('error')
      return
    }

    const res = await createRazorpayOrder({ booking, traveller, amount })
    if (!mountedRef.current) return
    if (res.error || !res.data) {
      setErrorMessage(res.error || 'Could not start the payment. Please try again.')
      setStatus('error')
      return
    }

    const { order_id, amount: paiseAmount, currency, booking_id } = res.data.data

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
        pollOrderStatus(booking_id)
      },
    })

    rzp.on('payment.failed', event => {
      if (!mountedRef.current) return
      setErrorMessage(event.error?.description || 'Payment failed. Please try again.')
      setStatus('error')
    })

    rzp.open()
  }

  const handleVerify = () => {
    if (!complete) return
    setStatus('otp-verifying')
    setTimeout(startPayment, 900)
  }

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

        {(status === 'otp' || status === 'otp-verifying') && (
          <>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Verify your number</h2>
            <p className="text-ink-faint text-sm mb-6">
              An OTP has been sent to your number. Please verify it to proceed with your booking.
            </p>

            <div className="flex items-center justify-center gap-3 mb-6">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputsRef.current[i] = el }}
                  value={d}
                  onChange={e => setDigit(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  disabled={status === 'otp-verifying'}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`OTP digit ${i + 1}`}
                  className="w-12 h-14 text-center text-xl font-bold text-ink bg-ivory rounded-xl border-2 border-transparent focus:border-cta/50 outline-none transition-colors disabled:opacity-60"
                />
              ))}
            </div>

            <button
              disabled={!complete || status === 'otp-verifying'}
              onClick={handleVerify}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
                complete && status !== 'otp-verifying'
                  ? 'bg-cta hover:bg-cta-dark text-white'
                  : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
              }`}>
              {status === 'otp-verifying' ? 'Verifying…' : 'Verify & Pay'}
            </button>
          </>
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

        {status === 'success' && (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cta/10 text-cta">
              <ShieldCheck size={26} />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Payment received</h2>
            <p className="text-ink-faint text-sm mb-6">Your number is verified and your booking is confirmed.</p>
            <button
              onClick={onClose}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
              Done
            </button>
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
                onClick={startPayment}
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
