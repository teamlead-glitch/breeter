'use client'

import { useState, type FormEvent } from 'react'
import { Check } from 'lucide-react'
import { apiPost } from '@/lib/apiService'

type FormValues = {
  name: string
  phone: string
  email: string
  message: string
}

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

  if (!values.message.trim()) errors.message = 'Message is required'

  return errors
}

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submitError, setSubmitError] = useState('')

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
    const res = await apiPost('v1/contact-enquiries', {
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
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

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-forest/10 grid place-items-center mx-auto mb-3">
          <Check size={20} className="text-forest" />
        </div>
        <h3 className="font-bold text-ink text-lg mb-1">Message sent!</h3>
        <p className="text-ink-faint text-xs">We&apos;ll get back to you within 2 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-black/5 p-6">
      <h2 className="font-bold text-ink text-lg mb-5">Send an enquiry</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Name</label>
          <input
            value={values.name}
            onChange={e => handleChange('name', e.target.value)}
            className={fieldClass(errors.name)}
            placeholder="Your name"
          />
          {errors.name && <p className="text-red-500 text-[11px] mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Phone</label>
          <input
            value={values.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className={fieldClass(errors.phone)}
            placeholder="Your phone"
          />
          {errors.phone && <p className="text-red-500 text-[11px] mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Email</label>
        <input
          value={values.email}
          onChange={e => handleChange('email', e.target.value)}
          className={fieldClass(errors.email)}
          placeholder="Your email"
        />
        {errors.email && <p className="text-red-500 text-[11px] mt-1">{errors.email}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Message</label>
        <textarea
          value={values.message}
          onChange={e => handleChange('message', e.target.value)}
          rows={5}
          className={`${fieldClass(errors.message)} resize-none`}
          placeholder="Tell us how we can help…"
        />
        {errors.message && <p className="text-red-500 text-[11px] mt-1">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="text-red-500 text-xs mb-3">{submitError || 'Something went wrong. Please try again.'}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-cta hover:bg-cta-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}
