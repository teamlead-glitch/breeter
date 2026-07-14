import Image from 'next/image'
import Link from 'next/link'
import SearchWidget from '@/components/SearchWidget'
import HeroCategoryMenu from '@/components/HeroCategoryMenu'
import VehicleSwiper from '@/components/VehicleSwiper'
import StartBookingButton from '@/components/StartBookingButton'
import { packages, whyBreeter } from '@/lib/data'
import { Shield, Star, Wallet, ChevronRight } from 'lucide-react'



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
      <section className="relative min-h-[70vh] flex flex-col justify-start overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
          alt="Scenic winding mountain road"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layered gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/5 via-forest/25 to-forest/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/25 to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="flex flex-col items-center">
            <div className="relative z-20 w-full mb-3 sm:w-auto sm:-mb-7">
              <HeroCategoryMenu />
            </div>
            <div className="w-full">
              <SearchWidget />
            </div>
          </div>
        </div>
      </section>

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
              <Link key={pkg.slug} href={`/holidays/${pkg.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-black/4 transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-white/90 text-forest text-[10px] font-bold px-2.5 py-1 rounded-full">
                    {pkg.location}
                  </span>
                  <span className="absolute bottom-3 left-4 text-white/80 font-mono text-sm font-medium">
                    {pkg.nights}N / {pkg.days}D
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-forest transition-colors">{pkg.name}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-semibold text-ink-faint bg-ivory px-2.5 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-ink-faint uppercase tracking-wider">Starting from</p>
                      <p className="font-mono font-bold text-forest text-lg">
                        ₹{pkg.price.toLocaleString('en-IN')}
                        <span className="text-xs font-normal text-ink-faint">/person</span>
                      </p>
                    </div>
                    <span className="text-xs font-bold text-cta group-hover:bg-cta group-hover:text-white border border-cta px-3 py-1.5 rounded-xl transition-all">
                      Enquire →
                    </span>
                  </div>
                </div>
              </Link>
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
