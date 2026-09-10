'use client'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { X, AlertCircle, Loader2 } from 'lucide-react'
import { sendOtp, verifyOtp } from '@/lib/otp'
import { SendOtpRequest } from '@/types/otp'

const OTP_LENGTH = 4

type Status = 'sending' | 'send-error' | 'entering' | 'verifying'

export default function PhoneOtpModal({
  payload,
  onClose,
  onVerified,
}: {
  payload: SendOtpRequest
  onClose: () => void
  onVerified: () => void
}) {
  const phone = payload.mobile_number
  const [status, setStatus] = useState<Status>('sending')
  const [otpId, setOtpId] = useState<string | null>(null)
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [errorMessage, setErrorMessage] = useState('')
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const mountedRef = useRef(true)

  // Assumes status is already 'sending' and errorMessage cleared — true on mount by initial
  // state, and the "Try again" button (an event handler, not this effect) resets both first.
  const send = async () => {
    const res = await sendOtp(payload)
    if (!mountedRef.current) return
    if (res.error || !res.data) {
      setErrorMessage(res.error || 'Could not send the OTP. Please try again.')
      setStatus('send-error')
      return
    }
    setOtpId(res.data.data.otp_id)
    setStatus('entering')
    requestAnimationFrame(() => inputsRef.current[0]?.focus())
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    send()
    return () => {
      mountedRef.current = false
      document.body.style.overflow = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleVerify = async () => {
    if (!complete || !otpId) return
    setStatus('verifying')
    setErrorMessage('')
    const res = await verifyOtp(otpId, code)
    if (!mountedRef.current) return
    if (res.error || !res.data?.data.verified) {
      setErrorMessage(res.error || 'Incorrect OTP. Please try again.')
      setStatus('entering')
      setDigits(Array(OTP_LENGTH).fill(''))
      requestAnimationFrame(() => inputsRef.current[0]?.focus())
      return
    }
    onVerified()
  }

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
          <X size={18} />
        </button>

        {status === 'sending' && (
          <div className="text-center py-4">
            <Loader2 size={30} className="mx-auto mb-5 animate-spin text-cta" />
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Sending OTP…</h2>
            <p className="text-ink-faint text-sm">Sending a verification code to {phone}</p>
          </div>
        )}

        {status === 'send-error' && (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-500">
              <AlertCircle size={26} />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Couldn&apos;t send OTP</h2>
            <p className="text-ink-faint text-sm mb-6">{errorMessage}</p>
            <button
              onClick={() => { setStatus('sending'); setErrorMessage(''); send() }}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
              Try again
            </button>
          </div>
        )}

        {(status === 'entering' || status === 'verifying') && (
          <>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Verify your number</h2>
            <p className="text-ink-faint text-sm mb-6">An OTP has been sent to {phone}. Please verify it to continue.</p>

            <div className="flex items-center justify-center gap-3 mb-4">
              {digits.map((d, i) => (
                <input
                  key={i}
                  ref={el => { inputsRef.current[i] = el }}
                  value={d}
                  onChange={e => setDigit(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  disabled={status === 'verifying'}
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`OTP digit ${i + 1}`}
                  className="w-12 h-14 text-center text-xl font-bold text-ink bg-ivory rounded-xl border-2 border-transparent focus:border-cta/50 outline-none transition-colors disabled:opacity-60"
                />
              ))}
            </div>

            {errorMessage && <p className="mb-4 text-center text-xs text-red-600">{errorMessage}</p>}

            <button
              disabled={!complete || status === 'verifying'}
              onClick={handleVerify}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
                complete && status !== 'verifying'
                  ? 'bg-cta hover:bg-cta-dark text-white'
                  : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
              }`}>
              {status === 'verifying' ? 'Verifying…' : 'Verify'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
