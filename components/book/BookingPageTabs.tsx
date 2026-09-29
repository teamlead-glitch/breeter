'use client'
import { useState } from 'react'
import InclusionsTabPanel from './InclusionsTabPanel'
import CancellationTabPanel from './CancellationTabPanel'
import TermsTabPanel from './TermsTabPanel'
import { TripTypeInclusion } from '@/types/booking'

type Tab = 'inclusions' | 'cancellation' | 'terms'

const TABS: { key: Tab; label: string }[] = [
  { key: 'inclusions', label: 'Inclusions' },
  { key: 'terms', label: 'Terms & Conditions' },
  { key: 'cancellation', label: 'Cancellation Policy' },
]

export default function BookingPageTabs({ inclusions }: { inclusions: TripTypeInclusion[] }) {
  const [activeTab, setActiveTab] = useState<Tab>('inclusions')

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div className="flex border-b border-black/5">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`flex-1 sm:flex-none min-w-0 px-2 sm:px-5 py-3.5 text-[11px] sm:text-xs font-semibold truncate sm:whitespace-nowrap border-b-2 transition-all ${
              activeTab === t.key
                ? 'border-cta text-cta bg-cta/5'
                : 'border-transparent text-ink-faint hover:text-ink-muted'
            }`}>
            {t.label}
          </button>
        ))}
      </div>
      {activeTab === 'inclusions' && <InclusionsTabPanel inclusions={inclusions} />}
      {activeTab === 'cancellation' && <CancellationTabPanel />}
      {activeTab === 'terms' && <TermsTabPanel />}
    </div>
  )
}
