import Image from 'next/image'
import Link from 'next/link'
import SearchWidget from '@/components/SearchWidget'
import { vehicles, luxuryVehicles, busVanOptions } from '@/lib/data'
import { Users, Wind } from 'lucide-react'

type PageProps = { searchParams: Promise<{ type?: string }> }

const CATEGORIES = {
  cabs: {
    eyebrow: 'Outstation · Local · Hourly',
    title: 'Cabs',
    desc: 'Comfortable, verified cabs for drop, round trips and hourly rentals at transparent slab-based fares.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80',
  },
  luxury: {
    eyebrow: 'Premium · Chauffeur driven',
    title: 'Luxury Cabs',
    desc: 'Premium chauffeur-driven cars for business travel, weddings, airport transfers and special occasions.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=80',
  },
  'bus-van': {
    eyebrow: 'Group travel · Spacious',
    title: 'Bus / Van',
    desc: 'Spacious vans and buses for group tours, corporate trips and large family travel across South India.',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80',
  },
}

export default async function CabsPage({ searchParams }: PageProps) {
  const { type = 'cabs' } = await searchParams
  const cat = CATEGORIES[type as keyof typeof CATEGORIES] ?? CATEGORIES.cabs

  const list =
    type === 'luxury' ? luxuryVehicles :
    type === 'bus-van' ? busVanOptions.map(v => ({ ...v, id: v.name, startingFare: v.fare, category: 'Group', image: v.image })) :
    vehicles

  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[48vh] flex items-end overflow-hidden">
        <Image src={cat.image} alt={cat.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 to-forest/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28">
          <p className="font-mono text-gold/70 text-xs tracking-[0.2em] uppercase mb-2">{cat.eyebrow}</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-2">{cat.title}</h1>
          <p className="text-white/60 max-w-lg text-sm">{cat.desc}</p>
        </div>
      </section>

      {/* Type selector */}
      <div className="bg-forest border-b border-white/10 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {Object.entries(CATEGORIES).map(([key, val]) => (
            <Link key={key} href={`/cabs${key === 'cabs' ? '' : `?type=${key}`}`}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
                (key === 'cabs' ? !type || type === 'cabs' : type === key)
                  ? 'bg-cta text-white border-cta'
                  : 'border-white/20 text-white/70 hover:text-white'
              }`}>
              {val.title}
            </Link>
          ))}
        </div>
      </div>

      {/* Search widget */}
      <div className="bg-ivory-dark border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <SearchWidget />
        </div>
      </div>

      {/* Vehicle grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-ink text-2xl font-bold">Available {cat.title.toLowerCase()}</h2>
          <span className="text-ink-faint text-sm">{list.length} options</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((v) => (
            <Link key={v.id ?? v.name} href="/search"
              className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="relative h-44 overflow-hidden bg-ivory">
                <Image src={v.image} alt={v.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <span className="absolute top-3 left-3 bg-forest/80 text-gold text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                  {v.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-ink text-base mb-0.5">{v.name}</h3>
                <p className="text-ink-faint text-xs mb-3">{v.model}</p>
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={12} /> {v.seats} seats</span>
                  <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={12} /> AC</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono font-bold text-forest text-xl">
                      ₹{((v as { startingFare?: number; fare?: number }).startingFare ?? (v as { startingFare?: number; fare?: number }).fare ?? 0).toLocaleString('en-IN')}
                    </p>
                    <p className="text-ink-faint text-[10px]">starting fare</p>
                  </div>
                  <span className="bg-cta text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-cta-dark transition-colors">
                    Select
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
