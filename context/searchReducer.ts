export type TripType = 'Drop' | 'Round Trip' | 'Hourly Rental'
export type HourlyPackage = '4' | '6' | '8'

export type SearchFilters = {
  vehicleTags: number[]
  addOns: string[]
}

export type SearchState = {
  tripType: TripType
  from: string
  to: string
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
  | { type: 'SET_TO'; value: string }
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

export const initialSearchState: SearchState = {
  tripType: 'Drop',
  from: 'Kochi',
  to: 'Kannur',
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
      return { ...state, from: action.value }
    case 'SET_TO':
      return { ...state, to: action.value }
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
    default:
      return state
  }
}
