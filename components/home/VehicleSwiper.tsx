'use client'
import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { apiGet } from '@/lib/apiService'
import { CabCategoriesData, CabCategory } from '@/types/cabs'
import CabCategoryCard from '@/components/cabs/CabCategoryCard'

export default function VehicleSwiper() {
  const [vehicles, setVehicles] = useState<CabCategory[]>([])
  const [loading, setLoading] = useState(true)

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

  return (
    <section className="bg-forest py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-mono text-white/70 text-xs tracking-[0.2em] uppercase mb-2">Select your vehicle</p>
            <h2 className="font-display text-white text-3xl md:text-4xl font-bold">Choose your ride</h2>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4.5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-64 rounded-2xl bg-white/10 animate-pulse" />
            ))}
          </div>
        ) : (
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
                <CabCategoryCard v={v} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  )
}
