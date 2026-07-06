import Link from 'next/link'

const links = {
  cabs: [
    { href: '/cabs', label: 'All Cabs' },
    { href: '/cabs?type=luxury', label: 'Luxury Cabs' },
    { href: '/cabs?type=bus-van', label: 'Bus / Van' },
    { href: '/search', label: 'Search Rides' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/holidays', label: 'Holiday Packages' },
  ],
  legal: [
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/terms', label: 'Privacy Policy' },
    { href: '/terms', label: 'Cancellation Policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 bg-gold rounded-lg grid place-items-center font-display font-bold text-white text-lg">B</span>
              <span className="font-display font-bold text-white text-xl">Breeter</span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">
              Outstation cabs, hourly rentals & curated holiday packages across South India.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide">Cabs</h5>
            <ul className="space-y-2.5">
              {links.cabs.map(l => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide">Company</h5>
            <ul className="space-y-2.5">
              {links.company.map(l => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold text-sm mb-4 tracking-wide">Legal</h5>
            <ul className="space-y-2.5">
              {links.legal.map(l => (
                <li key={l.href + l.label}>
                  <Link href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-white/30 text-xs">© 2026 Breeter Travel Express. All rights reserved.</p>
          <p className="text-white/30 text-xs">Kerala · Tamil Nadu · Pan India outstation</p>
        </div>
      </div>
    </footer>
  )
}
