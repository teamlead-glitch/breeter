'use client'
import { useEffect, useState } from 'react'
import { apiGet } from '@/lib/apiService'
import { CabCategoriesData, CabCategory } from '@/types/cabs'
import { VehicleTagsData } from '@/types/vehicleTags'
import HomeVehicleCard from './HomeVehicleCard'
import CategoryRowHeader from './CategoryRowHeader'

const PREVIEW_COUNT = 4

export default function VehicleCategoryRow({
  index,
  title,
  tagTitle,
  viewAllHref,
  square = false,
}: {
  index: string
  title: string
  square?: boolean
  // Matches a title in v1/vehicle-tags (see CabsGrid.tsx) — omit to show the untagged default list.
  tagTitle?: string
  viewAllHref: string
}) {
  const [vehicles, setVehicles] = useState<CabCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)

      const params = new URLSearchParams()
      params.set('per_page', String(PREVIEW_COUNT))

      if (tagTitle) {
        const tagsRes = await apiGet<VehicleTagsData>('v1/vehicle-tags?per_page=15')
        const tag = tagsRes.data?.data.find(t => t.title === tagTitle)
        if (tag) params.append('vehicle_tag_ids[]', String(tag.id))
      }

      const res = await apiGet<CabCategoriesData>(`v1/cab-categories?${params.toString()}`)
      if (cancelled) return
      if (res.data) setVehicles(res.data.data)
      setLoading(false)
    }

    load()
    return () => { cancelled = true }
  }, [tagTitle])

  if (!loading && vehicles.length === 0) return null

  return (
    <div>
      <CategoryRowHeader index={index} title={title} viewAllHref={viewAllHref} />
      {loading ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className={`mx-auto aspect-square w-full animate-pulse bg-ivory sm:max-w-[156px] ${square ? 'rounded-2xl' : 'rounded-full'}`} />
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-ivory" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-6">
          {vehicles.map(v => (
            <HomeVehicleCard key={v.id} v={v} square={square} />
          ))}
        </div>
      )}
    </div>
  )
}
