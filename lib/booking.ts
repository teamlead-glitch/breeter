import { SearchState } from '@/context/SearchContext'
import { DEFAULT_STATE_ID, PLACEHOLDER_LAT_LNG, TRIP_TYPE_IDS } from '@/lib/constants'
import { apiGet, apiPost } from '@/lib/apiService'
import { BookingDetailsRequest, CancelBookingResponse, CancellableBookingResponse } from '@/types/booking'

export function buildBookingDetailsPayload(state: SearchState, addOns: string[]): BookingDetailsRequest {
  const payload: BookingDetailsRequest = {
    trip_type_id: TRIP_TYPE_IDS[state.tripType],
    cab_category_id: state.cabCategoryId as number,
    state_id: DEFAULT_STATE_ID,
    from_location: state.from,
    from_latitude: state.fromLat ?? PLACEHOLDER_LAT_LNG,
    from_longitude: state.fromLng ?? PLACEHOLDER_LAT_LNG,
    to_location: state.to,
    to_latitude: state.toLat ?? PLACEHOLDER_LAT_LNG,
    to_longitude: state.toLng ?? PLACEHOLDER_LAT_LNG,
    stops: state.stops.map(stop => ({
      location: stop.location,
      latitude: stop.lat ?? PLACEHOLDER_LAT_LNG,
      longitude: stop.lng ?? PLACEHOLDER_LAT_LNG,
    })),
    booking_date: state.pickupDate.split('T')[0],
    with_language: addOns.includes('lang'),
    with_carrier: addOns.includes('roof'),
    with_vehicle_below_5yr: addOns.includes('age'),
  }

  if (state.tripType === 'Round Trip') payload.to_date = state.dropDate.split('T')[0]
  if (state.tripType === 'Hourly Rental') payload.actual_hours = Number(state.hourlyPackage)

  return payload
}

// Token comes from the emailed cancellation link — encoded since it's user-controlled URL input.
export function fetchCancellableBooking(token: string) {
  return apiGet<CancellableBookingResponse>(`v1/bookings/cancel/${encodeURIComponent(token)}`)
}

export function cancelBooking(token: string) {
  return apiPost<CancelBookingResponse>(`v1/bookings/cancel/${encodeURIComponent(token)}`)
}
