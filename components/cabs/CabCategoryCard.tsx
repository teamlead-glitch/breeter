'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Car, Luggage, Users, Wind } from 'lucide-react'
import { CabCategory } from '@/types/cabs'
import { useSearchState } from '@/context/SearchContext'
import EnquiryModal from '@/components/home/EnquiryModal'
import VehicleSearchModal from '@/components/common/VehicleSearchModal'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function CabCategoryCard({ v }: { v: CabCategory }) {
  const { dispatch } = useSearchState()
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const description = stripHtml(v.description) || 'Similar or equivalent'

  const className =
    'group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-black/10 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10'

  const content = (
    <>
      <div className="relative h-32 flex-shrink-0 overflow-hidden bg-ivory grid place-items-center sm:h-44">
        {v.image ? (
          <Image
            src={v.image.url}
            alt={v.image.alt_text || v.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Car size={40} className="text-ink-faint" />
        )}
        <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-ink/50 to-transparent" />

        <span className="absolute top-2 right-2 rounded-lg bg-cta/90 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-sm transition-colors group-hover:bg-cta sm:top-3 sm:right-3 sm:px-3 sm:py-1.5 sm:text-xs">
          {v.is_enquiry_only ? 'Enquire →' : 'Select →'}
        </span>

        {v.fare !== null && (
          <span className="absolute bottom-2 left-2 rounded-lg bg-white/95 px-2 py-1 font-mono text-[10px] font-bold text-cta backdrop-blur-sm sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1.5 sm:text-xs">
            ₹{v.fare.amount.toLocaleString('en-IN')}
            <span className="ml-1 font-sans font-normal text-ink-faint">onwards</span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="mb-1 text-sm font-bold text-ink sm:text-base">{v.name}</h3>
        <p className="mb-2 line-clamp-1 text-[11px] text-ink-faint sm:mb-3 sm:text-xs">{description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-1.5 sm:gap-2">
          {v.seating_capacity !== null && (
            <span className="flex items-center gap-1 rounded-full bg-ivory px-2 py-0.5 text-[10px] font-medium text-ink-muted sm:px-2.5 sm:py-1 sm:text-[11px]">
              <Users size={10} /> {v.seating_capacity} seats
            </span>
          )}
          {v.number_of_bags !== null && (
            <span className="flex items-center gap-1 rounded-full bg-ivory px-2 py-0.5 text-[10px] font-medium text-ink-muted sm:px-2.5 sm:py-1 sm:text-[11px]">
              <Luggage size={10} /> {v.number_of_bags} bags
            </span>
          )}
          <span className="flex items-center gap-1 rounded-full bg-ivory px-2 py-0.5 text-[10px] font-medium text-ink-muted sm:px-2.5 sm:py-1 sm:text-[11px]">
            <Wind size={10} /> AC
          </span>
        </div>
      </div>
    </>
  )

  if (v.is_enquiry_only) {
    return (
      <>
        <button type="button" onClick={() => setEnquiryOpen(true)} className={className}>
          {content}
        </button>
        {enquiryOpen && <EnquiryModal cabCategoryId={v.id} subject={v.name} onClose={() => setEnquiryOpen(false)} />}
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          dispatch({ type: 'SET_CAB_CATEGORY_ID', id: v.id })
          setSearchOpen(true)
        }}
        className={className}>
        {content}
      </button>
      {searchOpen && <VehicleSearchModal vehicleName={v.name} onClose={() => setSearchOpen(false)} />}
    </>
  )
}
