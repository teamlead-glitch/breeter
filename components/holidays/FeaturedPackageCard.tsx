import Image from 'next/image'
import Link from 'next/link'
import { Package } from '@/lib/data'

export default function FeaturedPackageCard({ pkg }: { pkg: Package }) {
  return (
    <Link href={`/holidays/${pkg.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-black/4 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-52 overflow-hidden">
        <Image src={pkg.image} alt={pkg.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
        <span className="absolute top-3 left-3 bg-white/90 text-forest text-[10px] font-bold px-2.5 py-1 rounded-full">
          {pkg.location}
        </span>
        <span className="absolute bottom-3 left-4 text-white/80 font-mono text-sm font-medium">
          {pkg.nights}N / {pkg.days}D
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-forest transition-colors">{pkg.name}</h3>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {pkg.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] font-semibold text-ink-faint bg-ivory px-2.5 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-ink-faint uppercase tracking-wider">Starting from</p>
            <p className="font-mono font-bold text-forest text-lg">
              ₹{pkg.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-ink-faint">/person</span>
            </p>
          </div>
          <span className="text-xs font-bold text-cta group-hover:bg-cta group-hover:text-white border border-cta px-3 py-1.5 rounded-xl transition-all">
            Enquire →
          </span>
        </div>
      </div>
    </Link>
  )
}
