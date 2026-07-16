import Image from 'next/image'
import SearchWidget from '@/components/common/SearchWidget'
import HeroCategoryMenu from '@/components/home/HeroCategoryMenu'

export default function HeroBanner() {
  return (
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
  )
}
