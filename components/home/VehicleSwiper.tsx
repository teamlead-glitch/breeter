'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { vehicles } from '@/lib/data'
import HomeSwiperCard from '@/components/cabs/HomeSwiperCard'

export default function VehicleSwiper() {
  return (
    <section className="bg-forest py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-white/70 text-xs tracking-[0.2em] uppercase mb-2">Select your vehicle</p>
            <h2 className="font-display text-white text-3xl md:text-4xl font-bold">Choose your ride</h2>
          </div>
          <Link href="/cabs" className="hidden sm:inline-flex text-white/50 hover:text-white text-sm font-medium gap-1 transition-colors items-center">
            View all →
          </Link>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={18}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3800, disableOnInteraction: false }}
          className="!pb-12"
        >
          {vehicles.map(v => (
            <SwiperSlide key={v.id}>
              <HomeSwiperCard v={v} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
