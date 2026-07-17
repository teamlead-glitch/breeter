import Link from 'next/link'

export default function CancellationTabPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-ink-muted text-sm mb-3">
        Free cancellation until <strong className="text-ink">9:00 AM, 22 Aug</strong> — 12 hours before pickup time.
      </p>
      <ul className="space-y-2 mb-4">
        {[
          ['Before 24 hrs', 'Full refund'],
          ['12–24 hrs', '50% refund'],
          ['Within 12 hrs', 'No refund'],
        ].map(([when, what]) => (
          <li key={when} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className="w-1.5 h-1.5 bg-ink-faint/40 rounded-full mt-1.5 flex-shrink-0" />
            {when} — <span className="font-semibold text-ink">{what}</span>
          </li>
        ))}
      </ul>
      <Link href="/cancellation-policy" className="text-cta text-sm font-semibold hover:underline underline-offset-4">
        View full Cancellation Policy →
      </Link>
    </div>
  )
}
