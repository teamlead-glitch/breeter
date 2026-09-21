'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Palmtree } from 'lucide-react'
import { apiGet } from '@/lib/apiService'
import { FeaturedPackage, FeaturedPackagesData } from '@/types/packages'
import PackageCard from '@/components/holidays/PackageCard'
import CategoryRowHeader from './CategoryRowHeader'

export default function HolidaysCategoryRow({ index }: { index: string }) {
  const [packages, setPackages] = useState<FeaturedPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiGet<FeaturedPackagesData>('v1/packages/featured?limit=3').then(res => {
      if (cancelled) return
      if (res.data) setPackages(res.data.data)
      setLoading(false)
    })
    return () => { cancelled = true }
  }, [])

  if (!loading && packages.length === 0) return null

  return (
    <div>
      <CategoryRowHeader index={index} title="Holidays" viewAllHref="/holidays" />
      {loading ? (
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-ivory sm:aspect-auto sm:h-96 sm:rounded-[1.75rem]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {packages.map(pkg => (
            <div key={pkg.slug}>
              <Link href={`/holidays/${pkg.slug}`} className="group flex flex-col items-center text-center sm:hidden">
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
              <div className="hidden h-full sm:block">
                <PackageCard pkg={pkg} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
