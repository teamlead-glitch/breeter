export default function PriceBreakdownList({
  breakdown,
  total,
  refreshing = false,
}: {
  breakdown: { label: string; amount: number }[]
  total: number
  refreshing?: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-ink text-base">Fare breakdown</h3>
        {refreshing && <span className="text-ink-faint text-xs">Updating…</span>}
      </div>

      <div className="space-y-2.5 mb-4">
        {breakdown.slice(0, 1).map(line => (
          <div key={line.label} className="flex items-start justify-between gap-1.5 text-xs">
            <span className="min-w-0 flex-1 text-ink-faint">{line.label}</span>
            <span className="flex-shrink-0 font-mono font-bold whitespace-nowrap text-ink-faint">₹{line.amount.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 pt-3">
        <div className="flex justify-between">
          <span className="font-bold text-ink text-sm">Total fare</span>
          <span className="font-mono font-bold text-cta text-lg">₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </>
  )
}
