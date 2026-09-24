import Image from 'next/image'
import Link from 'next/link'
import { Palmtree } from 'lucide-react'
import { FeaturedPackage } from '@/types/packages'

// Compact mobile tile: square image + nights badge + title, no description.
export default function PackageTile({ pkg }: { pkg: FeaturedPackage }) {
  return (
    <Link href={`/holidays/${pkg.slug}`} className="group flex flex-col items-center text-center">
      <div className="relative mx-auto aspect-square w-[92%] overflow-hidden rounded-2xl bg-forest-mid shadow-[0_6px_16px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
        {pkg.image ? (
          <Image src={pkg.image.url} alt={pkg.image.alt_text || pkg.title} fill sizes="30vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Palmtree size={24} className="text-white/30" />
          </div>
        )}
        <span className="absolute bottom-1 right-1 rounded-md bg-ink/60 px-1 py-0.5 font-mono text-[9px] font-semibold text-white">
          {pkg.nights}N/{pkg.days}D
        </span>
      </div>
      <h3 className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight text-ink">{pkg.title}</h3>
    </Link>
  )
}
