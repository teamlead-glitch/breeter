export type StateCountry = {
  id: number
  name: string
}

export type State = {
  id: number
  name: string
  state_code: string
  slug: string | null
  country: StateCountry
}

export type StatesData = {
  data: State[]
}
