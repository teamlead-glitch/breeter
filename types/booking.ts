import { CabCategoryImage } from '@/types/cabs'

export type TripTypeInclusion = {
  id: number
  title: string
  short_description: string | null
}

export type BookingDetailsStop = {
  location: string
  latitude: number
  longitude: number
}

export type BookingDetailsRequest = {
  trip_type_id: number
  cab_category_id: number
  state_id: number
  from_location: string
  from_latitude: number
  from_longitude: number
  to_location: string
  to_latitude: number
  to_longitude: number
  stops: BookingDetailsStop[]
  booking_date: string
  to_date?: string
  actual_hours?: number
  with_language: boolean
  with_carrier: boolean
  with_vehicle_below_5yr: boolean
}

export type BookingFareSlab = {
  id: number
  from_km: string
  to_km: string | null
  rate_per_km: string
}

export type BookingPricingDetail = {
  id: number
  base_fare: number
  minimum_km_per_day: number
  sightseeing_km: number
  extra_km_rate: number
  waiting_charge_per_stop: number
  language_rate: number
  carrier_rate: number
  rate_of_vehicle_below_5yrs: number
  slabs: BookingFareSlab[]
}

export type BookingFareLine = {
  label: string
  amount: number
}

export type BookingDetails = {
  trip_type: {
    id: number
    name: string
    slug: string
    inclusions: TripTypeInclusion[]
  }
  cab_category: {
    id: number
    name: string
    description: string | null
    seating_capacity: number
    number_of_bags: number | null
    slug: string
    image: CabCategoryImage | null
    is_enquiry_only?: boolean
  }
  state: {
    id: number
    name: string
    state_code: string
    slug: string
    country: { id: number; name: string }
  }
  route: {
    from: BookingDetailsStop
    to: BookingDetailsStop
    stops: BookingDetailsStop[]
    distance_km: number
    duration_minutes: number
  }
  pricing: {
    type: string
    detail: BookingPricingDetail
    total_amount: number
    tax_amount: number
    breakdown: BookingFareLine[]
  }
}

export type BookingDetailsResponse = {
  data: BookingDetails
}

export type CancellableBooking = {
  booking_id: number
  booking_reference: string
  customer_name: string
  trip_type: string
  cab_category: string
  from_location: string
  to_location: string | null
  booking_date: string
  to_date: string | null
  pickup_time: string
  total_amount: number
  amount_paid: number
  status: string
  cancelled_at: string | null
  cancelled_by: string | null
}

export type CancellableBookingResponse = {
  message: string
  data: CancellableBooking
}

// NOTE: POST response shape is still assumed — only `message` is relied on.
export type CancelBookingResponse = {
  message: string
  data?: Partial<CancellableBooking>
}
