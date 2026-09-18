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
      <div className="relative mx-auto w-full max-w-[110px] rounded-full bg-gradient-to-br from-cta/50 via-gold/40 to-cta/10 p-[3px] shadow-lg shadow-black/5 transition-all duration-300 group-hover:from-cta group-hover:to-gold/70 group-hover:shadow-cta/25 sm:max-w-[130px]">
        <div className="relative isolate aspect-square w-full overflow-hidden rounded-full bg-ivory ring-4 ring-white">
          {v.image ? (
            <Image
              src={v.image.url}
              alt={v.image.alt_text || v.name}
              fill
              sizes="130px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Car size={28} className="text-ink-faint" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
        </div>
      </div>

      <h3 className="mt-3 font-display text-sm font-bold tracking-tight text-ink sm:text-base">{v.name}</h3>
      <p className="mt-1 line-clamp-2 max-w-[90%] text-[11px] text-ink-faint sm:text-xs">{description}</p>
      {v.fare !== null && (
        <p className="mt-2 rounded-full bg-cta/10 px-2.5 py-1 font-mono text-xs font-bold text-cta sm:text-sm">
          ₹{v.fare.amount.toLocaleString('en-IN')}
          <span className="ml-1 font-sans text-[10px] font-normal text-ink-faint">onwards</span>
        </p>
      )}
    </Link>
  )
}
