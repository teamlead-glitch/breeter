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

export type InclusionIcon = 'shield' | 'check' | 'users' | 'clock' | 'fuel'

export type Inclusion = {
  icon: InclusionIcon
  title: string
  sub: string
}

export const INCLUSIONS: Inclusion[] = [
  { icon: 'shield', title: '295 km included', sub: '₹18/km will apply beyond the included kms' },
  { icon: 'check', title: 'Toll, tax & other charges', sub: 'Toll, state tax & parking charges are included' },
  { icon: 'users', title: 'Driver allowance', sub: 'Driver food & accommodation charges are included' },
  { icon: 'clock', title: 'Waiting time up to 30 mins', sub: '₹1/min post 30 mins' },
  { icon: 'fuel', title: 'Fuel charges included', sub: 'Fuel cost for your trip is included in the fare' },
]
