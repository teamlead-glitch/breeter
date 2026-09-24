'use client'
import { useRef, useState } from 'react'
import { MapPin, CalendarClock, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchState, TripType, HourlyPackage } from '@/context/SearchContext'
import DateTimePicker from '@/components/common/DateTimePicker'
import { usePlaceSuggestions, PlaceSuggestion } from '@/components/common/usePlaceSuggestions'
import PlaceSuggestionsDropdown from '@/components/common/PlaceSuggestionsDropdown'

const TRIP_TYPES: TripType[] = ['Drop', 'Round Trip', 'Hourly Rental']

// Fetches the picked suggestion's coordinates via the same autocomplete session (cheaper and more
// accurate than a fresh, unsessioned geocode lookup for the same place).
async function fetchSuggestionCoords(suggestion: PlaceSuggestion) {
  try {
    const { place } = await suggestion.prediction.toPlace().fetchFields({ fields: ['location'] })
    return { lat: place.location?.lat() ?? null, lng: place.location?.lng() ?? null }
  } catch {
    return { lat: null, lng: null }
  }
}

const HOURLY_PACKAGES: { value: HourlyPackage; label: string }[] = [
  { value: '4', label: '4 Hrs' },
  { value: '6', label: '6 Hrs' },
  { value: '8', label: '8 Hrs' },
]

export default function SearchWidget({
  onSearch,
  bare = false,
  searchHref = '/search',
  submitLabel = 'Search Cabs',
}: {
  onSearch?: () => void
  bare?: boolean
  // Where the submit button navigates once the trip is valid — e.g. straight to /book when a
  // specific vehicle was already picked, skipping the /search results list.
  searchHref?: string
  submitLabel?: string
} = {}) {
  const { state, dispatch } = useSearchState()
  const { tripType, stops } = state
  const [addingStop, setAddingStop] = useState(false)
  const [stopInput, setStopInput] = useState('')
  const [errors, setErrors] = useState<{ from?: boolean; to?: boolean; pastDate?: boolean; dropBeforePickup?: boolean }>({})
  const [alertMessages, setAlertMessages] = useState<{ id: 'from' | 'to' | 'same' | 'pastDate' | 'dropBeforePickup'; text: string }[]>([])
  const fromInputRef = useRef<HTMLInputElement>(null)
  const toInputRef = useRef<HTMLInputElement>(null)
  const pickupDateRef = useRef<HTMLDivElement>(null)
  const dropDateRef = useRef<HTMLDivElement>(null)
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)
  const [stopOpen, setStopOpen] = useState(false)

  const removeStop = (index: number) => {
    dispatch({ type: 'REMOVE_STOP', index })
  }

  const { suggestions: fromSuggestions, endSession: endFromSession } = usePlaceSuggestions(state.from)
  const { suggestions: toSuggestions, endSession: endToSession } = usePlaceSuggestions(state.to)
  const { suggestions: stopSuggestions, endSession: endStopSession } = usePlaceSuggestions(stopInput)

  return (
    <div className={bare ? '' : 'bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-5 md:p-10'}>
      {/* Trip type tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {TRIP_TYPES.map(t => (
          <button key={t} onClick={() => dispatch({ type: 'SET_TRIP_TYPE', tripType: t })}
            className={`flex-none px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-sm sm:text-base font-semibold transition-all border ${
              tripType === t
                ? 'bg-cta text-white border-cta'
                : 'bg-transparent text-ink-muted border-ink-faint/40 hover:border-cta/50 hover:text-ink'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="grid gap-2 mb-4 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
        <div className="relative">
          <div className={`flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 transition-colors ${
            errors.from ? 'border-red-300' : 'border-transparent focus-within:border-forest/25'
          }`}>
            <MapPin size={15} className="text-forest flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">From</p>
              <input
                ref={fromInputRef}
                id="search-from-input"
                autoComplete="off"
                value={state.from}
                onChange={e => {
                  dispatch({ type: 'SET_FROM', value: e.target.value })
                  if (errors.from) setErrors(prev => ({ ...prev, from: false }))
                  setAlertMessages(prev => prev.filter(m => m.id !== 'from' && m.id !== 'same'))
                }}
                onFocus={() => setFromOpen(true)}
                onBlur={() => setFromOpen(false)}
                className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
                placeholder="Pickup city"
              />
            </div>
          </div>
          {fromOpen && (
            <PlaceSuggestionsDropdown
              suggestions={fromSuggestions}
              onSelect={s => {
                dispatch({ type: 'SET_FROM', value: s.text })
                setErrors(prev => ({ ...prev, from: false }))
                setAlertMessages(prev => prev.filter(m => m.id !== 'from' && m.id !== 'same'))
                setFromOpen(false)
                endFromSession()
                fetchSuggestionCoords(s).then(({ lat, lng }) => dispatch({ type: 'SET_FROM_COORDS', lat, lng }))
              }}
            />
          )}
        </div>

        {tripType !== 'Hourly Rental' && stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
            <MapPin size={15} className="text-forest flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Stop {i + 1}</p>
              <p className="text-sm font-semibold text-ink truncate">{stop.location}</p>
            </div>
            <button type="button" onClick={() => removeStop(i)} aria-label={`Remove stop ${stop.location}`} className="text-ink-faint hover:text-ink flex-shrink-0">
              <X size={14} />
            </button>
          </div>
        ))}

        {tripType !== 'Hourly Rental' && (
          <div className="relative">
            <div className="flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
              {addingStop ? (
                <>
                  <Plus size={15} className="text-forest flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Stop</p>
                    <input
                      autoFocus
                      value={stopInput}
                      onChange={e => setStopInput(e.target.value)}
                      onKeyDown={e => {
                        // Stops must be picked from the suggestions (so they have coords) — Enter does nothing.
                        if (e.key === 'Enter') e.preventDefault()
                        if (e.key === 'Escape') { setAddingStop(false); setStopInput(''); setStopOpen(false) }
                      }}
                      onFocus={() => setStopOpen(true)}
                      onBlur={() => { setStopOpen(false); if (!stopInput) setAddingStop(false) }}
                      placeholder="Enter stop city"
                      className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
                    />
                  </div>
                  <button type="button" onClick={() => { setAddingStop(false); setStopInput(''); setStopOpen(false) }} aria-label="Cancel add stop"
                    className="text-ink-faint hover:text-ink flex-shrink-0">
                    <X size={14} />
                  </button>
                </>
              ) : (
                <button type="button" onClick={() => setAddingStop(true)} className="flex items-center gap-3 w-full text-left">
                  <Plus size={15} className="text-forest flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Stop</p>
                    <span className="block text-sm font-semibold text-ink-muted">Add stop</span>
                  </div>
                </button>
              )}
            </div>
            {addingStop && stopOpen && (
              <PlaceSuggestionsDropdown
                suggestions={stopSuggestions}
                onSelect={s => {
                  const index = stops.length
                  dispatch({ type: 'ADD_STOP', stop: { location: s.text, lat: null, lng: null } })
                  setStopInput('')
                  setAddingStop(false)
                  setStopOpen(false)
                  endStopSession()
                  fetchSuggestionCoords(s).then(({ lat, lng }) => dispatch({ type: 'SET_STOP_COORDS', index, lat, lng }))
                }}
              />
            )}
          </div>
        )}

        <div className="relative">
          <div className={`flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 transition-colors ${
            errors.to ? 'border-red-300' : 'border-transparent focus-within:border-forest/25'
          }`}>
            <MapPin size={15} className="text-ink-faint flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">To</p>
              <input
                ref={toInputRef}
                autoComplete="off"
                value={state.to}
                onChange={e => {
                  dispatch({ type: 'SET_TO', value: e.target.value })
                  if (errors.to) setErrors(prev => ({ ...prev, to: false }))
                  setAlertMessages(prev => prev.filter(m => m.id !== 'to' && m.id !== 'same'))
                }}
                onFocus={() => setToOpen(true)}
                onBlur={() => setToOpen(false)}
                className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
                placeholder="Drop city"
              />
            </div>
          </div>
          {toOpen && (
            <PlaceSuggestionsDropdown
              suggestions={toSuggestions}
              onSelect={s => {
                dispatch({ type: 'SET_TO', value: s.text })
                setErrors(prev => ({ ...prev, to: false }))
                setAlertMessages(prev => prev.filter(m => m.id !== 'to' && m.id !== 'same'))
                setToOpen(false)
                endToSession()
                fetchSuggestionCoords(s).then(({ lat, lng }) => dispatch({ type: 'SET_TO_COORDS', lat, lng }))
              }}
            />
          )}
        </div>

        <div ref={pickupDateRef} className={`flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 transition-colors ${
          errors.pastDate ? 'border-red-300' : 'border-transparent focus-within:border-forest/25'
        }`}>
          <CalendarClock size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Pickup Date & Time</p>
            <DateTimePicker
              value={state.pickupDate}
              onChange={value => {
                dispatch({ type: 'SET_PICKUP_DATE', value })
                if (errors.pastDate || errors.dropBeforePickup) {
                  setErrors(prev => ({ ...prev, pastDate: false, dropBeforePickup: false }))
                }
                setAlertMessages(prev => prev.filter(m => m.id !== 'pastDate' && m.id !== 'dropBeforePickup'))
              }}
            />
          </div>
        </div>

        {(tripType === 'Round Trip' || tripType === 'Hourly Rental') && (
          <div ref={dropDateRef} className={`flex items-center gap-3 bg-ivory-dark rounded-xl px-4 py-3 border-2 transition-colors ${
            errors.dropBeforePickup ? 'border-red-300' : 'border-transparent focus-within:border-forest/25'
          }`}>
            <CalendarClock size={15} className="text-ink-faint flex-shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Drop Date & Time</p>
              <DateTimePicker
                value={state.dropDate}
                onChange={value => {
                  dispatch({ type: 'SET_DROP_DATE', value })
                  if (errors.dropBeforePickup) setErrors(prev => ({ ...prev, dropBeforePickup: false }))
                  setAlertMessages(prev => prev.filter(m => m.id !== 'dropBeforePickup'))
                }}
              />
            </div>
          </div>
        )}
      </div>

      {alertMessages.length > 0 && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <ul className="space-y-1">
            {alertMessages.map(m => (
              <li key={m.id} className="text-xs font-medium text-red-700">{m.text}</li>
            ))}
          </ul>
        </div>
      )}

      {tripType === 'Hourly Rental' && (
        <div role="radiogroup" aria-label="Hourly package" className="flex items-center gap-2 mb-4">
          {HOURLY_PACKAGES.map(pkg => (
            <button
              key={pkg.value}
              type="button"
              role="radio"
              aria-checked={state.hourlyPackage === pkg.value}
              onClick={() => dispatch({ type: 'SET_HOURLY_PACKAGE', value: pkg.value })}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 border transition-colors ${
                state.hourlyPackage === pkg.value ? 'bg-cta/5 border-cta/30' : 'border-black/10 hover:border-black/20'
              }`}>
              <span
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 grid place-items-center transition-colors ${
                  state.hourlyPackage === pkg.value ? 'border-cta' : 'border-ink-faint/40'
                }`}>
                {state.hourlyPackage === pkg.value && <span className="w-2 h-2 rounded-full bg-cta" />}
              </span>
              <span className={`text-sm font-semibold ${state.hourlyPackage === pkg.value ? 'text-ink' : 'text-ink-muted'}`}>{pkg.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Footer row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex-1" />
        <Link href={searchHref} onClick={e => {
            const nextErrors: { from?: boolean; to?: boolean; pastDate?: boolean; dropBeforePickup?: boolean } = {}
            const messages: { id: 'from' | 'to' | 'same' | 'pastDate' | 'dropBeforePickup'; text: string }[] = []
            const from = state.from.trim()
            const to = state.to.trim()

            if (!from) { nextErrors.from = true; messages.push({ id: 'from', text: 'Enter a pickup city.' }) }
            if (!to) { nextErrors.to = true; messages.push({ id: 'to', text: 'Enter a drop city.' }) }
            if (from && to && from.toLowerCase() === to.toLowerCase()) {
              nextErrors.from = true
              nextErrors.to = true
              messages.push({ id: 'same', text: "Pickup and drop locations can't be the same." })
            }

            const pickup = new Date(state.pickupDate)
            if (!Number.isNaN(pickup.getTime()) && pickup.getTime() < Date.now()) {
              nextErrors.pastDate = true
              messages.push({ id: 'pastDate', text: "Pickup date & time can't be in the past." })
            }

            if (tripType === 'Round Trip' || tripType === 'Hourly Rental') {
              const drop = new Date(state.dropDate)
              if (!Number.isNaN(pickup.getTime()) && !Number.isNaN(drop.getTime()) && drop.getTime() < pickup.getTime()) {
                nextErrors.dropBeforePickup = true
                messages.push({ id: 'dropBeforePickup', text: "Drop date & time can't be before pickup." })
              }
            }

            if (messages.length > 0) {
              e.preventDefault()
              setErrors(nextErrors)
              setAlertMessages(messages)
              const target = nextErrors.from
                ? fromInputRef.current
                : nextErrors.to
                  ? toInputRef.current
                  : nextErrors.pastDate
                    ? pickupDateRef.current?.querySelector<HTMLInputElement>('input[type="date"]')
                    : dropDateRef.current?.querySelector<HTMLInputElement>('input[type="date"]')
              target?.focus()
              target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
              return
            }

            setAlertMessages([])
            dispatch({ type: 'TRIGGER_SEARCH' })
            onSearch?.()
          }}
          className="flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cta/20">
          <Search size={15} /> {submitLabel}
        </Link>
      </div>
    </div>
  )
}
