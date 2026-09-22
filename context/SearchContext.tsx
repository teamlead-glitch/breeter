'use client'
import { createContext, useContext, useEffect, useReducer, useRef, ReactNode, Dispatch } from 'react'
import { searchReducer, initialSearchState, SearchState, SearchAction } from '@/context/searchReducer'

export type { TripType, HourlyPackage, SearchFilters, SearchStop, SearchState, SearchAction } from '@/context/searchReducer'

type SearchContextValue = {
  state: SearchState
  dispatch: Dispatch<SearchAction>
}

const SearchContext = createContext<SearchContextValue | null>(null)

const STORAGE_KEY = 'breeter-search-state'

// A few minutes' buffer (rounded to a clean 5-min mark) so the default doesn't read as
// "in the past" the instant it's set, and reads as a realistic earliest pickup time.
function roundedNow() {
  const d = new Date(Date.now() + 30 * 60 * 1000)
  d.setMinutes(Math.ceil(d.getMinutes() / 5) * 5, 0, 0)
  return d
}

function formatDateTime(d: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function defaultTripDates() {
  const now = formatDateTime(roundedNow())
  return { pickupDate: now, dropDate: now }
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState)
  const hydratedRef = useRef(false)

  // Declared before the hydrate effect below so it runs first on mount (React fires effects in
  // declaration order): on that first pass hydratedRef is still false, so it skips — otherwise
  // it would immediately overwrite localStorage with the plain defaults before they get replaced.
  useEffect(() => {
    if (!hydratedRef.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      // Storage can be unavailable (private browsing, quota) — persistence is a nice-to-have.
    }
  }, [state])

  useEffect(() => {
    let saved: Partial<SearchState> = {}
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) saved = JSON.parse(raw)
    } catch {
      // Ignore corrupt/unavailable storage — falls back to defaults below.
    }
    // pickupDate/dropDate default relative to "now" on a fresh visit; a persisted search's own
    // dates still win.
    dispatch({ type: 'HYDRATE', state: { ...defaultTripDates(), ...saved } })
    hydratedRef.current = true
  }, [])

  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>
}

export function useSearchState() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchState must be used within a SearchProvider')
  return ctx
}
