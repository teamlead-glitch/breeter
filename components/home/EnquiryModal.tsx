'use client'
import { useEffect, useState, type FormEvent } from 'react'
import { Check, X } from 'lucide-react'
import { apiPost } from '@/lib/apiService'

type FormValues = { name: string; phone: string; email: string; message: string }
type FormErrors = Partial<Record<keyof FormValues, string>>

const EMPTY_VALUES: FormValues = { name: '', phone: '', email: '', message: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[+]?[\d\s-]{7,15}$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = 'Name is required'

  if (!values.phone.trim()) errors.phone = 'Phone number is required'
  else if (!PHONE_PATTERN.test(values.phone.trim())) errors.phone = 'Enter a valid phone number'

  if (!values.email.trim()) errors.email = 'Email is required'
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Enter a valid email address'

  return errors
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

type EnquiryModalProps = { subject: string; onClose: () => void; category: string }

export default function EnquiryModal({ subject, category, onClose }: EnquiryModalProps) {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  function handleChange(field: keyof FormValues, value: string) {
    setValues(prev => ({ ...prev, [field]: value }))
    setErrors(prev => (prev[field] ? { ...prev, [field]: undefined } : prev))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    const message = values.message.trim()
    const res = await apiPost('v1/contact-enquiries', {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      category,
      message: `[${subject}] ${message}`.trim(),
    })

    if (res.error) {
      setSubmitError(res.error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  const fieldClass = (hasError?: string) =>
    `w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 outline-none transition-colors ${
      hasError ? 'border-red-300' : 'border-transparent focus:border-forest/25'
    }`

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-label={`${subject} enquiry`}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-xl bg-ivory text-ink-muted transition-colors hover:bg-ivory-dark hover:text-ink">
          <X size={18} />
        </button>

        {status === 'success' ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-forest/10">
              <Check size={20} className="text-forest" />
            </div>
            <h2 className="font-display text-ink text-lg font-bold mb-1">Enquiry sent!</h2>
            <p className="text-ink-faint text-xs">We&apos;ll get back to you shortly with a custom quote.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="font-display text-ink text-lg font-bold mb-1">{subject}</h2>
            <p className="text-ink-faint text-xs mb-5">Get a custom quote — no payment required.</p>

            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">Name</label>
                <input value={values.name} onChange={e => handleChange('name', e.target.value)} className={fieldClass(errors.name)} placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">Phone</label>
                <input value={values.phone} onChange={e => handleChange('phone', e.target.value)} className={fieldClass(errors.phone)} placeholder="Your phone" />
                {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">Email</label>
                <input value={values.email} onChange={e => handleChange('email', e.target.value)} className={fieldClass(errors.email)} placeholder="Your email" />
                {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">Message (optional)</label>
                <textarea
                  value={values.message}
                  onChange={e => handleChange('message', e.target.value)}
                  rows={3}
                  className={`${fieldClass()} resize-none`}
                  placeholder="Any questions or details?"
                />
              </div>
            </div>

            {status === 'error' && <p className="text-red-500 text-xs mb-3">{submitError || 'Something went wrong. Please try again.'}</p>}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full bg-cta hover:bg-cta-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm py-3.5 rounded-xl transition-colors">
              {status === 'submitting' ? 'Sending…' : 'Request Quote'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
