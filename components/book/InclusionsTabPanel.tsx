import { TripTypeInclusion } from '@/types/booking'

// First item is always the route distance ("X km included"); the rest come from the
// booking-details API (per trip type).
export default function InclusionsTabPanel({
  inclusions,
  includedKm,
  extraKmRate,
}: {
  inclusions: TripTypeInclusion[]
  includedKm: number
  extraKmRate?: number
}) {
  return (
    <div className="p-4 sm:p-5 space-y-4">
      <div>
        <p className="font-semibold text-ink text-sm">{includedKm} km included</p>
        {extraKmRate !== undefined && extraKmRate > 0 && (
          <p className="text-ink-faint text-xs mt-0.5">₹{extraKmRate}/km will apply beyond the included kms</p>
        )}
      </div>
      {inclusions.map(item => (
        <div key={item.id}>
          <p className="font-semibold text-ink text-sm">{item.title}</p>
          {item.short_description && <p className="text-ink-faint text-xs mt-0.5">{item.short_description}</p>}
        </div>
      ))}
    </div>
  )
}
