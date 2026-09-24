'use client'
import { useState } from 'react'
import { Info } from 'lucide-react'
import { RazorpayPaymentType } from '@/types/payments'

export default function MobilePayBar({
  payNow,
  total,
  agreed,
  refreshing = false,
  onPayAttempt,
  onPayNow,
  isEnquiry = false,
  onSendEnquiry,
}: {
  payNow: number
  total: number
  agreed: boolean
  refreshing?: boolean
  onPayAttempt: () => void
  onPayNow: (type: RazorpayPaymentType) => void
  isEnquiry?: boolean
  onSendEnquiry?: () => void
}) {
  const [payOption, setPayOption] = useState<'partial' | 'full'>('partial')
  const balance = total - payNow

  if (isEnquiry) {
    return (
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40">
        <div className="bg-[#E3EFE6] px-4 py-2.5 text-center">
          <p className="text-xs font-semibold text-cta-dark">No payment needed now — we&apos;ll confirm and get back to you.</p>
        </div>
        <div className="bg-ink px-4 pt-3 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white/70">Estimated fare</p>
              <p className="font-mono text-sm font-bold text-white">₹{total.toLocaleString('en-IN')}</p>
            </div>
            <button
              disabled={refreshing}
              onClick={() => { if (!refreshing) onSendEnquiry?.() }}
              className={`flex-none uppercase tracking-wide font-bold text-sm px-7 py-3.5 rounded-xl transition-all ${
                refreshing
                  ? 'bg-white/10 text-white/40'
                  : 'bg-gradient-to-r from-cta-light to-cta text-white shadow-lg shadow-cta/30 active:scale-95'
              }`}>
              Send enquiry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40">
      {/* Reassurance strip — solid, not translucent: this sits over whatever is scrolled
          beneath it (footer included), so any alpha here lets that content bleed through. */}
      <div className="bg-[#E3EFE6] px-4 py-2.5 text-center">
        <p className="text-xs font-semibold text-cta-dark">
          {payOption === 'partial'
            ? `Pay ₹${payNow.toLocaleString('en-IN')} in advance to reserve, ₹${balance.toLocaleString('en-IN')} to the driver.`
            : `Pay ₹${total.toLocaleString('en-IN')} now — nothing due to the driver.`}
        </p>
      </div>

      <div className="bg-ink px-4 pt-3 pb-4 shadow-[0_-8px_24px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-3">
          <div role="radiogroup" aria-label="Payment option" className="flex flex-1 min-w-0 items-center gap-4">
            <button
              type="button"
              role="radio"
              aria-checked={payOption === 'partial'}
              onClick={() => setPayOption('partial')}
              className="flex flex-col items-start gap-0.5">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 grid place-items-center transition-colors ${
                    payOption === 'partial' ? 'border-cta-light' : 'border-white/25'
                  }`}>
                  {payOption === 'partial' && <span className="w-2 h-2 rounded-full bg-cta-light" />}
                </span>
                <span className="text-[11px] font-semibold text-white/70">Part Pay</span>
              </span>
              <span className="font-mono text-sm font-bold text-white pl-6">₹{payNow.toLocaleString('en-IN')}</span>
            </button>

            <button
              type="button"
              role="radio"
              aria-checked={payOption === 'full'}
              onClick={() => setPayOption('full')}
              className="flex flex-col items-start gap-0.5">
              <span className="flex items-center gap-1.5">
                <span
                  className={`w-4 h-4 rounded-full border-2 flex-shrink-0 grid place-items-center transition-colors ${
                    payOption === 'full' ? 'border-cta-light' : 'border-white/25'
                  }`}>
                  {payOption === 'full' && <span className="w-2 h-2 rounded-full bg-cta-light" />}
                </span>
                <span className="text-[11px] font-semibold text-white/70">Full Pay</span>
              </span>
              <span className="font-mono text-sm font-bold text-white pl-6">₹{total.toLocaleString('en-IN')}</span>
            </button>

            <button
              type="button"
              aria-label="Why two payment options?"
              onClick={() => window.alert('Part Pay: 20% now secures your booking, the rest goes to the driver after your trip.\n\nFull Pay: pay the whole fare now, nothing due to the driver.')}
              className="flex-shrink-0 text-white/40 hover:text-white/70 transition-colors">
              <Info size={16} />
            </button>
          </div>

          <button
            disabled={refreshing}
            onClick={() => { if (!agreed) onPayAttempt(); else onPayNow(payOption === 'partial' ? 'advance' : 'balance') }}
            className={`flex-none uppercase tracking-wide font-bold text-sm px-7 py-3.5 rounded-xl transition-all ${
              refreshing
                ? 'bg-white/10 text-white/40'
                : 'bg-gradient-to-r from-cta-light to-cta text-white shadow-lg shadow-cta/30 active:scale-95'
            }`}>
            Pay now
          </button>
        </div>
      </div>
    </div>
  )
}
