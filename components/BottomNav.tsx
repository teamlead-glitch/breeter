'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Car, Palmtree, CalendarDays } from 'lucide-react'

const tabs = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/cabs', icon: Car, label: 'Cabs' },
  { href: '/holidays', icon: Palmtree, label: 'Holidays' },
  { href: '/book', icon: CalendarDays, label: 'Book' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-lg safe-area-bottom">
      <div className="grid grid-cols-4 h-16">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link key={href} href={href}
              className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
                active ? 'text-cta' : 'text-ink-faint'
              }`}>
              <Icon size={21} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
