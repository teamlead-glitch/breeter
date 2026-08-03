'use client'
import { useState } from 'react'
import TermsAgreement from './TermsAgreement'

export default function FareBreakdownCard({
  breakdown,
  total,
  payNow,
  balance,
  agreed,
  refreshing = false,
  onToggleAgree,
}: {
  breakdown: { label: string; amount: number }[]
  total: number
  payNow: number
  balance: number
  agreed: boolean
  refreshing?: boolean
  onToggleAgree: () => void
}) {
  const [payOption, setPayOption] = useState<'partial' | 'full'>('partial')
  const payAmount = payOption === 'partial' ? payNow : total

  return (
    <div className={`bg-white rounded-2xl border border-black/5 p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto transition-opacity ${refreshing ? 'opacity-60' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-ink text-base">Fare breakdown</h3>
        {refreshing && <span className="text-ink-faint text-xs">Updating…</span>}
      </div>

      <div className="space-y-2.5 mb-4">
        {breakdown.map(line => (
          <div key={line.label} className="flex justify-between text-sm">
            <span className="text-ink-muted">{line.label}</span>
            <span className="font-mono font-semibold text-ink">₹{line.amount.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 pt-3 mb-3">
        <div className="flex justify-between">
          <span className="font-bold text-ink text-sm">Total fare</span>
          <span className="font-mono font-bold text-cta text-lg">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div role="radiogroup" aria-label="Payment option" className="space-y-2 mb-4">
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

      <TermsAgreement agreed={agreed} onToggle={onToggleAgree} className="mb-4" />

      <button
        disabled={!agreed || refreshing}
        className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
          agreed && !refreshing
            ? 'bg-cta hover:bg-cta-dark text-white'
            : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
        }`}>
        Pay ₹{payAmount.toLocaleString('en-IN')} now →
      </button>
    </div>
  )
}
