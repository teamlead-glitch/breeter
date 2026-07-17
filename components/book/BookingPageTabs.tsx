'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import InclusionsTabPanel from './InclusionsTabPanel'
import CancellationTabPanel from './CancellationTabPanel'
import TermsTabPanel from './TermsTabPanel'

type Tab = 'inclusions' | 'cancellation' | 'terms'

const TABS: { key: Tab; label: string }[] = [
  { key: 'inclusions', label: 'Inclusions & Exclusions' },
  { key: 'cancellation', label: 'Cancellation Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
]

const TAB_PANELS: Record<Tab, React.ComponentType> = {
  inclusions: InclusionsTabPanel,
  cancellation: CancellationTabPanel,
  terms: TermsTabPanel,
}

export default function BookingPageTabs() {
  const [activeTab, setActiveTab] = useState<Tab | null>('inclusions')
  const ActivePanel = activeTab ? TAB_PANELS[activeTab] : null

  return (
    <>
      {/* Mobile: accordion */}
      <div className="sm:hidden bg-white rounded-2xl border border-black/5 overflow-hidden divide-y divide-black/5">
        {TABS.map(t => {
          const open = activeTab === t.key
          const Panel = TAB_PANELS[t.key]
          return (
            <div key={t.key}>
              <button
                type="button"
                onClick={() => setActiveTab(open ? null : t.key)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left">
                <span className={`text-sm font-semibold ${open ? 'text-cta' : 'text-ink'}`}>{t.label}</span>
                <ChevronDown size={16} className={`text-ink-faint flex-shrink-0 transition-transform ${open ? 'rotate-180 text-cta' : ''}`} />
              </button>
              {open && <Panel />}
            </div>
          )
        })}
      </div>

      {/* Tablet/desktop: tab bar */}
      <div className="hidden sm:block bg-white rounded-2xl border border-black/5 overflow-hidden">
        <div className="flex border-b border-black/5 overflow-x-auto scrollbar-hide">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-none px-5 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === t.key
                  ? 'border-cta text-cta bg-cta/5'
                  : 'border-transparent text-ink-faint hover:text-ink-muted'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
        {ActivePanel && <ActivePanel />}
      </div>
    </>
  )
}
