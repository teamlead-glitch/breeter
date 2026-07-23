export type TripType = 'Drop' | 'Round Trip' | 'Hourly Rental'

export type SearchFilters = {
  vehicleTags: string[]
  addOns: string[]
}

export type SearchState = {
  tripType: TripType
  from: string
  to: string
  stops: string[]
  pickupDate: string
  pickupTime: string
  pickupPeriod: 'AM' | 'PM'
  dropDate: string
  filters: SearchFilters
}

export type SearchAction =
  | { type: 'SET_TRIP_TYPE'; tripType: TripType }
  | { type: 'SET_FROM'; value: string }
  | { type: 'SET_TO'; value: string }
  | { type: 'ADD_STOP'; value: string }
  | { type: 'REMOVE_STOP'; index: number }
  | { type: 'SET_PICKUP_DATE'; value: string }
  | { type: 'SET_PICKUP_TIME'; value: string }
  | { type: 'SET_PICKUP_PERIOD'; value: 'AM' | 'PM' }
  | { type: 'SET_DROP_DATE'; value: string }
  | { type: 'TOGGLE_VEHICLE_TAG'; tag: string }
  | { type: 'TOGGLE_ADDON'; addOn: string }
  | { type: 'RESET' }

export const initialSearchState: SearchState = {
  tripType: 'Drop',
  from: 'Kochi',
  to: 'Kannur',
  stops: [],
  pickupDate: '2026-08-23',
  pickupTime: '10:00',
  pickupPeriod: 'AM',
  dropDate: '2026-08-25',
  filters: {
    vehicleTags: [],
    addOns: [],
  },
}

function toggle(list: string[], value: string) {
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
    case 'SET_PICKUP_TIME':
      return { ...state, pickupTime: action.value }
    case 'SET_PICKUP_PERIOD':
      return { ...state, pickupPeriod: action.value }
    case 'SET_DROP_DATE':
      return { ...state, dropDate: action.value }
    case 'TOGGLE_VEHICLE_TAG':
      return { ...state, filters: { ...state.filters, vehicleTags: toggle(state.filters.vehicleTags, action.tag) } }
    case 'TOGGLE_ADDON':
      return { ...state, filters: { ...state.filters, addOns: toggle(state.filters.addOns, action.addOn) } }
    case 'RESET':
      return initialSearchState
    default:
      return state
  }
}
