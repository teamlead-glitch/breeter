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
