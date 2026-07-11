import Link from 'next/link'
import { Edit3 } from 'lucide-react'

export default function TripSummary() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 relative">
      <Link href="/search"
        className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-cta hover:bg-cta/8 border border-cta/20 px-3 py-1.5 rounded-lg transition-colors">
        <Edit3 size={12} /> Edit
      </Link>
      <p className="text-ink-faint text-xs mb-3">Outstation One Way Trip (Drop)</p>

      {/* Mobile: From/To stacked vertically */}
      <div className="sm:hidden relative pl-0.5">
        <div className="absolute left-1.75 top-2.5 bottom-2.5 border-l-2 border-dashed border-ink-faint/25" />
        <div className="relative flex items-center gap-3 pb-4">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-faint/40 bg-white flex-shrink-0" />
          <div>
            <p className="font-bold text-ink text-lg leading-tight">Kochi</p>
            <p className="text-ink-faint text-xs">Kerala</p>
          </div>
        </div>
        <div className="relative flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-cta flex-shrink-0" />
          <div>
            <p className="font-bold text-ink text-lg leading-tight">Kannur</p>
            <p className="text-ink-faint text-xs">Kerala</p>
          </div>
        </div>
      </div>

      {/* Tablet/desktop: From — To in a row */}
      <div className="hidden sm:flex items-center gap-3">
        <div>
          <p className="font-bold text-ink text-lg leading-tight">Kochi</p>
          <p className="text-ink-faint text-xs">Kerala</p>
        </div>
        <div className="flex-1 flex items-center gap-1 px-2">
          <span className="w-2 h-2 rounded-full border-2 border-ink-faint/40 flex-shrink-0" />
          <div className="flex-1 border-t-2 border-dashed border-ink-faint/25" />
          <span className="w-2 h-2 rounded-full bg-cta flex-shrink-0" />
        </div>
        <div className="text-right">
          <p className="font-bold text-ink text-lg leading-tight">Kannur</p>
          <p className="text-ink-faint text-xs">Kerala</p>
        </div>
      </div>
      <p className="text-ink-faint text-xs mt-3">📅 23 Aug 2026, 10:00 AM · ~295 km</p>
    </div>
  )
}
