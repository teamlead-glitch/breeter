export type RazorpayCheckoutResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export type RazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description?: string
  order_id: string
  prefill?: { name?: string; email?: string; contact?: string }
  theme?: { color?: string }
  modal?: { ondismiss?: () => void }
  handler: (response: RazorpayCheckoutResponse) => void
}

type RazorpayFailureEvent = { error: { description?: string; reason?: string } }

type RazorpayInstance = {
  open: () => void
  on: (event: 'payment.failed', handler: (event: RazorpayFailureEvent) => void) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance
  }
}

const SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js'

let loadingPromise: Promise<void> | null = null

export function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Razorpay can only load in the browser'))
  if (window.Razorpay) return Promise.resolve()
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout script')))
      return
    }
    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay checkout script'))
    document.body.appendChild(script)
  })

  return loadingPromise
}
