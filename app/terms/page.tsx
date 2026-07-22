import type { Metadata } from 'next'
import TermsContent from '@/components/legal/TermsContent'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-terms', {
    title: 'Terms & Conditions — Breeter',
    description: 'Read the terms and conditions for booking cabs and holiday packages with Breeter.',
  })
}

export default function TermsPage() {
  return <TermsContent />
}
