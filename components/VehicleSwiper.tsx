'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { Users, Wind } from 'lucide-react'
import { vehicles } from '@/lib/data'

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
              <Link href="/cabs" className="group block bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative h-44 overflow-hidden bg-ivory">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(max-width:480px) 80vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* <span className="absolute top-3 left-3 bg-forest/85 backdrop-blur-sm text-gold-light text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full">
                    {v.category}
                  </span> */}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-ink text-sm mb-0.5">{v.name}</h3>
                  <p className="text-ink-faint text-xs mb-3 truncate">{v.model}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <Users size={11} /> {v.seats} seats
                    </span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted">
                      <Wind size={11} /> AC
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-mono font-semibold text-ink text-base">
                        ₹{v.startingFare.toLocaleString('en-IN')}
                      </p>
                      <p className="text-ink-faint text-[10px]">starting fare</p>
                    </div>
                    <span className="bg-cta/10 group-hover:bg-cta text-cta group-hover:text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">
                      Select →
                    </span>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
