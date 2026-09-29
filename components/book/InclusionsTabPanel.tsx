import { TripTypeInclusion } from '@/types/booking'

// Inclusions come from the booking-details API (per trip type), not a static list.
export default function InclusionsTabPanel({ inclusions }: { inclusions: TripTypeInclusion[] }) {
  if (inclusions.length === 0) {
    return <p className="p-4 sm:p-5 text-ink-faint text-xs">No inclusions listed for this trip.</p>
  }

  return (
    <div className="p-4 sm:p-5 space-y-4">
      {inclusions.map(item => (
        <div key={item.id}>
          <p className="font-semibold text-ink text-sm">{item.title}</p>
          {item.short_description && <p className="text-ink-faint text-xs mt-0.5">{item.short_description}</p>}
        </div>
      ))}
    </div>
  )
}
