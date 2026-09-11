export type SendOtpStop = {
  location: string
  latitude: number
  longitude: number
}

export type SendOtpRequest = {
  mobile_number: string
  customer_name: string
  customer_email: string
  // No auth/session system in this app yet, so there's no real user id or hourly-rate id to
  // supply — left optional and omitted from the request until a source for these exists.
  user_id?: number
  trip_type_id: number
  cab_category_id: number
  state_id: number
  cab_hourly_rate_id?: number
  from_location: string
  from_latitude: number
  from_longitude: number
  to_location: string
  to_latitude: number
  to_longitude: number
  stops: SendOtpStop[]
  booking_date: string
  to_date?: string
  pickup_time: string
  actual_hours?: number
  with_language: boolean
  with_carrier: boolean
  with_vehicle_below_5yr: boolean
  notes: string
}

export type SendOtpResponse = {
  message: string
  data: {
    booking_id: number
    status: string
    // Present while the SMS gateway isn't configured — backend returns the code directly
    // for testing instead of texting it.
    otp?: string
  }
}

export type VerifyOtpResponse = {
  message: string
  data: {
    booking_id: number
    status: string
  }
}
