export type CabCategoryImage = {
  id: number
  url: string
  alt_text: string | null
  is_primary: boolean
  sort_order: number
}

export type CabCategoryFare = {
  amount: number
  // Pre-tax fare — what the search list shows ("Taxes extra").
  sub_total?: number
  tax_amount?: number
  total_amount?: number
  breakdown: { label: string; amount: number }[]
}

export type CabCategory = {
  id: number
  name: string
  description: string | null
  slug: string
  seating_capacity: number | null
  number_of_bags: number | null
  image: CabCategoryImage | null
  fare: CabCategoryFare | null
}

export type CabCategoriesData = {
  data: CabCategory[]
}
