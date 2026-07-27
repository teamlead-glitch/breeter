export type CabCategoryImage = {
  id: number
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

export type CabCategoryFare = {
  amount: number
  breakdown: { label: string; amount: number }[]
}

export type CabCategory = {
  id: number
  name: string
  description: string | null
  slug: string
  image: CabCategoryImage | null
  fare: CabCategoryFare | null
}

export type CabCategoriesData = {
  data: CabCategory[]
}
