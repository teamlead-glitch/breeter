import type { SeoDetails } from '@/types/seo.types'

export type PackageImage = {
  id: number
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

export type PackageCountry = {
  id: number
  name: string
}

export type PackageState = {
  id: number
  name: string
}

export type PackageCity = {
  id: number
  name: string
}

export type FeaturedPackage = {
  id: number
  title: string
  short_description: string | null
  days: number
  nights: number
  slug: string
  country: PackageCountry
  image: PackageImage | null
}

export type FeaturedPackagesData = {
  data: FeaturedPackage[]
  count: number
}

export type PackagesMeta = {
  total: number
  limit: number
  skip: number
}

export type PackagesData = {
  data: FeaturedPackage[]
  meta: PackagesMeta
}

export type PackageItinerary = {
  day_number: number
  title: string
  description: string
}

export type PackageInclusion = {
  title: string
}

export type PackageExclusion = {
  title: string
}

export type PackageDetail = {
  id: number
  title: string
  short_description: string | null
  description: string | null
  days: number
  nights: number
  country: PackageCountry
  states: PackageState[]
  cities: PackageCity[]
  itineraries: PackageItinerary[]
  inclusions: PackageInclusion[]
  exclusions: PackageExclusion[]
  images: PackageImage[]
  seo_details: SeoDetails
}

export type PackageDetailData = {
  data: PackageDetail
}
