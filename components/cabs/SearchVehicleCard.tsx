import Image from 'next/image'
import Link from 'next/link'
import { Car } from 'lucide-react'
import { CabCategory } from '@/types/cabs'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function SearchVehicleCard({ v }: { v: CabCategory }) {
  const description = stripHtml(v.description)

  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 flex flex-row gap-3 sm:gap-5 hover:shadow-lg transition-shadow">
      <div className="relative w-20 h-20 sm:w-32 md:w-40 sm:h-24 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-ivory grid place-items-center">
        {v.image ? (
          <Image src={v.image.url} alt={v.image.alt_text || v.name} fill sizes="(max-width: 640px) 80px, 160px" className="object-cover" />
        ) : (
          <Car size={24} className="text-ink-faint" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-ink text-sm sm:text-base mb-0.5">{v.name}</h3>
        {description && <p className="text-ink-faint text-xs mb-3">{description}</p>}
      </div>
      <div className="flex-shrink-0 flex flex-col items-end">
        <div>
          {v.fare !== null ? (
            <p className="font-mono font-bold text-ink text-lg sm:text-2xl">₹{v.fare.amount.toLocaleString('en-IN')}</p>
          ) : (
            <p className="font-bold text-ink-faint text-sm">Fare on request</p>
          )}
          <p className="text-ink-faint text-xs">est. fare</p>
        </div>
        <Link href="/book" className="bg-cta hover:bg-cta-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors mt-3">
          Select
        </Link>
      </div>
    </div>
  )
}
