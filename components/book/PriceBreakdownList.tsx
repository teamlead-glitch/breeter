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
        {breakdown.map(line => (
          <div key={line.label} className="flex justify-between text-sm">
            <span className="text-ink-muted">{line.label}</span>
            <span className="font-mono font-semibold text-ink">₹{line.amount.toLocaleString('en-IN')}</span>
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
