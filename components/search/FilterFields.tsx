export default function FilterFields() {
  return (
    <>
      <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Vehicle tags</p>
      <div className="space-y-2.5 mb-5">
        {['Luxury Cabs', 'Bus / Van', 'Neat & Clean', 'Free Cancellation'].map(f => (
          <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
            <span className="w-4 h-4 rounded border-2 border-ink-faint/40 group-hover:border-forest transition-colors flex-shrink-0" />
            <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
          </label>
        ))}
      </div>

      <div className="h-px bg-black/5 mb-5" />

      <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Add-ons</p>
      <div className="space-y-2.5">
        {['Vehicle below 5 years', 'Roof carrier'].map(f => (
          <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
            <span className="w-4 h-4 rounded border-2 border-ink-faint/40 group-hover:border-forest transition-colors flex-shrink-0" />
            <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
          </label>
        ))}
      </div>
    </>
  )
}
