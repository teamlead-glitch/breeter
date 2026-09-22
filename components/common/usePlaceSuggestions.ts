'use client'
import { useEffect, useRef, useState } from 'react'
import { loadGoogleMapsPlaces } from '@/lib/googleMaps'

// Keeps the original PlacePrediction so a selection can fetch its coordinates via the same
// session (toPlace().fetchFields(...)) instead of an unsessioned, separately-billed lookup.
export type PlaceSuggestion = { placeId: string; text: string; prediction: google.maps.places.PlacePrediction }

const DEBOUNCE_MS = 250
const MIN_QUERY_LENGTH = 2

// Uses the Places API (New) data API (AutocompleteSuggestion) rather than the legacy Autocomplete
// widget, so we can render suggestions in our own dropdown instead of Google's built-in one.
export function usePlaceSuggestions(query: string) {
  const [fetchedSuggestions, setSuggestions] = useState<PlaceSuggestion[]>([])
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null)
  const requestIdRef = useRef(0)
  const trimmed = query.trim()

  useEffect(() => {
    if (trimmed.length < MIN_QUERY_LENGTH) return

    let cancelled = false
    const requestId = ++requestIdRef.current

    const timer = setTimeout(() => {
      loadGoogleMapsPlaces()
        .then(() => google.maps.importLibrary('places'))
        .then(({ AutocompleteSuggestion, AutocompleteSessionToken }) => {
          if (cancelled || requestId !== requestIdRef.current) return undefined
          if (!sessionTokenRef.current) sessionTokenRef.current = new AutocompleteSessionToken()

          return AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: trimmed,
            sessionToken: sessionTokenRef.current,
            includedRegionCodes: ['in'],
          })
        })
        .then(res => {
          if (cancelled || !res || requestId !== requestIdRef.current) return
          const next = res.suggestions
            .map(s => s.placePrediction)
            .filter((p): p is google.maps.places.PlacePrediction => p !== null)
            .map(p => ({ placeId: p.placeId, text: p.text.text, prediction: p }))
          setSuggestions(next)
        })
        .catch(() => {
          // No key/API access, or the request failed — the field still works as a plain input.
          if (!cancelled) setSuggestions([])
        })
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [trimmed])

  // Call after a suggestion is picked (or the search is abandoned) so the next query starts a
  // fresh, separately-billed session rather than extending this one indefinitely.
  const endSession = () => {
    sessionTokenRef.current = null
  }

  const suggestions = trimmed.length < MIN_QUERY_LENGTH ? [] : fetchedSuggestions

  return { suggestions, endSession }
}
