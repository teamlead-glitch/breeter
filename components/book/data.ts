export type AddOn = {
  id: 'age' | 'lang' | 'roof'
  label: string
  desc: string
  extra: string[] | null
}

// Maps an add-on id to the filter label used by the search widget's `filters.addOns`.
export const ADD_ON_FILTER_LABELS: Record<AddOn['id'], string> = {
  age: 'Vehicle below 5 years',
  lang: 'Driver language',
  roof: 'Roof carrier',
}

export const ADD_ONS: AddOn[] = [
  {
    id: 'age',
    label: 'Vehicle age below 5 years',
    desc: 'Guaranteed newer car',
    extra: null,
  },
  {
    id: 'lang',
    label: 'Driver language',
    desc: 'Preferred spoken language',
    extra: ['English', 'Hindi'],
  },
  {
    id: 'roof',
    label: 'Roof carrier',
    desc: 'Extra luggage on roof',
    extra: null,
  },
]
