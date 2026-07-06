import Link from 'next/link'
import { Home, Car, Sparkles, Bus, Palmtree, Info, Phone } from 'lucide-react'

const ITEMS = [
  { href: '/', label: 'Home', icon: Home, active: true },
  { href: '/cabs', label: 'Cabs', icon: Car },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus },
  { href: '/holidays', label: 'Holidays', icon: Palmtree },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function HeroCategoryMenu() {
  return (
    <div className="bg-white/96 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl px-5 sm:px-7 pt-4 flex items-stretch gap-7 sm:gap-10 overflow-x-auto scrollbar-hide">
      {ITEMS.map(item => {
        const Icon = item.icon
        return (
          <Link key={item.href} href={item.href}
            className={`flex-none flex flex-col items-center gap-2 pb-3.5 border-b-2 transition-colors ${
              item.active ? 'border-gold text-gold' : 'border-transparent text-ink-muted hover:text-ink'
            }`}>
            <Icon size={22} strokeWidth={1.75} />
            <span className="text-xs font-semibold whitespace-nowrap">{item.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
