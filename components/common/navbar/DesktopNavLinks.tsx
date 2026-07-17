import Link from 'next/link'
import { Car, Sparkles, Bus, Palmtree } from 'lucide-react'

const navLinks = [
  { href: '/cabs', label: 'Cabs', icon: Car, type: null as string | null },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles, type: 'luxury' },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus, type: 'bus-van' },
  { href: '/holidays', label: 'Holidays', icon: Palmtree, type: null as string | null },
]

const linkClass = (active: boolean) =>
  `flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
    active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
  }`

const iconBoxClass = (active: boolean) =>
  `w-7 h-7 rounded-lg grid place-items-center transition-colors ${
    active ? 'bg-gold/25 text-gold' : 'bg-white/10 text-white/80'
  }`

export default function DesktopNavLinks({ pathname, currentType }: { pathname: string; currentType: string | null }) {
  return (
    <nav className="hidden md:flex items-center gap-2 ml-2">
      {navLinks.map(l => {
        const Icon = l.icon
        const active = l.href.startsWith('/cabs')
          ? pathname === '/cabs' && currentType === l.type
          : pathname === l.href
        return (
          <Link key={l.href} href={l.href} className={linkClass(active)}>
            <span className={iconBoxClass(active)}><Icon size={15} /></span>
            {l.label}
          </Link>
        )
      })}
    </nav>
  )
}
