import Image from 'next/image'
import SearchWidget from '@/components/common/SearchWidget'
import HeroCategoryMenu from '@/components/home/HeroCategoryMenu'

export default function HeroBanner() {
  return (
    <section className="relative min-h-[72vh] sm:min-h-[78vh] md:min-h-[85vh] flex flex-col justify-start overflow-hidden">
      <Image
        src="/images/banner.png"
        alt="Black car on a night highway with a route pin trail and city skyline"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Subtle bottom fade to blend into the section below — the artwork is already dark */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/70" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-10 flex-1 flex flex-col">
        <div className="text-center">
          <p className="font-mono text-cta-light text-[11px] sm:text-xs tracking-[0.3em] uppercase mb-3">
            South India, door to door
          </p>
          <h1 className="font-display font-bold text-white text-xl sm:text-2xl md:text-3xl leading-snug max-w-2xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
            Outstation cabs, hourly rentals & curated holiday packages
          </h1>
          <p className="mt-2 mb-5 text-white/55 text-xs sm:text-sm max-w-md mx-auto">
            Transparent pricing, verified drivers, zero surprises.
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center">
          <div className="relative z-20 w-full mb-3 sm:w-auto sm:-mb-7">
            <HeroCategoryMenu />
          </div>
          <div className="w-full">
            <SearchWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
