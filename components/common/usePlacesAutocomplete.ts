'use client'
import { useEffect, useRef, type RefObject } from 'react'
import { loadGoogleMapsPlaces } from '@/lib/googleMaps'

// Attaches Google Places Autocomplete to a plain <input>. Typing still works even if the script
// fails to load or no API key is configured — this only adds suggestions on top.
export function usePlacesAutocomplete(inputRef: RefObject<HTMLInputElement | null>, onPlaceSelected: (description: string) => void) {
  const callbackRef = useRef(onPlaceSelected)

  useEffect(() => {
    callbackRef.current = onPlaceSelected
  })

  useEffect(() => {
    let autocomplete: google.maps.places.Autocomplete | null = null
    let cancelled = false

    loadGoogleMapsPlaces()
      .then(() => {
        if (cancelled || !inputRef.current) return
        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          fields: ['formatted_address', 'name'],
        })
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete?.getPlace()
          const description = place?.formatted_address || place?.name
          if (description) callbackRef.current(description)
        })
      })
      .catch(() => {
        // No key configured or the script failed to load — the plain input remains usable.
      })

    return () => {
      cancelled = true
      if (autocomplete) google.maps.event.clearInstanceListeners(autocomplete)
    }
    // Runs once per mount — inputRef is a stable ref object, and the latest callback is read via callbackRef.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
