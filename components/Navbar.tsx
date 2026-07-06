'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown, Home as HomeIcon, Car, Sparkles, Bus, Palmtree, Info, Phone } from 'lucide-react'
import SearchWidget from '@/components/SearchWidget'

const cabLinks = [
  { href: '/cabs', label: 'All Cabs', icon: Car },
  { href: '/cabs?type=luxury', label: 'Luxury Cabs', icon: Sparkles },
  { href: '/cabs?type=bus-van', label: 'Bus / Van', icon: Bus },
]

const navLinks = [
  { href: '/holidays', label: 'Holidays', icon: Palmtree },
  { href: '/about', label: 'About', icon: Info },
  { href: '/contact', label: 'Contact', icon: Phone },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cabOpen, setCabOpen] = useState(false)
  const [bookOpen, setBookOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isCabs = pathname === '/cabs'

  // Icon menu switches on once the transparent home hero nav is scrolled past, and stays on everywhere else
  const compact = !isHome || scrolled

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

  const navBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-forest shadow-xl'

  const linkClass = (active: boolean) =>
    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      active ? 'text-white' : 'text-white/70 hover:text-white'
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
              <>
                {/* Desktop nav */}
                <nav className="hidden md:flex items-center gap-1 ml-2">
                  <Link href="/" className={linkClass(isHome)}>
                    <HomeIcon size={14} className={isHome ? 'text-gold' : ''} />
                    Home
                  </Link>

                  {/* Cabs dropdown */}
                  <div className="relative" onMouseEnter={() => setCabOpen(true)} onMouseLeave={() => setCabOpen(false)}>
                    <button className={linkClass(isCabs)}>
                      <Car size={14} className={isCabs ? 'text-gold' : ''} />
                      Cabs <ChevronDown size={13} className={`transition-transform duration-200 ${cabOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {cabOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-2xl shadow-2xl border border-black/5 overflow-hidden">
                        {cabLinks.map(l => {
                          const Icon = l.icon
                          return (
                            <Link key={l.href} href={l.href}
                              className="flex items-center gap-2.5 px-4 py-3 text-sm text-ink hover:bg-ivory transition-colors font-medium">
                              <Icon size={15} className="text-ink-faint" />
                              {l.label}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {navLinks.map(l => {
                    const Icon = l.icon
                    const active = pathname === l.href
                    return (
                      <Link key={l.href} href={l.href} className={linkClass(active)}>
                        <Icon size={14} className={active ? 'text-gold' : ''} />
                        {l.label}
                      </Link>
                    )
                  })}
                </nav>

                {/* Right side */}
                <div className="ml-auto flex items-center gap-3">
                  <button
                    onClick={() => setBookOpen(true)}
                    className="hidden md:inline-flex items-center bg-cta hover:bg-cta-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                    Book a Cab
                  </button>
                  <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-white p-2 rounded-lg">
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-forest border-t border-white/10">
            <div className="px-4 py-4 space-y-0.5">
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
                onClick={() => { setMobileOpen(false); setBookOpen(true) }}
                className="block w-full mt-3 px-3 py-3 bg-cta text-white font-bold text-sm rounded-xl text-center">
                Book a Cab
              </button>
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
            onClick={() => setBookOpen(false)}
          />
          {/* Modal */}
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
              <div>
                <p className="font-mono text-forest/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">Quick booking</p>
                <h2 className="font-display text-ink text-xl font-bold">Book a Cab</h2>
              </div>
              <button
                onClick={() => setBookOpen(false)}
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
