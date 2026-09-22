'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Car } from 'lucide-react'
import { CabCategory } from '@/types/cabs'
import { useSearchState } from '@/context/SearchContext'
import EnquiryModal from './EnquiryModal'
import VehicleSearchModal from './VehicleSearchModal'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function HomeVehicleCard({ v, square = false }: { v: CabCategory; square?: boolean }) {
  const { dispatch } = useSearchState()
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const description = stripHtml(v.description) || 'Similar or equivalent'
  const outerRadius = square ? 'w-[86%] rounded-2xl sm:w-[80%] sm:rounded-3xl' : 'w-full rounded-full'
  const innerRadius = square ? 'rounded-xl sm:rounded-[1.25rem]' : 'rounded-full'
  const className = 'group flex cursor-pointer flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1'

  const content = (
    <>
      <div className={`relative mx-auto ${outerRadius} bg-white p-0.5 shadow-[0_6px_16px_-8px_rgba(0,0,0,0.22)] ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-[0_14px_32px_-8px_rgba(27,122,51,0.28)] group-hover:ring-cta/30 sm:max-w-[156px] sm:p-1 sm:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.22)]`}>
        <div className={`relative isolate aspect-square w-full overflow-hidden ${innerRadius} bg-ivory`}>
          {v.image ? (
            <Image
              src={v.image.url}
              alt={v.image.alt_text || v.name}
              fill
              sizes="156px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Car size={30} className="text-ink-faint" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </div>
      </div>

      <h3 className="mt-2 line-clamp-2 font-display text-[11px] font-semibold leading-tight text-ink sm:mt-3.5 sm:text-base">{v.name}</h3>
      <p className="mt-1 hidden line-clamp-2 max-w-[92%] text-xs text-ink-faint sm:block">{description}</p>
      {v.fare !== null && (
        <p className="mt-2 hidden rounded-full border border-cta/20 bg-white px-2.5 py-1 font-mono text-sm font-bold text-cta sm:block">
          ₹{v.fare.amount.toLocaleString('en-IN')}
          <span className="ml-1 font-sans text-[10px] font-normal text-ink-faint">onwards</span>
        </p>
      )}
    </>
  )

  if (v.is_enquiry_only) {
    return (
      <>
        <button type="button" onClick={() => setEnquiryOpen(true)} className={className}>
          {content}
        </button>
        {enquiryOpen && <EnquiryModal category={v.slug} subject={v.name} onClose={() => setEnquiryOpen(false)} />}
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
