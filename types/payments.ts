import { BookingDetailsRequest } from '@/types/booking'

export type TravellerInfo = {
  name: string
  phone: string
  email: string
  notes: string
}

export type CreateRazorpayOrderRequest = {
  booking: BookingDetailsRequest
  traveller: TravellerInfo
  amount: number // rupees; backend converts to paise for the Razorpay Orders API call
}

export type CreateRazorpayOrderResponse = {
  data: {
    booking_id: string | number
    order_id: string // Razorpay order id, e.g. "order_xxx"
    amount: number // paise, as returned by Razorpay — pass straight into Checkout
    currency: string
  }
}

export type OrderStatus = 'pending' | 'paid' | 'failed'

export type OrderStatusResponse = {
  data: {
    booking_id: string | number
    status: OrderStatus
  }
}
