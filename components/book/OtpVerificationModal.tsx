'use client'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { X, ShieldCheck } from 'lucide-react'

const OTP_LENGTH = 4

export default function OtpVerificationModal({ onClose }: { onClose: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [status, setStatus] = useState<'entering' | 'verifying' | 'verified'>('entering')
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Mounted only while the modal is open, so this runs once per open — no reset-on-prop-change needed.
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const raf = requestAnimationFrame(() => inputsRef.current[0]?.focus())
    return () => {
      document.body.style.overflow = ''
      cancelAnimationFrame(raf)
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

  const handleVerify = () => {
    if (!complete) return
    setStatus('verifying')
    setTimeout(() => setStatus('verified'), 900)
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

        {status === 'verified' ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-cta/10 text-cta">
              <ShieldCheck size={26} />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1.5">Verified</h2>
            <p className="text-ink-faint text-sm mb-6">Your number is verified and your booking is confirmed.</p>
            <button
              onClick={onClose}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl text-sm transition-colors">
              Done
            </button>
          </div>
        ) : (
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
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`OTP digit ${i + 1}`}
                  className="w-12 h-14 text-center text-xl font-bold text-ink bg-ivory rounded-xl border-2 border-transparent focus:border-cta/50 outline-none transition-colors"
                />
              ))}
            </div>

            <button
              disabled={!complete || status === 'verifying'}
              onClick={handleVerify}
              className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
                complete && status !== 'verifying'
                  ? 'bg-cta hover:bg-cta-dark text-white'
                  : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
              }`}>
              {status === 'verifying' ? 'Verifying…' : 'Verify & Pay'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
