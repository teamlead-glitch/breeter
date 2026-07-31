'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SlidersHorizontal, ArrowLeft, X } from 'lucide-react'
import FilterFields from '@/components/search/FilterFields'
import SearchVehicleCard, { PricedCabCategory } from '@/components/cabs/SearchVehicleCard'
import { useBookModal } from '@/components/common/BookModalContext'
import { SearchState, useSearchState } from '@/context/SearchContext'
import { apiGet } from '@/lib/apiService'
import { DEFAULT_STATE_ID, PLACEHOLDER_DISTANCE_KM, TRIP_TYPE_IDS } from '@/lib/constants'
import { CabCategoriesData } from '@/types/cabs'

function formatDate(value: string) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function formatTime(value: string) {
  if (!value) return ''
  return new Date(value)
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true })
    .replace(/am|pm/i, m => m.toUpperCase())
}

function buildCabCategoryParams(state: SearchState): URLSearchParams {
  const params = new URLSearchParams()
  params.set('per_page', '15')
  params.set('state_id', String(DEFAULT_STATE_ID))
  params.set('trip_type_id', String(TRIP_TYPE_IDS[state.tripType]))
  params.set('start_location', state.from)
  params.set('end_location', state.to)
  state.stops.forEach(stop => params.append('stops[]', stop))
  params.set('from_date', state.pickupDate)

  if (state.tripType === 'Round Trip') {
    params.set('to_date', state.dropDate)
  }

  if (state.tripType === 'Hourly Rental') {
    params.set('actual_hours', state.hourlyPackage)
  } else {
    // TODO: replace with a real route-distance calculation; backend will
    // eventually derive this itself — remove once that lands.
    params.set('distance_km', String(PLACEHOLDER_DISTANCE_KM))
  }

  // The API's boolean validation accepts 0/1, not the strings "true"/"false".
  params.set('with_vehicle_below_5yr', state.filters.addOns.includes('Vehicle below 5 years') ? '1' : '0')
  params.set('with_carrier', state.filters.addOns.includes('Roof carrier') ? '1' : '0')
  params.set('with_language', state.filters.addOns.includes('Driver language') ? '1' : '0')
  state.filters.vehicleTags.forEach(id => params.append('vehicle_tag_ids[]', String(id)))

  return params
}

function fetchCabCategories(state: SearchState) {
  const params = buildCabCategoryParams(state)
  return apiGet<CabCategoriesData>(`v1/cab-categories?${params.toString()}`)
}

export default function SearchResultsPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const { state, dispatch } = useSearchState()
  const { openBookModal } = useBookModal()
  const [cabs, setCabs] = useState<PricedCabCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    fetchCabCategories(state).then(res => {
      if (cancelled) return
      if (res.error || !res.data) {
        setError(true)
      } else {
        setCabs(res.data.data.filter((v): v is PricedCabCategory => v.fare !== null))
      }
      setLoading(false)
    })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.searchVersion])

  return (
    <>
    <div className="min-h-screen bg-ivory pt-16">
      {/* Trip summary bar */}
      <div className="bg-white border-b border-black/5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/" className="text-ink-faint hover:text-ink transition-colors">
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-3 flex-wrap flex-1">
              <span className="bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">{state.tripType}</span>
              <div>
                <p className="text-xs text-ink-faint">Route</p>
                <p className="font-semibold text-ink text-sm">{state.from} → {state.to}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-ink-faint">Date / Time</p>
                <p className="font-semibold text-ink text-sm">{formatDate(state.pickupDate)} · {formatTime(state.pickupDate)}</p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs text-ink-faint">Distance</p>
                <p className="font-semibold text-ink text-sm font-mono">~295 km</p>
              </div>
            </div>
            <button
              onClick={openBookModal}
              className="text-xs font-semibold text-forest border border-forest px-3 py-1.5 rounded-lg hover:bg-forest hover:text-white transition-colors">
              Modify
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6 items-start">

          {/* Sidebar filters */}
          <aside className="hidden lg:block w-60 flex-shrink-0 bg-white rounded-2xl border border-black/5 p-5">
            <div className="flex items-center gap-2 mb-5">
              <SlidersHorizontal size={16} className="text-forest" />
              <h3 className="font-bold text-ink text-sm">Filters</h3>
            </div>

            <FilterFields onChange={() => dispatch({ type: 'TRIGGER_SEARCH' })} />
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-ink text-2xl">Available cabs</h2>
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 text-xs font-semibold text-ink-muted border border-black/10 px-3 py-2 rounded-lg hover:border-forest/40 transition-colors">
                <SlidersHorizontal size={14} />
                Filters
              </button>
            </div>

            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-28 sm:h-32 rounded-2xl bg-white border border-black/5 animate-pulse" />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="bg-white rounded-2xl border border-black/5 p-8 text-center text-ink-faint text-sm">
                Couldn&apos;t load cabs right now. Please try searching again.
              </div>
            )}

            {!loading && !error && cabs.length === 0 && (
              <div className="bg-white rounded-2xl border border-black/5 p-8 text-center text-ink-faint text-sm">
                No cabs available for this search.
              </div>
            )}

            {!loading && !error && cabs.length > 0 && (
              <div className="space-y-4">
                {cabs.map(v => (
                  <SearchVehicleCard key={v.id} v={v} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>

    {/* Mobile filter popup */}
    {filterOpen && (
      <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:px-4 lg:hidden">
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setFilterOpen(false)}
        />
        <div className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 sticky top-0 bg-white">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-forest" />
              <h3 className="font-bold text-ink text-sm">Filters</h3>
            </div>
            <button
              onClick={() => setFilterOpen(false)}
              className="w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
              <X size={18} />
            </button>
          </div>
          <div className="p-5">
            <FilterFields />
          </div>
          <div className="p-5 pt-0">
            <button
              onClick={() => { dispatch({ type: 'TRIGGER_SEARCH' }); setFilterOpen(false) }}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold text-sm py-3 rounded-xl transition-colors">
              Apply filters
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
