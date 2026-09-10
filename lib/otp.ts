import { apiPost } from '@/lib/apiService'
import { SendOtpRequest, SendOtpResponse, VerifyOtpResponse } from '@/types/otp'

export function sendOtp(payload: SendOtpRequest) {
  return apiPost<SendOtpResponse>('v1/otp/send', payload)
}

// NOTE: v1/otp/verify's request/response shape is still assumed — confirm against the real
// backend and update here if it differs.

export function verifyOtp(otpId: string, otp: string) {
  return apiPost<VerifyOtpResponse>('v1/otp/verify', { otp_id: otpId, otp })
}
