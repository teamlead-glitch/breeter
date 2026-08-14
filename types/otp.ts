export type SendOtpResponse = {
  data: {
    otp_id: string
    expires_in: number
  }
}

export type VerifyOtpResponse = {
  data: {
    verified: boolean
  }
}
