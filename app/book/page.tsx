'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, SearchX } from 'lucide-react'
import { ADD_ON_FILTER_LABELS, ADD_ONS } from '@/components/book/data'
import TripSummary from '@/components/book/TripSummary'
import BookingPageTabs from '@/components/book/BookingPageTabs'
import CabInfoCard from '@/components/book/CabInfoCard'
import AddOnsCard from '@/components/book/AddOnsCard'
import TravellerDetailsForm, { TravellerDetailsFormHandle } from '@/components/book/TravellerDetailsForm'
import FareBreakdownCard from '@/components/book/FareBreakdownCard'
import PriceBreakdownList from '@/components/book/PriceBreakdownList'
import MobilePayBar from '@/components/book/MobilePayBar'
import TermsAgreement from '@/components/book/TermsAgreement'
import PaymentModal from '@/components/book/PaymentModal'
import { SearchState, useSearchState } from '@/context/SearchContext'
import { apiPost } from '@/lib/apiService'
import { DEFAULT_STATE_ID, PLACEHOLDER_LAT_LNG, TRIP_TYPE_IDS } from '@/lib/constants'
import { BookingDetails, BookingDetailsRequest, BookingDetailsResponse } from '@/types/booking'
import { TravellerInfo } from '@/types/payments'

function BookingIssueNotice({ heading, message }: { heading: string; message: string }) {
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

function buildBookingDetailsPayload(state: SearchState, addOns: string[]): BookingDetailsRequest {
  const payload: BookingDetailsRequest = {
    trip_type_id: TRIP_TYPE_IDS[state.tripType],
    cab_category_id: state.cabCategoryId as number,
    state_id: DEFAULT_STATE_ID,
    from_location: state.from,
    from_latitude: PLACEHOLDER_LAT_LNG,
    from_longitude: PLACEHOLDER_LAT_LNG,
    to_location: state.to,
    to_latitude: PLACEHOLDER_LAT_LNG,
    to_longitude: PLACEHOLDER_LAT_LNG,
    stops: state.stops.map(location => ({ location, latitude: PLACEHOLDER_LAT_LNG, longitude: PLACEHOLDER_LAT_LNG })),
    booking_date: state.pickupDate.split('T')[0],
    with_language: addOns.includes('lang'),
    with_carrier: addOns.includes('roof'),
    with_vehicle_below_5yr: addOns.includes('age'),
  }

  if (state.tripType === 'Round Trip') payload.to_date = state.dropDate.split('T')[0]
  if (state.tripType === 'Hourly Rental') payload.actual_hours = Number(state.hourlyPackage)

  return payload
}

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
  const [payAmount, setPayAmount] = useState(0)
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

  const handlePayNow = (amount: number) => {
    if (!travellerFormRef.current?.validate()) return
    if (!travellerFormRef.current.isPhoneVerified()) {
      travellerFormRef.current.requirePhoneVerification()
      return
    }
    setTravellerInfo(travellerFormRef.current.getValues())
    setPayAmount(amount)
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
      {/* Title bar */}
      <div className="bg-ink pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/search" className="hover:text-white/70 transition-colors">Search results</Link>
            <ChevronRight size={11} />
            <span className="text-white/70">Review booking</span>
          </div>
          <h1 className="font-display text-white text-2xl md:text-3xl font-bold">Review booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40 md:pb-28 lg:pb-10">
        <div className="flex gap-8 items-stretch lg:items-start flex-col lg:flex-row">

          {/* ── MAIN ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">
            <TripSummary
              tripTypeName={details.trip_type.name}
              fromLocation={details.route.from.location}
              toLocation={details.route.to.location}
              stateName={details.state.name}
              distanceKm={details.route.distance_km}
              pickupDate={state.pickupDate}
            />
            <CabInfoCard cabCategory={details.cab_category} />
            {detailsError && (
              <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                Couldn&apos;t update the fare for your last change — showing the previous total instead.
              </p>
            )}
            <AddOnsCard addOns={addOns} rates={rates} disabled={isRefreshingFare} onToggle={toggleAddon} />

          

            <BookingPageTabs />

              {/* Mobile/tablet: price breakdown — the sidebar with this is desktop-only */}
            <div className="lg:hidden bg-white rounded-2xl border border-black/5 p-4 sm:p-5">
              <PriceBreakdownList breakdown={details.pricing.breakdown} total={total} refreshing={isRefreshingFare} />
            </div>
            
            <TravellerDetailsForm ref={travellerFormRef} booking={bookingPayload} pickupTime={pickupTime} />

            {/* Mobile/tablet: terms checkbox — the sidebar with this is desktop-only, but the fixed pay bar's button needs it too */}
            <div className="lg:hidden bg-white rounded-2xl border border-black/5 p-4">
              <TermsAgreement ref={mobileAgreeRef} agreed={agreed} onToggle={() => setAgreed(a => !a)} />
            </div>
          </main>

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

      {paymentModalOpen && travellerInfo && (
        <PaymentModal
          onClose={() => setPaymentModalOpen(false)}
          amount={payAmount}
          booking={bookingPayload}
          traveller={travellerInfo}
          cabCategoryName={details.cab_category.name}
        />
      )}
    </div>
  )
}
