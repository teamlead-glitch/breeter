import { apiGet, apiPost } from '@/lib/apiService'
import { CreateRazorpayOrderRequest, CreateRazorpayOrderResponse, OrderStatusResponse } from '@/types/payments'

// NOTE: endpoint paths are assumed — confirm against the real backend and update here if they differ.
export function createRazorpayOrder(payload: CreateRazorpayOrderRequest) {
  return apiPost<CreateRazorpayOrderResponse>('v1/payments/create-order', payload)
}

export function fetchOrderStatus(bookingId: string | number) {
  return apiGet<OrderStatusResponse>(`v1/payments/orders/${bookingId}/status`)
}
