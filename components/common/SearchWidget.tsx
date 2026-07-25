'use client'
import { useState } from 'react'
import { MapPin, CalendarClock, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchState, TripType, HourlyPackage } from '@/context/SearchContext'

const TRIP_TYPES: TripType[] = ['Drop', 'Round Trip', 'Hourly Rental']

const HOURLY_PACKAGES: { value: HourlyPackage; label: string }[] = [
  { value: '4', label: '4 Hrs' },
  { value: '6', label: '6 Hrs' },
  { value: '8', label: '8 Hrs' },
]

function to24Hour(hour12: string, period: 'AM' | 'PM') {
  const [h, m] = hour12.split(':').map(Number)
  let h24 = h % 12
  if (period === 'PM') h24 += 12
  return `${String(h24).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function from24Hour(time24: string): { hour: string; period: 'AM' | 'PM' } {
  const [h, m] = time24.split(':').map(Number)
  const period: 'AM' | 'PM' = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return { hour: `${h12}:${String(m).padStart(2, '0')}`, period }
}

export default function SearchWidget() {
  const { state, dispatch } = useSearchState()
  const { tripType, stops, pickupTime: hour, pickupPeriod: period } = state
  const [addingStop, setAddingStop] = useState(false)
  const [stopInput, setStopInput] = useState('')

  const pickupDateTime = `${state.pickupDate}T${to24Hour(hour, period)}`
  const dropDateTime = `${state.dropDate}T${to24Hour(state.dropTime, state.dropPeriod)}`

  const onPickupDateTimeChange = (value: string) => {
    const [datePart, timePart] = value.split('T')
    if (!datePart || !timePart) return
    const { hour, period } = from24Hour(timePart)
    dispatch({ type: 'SET_PICKUP_DATE', value: datePart })
    dispatch({ type: 'SET_PICKUP_TIME', value: hour })
    dispatch({ type: 'SET_PICKUP_PERIOD', value: period })
  }

  const onDropDateTimeChange = (value: string) => {
    const [datePart, timePart] = value.split('T')
    if (!datePart || !timePart) return
    const { hour, period } = from24Hour(timePart)
    dispatch({ type: 'SET_DROP_DATE', value: datePart })
    dispatch({ type: 'SET_DROP_TIME', value: hour })
    dispatch({ type: 'SET_DROP_PERIOD', value: period })
  }

  const saveStop = () => {
    const value = stopInput.trim()
    if (value) dispatch({ type: 'ADD_STOP', value })
    setStopInput('')
    setAddingStop(false)
  }

  const removeStop = (index: number) => {
    dispatch({ type: 'REMOVE_STOP', index })
  }

  return (
    <div className="bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-5 md:p-10">
      {/* Trip type tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {TRIP_TYPES.map(t => (
          <button key={t} onClick={() => dispatch({ type: 'SET_TRIP_TYPE', tripType: t })}
            className={`flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              tripType === t
                ? 'bg-cta text-white border-cta'
                : 'bg-transparent text-ink-muted border-ink-faint/40 hover:border-cta/50 hover:text-ink'
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="grid gap-2 mb-4 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <MapPin size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">From</p>
            <input
              id="search-from-input"
              value={state.from}
              onChange={e => dispatch({ type: 'SET_FROM', value: e.target.value })}
              className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
              placeholder="Pickup city"
            />
          </div>
        </div>

        {tripType !== 'Hourly Rental' && stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
            <MapPin size={15} className="text-forest flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Stop {i + 1}</p>
              <p className="text-sm font-semibold text-ink truncate">{stop}</p>
            </div>
            <button type="button" onClick={() => removeStop(i)} aria-label={`Remove stop ${stop}`} className="text-ink-faint hover:text-ink flex-shrink-0">
              <X size={14} />
            </button>
          </div>
        ))}

        {tripType !== 'Hourly Rental' && (
          <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
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
                      if (e.key === 'Enter') { e.preventDefault(); saveStop() }
                      if (e.key === 'Escape') { setAddingStop(false); setStopInput('') }
                    }}
                    onBlur={() => { if (!stopInput) setAddingStop(false) }}
                    placeholder="Enter stop city"
                    className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
                  />
                </div>
                <button type="button" onClick={() => { setAddingStop(false); setStopInput('') }} aria-label="Cancel add stop"
                  className="text-ink-faint hover:text-ink flex-shrink-0">
                  <X size={14} />
                </button>
              </>
            ) : (
              <button type="button" onClick={() => setAddingStop(true)} className="flex items-center gap-3 w-full text-left">
                <Plus size={15} className="text-forest flex-shrink-0" />
                <span className="text-sm font-semibold text-ink-muted">Add stop</span>
              </button>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <MapPin size={15} className="text-ink-faint flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">To</p>
            <input
              value={state.to}
              onChange={e => dispatch({ type: 'SET_TO', value: e.target.value })}
              className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint"
              placeholder="Drop city"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <CalendarClock size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Pickup Date & Time</p>
            <input
              type="datetime-local"
              className="block w-full text-sm font-semibold text-ink bg-transparent outline-none"
              value={pickupDateTime}
              onChange={e => onPickupDateTimeChange(e.target.value)}
            />
          </div>
        </div>

        {(tripType === 'Round Trip' || tripType === 'Hourly Rental') && (
          <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
            <CalendarClock size={15} className="text-ink-faint flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Drop Date & Time</p>
              <input
                type="datetime-local"
                className="block w-full text-sm font-semibold text-ink bg-transparent outline-none"
                value={dropDateTime}
                onChange={e => onDropDateTimeChange(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

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
        <Link href="/search"
          className="flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cta/20">
          <Search size={15} /> Search Cabs
        </Link>
      </div>
    </div>
  )
}
