import type { Metadata } from 'next'
import type { PageApiResponse, SeoDefaults, SeoDetails } from '@/types/seo.types'

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'https://breeter.phitanydev.in/api/'

/** Fetches SEO details for a page slug. Returns null on any error or 404. */
export async function fetchPageSeo(slug: string): Promise<SeoDetails | null> {
  try {
    const res = await fetch(`${API_BASE}v1/pages/${slug}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const json: PageApiResponse = await res.json()
    return json?.data?.seo_details ?? null
  } catch {
    return null
  }
}

/**
 * Fetches SEO details for `slug` and maps them to Next.js Metadata,
 * falling back to `defaults` for any field missing or unset on the API side.
 */
export async function getSeoMetadata(slug: string, defaults: SeoDefaults): Promise<Metadata> {
  const seo = await fetchPageSeo(slug)

  const title = seo?.meta_title || defaults.title
  const description = seo?.meta_description || defaults.description
  const keywords = seo?.meta_keywords || defaults.keywords
  const ogTitle = seo?.og_title || title
  const ogDescription = seo?.og_description || description
  const ogImage = seo?.og_image || defaults.image
  const twitterTitle = seo?.twitter_title || ogTitle
  const twitterDescription = seo?.twitter_description || ogDescription
  const twitterImage = seo?.twitter_image || ogImage

  return {
    title,
    description,
    keywords,
    robots: seo?.robots || undefined,
    alternates: seo?.canonical_url ? { canonical: seo.canonical_url } : undefined,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: (seo?.twitter_card || 'summary_large_image') as 'summary' | 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  }
}
