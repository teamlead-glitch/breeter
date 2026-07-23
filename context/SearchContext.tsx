'use client'
import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react'
import { searchReducer, initialSearchState, SearchState, SearchAction } from '@/context/searchReducer'

export type { TripType, SearchFilters, SearchState, SearchAction } from '@/context/searchReducer'

type SearchContextValue = {
  state: SearchState
  dispatch: Dispatch<SearchAction>
}

const SearchContext = createContext<SearchContextValue | null>(null)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState)
  return <SearchContext.Provider value={{ state, dispatch }}>{children}</SearchContext.Provider>
}

export function useSearchState() {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearchState must be used within a SearchProvider')
  return ctx
}
