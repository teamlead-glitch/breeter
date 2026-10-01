import Link from 'next/link'

export default function CategoryRowHeader({
  index,
  title,
  viewAllHref,
}: {
  index: string
  title: string
  viewAllHref?: string
}) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-3">
      {/* Row number (01, 02, …) hidden for now — callers still pass `index` so it can be restored. */}
      {/* <span className="font-mono text-xs text-ink-faint">{index}</span> */}
      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl lg:text-3xl">{title}</h3>
      {viewAllHref && (
        <Link href={viewAllHref} className="ml-auto text-sm font-semibold text-forest hover:underline underline-offset-4">
          View all →
        </Link>
      )}
    </div>
  )
}
