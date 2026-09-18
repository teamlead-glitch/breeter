import Link from 'next/link'
import { Bus, Car, Home, Palmtree, Sparkles, Truck } from 'lucide-react'

const ITEMS = [
  { href: '/cabs', label: 'Cabs', icon: Car },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
  { href: '/cabs?type=bus-van', label: 'Van', icon: Truck },
  { href: '/cabs?type=bus-van', label: 'Bus', icon: Bus },
  { href: '/holidays', label: 'Holidays', icon: Palmtree },
  { href: '/#hotel', label: 'Hotel', icon: Home },
]

const ROW_1 = ITEMS.slice(0, 3)
const ROW_2 = ITEMS.slice(3)

function NavItem({ item }: { item: (typeof ITEMS)[number] }) {
  const Icon = item.icon
  return (
    <Link href={item.href} className="group flex flex-col items-center gap-2 text-ink-muted transition-colors hover:text-cta">
      <span className="grid h-14 w-14 place-items-center rounded-full bg-ivory-dark text-ink-muted transition-colors group-hover:bg-cta/10 group-hover:text-cta sm:h-16 sm:w-16">
        <Icon size={24} strokeWidth={1.75} />
      </span>
      <span className="whitespace-nowrap text-xs font-semibold">{item.label}</span>
    </Link>
  )
}

export default function QuickNav() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-5 sm:px-6">
          {/* Mobile: two separate rows of 3 */}
          <div className="flex flex-col gap-5 sm:hidden">
            <div className="grid grid-cols-3 gap-x-2">
              {ROW_1.map(item => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-x-2 border-t border-black/5 pt-5">
              {ROW_2.map(item => (
                <NavItem key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* Desktop: single row of 6 */}
          <div className="hidden sm:grid sm:grid-cols-6">
            {ITEMS.map(item => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
