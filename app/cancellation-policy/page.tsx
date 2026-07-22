import type { Metadata } from 'next'
import CancellationPolicyContent from '@/components/legal/CancellationPolicyContent'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-cancellation-policy', {
    title: 'Cancellation Policy — Breeter',
    description: 'Read Breeter’s cancellation and refund policy for cab bookings and holiday packages.',
  })
}

export default function CancellationPolicyPage() {
  return <CancellationPolicyContent />
}
