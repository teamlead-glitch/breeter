'use client'
import { useState } from 'react'
import { MapPin, CalendarClock, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchState, TripType } from '@/context/SearchContext'

const TRIP_TYPES: TripType[] = ['Drop', 'Round Trip', 'Hourly Rental']

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

      {/* Fields grid */}
      <div className={`grid gap-2 mb-4 ${
        tripType === 'Round Trip'
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
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

        {tripType !== 'Hourly Rental' && (
          <div className="sm:hidden flex items-center gap-2 flex-wrap">
            {stops.map((stop, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold text-forest bg-forest/10 rounded-lg pl-3 pr-2 py-2">
                <MapPin size={12} /> {stop}
                <button onClick={() => removeStop(i)} aria-label={`Remove stop ${stop}`} className="text-ink-faint hover:text-ink">
                  <X size={12} />
                </button>
              </span>
            ))}

            {addingStop ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={stopInput}
                  onChange={e => setStopInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { e.preventDefault(); saveStop() }
                    if (e.key === 'Escape') { setAddingStop(false); setStopInput('') }
                  }}
                  placeholder="Enter stop city"
                  className="text-xs font-semibold text-ink bg-ivory border border-ink-faint/30 rounded-lg px-3 py-2 outline-none focus:border-cta/50 transition-colors w-36"
                />
                <button onClick={saveStop}
                  className="text-xs font-bold text-white bg-cta hover:bg-cta-dark rounded-lg px-3 py-2 transition-colors">
                  Save
                </button>
                <button onClick={() => { setAddingStop(false); setStopInput('') }} aria-label="Cancel add stop"
                  className="text-ink-faint hover:text-ink p-2">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setAddingStop(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-forest/70 hover:text-forest border border-dashed border-forest/30 hover:border-forest/60 rounded-lg px-3 py-2 transition-colors">
                <Plus size={13} /> Add stop
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

        {tripType === 'Round Trip' && (
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

      {/* Footer row */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="hidden sm:contents">
        {tripType !== 'Hourly Rental' && (
          <>
            {stops.map((stop, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-semibold text-forest bg-forest/10 rounded-lg pl-3 pr-2 py-2">
                <MapPin size={12} /> {stop}
                <button onClick={() => removeStop(i)} aria-label={`Remove stop ${stop}`} className="text-ink-faint hover:text-ink">
                  <X size={12} />
                </button>
              </span>
            ))}

            {addingStop ? (
              <div className="flex items-center gap-1.5">
                <input
                  autoFocus
                  value={stopInput}
                  onChange={e => setStopInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { e.preventDefault(); saveStop() }
                    if (e.key === 'Escape') { setAddingStop(false); setStopInput('') }
                  }}
                  placeholder="Enter stop city"
                  className="text-xs font-semibold text-ink bg-ivory border border-ink-faint/30 rounded-lg px-3 py-2 outline-none focus:border-cta/50 transition-colors w-36"
                />
                <button onClick={saveStop}
                  className="text-xs font-bold text-white bg-cta hover:bg-cta-dark rounded-lg px-3 py-2 transition-colors">
                  Save
                </button>
                <button onClick={() => { setAddingStop(false); setStopInput('') }} aria-label="Cancel add stop"
                  className="text-ink-faint hover:text-ink p-2">
                  <X size={14} />
                </button>
              </div>
            ) : (
              <button onClick={() => setAddingStop(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-forest/70 hover:text-forest border border-dashed border-forest/30 hover:border-forest/60 rounded-lg px-3 py-2 transition-colors">
                <Plus size={13} /> Add stop
              </button>
            )}
          </>
        )}
        </div>
        <div className="flex-1" />
        <Link href="/search"
          className="flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-cta/20">
          <Search size={15} /> Search Cabs
        </Link>
      </div>
    </div>
  )
}
