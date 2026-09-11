import { apiPost } from '@/lib/apiService'
import { CreateRazorpayOrderRequest, CreateRazorpayOrderResponse, OrderStatusResponse } from '@/types/payments'

export function createRazorpayOrder(payload: CreateRazorpayOrderRequest) {
  return apiPost<CreateRazorpayOrderResponse>('v1/payments/razorpay/order', payload)
}

// NOTE: response shape is still assumed — confirm against the real backend and update here if
// it differs. Polled repeatedly since the real confirmation lands async via webhook.
export function fetchOrderStatus(paymentId: string | number) {
  return apiPost<OrderStatusResponse>('v1/payments/razorpay/verify', { payment_id: paymentId })
}
