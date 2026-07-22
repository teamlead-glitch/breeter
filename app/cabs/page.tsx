import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import SearchWidget from '@/components/common/SearchWidget'
import HomeSwiperCard from '@/components/cabs/HomeSwiperCard'
import { vehicles, luxuryVehicles, busVanOptions } from '@/lib/data'
import { getSeoMetadata } from '@/lib/seo'

type PageProps = { searchParams: Promise<{ type?: string }> }

const SEO_SLUGS: Record<string, string> = {
  cabs: 'page-cabs',
  luxury: 'page-luxury-cabs',
  'bus-van': 'page-bus-van',
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { type = 'cabs' } = await searchParams
  const cat = CATEGORIES[type as keyof typeof CATEGORIES] ?? CATEGORIES.cabs
  return getSeoMetadata(SEO_SLUGS[type] ?? SEO_SLUGS.cabs, {
    title: `${cat.title} — Breeter`,
    description: cat.desc,
    image: cat.image,
  })
}

const CATEGORIES = {
  cabs: {
    eyebrow: 'Outstation · Local · Hourly',
    title: 'Cabs',
    desc: 'Comfortable, verified cabs for drop, round trips and hourly rentals at transparent slab-based fares.',
    image: 'https://images.unsplash.com/photo-1643220297812-8cb15ba7c3d6?auto=format&fit=crop&w=1400&q=80',
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
        <div className="absolute inset-0 bg-gradient-to-b from-forest/20 via-forest/60 to-forest" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28">
          <p className="font-mono text-white/80 text-xs tracking-[0.2em] uppercase mb-2 drop-shadow-sm">{cat.eyebrow}</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">{cat.title}</h1>
          <p className="text-white/70 max-w-lg text-sm drop-shadow-sm">{cat.desc}</p>
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
            <HomeSwiperCard key={v.id ?? v.name} v={v} />
          ))}
        </div>
      </div>
    </>
  )
}
