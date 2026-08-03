import Image from 'next/image'
import { Car, Users, Wind } from 'lucide-react'
import { MODEL_TEXT } from '@/components/cabs/SearchVehicleCard'
import { BookingDetails } from '@/types/booking'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function CabInfoCard({ cabCategory }: { cabCategory: BookingDetails['cab_category'] }) {
  const description = stripHtml(cabCategory.description) || MODEL_TEXT[cabCategory.name] || 'Similar or equivalent'

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div className="p-4 sm:p-5 flex items-center gap-4">
        <div className="relative w-24 sm:w-32 h-20 bg-ivory rounded-xl flex-shrink-0 grid place-items-center overflow-hidden">
          {cabCategory.image ? (
            <Image src={cabCategory.image.url} alt={cabCategory.image.alt_text || cabCategory.name} fill sizes="128px" className="object-cover" />
          ) : (
            <Car size={28} className="text-ink-faint" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-ink text-base">{cabCategory.name}</h3>
          </div>
          <p className="text-ink-faint text-xs mb-2 truncate">{description}</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={11}/> {cabCategory.seating_capacity} Seats</span>
            <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={11}/> AC</span>
          </div>
        </div>
      </div>
      <div className="bg-ivory-dark border-t-2 border-black/5 px-4 sm:px-5 py-3 flex items-start gap-2">
        <span className="text-cta text-sm flex-shrink-0">ⓘ</span>
        <p className="text-ink-faint text-xs">Cab operator will be assigned on booking completion</p>
      </div>
    </div>
  )
}
