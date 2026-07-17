'use client'
import { Suspense, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useBookModal } from '@/components/common/BookModalContext'
import NavbarLogo from './NavbarLogo'
import DesktopNavLinks from './DesktopNavLinks'
import MobileMenuDrawer from './MobileMenuDrawer'
import BookCabModal from './BookCabModal'

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

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:relative">
          <div className="flex items-center h-16 gap-6">
            <NavbarLogo />

            {compact && <DesktopNavLinks pathname={pathname} currentType={currentType} />}

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

          {mobileOpen && (
            <MobileMenuDrawer onNavigate={() => setMobileOpen(false)} onBookCab={openBookModal} />
          )}
        </div>
      </header>

      <BookCabModal open={bookOpen} onClose={closeBookModal} />
    </>
  )
}
