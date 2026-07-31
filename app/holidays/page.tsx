'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { packages } from '@/lib/data'
import { ChevronDown, Search } from 'lucide-react'
import PackageCard from '@/components/holidays/PackageCard'
import { apiGet } from '@/lib/apiService'
import { State, StatesData } from '@/types/states'

const ALL_STATES = 'All states'
const VISIBLE_STATE_COUNT = 5

function fetchStates() {
  return apiGet<StatesData>('v1/states?per_page=15')
}

export default function HolidaysPage() {
  const [states, setStates] = useState<State[]>([])
  const [activeState, setActiveState] = useState(ALL_STATES)
  const [query, setQuery] = useState('')
  const [moreOpen, setMoreOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchStates().then(res => {
      if (res.data) setStates(res.data.data)
    })
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const stateNames = useMemo(() => states.map(s => s.name), [states])
  const pinnedFilters = useMemo(() => [ALL_STATES, ...stateNames.slice(0, VISIBLE_STATE_COUNT)], [stateNames])
  const moreFilters = useMemo(() => stateNames.slice(VISIBLE_STATE_COUNT), [stateNames])

  const filteredPackages = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return packages.filter(pkg => {
      const matchesState = activeState === ALL_STATES || pkg.location === activeState
      const matchesKeyword =
        !keyword ||
        pkg.name.toLowerCase().includes(keyword) ||
        pkg.location.toLowerCase().includes(keyword)
      return matchesState && matchesKeyword
    })
  }, [activeState, query])

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[44vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80"
          alt="Holiday packages"
          fill priority sizes="100vw" className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-ink/30 to-ink/10" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28 text-center">
          <p className="font-mono text-white/80 text-xs tracking-[0.2em] uppercase mb-2 drop-shadow-sm">Curated travel</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">Holiday Packages</h1>
          <p className="text-white/70 text-sm drop-shadow-sm">Kerala, Tamil Nadu, Uttarakhand & beyond</p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 flex-wrap items-center justify-between">
            <div className="flex gap-3 flex-wrap items-center">
              <span className="text-xs text-ink-faint">Filter by:</span>
              {pinnedFilters.map(f => (
                <button
                  key={f}
                  onClick={() => setActiveState(f)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                    f === activeState ? 'bg-forest text-white border-forest' : 'border-black/10 text-ink-muted hover:border-forest/40'
                  }`}
                >
                  {f}
                </button>
              ))}
              {moreFilters.length > 0 && (
                <div className="relative" ref={moreRef}>
                  <button
                    onClick={() => setMoreOpen(o => !o)}
                    className={`flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                      moreFilters.includes(activeState) ? 'bg-forest text-white border-forest' : 'border-black/10 text-ink-muted hover:border-forest/40'
                    }`}
                  >
                    {moreFilters.includes(activeState) ? activeState : `+${moreFilters.length} more`}
                    <ChevronDown size={12} className={`transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {moreOpen && (
                    <div className="absolute z-20 top-full mt-2 left-0 w-48 max-h-64 overflow-y-auto bg-white rounded-xl border border-black/10 shadow-xl py-1.5">
                      {moreFilters.map(f => (
                        <button
                          key={f}
                          onClick={() => { setActiveState(f); setMoreOpen(false) }}
                          className={`w-full text-left text-xs px-3 py-2 transition-colors ${
                            f === activeState ? 'text-forest font-semibold bg-forest/5' : 'text-ink-muted hover:bg-ivory'
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search packages..."
                className="text-xs pl-8 pr-3 py-1.5 rounded-full border border-black/10 text-ink-muted placeholder:text-ink-faint focus:outline-none focus:border-forest/40 w-48"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Package grid */}
      <div className="bg-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-ink-muted text-sm">{filteredPackages.length} packages available</p>
          </div>

          {filteredPackages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-ink-muted text-sm">No packages match your search.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map(pkg => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
          )}
        </div>
      </div>
    </>
  )
}
