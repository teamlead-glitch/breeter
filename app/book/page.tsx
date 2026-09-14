'use client'
import { useEffect, useRef, useState } from 'react'
import { ADD_ON_FILTER_LABELS, ADD_ONS } from '@/components/book/data'
import BookingIssueNotice from '@/components/book/BookingIssueNotice'
import BookingTitleBar from '@/components/book/BookingTitleBar'
import BookingMainColumn from '@/components/book/BookingMainColumn'
import FareBreakdownCard from '@/components/book/FareBreakdownCard'
import MobilePayBar from '@/components/book/MobilePayBar'
import PaymentModal from '@/components/book/PaymentModal'
import { TravellerDetailsFormHandle } from '@/components/book/TravellerDetailsForm'
import { useSearchState } from '@/context/SearchContext'
import { apiPost } from '@/lib/apiService'
import { buildBookingDetailsPayload } from '@/lib/booking'
import { BookingDetails, BookingDetailsResponse } from '@/types/booking'
import { RazorpayPaymentType, TravellerInfo } from '@/types/payments'

export default function BookPage() {
  const { state } = useSearchState()
  const [details, setDetails] = useState<BookingDetails | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(Boolean(state.cabCategoryId))
  const [detailsError, setDetailsError] = useState(false)
  const [addOns, setAddOns] = useState<string[]>(() =>
    ADD_ONS.filter(a => state.filters.addOns.includes(ADD_ON_FILTER_LABELS[a.id])).map(a => a.id)
  )
  const [agreed, setAgreed] = useState(false)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<RazorpayPaymentType>('advance')
  const [paymentBookingId, setPaymentBookingId] = useState<number | null>(null)
  const [travellerInfo, setTravellerInfo] = useState<TravellerInfo | null>(null)
  const mobileAgreeRef = useRef<HTMLLabelElement>(null)
  const travellerFormRef = useRef<TravellerDetailsFormHandle>(null)

  useEffect(() => {
    if (!state.cabCategoryId) return
    let cancelled = false
    setDetailsLoading(true)
    setDetailsError(false)
    apiPost<BookingDetailsResponse>('v1/booking-details', buildBookingDetailsPayload(state, addOns)).then(res => {
      if (cancelled) return
      if (res.error || !res.data) {
        setDetailsError(true)
      } else {
        setDetails(res.data.data)
      }
      setDetailsLoading(false)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cabCategoryId, addOns])

  const toggleAddon = (id: string) =>
    setAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])

  const handleMobilePayAttempt = () => {
    window.alert('Please agree to the Terms & cancellation policy to continue.')
    mobileAgreeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    mobileAgreeRef.current?.focus()
  }

  const handlePayNow = (type: RazorpayPaymentType) => {
    if (!travellerFormRef.current?.validate()) return
    if (!travellerFormRef.current.isPhoneVerified()) {
      travellerFormRef.current.requirePhoneVerification()
      return
    }
    const bookingId = travellerFormRef.current.getBookingId()
    if (bookingId === null) {
      // Shouldn't happen once isPhoneVerified() is true, but guard against it regardless.
      travellerFormRef.current.requirePhoneVerification()
      return
    }
    setTravellerInfo(travellerFormRef.current.getValues())
    setPaymentBookingId(bookingId)
    setPaymentType(type)
    setPaymentModalOpen(true)
  }

  if (!state.cabCategoryId) {
    return (
      <BookingIssueNotice
        heading="No cab selected yet"
        message="Pick a cab category from the search results to continue with your booking."
      />
    )
  }

  if (detailsLoading && !details) {
    return (
      <div className="min-h-screen bg-ivory grid place-items-center">
        <p className="text-ink-faint text-sm">Loading booking details…</p>
      </div>
    )
  }

  if (!details) {
    return (
      <BookingIssueNotice
        heading={detailsError ? "This cab isn't available for your trip" : 'No booking details available'}
        message={
          detailsError
            ? "The selected cab isn't available for your search criteria or trip type — the route, dates or duration you picked may fall outside what it supports."
            : "We couldn't find pricing for this cab and trip. Head back to search to pick from cabs that are available."
        }
      />
    )
  }

  // Refetched whenever add-ons are toggled, so pricing (breakdown + total) always comes straight from the API.
  const rates: Record<string, number> = {
    age: details.pricing.detail.rate_of_vehicle_below_5yrs,
    lang: details.pricing.detail.language_rate,
    roof: details.pricing.detail.carrier_rate,
  }
  const total = details.pricing.total_amount
  const payNow = Math.round(total * 0.2)
  const balance = total - payNow
  const isRefreshingFare = detailsLoading
  const bookingPayload = buildBookingDetailsPayload(state, addOns)
  const pickupTime = state.pickupDate.split('T')[1] ?? ''

  return (
    <div className="min-h-screen bg-ivory">
      <BookingTitleBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40 md:pb-28 lg:pb-10">
        <div className="flex gap-8 items-stretch lg:items-start flex-col lg:flex-row">
          <BookingMainColumn
            details={details}
            addOns={addOns}
            rates={rates}
            detailsError={detailsError}
            isRefreshingFare={isRefreshingFare}
            total={total}
            pickupDate={state.pickupDate}
            bookingPayload={bookingPayload}
            pickupTime={pickupTime}
            agreed={agreed}
            onToggleAddon={toggleAddon}
            onToggleAgreed={() => setAgreed(a => !a)}
            travellerFormRef={travellerFormRef}
            mobileAgreeRef={mobileAgreeRef}
          />

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden lg:block w-72 flex-shrink-0 lg:self-stretch">
            <FareBreakdownCard
              breakdown={details.pricing.breakdown}
              total={total}
              payNow={payNow}
              balance={balance}
              agreed={agreed}
              refreshing={isRefreshingFare}
              onToggleAgree={() => setAgreed(a => !a)}
              onPayNow={handlePayNow}
            />
          </aside>
        </div>
      </div>

      <MobilePayBar
        payNow={payNow}
        total={total}
        agreed={agreed}
        refreshing={isRefreshingFare}
        onPayAttempt={handleMobilePayAttempt}
        onPayNow={handlePayNow}
      />

      {paymentModalOpen && travellerInfo && paymentBookingId !== null && (
        <PaymentModal
          onClose={() => setPaymentModalOpen(false)}
          bookingId={paymentBookingId}
          type={paymentType}
          traveller={travellerInfo}
          cabCategoryName={details.cab_category.name}
        />
      )}
    </div>
  )
}
