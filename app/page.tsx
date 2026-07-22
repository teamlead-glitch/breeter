import Link from 'next/link'
import type { Metadata } from 'next'
import HeroBanner from '@/components/home/HeroBanner'
import VehicleSwiper from '@/components/home/VehicleSwiper'
import StartBookingButton from '@/components/home/StartBookingButton'
import FeaturedPackageCard from '@/components/holidays/FeaturedPackageCard'
import { packages, whyBreeter } from '@/lib/data'
import { Shield, Star, Wallet, ChevronRight } from 'lucide-react'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-home', {
    title: 'Breeter — Outstation Cabs & Holiday Packages',
    description: 'Book outstation cabs, hourly rentals and curated holiday packages across South India. Transparent pricing, verified operators.',
  })
}



const ICON_MAP: Record<string, React.ReactNode> = {
  shield: <Shield size={22} />,
  star: <Star size={22} />,
  wallet: <Wallet size={22} />,
}



export default function HomePage() {
  const featuredPackages = packages.slice(0, 3)

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <HeroBanner />

      {/* ─── VEHICLE SWIPER (inverted dark section) ────────── */}
      <VehicleSwiper />

     

      {/* ─── FEATURED PACKAGES ─────────────────────────────── */}
      <section className="bg-ivory py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Curated travel</p>
              <h2 className="font-display text-ink text-3xl md:text-4xl font-bold">Featured Packages</h2>
            </div>
            <Link href="/holidays" className="hidden sm:inline-flex items-center gap-1 text-forest font-semibold text-sm hover:underline underline-offset-4">
              View all <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPackages.map(pkg => (
              <FeaturedPackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/holidays" className="inline-flex items-center gap-1 text-forest font-semibold text-sm">
              View all packages <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </section>

     

      {/* ─── WHY BREETER ───────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-ivory-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Our promise</p>
            <h2 className="font-display text-ink text-3xl md:text-4xl font-bold">Why book with Breeter</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {whyBreeter.map(item => (
              <div key={item.title}
                className="group p-8 bg-ivory rounded-2xl hover:bg-forest cursor-default transition-all duration-300">
                <div className="w-12 h-12 bg-cta group-hover:bg-white rounded-xl grid place-items-center mb-5 transition-colors text-white group-hover:text-cta">
                  {ICON_MAP[item.icon]}
                </div>
                <h3 className="font-bold text-ink group-hover:text-white text-lg mb-2 transition-colors">{item.title}</h3>
                <p className="text-ink-muted group-hover:text-white/70 text-sm leading-relaxed transition-colors">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─────────────────────────────────────── */}
      <section className="bg-forest py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-3">
                Planning an outstation trip?
              </h2>
              <p className="text-white/55 text-base max-w-md">
                Get an instant fare estimate in under a minute. No credit card required.
              </p>
            </div>
            <StartBookingButton />
          </div>
        </div>
      </section>
    </>
  )
}
