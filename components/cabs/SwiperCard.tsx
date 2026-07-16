import Image from 'next/image'
import Link from 'next/link'
import { Users } from 'lucide-react'
import { Vehicle } from '@/lib/data'

export default function SwiperCard({ v }: { v: Vehicle }) {
  return (
    <Link href="/cabs" className="group block bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-44 overflow-hidden bg-ivory">
        <Image
          src={v.image}
          alt={v.name}
          fill
          sizes="(max-width:480px) 80vw, (max-width:768px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-cta/90 group-hover:bg-cta text-white font-bold text-xs px-3 py-1.5 rounded-lg transition-colors backdrop-blur-sm">
          Select →
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-ink text-sm mb-0.5">{v.name}</h3>
        <p className="text-ink-faint text-xs mb-3 truncate">{v.model}</p>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-xs text-ink-muted">
            <Users size={11} /> {v.seats} seats
          </span>
        </div>
      </div>
    </Link>
  )
}
