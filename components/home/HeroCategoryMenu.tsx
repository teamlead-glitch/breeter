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
    <div className="grid grid-cols-2 justify-items-center sm:flex sm:justify-start bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-4 sm:px-9 pt-4 sm:pt-5 sm:items-stretch gap-y-3 gap-x-8 sm:gap-12 sm:overflow-x-auto scrollbar-hide">
      {ITEMS.map(item => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}
            className="flex-none flex flex-col items-center gap-2 sm:gap-2.5 pb-3.5 sm:pb-4 border-b-2 border-transparent text-ink-muted hover:text-ink hover:border-gold/40 transition-colors">
            <Icon className="w-5.5 h-5.5 sm:w-7 sm:h-7" strokeWidth={1.75} />
            <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
