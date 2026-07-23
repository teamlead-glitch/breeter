'use client'
import { useSearchState } from '@/context/SearchContext'

const VEHICLE_TAGS = ['Luxury Cabs', 'Bus / Van', 'Neat & Clean', 'Free Cancellation']
const ADD_ONS = ['Vehicle below 5 years', 'Roof carrier']

export default function FilterFields() {
  const { state, dispatch } = useSearchState()

  return (
    <>
      <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Vehicle tags</p>
      <div className="space-y-2.5 mb-5">
        {VEHICLE_TAGS.map(f => {
          const checked = state.filters.vehicleTags.includes(f)
          return (
            <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => dispatch({ type: 'TOGGLE_VEHICLE_TAG', tag: f })}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded border-2 transition-colors flex-shrink-0 ${
                checked ? 'bg-forest border-forest' : 'border-ink-faint/40 group-hover:border-forest'
              }`} />
              <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
            </label>
          )
        })}
      </div>

      <div className="h-px bg-black/5 mb-5" />

      <p className="text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-3">Add-ons</p>
      <div className="space-y-2.5">
        {ADD_ONS.map(f => {
          const checked = state.filters.addOns.includes(f)
          return (
            <label key={f} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={checked}
                onChange={() => dispatch({ type: 'TOGGLE_ADDON', addOn: f })}
                className="sr-only"
              />
              <span className={`w-4 h-4 rounded border-2 transition-colors flex-shrink-0 ${
                checked ? 'bg-forest border-forest' : 'border-ink-faint/40 group-hover:border-forest'
              }`} />
              <span className="text-sm text-ink-muted group-hover:text-ink transition-colors">{f}</span>
            </label>
          )
        })}
      </div>
    </>
  )
}
