import Link from 'next/link'

export default function CancellationTabPanel() {
  return (
    <div className="p-4 sm:p-5">
      <p className="text-ink-muted text-sm mb-3">
        {/* Free cancellation until <strong className="text-ink">9:00 AM, 22 Aug</strong> — 12 hours before pickup time. */}
        Free cancellation until  <strong className="text-ink">12 hours </strong> before pickup time.
      
      </p>
      
      <Link href="/cancellation-policy" className="text-cta text-sm font-semibold hover:underline underline-offset-4">
        View full Cancellation Policy →
      </Link>
    </div>
  )
}
