import Link from 'next/link'
import { ArrowRight, SearchX } from 'lucide-react'

export default function BookingIssueNotice({ heading, message }: { heading: string; message: string }) {
  return (
    <div className="min-h-screen bg-ivory grid place-items-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-white border border-black/5 shadow-sm">
          <SearchX size={28} className="text-cta" />
        </div>
        <h1 className="font-display text-ink text-xl font-bold mb-2">{heading}</h1>
        <p className="text-ink-faint text-sm leading-relaxed mb-7">{message}</p>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cta/20">
          See available cabs <ArrowRight size={15} />
        </Link>
        <p className="text-ink-faint text-xs mt-4">
          You can also tweak your route, dates or trip type there to pull up cabs that match.
        </p>
      </div>
    </div>
  )
}
