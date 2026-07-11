'use client'
import { useState } from 'react'

export default function MobilePayBar({
  payNow,
  total,
  agreed,
  onPayAttempt,
}: {
  payNow: number
  total: number
  agreed: boolean
  onPayAttempt: () => void
}) {
  const [payOption, setPayOption] = useState<'partial' | 'full'>('partial')
  const balance = total - payNow
  const payAmount = payOption === 'partial' ? payNow : total

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-black/8 px-4 pt-2.5 pb-3 shadow-2xl will-change-transform [transform:translateZ(0)]">
      <div role="radiogroup" aria-label="Payment option" className="flex items-center gap-1.5 mb-1.5">
        <button
          type="button"
          role="radio"
          aria-checked={payOption === 'partial'}
          onClick={() => setPayOption('partial')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
            payOption === 'partial' ? 'bg-cta text-white border-cta' : 'border-black/15 text-ink-faint'
          }`}>
          Pay 20% now
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={payOption === 'full'}
          onClick={() => setPayOption('full')}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
            payOption === 'full' ? 'bg-cta text-white border-cta' : 'border-black/15 text-ink-faint'
          }`}>
          Pay full
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-mono font-bold text-cta text-xl leading-tight">₹{payAmount.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-ink-faint">
            {payOption === 'partial' ? `Balance ₹${balance.toLocaleString('en-IN')} offline` : `Total ₹${total.toLocaleString('en-IN')} · nothing due offline`}
          </p>
        </div>
        <button
          onClick={() => { if (!agreed) onPayAttempt() }}
          className={`flex-none font-bold px-6 py-3.5 rounded-xl text-sm transition-colors ${
            agreed
              ? 'bg-cta hover:bg-cta-dark text-white'
              : 'bg-ink-faint/15 text-ink-faint'
          }`}>
          Pay now →
        </button>
      </div>
    </div>
  )
}
