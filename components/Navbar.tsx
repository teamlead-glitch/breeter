'use client'
import { Suspense, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Menu, X, Home as HomeIcon, Car, Sparkles, Bus, Palmtree, Info, Phone } from 'lucide-react'
import SearchWidget from '@/components/SearchWidget'
import { useBookModal } from '@/components/BookModalContext'

const navLinks = [
  { href: '/cabs', label: 'Cabs', icon: Car, type: null as string | null },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles, type: 'luxury' },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus, type: 'bus-van' },
  { href: '/holidays', label: 'Holidays', icon: Palmtree, type: null as string | null },
]

export default function Navbar() {
  return (
    <Suspense fallback={<NavbarShell currentType={null} />}>
      <NavbarWithSearchParams />
    </Suspense>
  )
}

function NavbarWithSearchParams() {
  const currentType = useSearchParams().get('type')
  return <NavbarShell currentType={currentType} />
}

function NavbarShell({ currentType }: { currentType: string | null }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { bookOpen, openBookModal, closeBookModal } = useBookModal()
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Icon menu switches on once the transparent home hero nav is scrolled past, and stays on everywhere else
  const compact = !isHome || scrolled || mobileOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (bookOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [bookOpen])

  const navBg = isHome && !scrolled && !mobileOpen
    ? 'bg-transparent'
    : 'bg-forest shadow-xl'

  const linkClass = (active: boolean) =>
    `flex items-center gap-2.5 pl-2 pr-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
      active ? 'bg-white/15 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
    }`

  const iconBoxClass = (active: boolean) =>
    `w-7 h-7 rounded-lg grid place-items-center transition-colors ${
      active ? 'bg-gold/25 text-gold' : 'bg-white/10 text-white/80'
    }`

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-6">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <span className="w-8 h-8 bg-gold rounded-lg grid place-items-center font-display font-bold text-white text-lg leading-none">B</span>
              <span className="font-display font-bold text-white text-xl tracking-tight">Breeter</span>
            </Link>

            {compact && (
              /* Desktop nav */
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
            )}

            {/* Right side — always visible, even on the unscrolled home hero */}
            <div className="ml-auto flex items-center gap-3">
              <button
                onClick={openBookModal}
                className="hidden md:inline-flex items-center bg-cta hover:bg-cta-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                Book a Cab
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-white p-2 rounded-lg">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Menu drawer (all breakpoints) */}
        {mobileOpen && (
          <div className="bg-forest border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4 space-y-0.5 md:w-72 md:ml-auto">
              {[
                { href: '/', label: 'Home', icon: HomeIcon },
                { href: '/cabs', label: 'Cabs', icon: Car },
                { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
                { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus },
                { href: '/holidays', label: 'Holidays', icon: Palmtree },
                { href: '/about', label: 'About', icon: Info },
                { href: '/contact', label: 'Contact', icon: Phone },
              ].map(l => (
                <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-xl text-sm font-medium transition-colors">
                  <l.icon size={16} className="text-white/50" />
                  {l.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); openBookModal() }}
                className="block w-full mt-3 px-3 py-3 bg-cta text-white font-bold text-sm rounded-xl text-center">
                Book a Cab
              </button>
            </div>
            </div>
          </div>
        )}
      </header>

      {/* Book a Cab popup */}
      {bookOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={closeBookModal}
          />
          {/* Modal */}
          <div className="relative w-full max-w-2xl md:max-w-5xl lg:max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <p className="font-mono text-forest/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">Quick booking</p>
                <h2 className="font-bold text-ink text-xl">Book a Cab</h2>
              </div>
              <button
                onClick={closeBookModal}
                className="w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
                <X size={18} />
              </button>
            </div>
            {/* Search widget */}
            <div className="px-6 py-6 bg-ivory/50">
              <SearchWidget />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
