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

export default function CabSlideCard({ v }: { v: CabCategory }) {
  const { dispatch } = useSearchState()
  const description = stripHtml(v.description) || 'Similar or equivalent'

  return (
    <Link
      href="/book"
      onClick={() => dispatch({ type: 'SET_CAB_CATEGORY_ID', id: v.id })}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative isolate aspect-square w-full overflow-hidden rounded-full bg-forest-mid ring-1 ring-white/15 transition-all duration-300 group-hover:ring-2 group-hover:ring-cta">
        {v.image ? (
          <Image
            src={v.image.url}
            alt={v.image.alt_text || v.name}
            fill
            sizes="(max-width:480px) 42vw, (max-width:768px) 30vw, (max-width:1024px) 22vw, 16vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Car size={36} className="text-white/25" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>

      <h3 className="mt-4 font-display text-base font-bold leading-tight text-white sm:text-lg">{v.name}</h3>
      <p className="mt-1 line-clamp-2 max-w-[90%] text-xs text-white/55">{description}</p>
      {v.fare !== null && (
        <p className="mt-1.5 font-mono text-sm font-bold text-cta-light">
          ₹{v.fare.amount.toLocaleString('en-IN')}
          <span className="ml-1 font-sans text-[10px] font-normal text-white/40">onwards</span>
        </p>
      )}
    </Link>
  )
}
