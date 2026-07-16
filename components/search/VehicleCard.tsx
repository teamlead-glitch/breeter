import Image from 'next/image'
import Link from 'next/link'
import { Users, Wind } from 'lucide-react'
import { Vehicle } from '@/lib/data'

export default function VehicleCard({ v }: { v: Vehicle }) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5 hover:shadow-lg transition-shadow">
      <div className="relative w-full sm:w-32 md:w-40 h-40 sm:h-24 md:h-28 flex-shrink-0 rounded-xl overflow-hidden bg-ivory">
        <Image src={v.image} alt={v.name} fill sizes="(max-width: 640px) 100vw, 160px" className="object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-ink text-base mb-0.5">{v.name} · AC {v.seats} Seat</h3>
        <p className="text-ink-faint text-xs mb-3">{v.model}</p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Users size={10}/> {v.seats} seats</span>
          {/* <span className="text-[10px] font-semibold text-ink-muted bg-ivory px-2.5 py-0.5 rounded-full flex items-center gap-1"><Wind size={10}/> AC</span> */}
        </div>
      </div>
      <div className="flex-shrink-0 flex flex-row sm:flex-col justify-between items-center sm:items-end gap-3 sm:gap-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-black/5">
        <div>
          <p className="font-mono font-bold text-ink text-xl sm:text-2xl">₹{v.startingFare.toLocaleString('en-IN')}</p>
          <p className="text-ink-faint text-xs">est. fare</p>
        </div>
        <Link href="/book" className="bg-cta hover:bg-cta-dark text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors sm:mt-3">
          Select
        </Link>
      </div>
    </div>
  )
}
