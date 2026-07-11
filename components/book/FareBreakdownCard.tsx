import Link from 'next/link'
import { Check } from 'lucide-react'
import { ADD_ONS } from './data'

export default function FareBreakdownCard({
  basefare,
  stopsCount,
  stopsCharge,
  addOns,
  total,
  payNow,
  balance,
  agreed,
  onToggleAgree,
}: {
  basefare: number
  stopsCount: number
  stopsCharge: number
  addOns: string[]
  total: number
  payNow: number
  balance: number
  agreed: boolean
  onToggleAgree: () => void
}) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
      <h3 className="font-bold text-ink text-base mb-4">Fare breakdown</h3>

      <div className="space-y-2.5 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">Base + slab KM</span>
          <span className="font-mono font-semibold text-ink">₹{basefare.toLocaleString('en-IN')}</span>
        </div>
        {stopsCount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-ink-muted">Stops ({stopsCount} × ₹100)</span>
            <span className="font-mono font-semibold text-ink">₹{stopsCharge}</span>
          </div>
        )}
        {ADD_ONS.filter(a => addOns.includes(a.id)).map(a => (
          <div key={a.id} className="flex justify-between text-sm">
            <span className="text-ink-muted">{a.label}</span>
            <span className="font-mono font-semibold text-ink">₹{a.price}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 pt-3 mb-3">
        <div className="flex justify-between">
          <span className="font-bold text-ink text-sm">Total fare</span>
          <span className="font-mono font-bold text-cta text-lg">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <div className="bg-cta/5 border border-cta/10 rounded-xl p-3.5 mb-4">
        <div className="flex justify-between text-sm mb-1.5">
          <span className="text-ink-muted">Pay now (20%)</span>
          <span className="font-mono font-bold text-cta">₹{payNow.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ink-muted">Balance (offline)</span>
          <span className="font-mono text-ink-faint">₹{balance.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <label onClick={onToggleAgree} className="flex items-start gap-2.5 mb-4 cursor-pointer">
        <span
          aria-hidden
          className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
            agreed ? 'bg-cta border-cta text-white' : 'border-ink-faint/40'
          }`}>
          {agreed && <Check size={10} />}
        </span>
        <span className="text-xs text-ink-muted leading-relaxed">
          I agree to the{' '}
          <Link href="/terms" onClick={e => e.stopPropagation()} className="text-cta font-semibold hover:underline">
            Terms &amp; cancellation policy
          </Link>
        </span>
      </label>

      <button
        disabled={!agreed}
        className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
          agreed
            ? 'bg-cta hover:bg-cta-dark text-white'
            : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
        }`}>
        Proceed to payment →
      </button>
    </div>
  )
}
