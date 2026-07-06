import Image from 'next/image'
import Link from 'next/link'
import { packages } from '@/lib/data'
import { ChevronRight } from 'lucide-react'

export default function HolidaysPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[44vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=80"
          alt="Holiday packages"
          fill priority sizes="100vw" className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 to-forest/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28 text-center">
          <p className="font-mono text-gold/70 text-xs tracking-[0.2em] uppercase mb-2">Curated travel</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-2">Holiday Packages</h1>
          <p className="text-white/60 text-sm">Kerala, Tamil Nadu, Uttarakhand & beyond</p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 flex-wrap items-center">
            <span className="text-xs text-ink-faint">Filter by:</span>
            {['Kerala', 'Tamil Nadu', 'Uttarakhand', 'Goa', 'All states'].map(f => (
              <button key={f} className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                f === 'All states' ? 'bg-forest text-white border-forest' : 'border-black/10 text-ink-muted hover:border-forest/40'
              }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Package grid */}
      <div className="bg-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <p className="text-ink-muted text-sm">{packages.length} packages available</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <Link key={pkg.slug} href={`/holidays/${pkg.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 text-forest text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {pkg.location}
                  </span>
                  <span className="absolute bottom-3 left-4 text-white/80 font-mono text-sm">
                    {pkg.nights}N / {pkg.days}D
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-ink text-base mb-2 group-hover:text-forest transition-colors">{pkg.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-semibold text-ink-faint bg-ivory px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-ink-faint uppercase tracking-wider">From</p>
                      <p className="font-mono font-bold text-forest text-lg">₹{pkg.price.toLocaleString('en-IN')}</p>
                    </div>
                    <span className="flex items-center gap-1 text-xs font-bold text-cta group-hover:bg-cta group-hover:text-white border border-cta px-3 py-1.5 rounded-xl transition-all">
                      View <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
