'use client'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import 'swiper/css'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { apiGet } from '@/lib/apiService'
import { CabCategoriesData, CabCategory } from '@/types/cabs'
import CabSlideCard from '@/components/home/CabSlideCard'

export default function VehicleSwiper() {
  const [vehicles, setVehicles] = useState<CabCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    let cancelled = false
    apiGet<CabCategoriesData>('v1/cab-categories?per_page=15').then(res => {
      if (cancelled) return
      if (res.data) setVehicles(res.data.data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (!loading && vehicles.length === 0) return null

  const loop = vehicles.length > 4

  return (
    <section className="relative overflow-hidden bg-forest py-20">
      {/* Ambient glow — purely decorative, clipped by section overflow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-cta/20 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">Select your vehicle</p>
            <h2 className="font-serif text-4xl italic text-white md:text-5xl">Choose your ride</h2>
          </div>

          {!loading && vehicles.length > 1 && (
            <div className="ml-auto flex items-center gap-3">
              <span className="mr-1 font-mono text-xs tabular-nums text-white/40">
                {String(activeIndex + 1).padStart(2, '0')} / {String(vehicles.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={!loop && atStart}
                aria-label="Previous vehicle"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-cta hover:bg-cta disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={!loop && atEnd}
                aria-label="Next vehicle"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-cta hover:bg-cta disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-92 animate-pulse rounded-[1.75rem] bg-white/10" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.15}
            breakpoints={{
              480: { slidesPerView: 2.15 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4.2 },
            }}
            loop={loop}
            onSwiper={swiper => { swiperRef.current = swiper }}
            onSlideChange={swiper => {
              setActiveIndex(swiper.realIndex)
              setAtStart(swiper.isBeginning)
              setAtEnd(swiper.isEnd)
            }}
            autoplay={{ delay: 4200, disableOnInteraction: false }}
          >
            {vehicles.map(v => (
              <SwiperSlide key={v.id} className="!h-auto">
                <CabSlideCard v={v} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
