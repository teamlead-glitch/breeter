import type { RefObject } from 'react'
import TripSummary from '@/components/book/TripSummary'
import BookingPageTabs from '@/components/book/BookingPageTabs'
import CabInfoCard from '@/components/book/CabInfoCard'
import AddOnsCard from '@/components/book/AddOnsCard'
import TravellerDetailsForm, { TravellerDetailsFormHandle } from '@/components/book/TravellerDetailsForm'
import PriceBreakdownList from '@/components/book/PriceBreakdownList'
import TermsAgreement from '@/components/book/TermsAgreement'
import { BookingDetails, BookingDetailsRequest } from '@/types/booking'

export default function BookingMainColumn({
  details,
  addOns,
  rates,
  detailsError,
  isRefreshingFare,
  total,
  pickupDate,
  bookingPayload,
  pickupTime,
  agreed,
  mobileTermsError,
  onToggleAddon,
  onToggleAgreed,
  travellerFormRef,
  mobileAgreeRef,
}: {
  details: BookingDetails
  addOns: string[]
  rates: Record<string, number>
  detailsError: boolean
  isRefreshingFare: boolean
  total: number
  pickupDate: string
  bookingPayload: BookingDetailsRequest
  pickupTime: string
  agreed: boolean
  mobileTermsError?: string
  onToggleAddon: (id: string) => void
  onToggleAgreed: () => void
  travellerFormRef: RefObject<TravellerDetailsFormHandle | null>
  mobileAgreeRef: RefObject<HTMLLabelElement | null>
}) {
  return (
    <main className="flex-1 min-w-0 space-y-4">
      <TripSummary
        tripTypeName={details.trip_type.name}
        fromLocation={details.route.from.location}
        toLocation={details.route.to.location}
        stateName={details.state.name}
        distanceKm={details.route.distance_km}
        pickupDate={pickupDate}
      />
      <CabInfoCard cabCategory={details.cab_category} />
      {detailsError && (
        <p className="text-red-600 text-xs bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
          Couldn&apos;t update the fare for your last change — showing the previous total instead.
        </p>
      )}
      <AddOnsCard addOns={addOns} rates={rates} disabled={isRefreshingFare} onToggle={onToggleAddon} />

      <BookingPageTabs />

      {/* Mobile/tablet: price breakdown — the sidebar with this is desktop-only */}
      <div className="lg:hidden bg-white rounded-2xl border border-black/5 p-4 sm:p-5">
        <PriceBreakdownList breakdown={details.pricing.breakdown} tax={details.pricing.tax_amount} total={total} refreshing={isRefreshingFare} />
      </div>

      <TravellerDetailsForm ref={travellerFormRef} booking={bookingPayload} pickupTime={pickupTime} />

      {/* Mobile/tablet: terms checkbox — the sidebar with this is desktop-only, but the fixed pay bar's button needs it too */}
      <div className="lg:hidden bg-white rounded-2xl border border-black/5 p-4">
        <TermsAgreement ref={mobileAgreeRef} agreed={agreed} onToggle={onToggleAgreed} error={mobileTermsError} />
      </div>
    </main>
  )
}
