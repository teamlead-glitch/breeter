'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown, Shield, Users, Clock, Fuel } from 'lucide-react'
import { INCLUSIONS, type InclusionIcon } from './data'

type Tab = 'inclusions' | 'cancellation' | 'terms'

const TABS: { key: Tab; label: string }[] = [
  { key: 'inclusions', label: 'Inclusions & Exclusions' },
  { key: 'cancellation', label: 'Cancellation Policy' },
  { key: 'terms', label: 'Terms & Conditions' },
]

const INCLUSION_ICONS: Record<InclusionIcon, React.ReactNode> = {
  shield: <Shield size={15} />,
  check: <Check size={15} />,
  users: <Users size={15} />,
  clock: <Clock size={15} />,
  fuel: <Fuel size={15} />,
}

function TabPanel({ tab }: { tab: Tab }) {
  if (tab === 'inclusions') {
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

  if (tab === 'cancellation') {
    return (
      <div className="p-4 sm:p-5">
        <p className="text-ink-muted text-sm mb-3">
          Free cancellation until <strong className="text-ink">9:00 AM, 22 Aug</strong> — 12 hours before pickup time.
        </p>
        <div className="space-y-2 mb-4">
          {[
            ['Before 24 hrs', 'Full refund'],
            ['12–24 hrs', '50% refund'],
            ['Within 12 hrs', 'No refund'],
          ].map(([when, what]) => (
            <div key={when} className="flex justify-between py-2 border-b border-black/5 text-sm">
              <span className="text-ink-muted">{when}</span>
              <span className="font-semibold text-ink">{what}</span>
            </div>
          ))}
        </div>
        <Link href="/terms" className="text-cta text-sm font-semibold hover:underline underline-offset-4">
          View full Cancellation Policy →
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-5">
      <ul className="space-y-2 mb-4">
        {[
          'Fares are all-inclusive and slab-based.',
          'The same driver and vehicle model may not always be available.',
          'Breeter reserves the right to substitute an equivalent vehicle.',
          'Waiting charges apply after 30 minutes from scheduled pickup.',
        ].map(item => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
            <span className="w-1.5 h-1.5 bg-ink-faint/40 rounded-full mt-1.5 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <Link href="/terms" className="text-cta text-sm font-semibold hover:underline underline-offset-4">
        View Policies →
      </Link>
    </div>
  )
}

export default function PolicyTabs() {
  const [activeTab, setActiveTab] = useState<Tab | null>('inclusions')

  return (
    <>
      {/* Mobile: accordion */}
      <div className="sm:hidden bg-white rounded-2xl border border-black/5 overflow-hidden divide-y divide-black/5">
        {TABS.map(t => {
          const open = activeTab === t.key
          return (
            <div key={t.key}>
              <button
                type="button"
                onClick={() => setActiveTab(open ? null : t.key)}
                className="w-full flex items-center justify-between gap-3 px-4 py-4 text-left">
                <span className={`text-sm font-semibold ${open ? 'text-cta' : 'text-ink'}`}>{t.label}</span>
                <ChevronDown size={16} className={`text-ink-faint flex-shrink-0 transition-transform ${open ? 'rotate-180 text-cta' : ''}`} />
              </button>
              {open && <TabPanel tab={t.key} />}
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
        {activeTab && <TabPanel tab={activeTab} />}
      </div>
    </>
  )
}
