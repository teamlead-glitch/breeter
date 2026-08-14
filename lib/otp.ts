import { apiPost } from '@/lib/apiService'
import { SendOtpResponse, VerifyOtpResponse } from '@/types/otp'

// NOTE: endpoint paths are assumed — confirm against the real backend and update here if they differ.
export function sendOtp(phone: string) {
  return apiPost<SendOtpResponse>('v1/otp/send', { phone })
}

export function verifyOtp(otpId: string, otp: string) {
  return apiPost<VerifyOtpResponse>('v1/otp/verify', { otp_id: otpId, otp })
}
