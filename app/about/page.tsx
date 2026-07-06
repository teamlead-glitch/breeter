import Image from 'next/image'
import Link from 'next/link'
import { Shield, Star, MapPin } from 'lucide-react'

const STATS = [
  { label: 'Trips completed', value: '50,000+' },
  { label: 'Cities served', value: '80+' },
  { label: 'Verified vehicles', value: '500+' },
  { label: 'Avg. rating', value: '4.8 ★' },
]

const VALUES = [
  { icon: <Shield size={22} />, title: 'Transparent', desc: 'All-inclusive fares with no hidden charges at checkout.' },
  { icon: <Star size={22} />, title: 'Reliable', desc: 'Background-checked drivers and well-maintained vehicles.' },
  { icon: <MapPin size={22} />, title: 'Local expertise', desc: 'Deep knowledge of South India routes and destinations.' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[44vh] flex items-end overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1400&q=80"
          alt="About Breeter"
          fill priority sizes="100vw" className="object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/10 to-forest/80" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 pt-28">
          <p className="font-mono text-gold/70 text-xs tracking-[0.2em] uppercase mb-2">About Breeter</p>
          <h1 className="font-display text-white text-4xl md:text-5xl font-bold">Travel made simple &amp; transparent</h1>
        </div>
      </section>

      <div className="bg-ivory min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex gap-8 flex-col lg:flex-row items-start">

            {/* Main */}
            <main className="flex-1 min-w-0 space-y-5">
              <div className="bg-white rounded-2xl border border-black/5 p-6">
                <h2 className="font-bold text-ink text-lg mb-3">Our story</h2>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Breeter was born from a simple observation: booking an outstation cab in South India was unnecessarily stressful. Hidden charges, unreliable operators, and no upfront pricing. We set out to change that.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mt-3">
                  Founded in Kochi in 2021, Breeter partners exclusively with verified, background-checked local cab operators across Kerala, Tamil Nadu, and beyond — giving travellers the confidence to book without surprises.
                </p>
              </div>

              <div className="flex gap-5 flex-col sm:flex-row">
                <div className="relative flex-1 h-52 rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80"
                    alt="Breeter team"
                    fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover"
                  />
                </div>
                <div className="bg-white rounded-2xl border border-black/5 p-5 flex-1">
                  <h3 className="font-bold text-ink text-base mb-3">What we do</h3>
                  <ul className="space-y-2">
                    {['Outstation & one-way cabs', 'Hourly rentals', 'Luxury chauffeur service', 'Group bus & van travel', 'Curated holiday packages'].map(item => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                        <span className="w-1.5 h-1.5 bg-forest rounded-full flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-black/5 p-6">
                <h3 className="font-bold text-ink text-base mb-3">Why travellers choose us</h3>
                <p className="text-ink-muted text-sm leading-relaxed">
                  Our all-inclusive, slab-based pricing means you know the exact fare before you book. No surge pricing, no toll surprises. Every cab on Breeter is inspected, and every driver is trained to provide a safe, courteous experience.
                </p>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
              <div className="bg-white rounded-2xl border border-black/5 p-5">
                <h3 className="font-bold text-ink text-sm mb-4">By the numbers</h3>
                <div className="space-y-3">
                  {STATS.map(s => (
                    <div key={s.label} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                      <span className="text-ink-muted text-xs">{s.label}</span>
                      <span className="font-mono font-bold text-forest text-sm">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-forest rounded-2xl p-5 text-center">
                <p className="text-white font-bold text-base mb-1">Ready to ride?</p>
                <p className="text-white/60 text-xs mb-4">Book your cab in under 2 minutes</p>
                <Link href="/book" className="block bg-cta hover:bg-cta-dark text-white font-bold text-sm py-3 rounded-xl transition-colors">
                  Book a Cab
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* Values */}
        <section className="border-t border-black/5 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-ink text-2xl font-bold mb-8">Our values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {VALUES.map(v => (
                <div key={v.title} className="bg-white rounded-2xl border border-black/5 p-6">
                  <div className="w-10 h-10 bg-forest/10 rounded-xl grid place-items-center mb-4 text-forest">{v.icon}</div>
                  <h3 className="font-bold text-ink text-base mb-2">{v.title}</h3>
                  <p className="text-ink-muted text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
