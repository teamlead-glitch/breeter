'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Car } from 'lucide-react'
import { CabCategory } from '@/types/cabs'
import { useSearchState } from '@/context/SearchContext'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function HomeVehicleCard({ v }: { v: CabCategory }) {
  const { dispatch } = useSearchState()
  const description = stripHtml(v.description) || 'Similar or equivalent'

  return (
    <Link
      href="/book"
      onClick={() => dispatch({ type: 'SET_CAB_CATEGORY_ID', id: v.id })}
      className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative mx-auto w-full max-w-[132px] rounded-full bg-white p-1 shadow-[0_10px_28px_-10px_rgba(0,0,0,0.22)] ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-[0_14px_32px_-8px_rgba(27,122,51,0.28)] group-hover:ring-cta/30 sm:max-w-[156px]">
        <div className="relative isolate aspect-square w-full overflow-hidden rounded-full bg-ivory">
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

      <h3 className="mt-3.5 font-display text-sm font-semibold text-ink sm:text-base">{v.name}</h3>
      <p className="mt-1 line-clamp-2 max-w-[92%] text-[11px] text-ink-faint sm:text-xs">{description}</p>
      {v.fare !== null && (
        <p className="mt-2 rounded-full border border-cta/20 bg-white px-2.5 py-1 font-mono text-xs font-bold text-cta sm:text-sm">
          ₹{v.fare.amount.toLocaleString('en-IN')}
          <span className="ml-1 font-sans text-[10px] font-normal text-ink-faint">onwards</span>
        </p>
      )}
    </Link>
  )
}
