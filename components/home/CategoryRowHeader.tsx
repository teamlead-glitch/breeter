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
      <span className="font-mono text-xs text-ink-faint">{index}</span>
      <h3 className="font-display text-xl font-bold text-ink">{title}</h3>
      {viewAllHref && (
        <Link href={viewAllHref} className="ml-auto text-sm font-semibold text-forest hover:underline underline-offset-4">
          View all →
        </Link>
      )}
    </div>
  )
}
