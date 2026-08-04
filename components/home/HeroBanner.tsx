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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center mb-8 md:mb-14">
          <p className="font-mono text-cta-light text-xs tracking-[0.25em] uppercase mb-4">South India, door to door</p>

          <p className="mt-5 text-white/70 text-sm sm:text-base max-w-xl">
            Outstation cabs, hourly rentals and curated holiday packages — transparent pricing, verified drivers, zero surprises.
          </p>
        </div>

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
  )
}
