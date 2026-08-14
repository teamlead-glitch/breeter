'use client'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { TravellerInfo } from '@/types/payments'
import PhoneOtpModal from './PhoneOtpModal'

export type TravellerDetailsFormHandle = {
  validate: () => boolean
  getValues: () => TravellerInfo
  isPhoneVerified: () => boolean
  requirePhoneVerification: () => void
}

type FieldErrors = { name?: string; phone?: string; email?: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const TravellerDetailsForm = forwardRef<TravellerDetailsFormHandle>((_props, ref) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})

  const [phoneOtpOpen, setPhoneOtpOpen] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [verifiedPhone, setVerifiedPhone] = useState<string | null>(null)
  const [verifyNotice, setVerifyNotice] = useState<string | null>(null)

  const nameInputRef = useRef<HTMLInputElement>(null)
  const phoneInputRef = useRef<HTMLInputElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)
  const verifyButtonRef = useRef<HTMLButtonElement>(null)

  useImperativeHandle(ref, () => ({
    validate: () => {
      const nextErrors: FieldErrors = {}
      if (!name.trim()) nextErrors.name = 'Enter your name'
      if (phone.replace(/\D/g, '').length < 7) nextErrors.phone = 'Enter a valid contact number'
      if (!EMAIL_PATTERN.test(email.trim())) nextErrors.email = 'Enter a valid email address'

      setErrors(nextErrors)

      const firstInvalidInput = nextErrors.name
        ? nameInputRef.current
        : nextErrors.phone
          ? phoneInputRef.current
          : nextErrors.email
            ? emailInputRef.current
            : null

      firstInvalidInput?.focus()
      firstInvalidInput?.scrollIntoView({ behavior: 'smooth', block: 'center' })

      return firstInvalidInput === null
    },
    getValues: () => ({ name: name.trim(), phone: phone.trim(), email: email.trim(), notes: notes.trim() }),
    isPhoneVerified: () => otpVerified,
    requirePhoneVerification: () => {
      setVerifyNotice('Please verify your mobile number to continue.')
      verifyButtonRef.current?.focus()
      verifyButtonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    },
  }))

  const handlePhoneChange = (value: string) => {
    const next = value.replace(/[^\d\s+]/g, '').slice(0, 15)
    setPhone(next)
    if (next !== verifiedPhone) setOtpVerified(false)
  }

  const fieldClass = (hasError?: string) =>
    `w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 outline-none transition-colors ${
      hasError ? 'border-red-300 focus:border-red-400' : 'border-transparent focus:border-forest/25'
    }`

  const phoneLooksValid = phone.replace(/\D/g, '').length >= 7

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5">
      <h3 className="font-bold text-ink text-base mb-5">Traveller details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Name</label>
          <input
            ref={nameInputRef}
            name="name"
            autoComplete="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className={fieldClass(errors.name)}
            placeholder="Your full name"
          />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Email ID</label>
          <input
            ref={emailInputRef}
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className={fieldClass(errors.email)}
            placeholder="you@email.com"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Contact No.</label>
          <input
            ref={phoneInputRef}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={15}
            value={phone}
            onChange={e => handlePhoneChange(e.target.value)}
            className={fieldClass(errors.phone)}
            placeholder="+91 98765 43213"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          {verifyNotice && !otpVerified && <p className="mt-1.5 text-xs text-red-600">{verifyNotice}</p>}
        </div>

        <div className="sm:self-center">
          {otpVerified ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-cta">
              <CheckCircle2 size={14} /> Number verified
            </span>
          ) : (
            <button
              ref={verifyButtonRef}
              type="button"
              onClick={() => { setPhoneOtpOpen(true); setVerifyNotice(null) }}
              disabled={!phoneLooksValid}
              className="inline-flex flex-none items-center justify-center rounded-full border border-cta px-4 py-2.5 text-xs font-bold text-cta transition-colors hover:bg-cta hover:text-white disabled:cursor-not-allowed disabled:border-ink-faint/30 disabled:text-ink-faint disabled:hover:bg-transparent">
              Verify number
            </button>
          )}
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Notes for driver (optional)</label>
        <textarea
          rows={3}
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none resize-none"
          placeholder="Pickup from main gate…"
        />
      </div>

      {phoneOtpOpen && (
        <PhoneOtpModal
          phone={phone.trim()}
          onClose={() => setPhoneOtpOpen(false)}
          onVerified={() => {
            setOtpVerified(true)
            setVerifiedPhone(phone)
            setPhoneOtpOpen(false)
          }}
        />
      )}
    </div>
  )
})

TravellerDetailsForm.displayName = 'TravellerDetailsForm'

export default TravellerDetailsForm
