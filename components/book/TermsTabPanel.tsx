import Link from 'next/link'

export default function TermsTabPanel() {
  return (
    <div className="p-4 sm:p-5">
      <ul className="space-y-2 mb-4">
        {[
          'Fares are all-inclusive and slab-based.',
          'The same driver and vehicle model may not always be available.',
          'Breeter reserves the right to substitute an equivalent vehicle.',
          'Waiting charges apply after 30 minutes from scheduled pickup.',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className="w-1.5 h-1.5 bg-ink-faint/40 rounded-full mt-1.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <Link href="/terms" className="text-cta text-sm font-semibold hover:underline underline-offset-4">
        View Policies →
      </Link>
    </div>
  )
}
