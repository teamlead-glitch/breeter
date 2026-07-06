import Image from 'next/image'
import Link from 'next/link'
import { packages } from '@/lib/data'
import { notFound } from 'next/navigation'
import { ChevronRight, Check, X } from 'lucide-react'

type PageProps = { params: Promise<{ slug: string }> }

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params
  const pkg = packages.find(p => p.slug === slug)
  if (!pkg) notFound()

  const related = packages.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink-faint">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/holidays" className="hover:text-forest transition-colors">Holidays</Link>
          <ChevronRight size={12} />
          <span className="text-ink font-medium">{pkg.name}</span>
        </div>
      </div>

      <div className="bg-ivory min-h-screen">
        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-64 md:h-80 mb-8 rounded-2xl overflow-hidden">
            <div className="relative col-span-2 row-span-2 md:col-span-2">
              <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" />
            </div>
            <div className="relative hidden md:block">
              <Image src={pkg.image} alt={`${pkg.name} 2`} fill sizes="33vw" className="object-cover opacity-70" />
            </div>
            <div className="relative hidden md:block">
              <Image src={pkg.image} alt={`${pkg.name} 3`} fill sizes="33vw" className="object-cover opacity-50" />
              <div className="absolute inset-0 bg-forest/60 flex items-center justify-center">
                <span className="text-white font-bold text-sm">+4 more</span>
              </div>
            </div>
          </div>

          <div className="flex gap-8 flex-col lg:flex-row items-start">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-forest/10 text-forest text-xs font-bold px-3 py-1 rounded-full">{pkg.location}</span>
                {pkg.tags.map(tag => (
                  <span key={tag} className="bg-ivory-dark text-ink-muted text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <h1 className="font-display text-ink text-3xl md:text-4xl font-bold mb-1">{pkg.name}</h1>
              <p className="font-mono text-forest text-base mb-6">{pkg.nights} Nights / {pkg.days} Days</p>

              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 border border-black/5 mb-5">
                <h2 className="font-bold text-ink text-lg mb-3">Overview</h2>
                <p className="text-ink-muted text-sm leading-relaxed">{pkg.overview}</p>
              </div>

              {/* Itinerary */}
              <div className="bg-white rounded-2xl p-6 border border-black/5 mb-5">
                <h2 className="font-bold text-ink text-lg mb-4">Day-wise itinerary</h2>
                <div className="space-y-0">
                  {pkg.itinerary.map((day, i) => (
                    <div key={day.day} className={`flex gap-4 py-4 ${i < pkg.itinerary.length - 1 ? 'border-b border-black/5' : ''}`}>
                      <span className="flex-none px-3 py-1 bg-forest/10 text-forest text-xs font-bold rounded-full self-start">
                        Day {day.day}
                      </span>
                      <div>
                        <p className="font-semibold text-ink text-sm mb-1">{day.title}</p>
                        <p className="text-ink-faint text-xs leading-relaxed">{day.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions / Exclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-white rounded-2xl p-5 border border-black/5">
                  <h3 className="font-bold text-ink text-sm mb-3">Inclusions</h3>
                  <ul className="space-y-2">
                    {pkg.inclusions.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-ink-muted">
                        <Check size={13} className="text-forest mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-black/5">
                  <h3 className="font-bold text-ink text-sm mb-3">Exclusions</h3>
                  <ul className="space-y-2">
                    {pkg.exclusions.map(item => (
                      <li key={item} className="flex items-start gap-2 text-xs text-ink-muted">
                        <X size={13} className="text-red-400 mt-0.5 flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Enquiry sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-black/5 p-6 lg:sticky lg:top-24">
                <h3 className="font-bold text-ink text-lg mb-1">Interested?</h3>
                <p className="text-ink-faint text-xs mb-5">Get a custom quote — no payment required.</p>

                <div className="space-y-3 mb-5">
                  {['Name', 'Phone', 'Email', 'Travel month & pax'].map(field => (
                    <div key={field}>
                      <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">{field}</label>
                      <input className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink outline-none border-2 border-transparent focus:border-forest/25 transition-colors" placeholder={`Your ${field.toLowerCase()}`} />
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-[10px] text-ink-faint uppercase tracking-wider mb-1">Starting from</p>
                  <p className="font-mono font-bold text-forest text-2xl mb-4">₹{pkg.price.toLocaleString('en-IN')}<span className="text-xs font-normal text-ink-faint">/person</span></p>
                </div>

                <button className="w-full bg-cta hover:bg-cta-dark text-white font-bold text-sm py-3.5 rounded-xl transition-colors mb-3">
                  Request Quote
                </button>
                <button className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-sm py-3.5 rounded-xl transition-colors">
                  WhatsApp instead
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related packages */}
      <section className="bg-ivory-dark py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-ink text-2xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map(p => (
              <Link key={p.slug} href={`/holidays/${p.slug}`}
                className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all duration-300">
                <div className="relative h-36 overflow-hidden">
                  <Image src={p.image} alt={p.name} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-ink text-sm group-hover:text-forest transition-colors">{p.name}</p>
                  <p className="text-ink-faint text-xs font-mono mt-0.5">{p.nights}N / {p.days}D</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
