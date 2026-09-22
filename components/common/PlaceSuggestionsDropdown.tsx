'use client'
import { MapPin } from 'lucide-react'
import type { PlaceSuggestion } from './usePlaceSuggestions'

export default function PlaceSuggestionsDropdown({
  suggestions,
  onSelect,
}: {
  suggestions: PlaceSuggestion[]
  onSelect: (suggestion: PlaceSuggestion) => void
}) {
  if (suggestions.length === 0) return null

  return (
    <ul className="absolute left-0 right-0 top-full z-20 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-black/10 bg-white py-1.5 shadow-xl">
      {suggestions.map(s => (
        <li key={s.placeId}>
          <button
            type="button"
            // Runs before the input's onBlur, so the click still registers before the dropdown unmounts.
            onMouseDown={e => { e.preventDefault(); onSelect(s) }}
            className="flex w-full items-start gap-2.5 px-4 py-2.5 text-left text-sm text-ink hover:bg-ivory">
            <MapPin size={14} className="mt-0.5 flex-shrink-0 text-ink-faint" />
            <span className="truncate">{s.text}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}
