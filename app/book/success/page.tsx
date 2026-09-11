'use client'
import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, Mail, PhoneCall } from 'lucide-react'

function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const bookingId = searchParams.get('booking_id')
  const email = searchParams.get('email')

  return (
    <div className="min-h-screen bg-ivory grid place-items-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-cta/10 text-cta">
          <CheckCircle2 size={40} />
        </div>

        <h1 className="font-display text-ink text-2xl md:text-3xl font-bold mb-2">Your booking is confirmed!</h1>
        {bookingId && <p className="font-mono text-ink-faint text-xs mb-4">Booking ID #{bookingId}</p>}

        <p className="text-ink-muted text-sm leading-relaxed mb-8">
          {email ? (
            <>We&apos;ve sent the full details to <span className="font-semibold text-ink">{email}</span>.</>
          ) : (
            "We've sent the full details to your email."
          )}{' '}
          Our team will follow up with you shortly to finalise your trip.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
            Back to home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 bg-white border border-black/10 hover:border-black/20 text-ink font-bold text-sm px-6 py-3 rounded-xl transition-colors">
            Book another trip
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-black/5 flex items-center justify-center gap-6 text-xs text-ink-faint">
          <span className="flex items-center gap-1.5"><Mail size={13} /> Confirmation emailed</span>
          <span className="flex items-center gap-1.5"><PhoneCall size={13} /> We&apos;ll call you soon</span>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <BookingSuccessContent />
    </Suspense>
  )
}
