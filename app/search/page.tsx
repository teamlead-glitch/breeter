import Image from 'next/image'
import Link from 'next/link'
import { vehicles } from '@/lib/data'
import { Users, Wind, SlidersHorizontal, ArrowLeft } from 'lucide-react'

export default function SearchResultsPage() {
  return (
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
            <Link href="/" className="text-xs font-semibold text-forest border border-forest px-3 py-1.5 rounded-lg hover:bg-forest hover:text-white transition-colors">
              Modify
            </Link>
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

            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Vehicle tags</p>
            <div className="space-y-2.5 mb-5">
              {['Luxury Cabs', 'Bus / Van', 'Neat & Clean', 'Free Cancellation'].map(f => (
                <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                  <span className="w-4 h-4 rounded border-2 border-ink-faint/40 group-hover:border-forest transition-colors flex-shrink-0" />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
                </label>
              ))}
            </div>

            <div className="h-px bg-black/5 mb-5" />

            <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Add-ons</p>
            <div className="space-y-2.5">
              {['Vehicle below 5 years', 'Roof carrier'].map(f => (
                <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
                  <span className="w-4 h-4 rounded border-2 border-ink-faint/40 group-hover:border-forest transition-colors flex-shrink-0" />
                  <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-ink text-2xl font-bold">Available cabs</h2>
              <button className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted border border-black/10 px-3 py-2 rounded-lg hover:border-forest/40 transition-colors">
                Sort: Price ↑
              </button>
            </div>

            <div className="space-y-4">
              {vehicles.map(v => (
                <div key={v.id} className="bg-white rounded-2xl border border-black/5 p-5 flex gap-5 hover:shadow-lg transition-shadow">
                  <div className="relative w-32 sm:w-40 h-24 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-ivory">
                    <Image src={v.image} alt={v.name} fill sizes="160px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-ink text-base mb-0.5">{v.name} · AC {v.seats} Seat</h3>
                    <p className="text-ink-faint text-xs mb-3">{v.model}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Users size={10}/> {v.seats} seats</span>
                      <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Wind size={10}/> AC</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right flex flex-col justify-between items-end">
                    <div>
                      <p className="font-mono font-bold text-ink text-2xl">₹{v.startingFare.toLocaleString('en-IN')}</p>
                      <p className="text-ink-faint text-xs">est. fare</p>
                    </div>
                    <Link href="/book" className="bg-cta hover:bg-cta-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors mt-3">
                      Select
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
