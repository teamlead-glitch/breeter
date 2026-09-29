import { Edit3 } from 'lucide-react'
import { useBookModal } from '@/components/common/BookModalContext'
import { formatDate, formatTime } from '@/lib/date'

export default function TripSummary({
  tripTypeName,
  fromLocation,
  toLocation,
  stops = [],
  stateName,
  distanceKm,
  hourlyPackageHours,
  extraKmRate,
  pickupDate,
}: {
  tripTypeName: string
  fromLocation: string
  toLocation: string
  stops?: string[]
  stateName: string
  distanceKm: number
  // Only set for Hourly Rental (the 4/6/8 Hrs package picked in search).
  hourlyPackageHours?: number
  // pricing.detail.extra_km_rate — shown as a note when the route charges beyond the included kms.
  extraKmRate?: number
  pickupDate: string
}) {
  const { openBookModal } = useBookModal()

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 relative">
      <button onClick={openBookModal}
        className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-cta hover:bg-cta/8 border border-cta/20 px-3 py-1.5 rounded-lg transition-colors">
        <Edit3 size={12} /> Edit
      </button>
      <p className="text-ink-faint text-xs mb-3">Outstation trip · {tripTypeName}</p>

      {/* Mobile: From/To stacked vertically */}
      <div className="sm:hidden relative pl-0.5">
        <div className="absolute left-1.75 top-2.5 bottom-2.5 border-l-2 border-dashed border-ink-faint/25" />
        <div className="relative flex items-center gap-3 pb-4">
          <span className="w-3.5 h-3.5 rounded-full border-2 border-ink-faint/40 bg-white flex-shrink-0" />
          <div>
            <p className="font-bold text-ink text-lg leading-tight">{fromLocation}</p>
            {/* <p className="text-ink-faint text-xs">{stateName}</p> */}
          </div>
        </div>
        {stops.map((stop, i) => (
          <div key={i} className="relative flex items-center gap-3 pb-4">
            <span className="w-2.5 h-2.5 ml-0.5 rounded-full border-2 border-ink-faint/40 bg-ivory flex-shrink-0" />
            <p className="text-ink-muted text-sm font-semibold leading-tight">{stop}</p>
          </div>
        ))}
        <div className="relative flex items-center gap-3">
          <span className="w-3.5 h-3.5 rounded-full bg-cta flex-shrink-0" />
          <div>
            <p className="font-bold text-ink text-lg leading-tight">{toLocation}</p>
            {/* <p className="text-ink-faint text-xs">{stateName}</p> */}
          </div>
        </div>
      </div>

      {/* Tablet/desktop: From — To in a row */}
      <div className="hidden sm:flex items-center gap-3">
        <div>
          <p className="font-bold text-ink text-lg leading-tight">{fromLocation}</p>
          {/* <p className="text-ink-faint text-xs">{stateName}</p> */}
        </div>
        <div className="flex-1 flex items-center gap-1 px-2">
          <span className="w-2 h-2 rounded-full border-2 border-ink-faint/40 flex-shrink-0" />
          <div className="flex-1 border-t-2 border-dashed border-ink-faint/25" />
          <span className="w-2 h-2 rounded-full bg-cta flex-shrink-0" />
        </div>
        <div className="text-right">
          <p className="font-bold text-ink text-lg leading-tight">{toLocation}</p>
          {/* <p className="text-ink-faint text-xs">{stateName}</p> */}
        </div>
      </div>
      {stops.length > 0 && (
        <p className="hidden sm:block text-ink-faint text-xs mt-2">via {stops.join(', ')}</p>
      )}
      <p className="text-ink-faint text-xs mt-3">📅 {formatDate(pickupDate, { withYear: true })}, {formatTime(pickupDate)}</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <p className="text-ink text-sm font-bold">~{distanceKm} km</p>
        {hourlyPackageHours !== undefined && (
          <span className="rounded-full bg-cta/10 px-2.5 py-0.5 text-xs font-bold text-cta">{hourlyPackageHours} Hrs package</span>
        )}
        {extraKmRate !== undefined && extraKmRate > 0 && (
          <span className="text-ink-faint text-xs">₹{extraKmRate}/km will apply beyond the included kms</span>
        )}
      </div>
    </div>
  )
}
