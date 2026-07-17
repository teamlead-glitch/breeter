import { Check, Shield, Users, Clock, Fuel } from 'lucide-react'
import { INCLUSIONS, type InclusionIcon } from './data'

const INCLUSION_ICONS: Record<InclusionIcon, React.ReactNode> = {
  shield: <Shield size={15} />,
  check: <Check size={15} />,
  users: <Users size={15} />,
  clock: <Clock size={15} />,
  fuel: <Fuel size={15} />,
}

export default function InclusionsTabPanel() {
  return (
    <div className="p-4 sm:p-5 space-y-4">
      {INCLUSIONS.map(item => (
        <div key={item.title} className="flex items-start gap-3">
          <span className="w-8 h-8 bg-cta/10 rounded-xl grid place-items-center text-cta flex-shrink-0">
            {INCLUSION_ICONS[item.icon]}
          </span>
          <div>
            <p className="font-semibold text-ink text-sm">{item.title}</p>
            <p className="text-ink-faint text-xs mt-0.5">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
