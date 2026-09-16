'use client'
import { createContext, useContext, useEffect, useReducer, useRef, ReactNode, Dispatch } from 'react'
import { searchReducer, initialSearchState, SearchState, SearchAction } from '@/context/searchReducer'

export type { TripType, HourlyPackage, SearchFilters, SearchState, SearchAction } from '@/context/searchReducer'

type SearchContextValue = {
  state: SearchState
  dispatch: Dispatch<SearchAction>
}

const SearchContext = createContext<SearchContextValue | null>(null)

const STORAGE_KEY = 'breeter-search-state'

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
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) dispatch({ type: 'HYDRATE', state: JSON.parse(saved) })
    } catch {
      // Ignore corrupt/unavailable storage — falls back to initialSearchState.
    }
    hydratedRef.current = true
  }, [])

  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>
}

export function useSearchState() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchState must be used within a SearchProvider')
  return ctx
}
