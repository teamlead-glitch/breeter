'use client'
import { useState, useRef, useEffect } from 'react'
import { MapPin, Calendar, Clock, Plus, Search, X, ChevronDown } from 'lucide-react'
import Link from 'next/link'

const TRIP_TYPES = ['Drop', 'Round Trip', 'Hourly Rental'] as const

const HOURS_12 = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const MINUTES = ['00', '15', '30', '45']
const HOUR_OPTIONS = HOURS_12.flatMap(h => MINUTES.map(m => `${h}:${m}`))

export default function SearchWidget() {
  const [tripType, setTripType] = useState('Drop')
  const [stops, setStops] = useState<string[]>([])
  const [addingStop, setAddingStop] = useState(false)
  const [stopInput, setStopInput] = useState('')
  const [hour, setHour] = useState('10:00')
  const [period, setPeriod] = useState('AM')
  const [hourOpen, setHourOpen] = useState(false)
  const hourRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hourOpen) return
    const onClick = (e: MouseEvent) => {
      if (hourRef.current && !hourRef.current.contains(e.target as Node)) {
        setHourOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [hourOpen])

  const saveStop = () => {
    const value = stopInput.trim()
    if (value) setStops(prev => [...prev, value])
    setStopInput('')
    setAddingStop(false)
  }

  const removeStop = (index: number) => {
    setStops(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-5 md:p-10">
      {/* Trip type tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto scrollbar-hide">
        {TRIP_TYPES.map(t => (
          <button key={t} onClick={() => setTripType(t)}
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
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      }`}>
        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <MapPin size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">From</p>
            <input id="search-from-input" defaultValue="Kochi" className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint" placeholder="Pickup city" />
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
            <input defaultValue="Kannur" className="block w-full text-sm font-semibold text-ink bg-transparent outline-none placeholder-ink-faint" placeholder="Drop city" />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <Calendar size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Pickup Date</p>
            <input type="date" className="block w-full text-sm font-semibold text-ink bg-transparent outline-none" defaultValue="2026-08-23" />
          </div>
        </div>

        <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
          <Clock size={15} className="text-forest flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Pickup Time</p>
            <div className="flex items-center gap-1.5">
              <div className="relative flex items-center" ref={hourRef}>
                <button
                  type="button"
                  onClick={() => setHourOpen(o => !o)}
                  className="flex items-center text-sm font-semibold text-ink bg-transparent outline-none cursor-pointer pr-4">
                  {hour}
                  <ChevronDown size={11} className={`text-ink-faint absolute right-0 transition-transform ${hourOpen ? 'rotate-180' : ''}`} />
                </button>
                {hourOpen && (
                  <div className="absolute z-20 top-full left-0 mt-1 w-20 max-h-40 overflow-y-auto bg-white rounded-lg shadow-xl border border-black/8">
                    {HOUR_OPTIONS.map(o => (
                      <button
                        key={o}
                        type="button"
                        onClick={() => { setHour(o); setHourOpen(false) }}
                        className={`block w-full text-left px-3 py-1.5 text-sm transition-colors ${
                          o === hour ? 'text-forest font-bold bg-forest/5' : 'text-ink hover:bg-ivory'
                        }`}>
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative flex items-center">
                <select
                  value={period}
                  onChange={e => setPeriod(e.target.value)}
                  className="text-sm font-semibold text-ink bg-transparent outline-none appearance-none cursor-pointer pr-4">
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <ChevronDown size={11} className="text-ink-faint absolute right-0 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {tripType === 'Round Trip' && (
          <div className="flex items-center gap-3 bg-ivory rounded-xl px-4 py-3 border-2 border-transparent focus-within:border-forest/25 transition-colors">
            <Calendar size={15} className="text-ink-faint flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-0.5">Drop Date</p>
              <input type="date" className="block w-full text-sm font-semibold text-ink bg-transparent outline-none" defaultValue="2026-08-25" />
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
