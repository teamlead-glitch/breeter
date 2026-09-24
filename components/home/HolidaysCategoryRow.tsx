'use client'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/apiService'
import { FeaturedPackage, FeaturedPackagesData } from '@/types/packages'
import PackageCard from '@/components/holidays/PackageCard'
import PackageTile from '@/components/holidays/PackageTile'
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
              <div className="sm:hidden">
                <PackageTile pkg={pkg} />
              </div>
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
