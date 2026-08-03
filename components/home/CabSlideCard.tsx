import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Car } from 'lucide-react'
import { CabCategory } from '@/types/cabs'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function CabSlideCard({ v }: { v: CabCategory }) {
  const description = stripHtml(v.description) || 'Similar or equivalent'

  return (
    <Link
      href="/book"
      className="group relative flex h-[23rem] flex-col overflow-hidden rounded-[1.75rem] bg-forest-mid isolate"
    >
      {v.image ? (
        <Image
          src={v.image.url}
          alt={v.image.alt_text || v.name}
          fill
          sizes="(max-width:480px) 85vw, (max-width:768px) 45vw, (max-width:1024px) 32vw, 24vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Car size={44} className="text-white/25" />
        </div>
      )}

      {/* Scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

      {/* Ring that lights up on hover */}
      <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/15 transition-colors duration-300 group-hover:ring-cta/60" />

      <div className="relative z-10 mt-auto p-5">
        <h3 className="font-serif text-2xl leading-tight text-white">{v.name}</h3>
        <p className="mt-1 mb-4 truncate text-xs text-white/55">{description}</p>

        <div className="flex items-end justify-between">
          {v.fare !== null ? (
            <p className="font-mono text-sm font-bold text-white">
              ₹{v.fare.amount.toLocaleString('en-IN')}
              <span className="ml-1 font-sans text-[10px] font-normal text-white/50">onwards</span>
            </p>
          ) : <span />}

          <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-cta">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </div>
    </Link>
  )
}
