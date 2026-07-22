import type { Metadata } from 'next'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-holidays', {
    title: 'Holiday Packages — Breeter',
    description: 'Curated holiday packages across Kerala, Tamil Nadu, Goa and beyond — hand-picked stays, sightseeing and private cabs.',
  })
}

export default function HolidaysLayout({ children }: { children: React.ReactNode }) {
  return children
}
