import { TripType } from '@/context/SearchContext'

// TODO: replace with a real state picker once the app supports multiple states.
export const DEFAULT_STATE_ID = 1

export const TRIP_TYPE_IDS: Record<TripType, number> = {
  'Drop': 2,
  'Round Trip': 1,
  'Hourly Rental': 3,
}

// TODO: distance/duration should come from a real routing calculation.
// Backend will eventually derive this itself — remove once that lands.
export const PLACEHOLDER_DISTANCE_KM = 250

// TODO: replace with real coordinates once map/autocomplete is integrated into the search form.
export const PLACEHOLDER_LAT_LNG = 0
