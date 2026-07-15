import Image from 'next/image'
import Link from 'next/link'
import { Users, Wind } from 'lucide-react'

type CardVehicle = {
  id?: string
  name: string
  image: string
  model?: string
  seats: number
  startingFare?: number
  fare?: number
}

export default function VehicleCard({ v }: { v: CardVehicle }) {
  return (
    <Link href="/search"
      className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-44 overflow-hidden bg-ivory">
        <Image src={v.image} alt={v.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink text-base mb-0.5">{v.name}</h3>
        <p className="text-ink-faint text-xs mb-3">{v.model}</p>
        <div className="flex items-center gap-3 mb-4">
          <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={12} /> {v.seats} seats</span>
          <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={12} /> AC</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono font-bold text-forest text-xl">
              ₹{(v.startingFare ?? v.fare ?? 0).toLocaleString('en-IN')}
            </p>
            <p className="text-ink-faint text-[10px]">starting fare</p>
          </div>
          <span className="bg-cta text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-cta-dark transition-colors">
            Select
          </span>
        </div>
      </div>
    </Link>
  )
}
