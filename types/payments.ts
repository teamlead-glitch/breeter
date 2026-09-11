export type TravellerInfo = {
  name: string
  phone: string
  email: string
  notes: string
}

export type RazorpayPaymentType = 'advance' | 'full'

export type CreateRazorpayOrderRequest = {
  booking_id: number
  type: RazorpayPaymentType
}

export type CreateRazorpayOrderResponse = {
  message: string
  data: {
    payment_id: number
    order_id: string // Razorpay order id, e.g. "order_xxx"
    amount: number // paise, as returned by Razorpay — pass straight into Checkout
    currency: string
    // Backend-supplied Razorpay Key ID — use this for Checkout instead of a frontend env var,
    // since the backend is authoritative on which Razorpay account/key created the order.
    key: string
  }
}

export type OrderStatus = 'pending' | 'paid' | 'failed'

export type OrderStatusResponse = {
  data: {
    payment_id: string | number
    status: OrderStatus
  }
}
