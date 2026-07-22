export type SeoDetails = {
  slug: string
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  og_title: string | null
  og_description: string | null
  og_image: string | null
  canonical_url: string | null
  robots: string | null
  twitter_card: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image: string | null
  in_sitemap: boolean
}

export type PageApiResponse = {
  type: string
  data: {
    id: number
    title: string
    content: string | null
    seo_details: SeoDetails
  }
}

export type SeoDefaults = {
  title: string
  description: string
  keywords?: string
  image?: string
}
