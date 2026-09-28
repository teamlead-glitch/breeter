import { formatDate } from '@/lib/date'
import { CancellableBooking } from '@/types/booking'

const formatAmount = (value: number) => `₹${value.toLocaleString('en-IN')}`

// API sends "11:00:00" — show "11:00".
const formatPickupTime = (value: string) => value.slice(0, 5)

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 py-2.5 border-b border-black/5 last:border-0">
      <dt className="text-xs text-ink-faint flex-none">{label}</dt>
      <dd className="text-sm font-semibold text-ink text-right">{value}</dd>
    </div>
  )
}

export default function CancelBookingDetails({ booking }: { booking: CancellableBooking }) {
  const route = booking.to_location ? `${booking.from_location} → ${booking.to_location}` : booking.from_location
  const tripDates = booking.to_date
    ? `${formatDate(booking.booking_date, { withYear: true })} – ${formatDate(booking.to_date, { withYear: true })}`
    : formatDate(booking.booking_date, { withYear: true })

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-6 mb-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-sm font-bold text-ink">{booking.booking_reference}</span>
        <span className="rounded-full bg-cta/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cta">{booking.status}</span>
      </div>
      <dl>
        <DetailRow label="Trip type" value={booking.trip_type} />
        <DetailRow label="Cab" value={booking.cab_category} />
        <DetailRow label="Route" value={route} />
        <DetailRow label="Date" value={tripDates} />
        <DetailRow label="Pickup time" value={formatPickupTime(booking.pickup_time)} />
        <DetailRow label="Total fare" value={formatAmount(booking.total_amount)} />
        <DetailRow label="Amount paid" value={formatAmount(booking.amount_paid)} />
      </dl>
    </div>
  )
}
