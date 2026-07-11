import { forwardRef } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

const TermsAgreement = forwardRef<HTMLLabelElement, { agreed: boolean; onToggle: () => void; className?: string }>(
  function TermsAgreement({ agreed, onToggle, className = '' }, ref) {
    return (
      <label
        ref={ref}
        tabIndex={0}
        role="checkbox"
        aria-checked={agreed}
        onClick={onToggle}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onToggle()
          }
        }}
        className={`flex items-start gap-2.5 cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-cta/50 ${className}`}>
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
    )
  }
)

export default TermsAgreement
