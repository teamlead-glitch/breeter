'use client'
import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import CategoryRowHeader from './CategoryRowHeader'
import EnquiryModal from './EnquiryModal'

export type StaticCategoryItem = { name: string; desc: string; icon: LucideIcon }

export default function StaticEnquiryRow({
  id,
  index,
  title,
  items,
}: {
  id?: string
  index: string
  title: string
  items: StaticCategoryItem[]
}) {
  const [active, setActive] = useState<StaticCategoryItem | null>(null)

  return (
    <div id={id} className={id ? 'scroll-mt-24' : undefined}>
      <CategoryRowHeader index={index} title={title} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map(item => {
          const Icon = item.icon
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(item)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="relative grid h-44 flex-shrink-0 place-items-center bg-ivory">
                <Icon size={40} className="text-ink-faint" />
                <span className="absolute top-3 right-3 rounded-lg bg-cta/90 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm transition-colors group-hover:bg-cta">
                  Enquire →
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-0.5 text-sm font-bold text-ink">{item.name}</h3>
                <p className="text-xs text-ink-faint">{item.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {active && <EnquiryModal subject={`${title} — ${active.name}`} onClose={() => setActive(null)} />}
    </div>
  )
}
