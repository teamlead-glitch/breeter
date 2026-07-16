import { Users, Wind } from 'lucide-react'

export default function CabInfoCard() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div className="p-4 sm:p-5 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-ink text-base">XL Sedan</h3>
            {/* <span className="bg-cta/10 text-cta text-[10px] font-semibold px-2 py-0.5 rounded-full">4.5 ★ · 12 reviews</span> */}
          </div>
          <p className="text-ink-faint text-xs mb-2">Maruti Ciaz / Skoda Slavia or similar</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={11}/> 4 Seats</span>
            {/* <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={11}/> AC</span> */}
            {/* <span className="text-xs text-ink-muted">SEDAN</span> */}
          </div>
        </div>
        <div className="w-24 sm:w-32 h-20 bg-ivory rounded-xl flex-shrink-0 flex items-center justify-center">
          <span className="text-ink-faint text-xs font-medium">Cab image</span>
        </div>
      </div>
      <div className="bg-ivory-dark border-t-2 border-black/5 px-4 sm:px-5 py-3 flex items-start gap-2">
        <span className="text-cta text-sm flex-shrink-0">ⓘ</span>
        <p className="text-ink-faint text-xs">Cab operator will be assigned on booking completion</p>
      </div>
    </div>
  )
}
