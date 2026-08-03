import Image from 'next/image'
import Link from 'next/link'
import { Palmtree } from 'lucide-react'
import { FeaturedPackage } from '@/types/packages'

export default function PackageCard({ pkg, featured = false }: { pkg: FeaturedPackage; featured?: boolean }) {
  return (
    <Link href={`/holidays/${pkg.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-black/4 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 flex-shrink-0 overflow-hidden bg-ivory grid place-items-center">
        {pkg.image ? (
          <Image
            src={pkg.image.url}
            alt={pkg.image.alt_text || pkg.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Palmtree size={40} className="text-ink-faint" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
        {featured && (
          <div className="absolute -left-11 top-5 w-40 -rotate-45 bg-gold text-white text-[10px] font-bold uppercase tracking-wider text-center py-1 shadow-md z-10">
            Featured
          </div>
        )}
        <span className={`absolute top-3 ${featured ? 'right-3' : 'left-3'} bg-white/90 text-forest text-[10px] font-bold px-2.5 py-1 rounded-full`}>
          {pkg.country.name}
        </span>
        <span className="absolute bottom-3 left-4 text-white/80 font-mono text-sm font-medium">
          {pkg.nights}N / {pkg.days}D
        </span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-forest transition-colors">{pkg.title}</h3>
        <p className="text-ink-faint text-sm mb-4 line-clamp-2 flex-1">{pkg.short_description}</p>
        <div className="flex items-center justify-end">
          <span className="text-xs font-bold text-cta group-hover:bg-cta group-hover:text-white border border-cta px-3 py-1.5 rounded-xl transition-all">
            Enquire →
          </span>
        </div>
      </div>
    </Link>
  )
}
