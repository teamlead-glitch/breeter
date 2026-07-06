import Link from 'next/link'
import { Car, Sparkles, Bus, Palmtree } from 'lucide-react'

const ITEMS = [
  { href: '/cabs', label: 'Cabs', icon: Car },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus },
  { href: '/holidays', label: 'Holidays', icon: Palmtree },
]

export default function HeroCategoryMenu() {
  return (
    <>
      {/* Desktop / tablet — horizontal tab bar */}
      <div className="hidden sm:flex bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-5 sm:px-7 pt-4 items-stretch gap-7 sm:gap-10 overflow-x-auto scrollbar-hide">
        {ITEMS.map(item => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}
              className="flex-none flex flex-col items-center gap-2 pb-3.5 border-b-2 border-transparent text-ink-muted hover:text-ink hover:border-gold/40 transition-colors">
              <Icon size={22} strokeWidth={1.75} />
              <span className="text-xs font-semibold whitespace-nowrap">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Mobile — 2×2 quick-access grid */}
      <div className="sm:hidden w-full bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-3 grid grid-cols-2 gap-2">
        {ITEMS.map(item => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-ivory transition-colors">
              <span className="flex-none w-9 h-9 rounded-lg bg-forest/8 text-forest grid place-items-center">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="text-[13px] font-semibold text-ink leading-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
