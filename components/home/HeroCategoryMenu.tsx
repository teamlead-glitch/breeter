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
      <div className="sm:hidden w-full grid grid-cols-2 gap-2.5">
        {ITEMS.map(item => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}
              className="flex flex-col items-center justify-center gap-2 py-4 rounded-2xl bg-ivory/95 backdrop-blur-sm hover:bg-white transition-colors">
              <Icon size={24} strokeWidth={1.6} className="text-ink" />
              <span className="text-xs font-semibold text-ink">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </>
  )
}
