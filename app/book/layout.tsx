import type { Metadata } from 'next'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-book', {
    title: 'Book Your Cab — Breeter',
    description: 'Complete your booking with transparent, all-inclusive pricing and verified drivers.',
  })
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}
