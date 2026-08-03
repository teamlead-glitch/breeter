import Image from 'next/image'
import Link from 'next/link'
import { Car, Users, Wind } from 'lucide-react'
import { CabCategory } from '@/types/cabs'

function stripHtml(html: string | null) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, '').trim()
}

export default function CabCategoryCard({ v }: { v: CabCategory }) {
  const description = stripHtml(v.description) || 'Similar or equivalent'

  return (
    <Link href="/book" className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 flex-shrink-0 overflow-hidden bg-ivory grid place-items-center">
        {v.image ? (
          <Image
            src={v.image.url}
            alt={v.image.alt_text || v.name}
            fill
            sizes="(max-width:480px) 80vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Car size={40} className="text-ink-faint" />
        )}
        <span className="absolute top-3 right-3 bg-cta/90 group-hover:bg-cta text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
          Select →
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-ink text-sm mb-0.5">{v.name}</h3>
        <p className="text-ink-faint text-xs truncate mb-2">{description}</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={11} /> 4 seats</span>
          <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={11} /> AC</span>
        </div>
        {v.fare !== null && (
          <p className="font-mono font-bold text-cta text-sm mt-2">₹{v.fare.amount.toLocaleString('en-IN')}</p>
        )}
      </div>
    </Link>
  )
}
