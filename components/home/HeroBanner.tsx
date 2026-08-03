import Image from 'next/image'
import SearchWidget from '@/components/common/SearchWidget'
import HeroCategoryMenu from '@/components/home/HeroCategoryMenu'

export default function HeroBanner() {
  return (
    <section className="relative min-h-[72vh] sm:min-h-[78vh] md:min-h-[85vh] flex flex-col justify-start overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80"
        alt="Scenic winding mountain road at dusk"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center brightness-[0.55] contrast-125 saturate-[1.15]"
      />
      {/* Layered gradient for cinematic, moody depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/15 to-ink/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-ink/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-12 flex-1 flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center text-center mb-8 md:mb-14">
          <p className="font-mono text-cta-light text-xs tracking-[0.25em] uppercase mb-4">South India, door to door</p>
          <h1 className="font-sans font-bold text-white text-3xl sm:text-5xl md:text-6xl max-w-3xl leading-[1.1] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
            Wherever the road leads, we&apos;ve already booked it.
          </h1>
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
