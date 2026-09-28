import type { Metadata } from 'next'

// Personal, single-use links from the booking email — keep them out of search results.
export const metadata: Metadata = {
  title: 'Cancel Booking — Breeter',
  robots: { index: false, follow: false },
}

export default function CancelBookingLayout({ children }: { children: React.ReactNode }) {
  return children
}
