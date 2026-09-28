'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import CancelNotice from '@/components/booking-cancel/CancelNotice'
import CancelBookingDetails from '@/components/booking-cancel/CancelBookingDetails'
import CancelBookingActions from '@/components/booking-cancel/CancelBookingActions'
import { cancelBooking, fetchCancellableBooking } from '@/lib/booking'
import { CancellableBooking } from '@/types/booking'

type Status = 'loading' | 'invalid' | 'ready' | 'confirming' | 'cancelling' | 'cancelled'

export default function CancelBookingPage() {
  const { token } = useParams<{ token: string }>()
  const [status, setStatus] = useState<Status>('loading')
  const [booking, setBooking] = useState<CancellableBooking | null>(null)
  const [message, setMessage] = useState('')
  const [cancelError, setCancelError] = useState('')

  useEffect(() => {
    let cancelled = false
    fetchCancellableBooking(token).then(res => {
      if (cancelled) return
      if (res.error || !res.data) {
        setMessage(res.error || 'This cancellation link is invalid or has already been used.')
        setStatus('invalid')
        return
      }
      setBooking(res.data.data)
      setStatus('ready')
    })
    return () => { cancelled = true }
  }, [token])

  const handleCancel = async () => {
    setStatus('cancelling')
    setCancelError('')
    const res = await cancelBooking(token)
    if (res.error || !res.data) {
      setCancelError(res.error || "We couldn't cancel this booking. Please try again or contact support.")
      setStatus('ready')
      return
    }
    setMessage(res.data.message || 'Your booking has been cancelled.')
    setStatus('cancelled')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-ivory grid place-items-center">
        <p className="flex items-center gap-2 text-ink-faint text-sm"><Loader2 size={16} className="animate-spin" /> Loading booking…</p>
      </div>
    )
  }

  if (status === 'invalid' || !booking) {
    return <CancelNotice tone="error" title="Link not valid" message={message} />
  }

  if (status === 'cancelled') {
    return (
      <CancelNotice
        tone="success"
        title="Booking cancelled"
        message={`${message} Reference ${booking.booking_reference}. Our team will contact you about any refund due.`}
      />
    )
  }

  return (
    <div className="min-h-screen bg-ivory px-4 pt-28 pb-16">
      <div className="max-w-lg mx-auto">
        <p className="font-mono text-cta text-xs tracking-[0.2em] uppercase mb-2">Manage booking</p>
        <h1 className="font-display text-ink text-2xl md:text-3xl font-bold mb-1">Cancel your booking</h1>
        <p className="text-ink-faint text-sm mb-6">Hi {booking.customer_name}, please review the details below before cancelling.</p>

        <CancelBookingDetails booking={booking} />

        <CancelBookingActions
          confirming={status !== 'ready'}
          cancelling={status === 'cancelling'}
          error={cancelError}
          onRequestCancel={() => setStatus('confirming')}
          onKeep={() => setStatus('ready')}
          onConfirm={handleCancel}
        />

        <p className="text-center text-xs text-ink-faint mt-5">
          Read our <Link href="/cancellation-policy" className="font-semibold text-cta hover:underline">cancellation policy</Link>.
        </p>
      </div>
    </div>
  )
}
