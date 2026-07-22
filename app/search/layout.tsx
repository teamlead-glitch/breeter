import type { Metadata } from 'next'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-search', {
    title: 'Search Results — Breeter',
    description: 'Browse available cabs matching your route, dates and preferences on Breeter.',
  })
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children
}
