'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { apiGet } from '@/lib/apiService'
import { FeaturedPackage, FeaturedPackagesData } from '@/types/packages'
import PackageCard from '@/components/holidays/PackageCard'

export default function FeaturedPackagesSection() {
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
    <section className="bg-ivory py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Curated travel</p>
            <h2 className="font-display text-ink text-3xl md:text-4xl font-bold">Featured Packages</h2>
          </div>
          <Link href="/holidays" className="hidden sm:inline-flex items-center gap-1 text-forest font-semibold text-sm hover:underline underline-offset-4">
            View all <ChevronRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-2xl bg-white border border-black/4 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <PackageCard key={pkg.slug} pkg={pkg} featured />
            ))}
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link href="/holidays" className="inline-flex items-center gap-1 text-forest font-semibold text-sm">
            View all packages <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
