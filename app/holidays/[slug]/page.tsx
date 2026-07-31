import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ChevronRight, Check, X, Palmtree } from 'lucide-react'
import { apiGet } from '@/lib/apiService'
import { mapSeoToMetadata } from '@/lib/seo'
import { PackageDetailData, PackagesData } from '@/types/packages'
import PackageEnquiryForm from '@/components/holidays/PackageEnquiryForm'

type PageProps = { params: Promise<{ slug: string }> }

function fetchPackageDetail(slug: string) {
  return apiGet<PackageDetailData>(`v1/packages/${slug}`)
}

function fetchRelatedPackages() {
  return apiGet<PackagesData>('v1/packages?limit=4&skip=0')
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await fetchPackageDetail(slug)
  const pkg = res.data?.data

  return mapSeoToMetadata(pkg?.seo_details ?? null, {
    title: pkg ? `${pkg.title} — Breeter Holidays` : 'Holiday Package — Breeter',
    description: pkg?.short_description ?? 'Explore curated holiday packages across South India with Breeter.',
    image: pkg?.images[0]?.url,
  })
}

export default async function PackageDetailPage({ params }: PageProps) {
  const { slug } = await params
  const res = await fetchPackageDetail(slug)
  const pkg = res.data?.data
  if (!pkg) notFound()

  const relatedRes = await fetchRelatedPackages()
  const related = (relatedRes.data?.data ?? []).filter(p => p.id !== pkg.id).slice(0, 3)

  const locationLabel = pkg.states.length > 0 ? pkg.states.map(s => s.name).join(', ') : pkg.country.name
  const [main, second, third] = pkg.images
  const extraImageCount = pkg.images.length > 3 ? pkg.images.length - 3 : 0

  return (
    <>
      {/* Breadcrumb */}
      <div className="pt-20 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-ink-faint">
          <Link href="/" className="hover:text-forest transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/holidays" className="hover:text-forest transition-colors">Holidays</Link>
          <ChevronRight size={12} />
          <span className="text-ink font-medium">{pkg.title}</span>
        </div>
      </div>

      <div className="bg-ivory min-h-screen">
        {/* Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 h-64 md:h-80 mb-8 rounded-2xl overflow-hidden">
            {main ? (
              <div className="relative col-span-2 row-span-2 md:col-span-2">
                <Image src={main.url} alt={main.alt_text || pkg.title} fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover" />
              </div>
            ) : (
              <div className="col-span-2 row-span-2 md:col-span-2 grid place-items-center bg-white">
                <Palmtree size={40} className="text-ink-faint" />
              </div>
            )}
            {second && (
              <div className="relative hidden md:block">
                <Image src={second.url} alt={second.alt_text || `${pkg.title} 2`} fill sizes="33vw" className="object-cover" />
              </div>
            )}
            {third && (
              <div className="relative hidden md:block">
                <Image src={third.url} alt={third.alt_text || `${pkg.title} 3`} fill sizes="33vw" className={`object-cover ${extraImageCount > 0 ? 'opacity-50' : ''}`} />
                {extraImageCount > 0 && (
                  <div className="absolute inset-0 bg-forest/60 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">+{extraImageCount} more</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-8 flex-col lg:flex-row items-start">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-forest/10 text-forest text-xs font-bold px-3 py-1 rounded-full">{locationLabel}</span>
              </div>

              <h1 className="font-display text-ink text-3xl md:text-4xl font-bold mb-1">{pkg.title}</h1>
              <p className="font-mono text-forest text-base mb-6">{pkg.nights} Nights / {pkg.days} Days</p>

              {/* Overview */}
              <div className="bg-white rounded-2xl p-6 border border-black/5 mb-5">
                <h2 className="font-bold text-ink text-lg mb-3">Overview</h2>
                {pkg.description ? (
                  <div
                    className="text-ink-muted text-sm leading-relaxed [&_p]:mb-3 [&_p:last-child]:mb-0"
                    dangerouslySetInnerHTML={{ __html: pkg.description }}
                  />
                ) : (
                  <p className="text-ink-muted text-sm leading-relaxed">{pkg.short_description}</p>
                )}
              </div>

              {/* Itinerary */}
              {pkg.itineraries.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-black/5 mb-5">
                  <h2 className="font-bold text-ink text-lg mb-4">Day-wise itinerary</h2>
                  <div className="space-y-0">
                    {pkg.itineraries.map((day, i) => (
                      <div key={day.day_number} className={`flex gap-4 py-4 ${i < pkg.itineraries.length - 1 ? 'border-b border-black/5' : ''}`}>
                        <span className="flex-none px-3 py-1 bg-forest/10 text-forest text-xs font-bold rounded-full self-start">
                          Day {day.day_number}
                        </span>
                        <div>
                          <p className="font-semibold text-ink text-sm mb-1">{day.title}</p>
                          <p className="text-ink-faint text-xs leading-relaxed">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions / Exclusions */}
              {(pkg.inclusions.length > 0 || pkg.exclusions.length > 0) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {pkg.inclusions.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-black/5">
                      <h3 className="font-bold text-ink text-sm mb-3">Inclusions</h3>
                      <ul className="space-y-2">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                            <Check size={13} className="text-forest mt-0.5 flex-shrink-0" /> {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {pkg.exclusions.length > 0 && (
                    <div className="bg-white rounded-2xl p-5 border border-black/5">
                      <h3 className="font-bold text-ink text-sm mb-3">Exclusions</h3>
                      <ul className="space-y-2">
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-ink-muted">
                            <X size={13} className="text-red-400 mt-0.5 flex-shrink-0" /> {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enquiry sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <PackageEnquiryForm packageId={pkg.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Related packages */}
      {related.length > 0 && (
        <section className="bg-ivory-dark py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-ink text-2xl font-bold mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(p => (
                <Link key={p.slug} href={`/holidays/${p.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl transition-all duration-300">
                  <div className="relative h-36 overflow-hidden bg-white grid place-items-center">
                    {p.image ? (
                      <Image src={p.image.url} alt={p.image.alt_text || p.title} fill sizes="(max-width:640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <Palmtree size={28} className="text-ink-faint" />
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-semibold text-ink text-sm group-hover:text-forest transition-colors">{p.title}</p>
                    <p className="text-ink-faint text-xs font-mono mt-0.5">{p.nights}N / {p.days}D</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
