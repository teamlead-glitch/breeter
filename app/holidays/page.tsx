'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { packages } from '@/lib/data'
import { Search } from 'lucide-react'
import PackageCard from '@/components/holidays/PackageCard'

const stateFilters = ['Kerala', 'Tamil Nadu', 'Uttarakhand', 'Goa', 'All states']

export default function HolidaysPage() {
  const [activeState, setActiveState] = useState('All states')
  const [query, setQuery] = useState('')

  const filteredPackages = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return packages.filter(pkg => {
      const matchesState = activeState === 'All states' || pkg.location === activeState
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
              {stateFilters.map(f => (
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
