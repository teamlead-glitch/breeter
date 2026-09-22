export type TripType = 'Drop' | 'Round Trip' | 'Hourly Rental'
export type HourlyPackage = '4' | '6' | '8'

export type SearchFilters = {
  vehicleTags: number[]
  addOns: string[]
}

export type SearchState = {
  tripType: TripType
  from: string
  fromLat: number | null
  fromLng: number | null
  to: string
  toLat: number | null
  toLng: number | null
  stops: string[]
  pickupDate: string
  dropDate: string
  hourlyPackage: HourlyPackage
  filters: SearchFilters
  searchVersion: number
  cabCategoryId: number | null
}

export type SearchAction =
  | { type: 'SET_TRIP_TYPE'; tripType: TripType }
  | { type: 'SET_FROM'; value: string }
  | { type: 'SET_FROM_COORDS'; lat: number | null; lng: number | null }
  | { type: 'SET_TO'; value: string }
  | { type: 'SET_TO_COORDS'; lat: number | null; lng: number | null }
  | { type: 'ADD_STOP'; value: string }
  | { type: 'REMOVE_STOP'; index: number }
  | { type: 'SET_PICKUP_DATE'; value: string }
  | { type: 'SET_DROP_DATE'; value: string }
  | { type: 'SET_HOURLY_PACKAGE'; value: HourlyPackage }
  | { type: 'TOGGLE_ADDON'; addOn: string }
  | { type: 'TOGGLE_VEHICLE_TAG'; tagId: number }
  | { type: 'SET_CAB_CATEGORY_ID'; id: number }
  | { type: 'TRIGGER_SEARCH' }
  | { type: 'RESET' }
  | { type: 'HYDRATE'; state: Partial<SearchState> }

export const initialSearchState: SearchState = {
  tripType: 'Drop',
  from: 'Kochi',
  fromLat: null,
  fromLng: null,
  to: 'Kannur',
  toLat: null,
  toLng: null,
  stops: [],
  pickupDate: '2026-08-23T10:00',
  dropDate: '2026-08-25T10:00',
  hourlyPackage: '8',
  filters: {
    vehicleTags: [],
    addOns: [],
  },
  searchVersion: 0,
  cabCategoryId: null,
}

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter(v => v !== value) : [...list, value]
}

export function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_TRIP_TYPE':
      return { ...state, tripType: action.tripType }
    case 'SET_FROM':
      // Coords are only known right after a suggestion is picked (see SET_FROM_COORDS) — any
      // further edit to the text invalidates them until the next pick.
      return { ...state, from: action.value, fromLat: null, fromLng: null }
    case 'SET_FROM_COORDS':
      return { ...state, fromLat: action.lat, fromLng: action.lng }
    case 'SET_TO':
      return { ...state, to: action.value, toLat: null, toLng: null }
    case 'SET_TO_COORDS':
      return { ...state, toLat: action.lat, toLng: action.lng }
    case 'ADD_STOP':
      return { ...state, stops: [...state.stops, action.value] }
    case 'REMOVE_STOP':
      return { ...state, stops: state.stops.filter((_, i) => i !== action.index) }
    case 'SET_PICKUP_DATE':
      return { ...state, pickupDate: action.value }
    case 'SET_DROP_DATE':
      return { ...state, dropDate: action.value }
    case 'SET_HOURLY_PACKAGE':
      return { ...state, hourlyPackage: action.value }
    case 'TOGGLE_ADDON':
      return { ...state, filters: { ...state.filters, addOns: toggle(state.filters.addOns, action.addOn) } }
    case 'TOGGLE_VEHICLE_TAG':
      return { ...state, filters: { ...state.filters, vehicleTags: toggle(state.filters.vehicleTags, action.tagId) } }
    case 'SET_CAB_CATEGORY_ID':
      return { ...state, cabCategoryId: action.id }
    case 'TRIGGER_SEARCH':
      return { ...state, searchVersion: state.searchVersion + 1 }
    case 'RESET':
      return initialSearchState
    case 'HYDRATE':
      return { ...state, ...action.state }
    default:
      return state
  }
}
