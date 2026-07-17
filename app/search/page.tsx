'use client'
import { useState } from 'react'
import Link from 'next/link'
import { vehicles } from '@/lib/data'
import { SlidersHorizontal, ArrowLeft, X } from 'lucide-react'
import SearchWidget from '@/components/common/SearchWidget'
import FilterFields from '@/components/search/FilterFields'
import SearchVehicleCard from '@/components/cabs/SearchVehicleCard'

export default function SearchResultsPage() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [modifyOpen, setModifyOpen] = useState(false)

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
              <span className="bg-forest text-white text-xs font-semibold px-3 py-1 rounded-full">Drop</span>
              <div>
                <p className="text-xs text-ink-faint">Route</p>
                <p className="font-semibold text-ink text-sm">Kochi → Kannur</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-ink-faint">Date / Time</p>
                <p className="font-semibold text-ink text-sm">23 Aug · 10:00 AM</p>
              </div>
              <div className="hidden md:block">
                <p className="text-xs text-ink-faint">Distance</p>
                <p className="font-semibold text-ink text-sm font-mono">~295 km</p>
              </div>
            </div>
            <button
              onClick={() => setModifyOpen(true)}
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

            <FilterFields />
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

            <div className="space-y-4">
              {vehicles.map(v => (
                <SearchVehicleCard key={v.id} v={v} />
              ))}
            </div>
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
              onClick={() => setFilterOpen(false)}
              className="w-full bg-cta hover:bg-cta-dark text-white font-bold text-sm py-3 rounded-xl transition-colors">
              Apply filters
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Book a Cab popup (Modify) */}
    {modifyOpen && (
      <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setModifyOpen(false)}
        />
        <div className="relative w-full max-w-2xl md:max-w-5xl lg:max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
            <div>
              <p className="font-mono text-forest/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">Quick booking</p>
              <h2 className="font-bold text-ink text-xl">Book a Cab</h2>
            </div>
            <button
              onClick={() => setModifyOpen(false)}
              className="w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
              <X size={18} />
            </button>
          </div>
          <div className="px-6 py-6 bg-ivory/50">
            <SearchWidget />
          </div>
        </div>
      </div>
    )}
    </>
  )
}
