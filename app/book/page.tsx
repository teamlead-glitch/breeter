'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { ADD_ONS } from '@/components/book/data'
import TripSummary from '@/components/book/TripSummary'
import PolicyTabs from '@/components/book/PolicyTabs'
import CabInfoCard from '@/components/book/CabInfoCard'
import AddOnsCard from '@/components/book/AddOnsCard'
import TravellerDetailsForm from '@/components/book/TravellerDetailsForm'
import FareBreakdownCard from '@/components/book/FareBreakdownCard'
import MobilePayBar from '@/components/book/MobilePayBar'
import TermsAgreement from '@/components/book/TermsAgreement'

export default function BookPage() {
  const [addOns, setAddOns] = useState<string[]>(['age', 'lang'])
  const [agreed, setAgreed] = useState(false)
  const [stops] = useState(['Adimali', 'Mattupetti'])
  const mobileAgreeRef = useRef<HTMLLabelElement>(null)

  const toggleAddon = (id: string) =>
    setAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])

  const handleMobilePayAttempt = () => {
    window.alert('Please agree to the Terms & cancellation policy to continue.')
    mobileAgreeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    mobileAgreeRef.current?.focus()
  }

  const basefare = 5800
  const stopsCharge = stops.length * 100
  const addonTotal = ADD_ONS
    .filter(a => addOns.includes(a.id))
    .reduce((s, a) => s + a.price, 0)
  const total = basefare + stopsCharge + addonTotal
  const payNow = Math.round(total * 0.2)
  const balance = total - payNow

  return (
    <div className="min-h-screen bg-ivory">
      {/* Title bar */}
      <div className="bg-ink pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-1">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/search" className="hover:text-white/70 transition-colors">Search results</Link>
            <ChevronRight size={11} />
            <span className="text-white/70">Review booking</span>
          </div>
          <h1 className="text-white text-2xl md:text-3xl font-bold">Review booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40 md:pb-28 lg:pb-10">
        <div className="flex gap-8 items-start flex-col lg:flex-row">

          {/* ── MAIN ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">
            <TripSummary />
            <PolicyTabs />
            <CabInfoCard />
            <AddOnsCard addOns={addOns} onToggle={toggleAddon} />
            <TravellerDetailsForm />

            {/* Mobile/tablet: terms checkbox — the sidebar with this is desktop-only, but the fixed pay bar's button needs it too */}
            <div className="lg:hidden bg-white rounded-2xl border border-black/5 p-4">
              <TermsAgreement ref={mobileAgreeRef} agreed={agreed} onToggle={() => setAgreed(a => !a)} />
            </div>
          </main>

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden lg:block w-72 flex-shrink-0 lg:self-stretch">
            <FareBreakdownCard
              basefare={basefare}
              stopsCount={stops.length}
              stopsCharge={stopsCharge}
              addOns={addOns}
              total={total}
              payNow={payNow}
              balance={balance}
              agreed={agreed}
              onToggleAgree={() => setAgreed(a => !a)}
            />
          </aside>

        </div>
      </div>

      <MobilePayBar payNow={payNow} total={total} agreed={agreed} onPayAttempt={handleMobilePayAttempt} />
    </div>
  )
}
