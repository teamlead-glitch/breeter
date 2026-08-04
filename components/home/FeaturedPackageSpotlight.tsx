import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Palmtree } from 'lucide-react'
import { FeaturedPackage } from '@/types/packages'

export default function FeaturedPackageSpotlight({ pkg }: { pkg: FeaturedPackage }) {
  return (
    <Link
      href={`/holidays/${pkg.slug}`}
      className="group relative isolate flex h-full min-h-96 flex-col overflow-hidden rounded-[1.75rem] bg-forest-mid"
    >
      {pkg.image ? (
        <Image
          src={pkg.image.url}
          alt={pkg.image.alt_text || pkg.title}
          fill
          sizes="(max-width:1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Palmtree size={48} className="text-white/25" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/70 via-45% to-transparent" />

      <span className="absolute top-5 left-5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-forest backdrop-blur-sm">
        Featured · {pkg.country.name}
      </span>
      <span className="absolute top-5 right-5 font-mono text-sm font-semibold text-white/80">
        {pkg.nights}N / {pkg.days}D
      </span>

      <div className="relative z-10 mt-auto p-7 md:p-8">
        <h3 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">{pkg.title}</h3>
        <p className="mb-5 max-w-md text-sm leading-relaxed text-white/85 line-clamp-2">{pkg.short_description}</p>
        <span className="inline-flex items-center gap-2 rounded-xl bg-cta px-5 py-2.5 text-sm font-bold text-white transition-colors group-hover:bg-cta-dark">
          Enquire now <ArrowUpRight size={15} />
        </span>
      </div>
    </Link>
  )
}
