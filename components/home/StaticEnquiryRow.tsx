'use client'
import { useState } from 'react'
import Image from 'next/image'
import CategoryRowHeader from './CategoryRowHeader'
import EnquiryModal from './EnquiryModal'

export type StaticCategoryItem = { name: string; image: string }

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
      <div className="grid grid-cols-4 gap-2 sm:gap-5">
        {items.map(item => (
          <button
            key={item.name}
            type="button"
            onClick={() => setActive(item)}
            className="group flex cursor-pointer flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ivory shadow-[0_6px_16px_-8px_rgba(0,0,0,0.25)] ring-1 ring-black/5 transition-shadow duration-300 group-hover:shadow-[0_14px_32px_-8px_rgba(27,122,51,0.28)] sm:aspect-[4/3] sm:rounded-3xl">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width:640px) 25vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-2 line-clamp-2 text-[11px] font-semibold leading-tight text-ink sm:mt-3 sm:text-base">{item.name}</h3>
          </button>
        ))}
      </div>

      {active && <EnquiryModal subject={`${title} — ${active.name}`} onClose={() => setActive(null)} />}
    </div>
  )
}
