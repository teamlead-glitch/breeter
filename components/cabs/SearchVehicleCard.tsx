import Image from 'next/image'
import Link from 'next/link'
import { Users, Wind } from 'lucide-react'
import { Vehicle } from '@/lib/data'

export default function SearchVehicleCard({ v }: { v: Vehicle }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 flex flex-row gap-3 sm:gap-5 hover:shadow-lg transition-shadow">
      <div className="relative w-20 h-20 sm:w-32 md:w-40 sm:h-24 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-ivory">
        <Image src={v.image} alt={v.name} fill sizes="(max-width: 640px) 80px, 160px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-ink text-sm sm:text-base mb-0.5">{v.name} · AC {v.seats} Seat</h3>
        <p className="text-ink-faint text-xs mb-3">{v.model}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Users size={10}/> {v.seats} seats</span>
          <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Wind size={10}/> AC</span>
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-col items-end">
        <div>
          <p className="font-mono font-bold text-ink text-lg sm:text-2xl">₹{v.startingFare.toLocaleString('en-IN')}</p>
          <p className="text-ink-faint text-xs">est. fare</p>
        </div>
        <Link href="/book" className="bg-cta hover:bg-cta-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors mt-3">
          Select
        </Link>
      </div>
    </div>
  )
}
