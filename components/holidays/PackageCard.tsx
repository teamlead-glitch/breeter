import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Palmtree } from 'lucide-react'
import { FeaturedPackage } from '@/types/packages'

export default function PackageCard({ pkg }: { pkg: FeaturedPackage }) {
  return (
    <Link
      href={`/holidays/${pkg.slug}`}
      className="group relative isolate flex h-full min-h-56 flex-col overflow-hidden rounded-2xl bg-forest-mid sm:min-h-72 sm:rounded-[1.75rem] lg:min-h-96"
    >
      {pkg.image ? (
        <Image
          src={pkg.image.url}
          alt={pkg.image.alt_text || pkg.title}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <Palmtree size={48} className="text-white/25" />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/70 via-45% to-transparent" />

      <span className="absolute top-2 left-2 rounded-full bg-white/95 px-2 py-1 text-[10px] font-bold text-forest backdrop-blur-sm sm:top-5 sm:left-5 sm:px-3 sm:py-1.5 sm:text-xs">
        {pkg.country.name}
      </span>
      <span className="absolute top-2 right-2 font-mono text-[10px] font-semibold text-white/80 sm:top-5 sm:right-5 sm:text-sm">
        {pkg.nights}N / {pkg.days}D
      </span>

      <div className="relative z-10 mt-auto p-3 sm:p-7 md:p-8">
        <h3 className="mb-1 font-display text-sm font-bold text-white sm:mb-2 sm:text-2xl md:text-3xl">{pkg.title}</h3>
        <p className="mb-2 line-clamp-2 max-w-md text-[11px] leading-relaxed text-white/85 sm:mb-5 sm:text-sm">{pkg.short_description}</p>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-cta px-2.5 py-1.5 text-[11px] font-bold text-white transition-colors group-hover:bg-cta-dark sm:gap-2 sm:rounded-xl sm:px-5 sm:py-2.5 sm:text-sm">
          Enquire now <ArrowUpRight size={13} className="sm:hidden" /><ArrowUpRight size={15} className="hidden sm:block" />
        </span>
      </div>
    </Link>
  )
}
