import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import SearchWidget from '@/components/common/SearchWidget'
import CabsGrid from '@/components/cabs/CabsGrid'
import { getSeoMetadata } from '@/lib/seo'

type PageProps = { searchParams: Promise<{ type?: string }> }

const SEO_SLUGS: Record<string, string> = {
  cabs: 'page-cabs',
  luxury: 'page-luxury-cabs',
  van: 'page-van',
  bus: 'page-bus',
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { type = 'cabs' } = await searchParams
  const cat = CATEGORIES[type as keyof typeof CATEGORIES] ?? CATEGORIES.cabs
  return getSeoMetadata(SEO_SLUGS[type] ?? SEO_SLUGS.cabs, {
    title: `${cat.title} — Breeter`,
    description: cat.desc,
  })
}

const CATEGORIES = {
  cabs: {
    eyebrow: 'Outstation · Local · Hourly',
    title: 'Cabs',
    desc: 'Comfortable, verified cabs for drop, round trips and hourly rentals at transparent slab-based fares.',
    image: '/images/cabs/cabs.jpg',
    // Per-image crop + left shade: bright photos (sky behind the text) need a stronger shade.
    position: 'object-[center_45%]',
    shade: 'from-ink/70 via-ink/30',
  },
  luxury: {
    eyebrow: 'Premium · Chauffeur driven',
    title: 'Luxury Cabs',
    desc: 'Premium chauffeur-driven cars for business travel, weddings, airport transfers and special occasions.',
    image: '/images/cabs/luxury.jpg',
    position: 'object-[center_55%]',
    shade: 'from-ink/60 via-ink/20',
  },
  van: {
    eyebrow: 'Group travel · Spacious',
    title: 'Van',
    desc: 'Spacious vans and tempo travellers for group tours, corporate trips and large family travel across South India.',
    image: '/images/cabs/van.jpg',
    position: 'object-[center_70%]',
    shade: 'from-ink/85 via-ink/50',
  },
  bus: {
    eyebrow: 'Group travel · Events',
    title: 'Bus',
    desc: 'Mini buses and AC coaches for large groups, events and long-distance tours across South India.',
    image: '/images/cabs/bus.jpg',
    position: 'object-[center_60%]',
    shade: 'from-ink/80 via-ink/40',
  },
}

export default async function CabsPage({ searchParams }: PageProps) {
  const { type = 'cabs' } = await searchParams
  const cat = CATEGORIES[type as keyof typeof CATEGORIES] ?? CATEGORIES.cabs
  return (
    <>
      {/* Banner */}
      <section className="relative min-h-[260px] sm:min-h-[47vh] flex items-end overflow-hidden">
        <Image src={cat.image} alt={cat.title} fill priority sizes="100vw" className={`object-cover ${cat.position}`} />
        {/* Keep the photo clear: shade only behind the text (left) and a short fade into the tab bar (bottom). */}
        <div className={`absolute inset-0 bg-gradient-to-r ${cat.shade} to-transparent`} />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest to-transparent" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 pt-[76px] sm:pb-8 sm:pt-24">
          <p className="font-mono text-white/80 text-xs tracking-[0.2em] uppercase mb-2 drop-shadow-sm">{cat.eyebrow}</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold mb-2 drop-shadow-md">{cat.title}</h1>
          <p className="text-white/90 max-w-lg text-sm drop-shadow-md">{cat.desc}</p>
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
        </div>

        <CabsGrid type={type} />
      </div>
    </>
  )
}
