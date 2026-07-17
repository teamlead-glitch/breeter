import Link from 'next/link'
import { Home as HomeIcon, Info, Phone, Car, Sparkles, Bus, Palmtree } from 'lucide-react'

const menuLinks = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: '/cabs', label: 'Cabs', icon: Car },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus },
  { href: '/holidays', label: 'Holidays', icon: Palmtree },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function MobileMenuDrawer({ onNavigate, onBookCab }: { onNavigate: () => void; onBookCab: () => void }) {
  return (
    <div className="-mx-4 sm:-mx-6 md:mx-0 bg-forest border-t border-white/10 md:absolute md:right-6 lg:right-8 md:top-16 md:w-64 md:border md:shadow-2xl md:overflow-hidden">
      <div className="px-4 py-4 space-y-0.5">
        {menuLinks.map(l => (
          <Link key={l.href} href={l.href} onClick={onNavigate}
            className="flex items-center gap-3 px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
            <l.icon size={16} className="text-white/50" />
            {l.label}
          </Link>
        ))}
        <button
          onClick={() => { onNavigate(); onBookCab() }}
          className="block w-full mt-3 px-3 py-3 bg-cta text-white font-bold text-sm rounded-xl text-center md:hidden">
          Book a Cab
        </button>
      </div>
    </div>
  )
}
