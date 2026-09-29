'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Car, Luggage, Users, Wind } from 'lucide-react'
import { CabCategory } from '@/types/cabs'
import { useSearchState } from '@/context/SearchContext'
import VehicleSearchModal from '@/components/common/VehicleSearchModal'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

function Spec({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-1.5 rounded-lg bg-cta/5 px-2 py-1 text-[11px] font-semibold text-cta-dark">
      {icon} {text}
    </span>
  )
}

// Tablet/desktop card (3 per row). Phones use the compact HomeVehicleCard tile instead — see CabsGrid.
export default function CabCategoryCard({ v }: { v: CabCategory }) {
  const { dispatch } = useSearchState()
  const [searchOpen, setSearchOpen] = useState(false)
  const description = stripHtml(v.description) || 'Similar or equivalent'

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'SET_CAB_CATEGORY_ID', id: v.id })
          setSearchOpen(true)
        }}
        className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white text-left ring-1 ring-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1.5 hover:ring-cta/30 hover:shadow-[0_24px_48px_-16px_rgba(31,107,123,0.35)]">
        {/* Photo */}
        <div className="relative aspect-[4/3] w-full flex-shrink-0 overflow-hidden bg-ivory">
          {v.image ? (
            <Image
              src={v.image.url}
              alt={v.image.alt_text || v.name}
              fill
              sizes="(max-width:1024px) 33vw, 320px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Car size={32} className="text-ink-faint" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent" />

          {v.fare !== null && (
            <span className="absolute bottom-3 left-3 rounded-xl bg-white/95 px-3 py-1.5 shadow-sm backdrop-blur-sm">
              <span className="block text-[10px] font-medium uppercase tracking-wide text-ink-faint">From</span>
              <span className="block font-mono text-sm font-bold text-cta lg:text-base">₹{v.fare.amount.toLocaleString('en-IN')}</span>
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-1 flex-col p-4 lg:p-5">
          <h3 className="line-clamp-2 font-display text-base font-bold leading-tight text-ink lg:text-lg">{v.name}</h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-faint">{description}</p>

          <div className="mt-3 mb-4 flex flex-wrap gap-1.5">
            {v.seating_capacity !== null && <Spec icon={<Users size={12} />} text={`${v.seating_capacity} seats`} />}
            {v.number_of_bags !== null && <Spec icon={<Luggage size={12} />} text={`${v.number_of_bags} bags`} />}
            <Spec icon={<Wind size={12} />} text="AC" />
          </div>

          <span className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-cta py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-cta-dark">
            Select <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
      {searchOpen && <VehicleSearchModal vehicleName={v.name} onClose={() => setSearchOpen(false)} />}
    </>
  )
}
