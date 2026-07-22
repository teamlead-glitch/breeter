import type { Metadata } from 'next'
import PrivacyPolicyContent from '@/components/legal/PrivacyPolicyContent'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-privacy-policy', {
    title: 'Privacy Policy — Breeter',
    description: 'Read how Breeter collects, uses and protects your personal information.',
  })
}

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />
}
