'use client'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/apiService'
import { FeaturedPackage, FeaturedPackagesData } from '@/types/packages'
import PackageCard from '@/components/holidays/PackageCard'
import CategoryRowHeader from './CategoryRowHeader'

export default function HolidaysCategoryRow({ index }: { index: string }) {
  const [packages, setPackages] = useState<FeaturedPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    apiGet<FeaturedPackagesData>('v1/packages/featured?limit=4').then(res => {
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-96 rounded-[1.75rem] bg-white border border-black/5 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map(pkg => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      )}
    </div>
  )
}
