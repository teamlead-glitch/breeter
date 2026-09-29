'use client'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/apiService'
import { CabCategoriesData, CabCategory } from '@/types/cabs'
import { VehicleTagsData } from '@/types/vehicleTags'
import CabCategoryCard from './CabCategoryCard'
import HomeVehicleCard from '@/components/home/HomeVehicleCard'

// Local to this page only — not part of the shared search filters/context.
const TYPE_TAG_TITLES: Record<string, string> = {
  luxury: 'Luxury',
  van: 'Van',
  bus: 'Bus',
}

export default function CabsGrid({ type }: { type: string }) {
  const [cabs, setCabs] = useState<CabCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(false)

      const params = new URLSearchParams()
      params.set('per_page', '15')

      const tagTitle = TYPE_TAG_TITLES[type]
      if (tagTitle) {
        const tagsRes = await apiGet<VehicleTagsData>('v1/vehicle-tags?per_page=15')
        const tag = tagsRes.data?.data.find(t => t.title === tagTitle)
        if (tag) params.append('vehicle_tag_ids[]', String(tag.id))
      }

      const res = await apiGet<CabCategoriesData>(`v1/cab-categories?${params.toString()}`)
      if (cancelled) return
      if (res.error || !res.data) {
        setError(true)
      } else {
        setCabs(res.data.data)
      }
      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [type])

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="aspect-square sm:aspect-auto sm:h-96 rounded-2xl sm:rounded-3xl bg-white border border-black/10 animate-pulse" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-8 text-center text-ink-faint text-sm">
        Couldn&apos;t load cabs right now. Please try again.
      </div>
    )
  }

  if (cabs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-black/5 p-8 text-center text-ink-faint text-sm">
        No cabs available in this category.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
      {cabs.map(v => (
        <div key={v.id}>
          {/* Phones: framed photo + title, same tile as the home listing. sm+: full card.
              [&>button]:w-full — the tile is a <button>, which otherwise shrinks to its title width
              and sizes its %-width photo by title length. */}
          <div className="sm:hidden [&>button]:w-full"><HomeVehicleCard v={v} square /></div>
          <div className="hidden h-full sm:block"><CabCategoryCard v={v} /></div>
        </div>
      ))}
    </div>
  )
}
