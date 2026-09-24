'use client'
import { useRef, useState } from 'react'
import PriceBreakdownList from './PriceBreakdownList'
import TermsAgreement from './TermsAgreement'
import { RazorpayPaymentType } from '@/types/payments'

export default function FareBreakdownCard({
  breakdown,
  tax,
  total,
  payNow,
  balance,
  agreed,
  refreshing = false,
  onToggleAgree,
  onPayNow,
  isEnquiry = false,
  onSendEnquiry,
}: {
  breakdown: { label: string; amount: number }[]
  tax?: number
  total: number
  payNow: number
  balance: number
  agreed: boolean
  refreshing?: boolean
  onToggleAgree: () => void
  onPayNow: (type: RazorpayPaymentType) => void
  isEnquiry?: boolean
  onSendEnquiry?: () => void
}) {
  const [payOption, setPayOption] = useState<'partial' | 'full'>('partial')
  const [termsError, setTermsError] = useState<string | undefined>()
  const termsRef = useRef<HTMLLabelElement>(null)
  const payAmount = payOption === 'partial' ? payNow : total
  const cardClass = `bg-white rounded-2xl border border-black/5 p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto transition-opacity ${refreshing ? 'opacity-60' : ''}`
  const buttonClass = `w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
    refreshing ? 'bg-ink-faint/15 text-ink-faint cursor-not-allowed' : 'bg-cta hover:bg-cta-dark text-white'
  }`

  if (isEnquiry) {
    return (
      <div className={cardClass}>
        <PriceBreakdownList breakdown={breakdown} tax={tax} total={total} refreshing={refreshing} />
        <p className="text-xs text-ink-faint mt-3 mb-4">No payment needed now — our team will confirm availability and get back to you.</p>
        <button disabled={refreshing} onClick={() => { if (!refreshing) onSendEnquiry?.() }} className={buttonClass}>
          Send enquiry →
        </button>
      </div>
    )
  }

  return (
    <div className={cardClass}>
      <PriceBreakdownList breakdown={breakdown} tax={tax} total={total} refreshing={refreshing} />

      <div role="radiogroup" aria-label="Payment option" className="space-y-2 mb-4 mt-3">
        <label
          onClick={() => setPayOption('partial')}
          className={`flex items-start gap-3 rounded-xl p-3.5 cursor-pointer border transition-colors ${
            payOption === 'partial' ? 'bg-cta/5 border-cta/30' : 'border-black/10 hover:border-black/20'
          }`}>
          <span
            role="radio"
            aria-checked={payOption === 'partial'}
            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
              payOption === 'partial' ? 'border-cta' : 'border-ink-faint/40'
            }`}>
            {payOption === 'partial' && <span className="w-2 h-2 rounded-full bg-cta" />}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink-muted">Pay now (20%)</span>
              <span className="font-mono font-bold text-cta">₹{payNow.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-ink-faint">Balance (offline)</span>
              <span className="font-mono text-ink-faint">₹{balance.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </label>

        <label
          onClick={() => setPayOption('full')}
          className={`flex items-start gap-3 rounded-xl p-3.5 cursor-pointer border transition-colors ${
            payOption === 'full' ? 'bg-cta/5 border-cta/30' : 'border-black/10 hover:border-black/20'
          }`}>
          <span
            role="radio"
            aria-checked={payOption === 'full'}
            className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
              payOption === 'full' ? 'border-cta' : 'border-ink-faint/40'
            }`}>
            {payOption === 'full' && <span className="w-2 h-2 rounded-full bg-cta" />}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink-muted">Pay full</span>
              <span className="font-mono font-bold text-cta">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-ink-faint">Nothing due on pickup</p>
          </div>
        </label>
      </div>

      <TermsAgreement
        ref={termsRef}
        agreed={agreed}
        onToggle={() => { onToggleAgree(); setTermsError(undefined) }}
        error={termsError}
        className="mb-4"
      />

      <button
        disabled={refreshing}
        onClick={() => {
          if (refreshing) return
          if (!agreed) {
            setTermsError('Please agree to the terms to continue.')
            termsRef.current?.focus()
            termsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
            return
          }
          onPayNow(payOption === 'partial' ? 'advance' : 'balance')
        }}
        className={buttonClass}>
        Pay ₹{payAmount.toLocaleString('en-IN')} now →
      </button>
    </div>
  )
}
