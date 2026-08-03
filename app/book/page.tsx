'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ADD_ON_FILTER_LABELS, ADD_ONS } from '@/components/book/data'
import TripSummary from '@/components/book/TripSummary'
import BookingPageTabs from '@/components/book/BookingPageTabs'
import CabInfoCard from '@/components/book/CabInfoCard'
import AddOnsCard from '@/components/book/AddOnsCard'
import TravellerDetailsForm from '@/components/book/TravellerDetailsForm'
import FareBreakdownCard from '@/components/book/FareBreakdownCard'
import MobilePayBar from '@/components/book/MobilePayBar'
import TermsAgreement from '@/components/book/TermsAgreement'
import { SearchState, useSearchState } from '@/context/SearchContext'
import { apiPost } from '@/lib/apiService'
import { DEFAULT_STATE_ID, PLACEHOLDER_LAT_LNG, TRIP_TYPE_IDS } from '@/lib/constants'
import { BookingDetails, BookingDetailsRequest, BookingDetailsResponse } from '@/types/booking'

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
  const mobileAgreeRef = useRef<HTMLLabelElement>(null)

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

  if (!state.cabCategoryId) {
    return (
      <div className="min-h-screen bg-ivory grid place-items-center px-4 text-center">
        <div>
          <p className="text-ink-faint text-sm mb-3">No cab selected yet.</p>
          <Link href="/search" className="text-cta font-semibold text-sm hover:text-cta-dark transition-colors">← Back to search results</Link>
        </div>
      </div>
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
      <div className="min-h-screen bg-ivory grid place-items-center px-4 text-center">
        <div>
          <p className="text-ink-faint text-sm mb-3">
            {detailsError ? "Couldn't load booking details. Please try again." : 'No booking details available.'}
          </p>
          <Link href="/search" className="text-cta font-semibold text-sm hover:text-cta-dark transition-colors">← Back to search results</Link>
        </div>
      </div>
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
            
            <TravellerDetailsForm />

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
            />
          </aside>

        </div>
      </div>

      <MobilePayBar payNow={payNow} total={total} agreed={agreed} refreshing={isRefreshingFare} onPayAttempt={handleMobilePayAttempt} />
    </div>
  )
}
