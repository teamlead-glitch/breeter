import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Package } from '@/lib/data'

export default function PackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link href={`/holidays/${pkg.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-black/5 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-52 overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 text-forest text-[10px] font-bold px-2.5 py-1 rounded-full">
          {pkg.location}
        </span>
        <span className="absolute bottom-3 left-4 text-white/80 font-mono text-sm">
          {pkg.nights}N / {pkg.days}D
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink text-base mb-1.5 group-hover:text-forest transition-colors">{pkg.name}</h3>
        <p className="text-ink-faint text-xs leading-relaxed line-clamp-2 mb-4">{pkg.overview}</p>
        <div className="flex items-center justify-end">
          <span className="flex items-center gap-1 text-xs font-bold text-cta group-hover:bg-cta group-hover:text-white border border-cta px-3 py-1.5 rounded-xl transition-all">
            View <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  )
}
