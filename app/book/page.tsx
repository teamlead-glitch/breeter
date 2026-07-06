'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Check, X, ChevronRight, Edit3, Plus, Users, Wind, Shield, Clock, Fuel } from 'lucide-react'

const ADD_ONS = [
  {
    id: 'age',
    label: 'Vehicle age below 5 years',
    desc: 'Guaranteed newer car',
    price: 150,
    extra: null,
  },
  {
    id: 'lang',
    label: 'Driver language',
    desc: 'Preferred spoken language',
    price: 500,
    extra: ['English', 'Hindi', 'Malayalam', 'Tamil'],
  },
  {
    id: 'roof',
    label: 'Roof carrier',
    desc: 'Extra luggage on roof',
    price: 250,
    extra: null,
  },
]

const INCLUSIONS = [
  { icon: <Shield size={15} />, title: '295 km included', sub: '₹18/km will apply beyond the included kms' },
  { icon: <Check size={15} />, title: 'Toll, tax & other charges', sub: 'Toll, state tax & parking charges are included' },
  { icon: <Users size={15} />, title: 'Driver allowance', sub: 'Driver food & accommodation charges are included' },
  { icon: <Clock size={15} />, title: 'Waiting time up to 30 mins', sub: '₹1/min post 30 mins' },
  { icon: <Fuel size={15} />, title: 'Fuel charges included', sub: 'Fuel cost for your trip is included in the fare' },
]

type Tab = 'inclusions' | 'cancellation' | 'terms'

export default function BookPage() {
  const [addOns, setAddOns] = useState<string[]>(['age', 'lang'])
  const [langChoice, setLangChoice] = useState('English')
  const [agreed, setAgreed] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('inclusions')
  const [stops, setStops] = useState(['Adimali', 'Mattupetti'])

  const toggleAddon = (id: string) =>
    setAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])

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
          <h1 className="font-display text-white text-2xl md:text-3xl font-bold">Review booking</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-40 md:pb-28 lg:pb-10">
        <div className="flex gap-8 items-start flex-col lg:flex-row">

          {/* ── MAIN ─────────────────────────────────────── */}
          <main className="flex-1 min-w-0 space-y-4">

            {/* 1. Trip summary */}
            <div className="bg-white rounded-2xl border border-black/5 p-5 relative">
              <Link href="/search"
                className="absolute top-4 right-4 flex items-center gap-1 text-xs font-semibold text-cta hover:bg-cta/8 border border-cta/20 px-3 py-1.5 rounded-lg transition-colors">
                <Edit3 size={12} /> Edit
              </Link>
              <p className="text-ink-faint text-xs mb-3">Outstation One Way Trip (Drop)</p>
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-bold text-ink text-lg leading-tight">Kochi</p>
                  <p className="text-ink-faint text-xs">Kerala</p>
                </div>
                <div className="flex-1 flex items-center gap-1 px-2">
                  <span className="w-2 h-2 rounded-full border-2 border-ink-faint/40 flex-shrink-0" />
                  <div className="flex-1 border-t-2 border-dashed border-ink-faint/25" />
                  <span className="w-2 h-2 rounded-full bg-cta flex-shrink-0" />
                </div>
                <div className="text-right">
                  <p className="font-bold text-ink text-lg leading-tight">Kannur</p>
                  <p className="text-ink-faint text-xs">Kerala</p>
                </div>
              </div>
              <p className="text-ink-faint text-xs mt-3">📅 23 Aug 2026, 10:00 AM · ~295 km</p>
            </div>

            {/* 2. Stops */}
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <p className="text-[10px] font-bold text-ink-faint uppercase tracking-[0.15em] mb-3">Stops (optional)</p>
              <div className="space-y-2 mb-3">
                {stops.map((stop, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs text-ink-faint w-4">{i + 1}.</span>
                    <div className="flex-1 bg-ivory rounded-xl px-3 py-2.5 text-sm text-ink">{stop}</div>
                    <button
                      onClick={() => setStops(prev => prev.filter((_, j) => j !== i))}
                      className="w-7 h-7 rounded-lg bg-ivory hover:bg-red-50 text-ink-faint hover:text-red-400 grid place-items-center transition-colors">
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setStops(prev => [...prev, ''])}
                className="flex items-center gap-1.5 text-xs font-semibold text-cta border border-dashed border-cta/30 px-3 py-1.5 rounded-lg hover:bg-cta/5 transition-colors">
                <Plus size={11} /> Add another stop
              </button>
            </div>

            {/* 3. Cab info */}
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              <div className="p-5 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-ink text-base">XL Sedan</h3>
                    <span className="bg-cta/10 text-cta text-[10px] font-semibold px-2 py-0.5 rounded-full">4.5 ★ · 12 reviews</span>
                  </div>
                  <p className="text-ink-faint text-xs mb-2">Maruti Ciaz / Skoda Slavia or similar</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-ink-muted"><Users size={11}/> 4 Seats</span>
                    <span className="flex items-center gap-1 text-xs text-ink-muted"><Wind size={11}/> AC</span>
                    <span className="text-xs text-ink-muted">SEDAN</span>
                  </div>
                </div>
                <div className="w-32 h-20 bg-ivory rounded-xl flex-shrink-0 flex items-center justify-center">
                  <span className="text-ink-faint text-xs font-medium">Cab image</span>
                </div>
              </div>
              <div className="bg-ivory-dark border-t-2 border-black/5 px-5 py-3 flex items-start gap-2">
                <span className="text-cta text-sm flex-shrink-0">ⓘ</span>
                <p className="text-ink-faint text-xs">Cab operator will be assigned on booking completion</p>
              </div>
            </div>

            {/* 4. Tabs — Inclusions / Cancellation / T&C */}
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              {/* Tab bar */}
              <div className="flex border-b border-black/5 overflow-x-auto scrollbar-hide">
                {([
                  { key: 'inclusions', label: 'Inclusions & Exclusions' },
                  { key: 'cancellation', label: 'Cancellation Policy' },
                  { key: 'terms', label: 'Terms & Conditions' },
                ] as { key: Tab; label: string }[]).map(t => (
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

              {/* Tab panels */}
              {activeTab === 'inclusions' && (
                <div className="p-5 space-y-4">
                  {INCLUSIONS.map(item => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="w-8 h-8 bg-cta/10 rounded-xl grid place-items-center text-cta flex-shrink-0">
                        {item.icon}
                      </span>
                      <div>
                        <p className="font-semibold text-ink text-sm">{item.title}</p>
                        <p className="text-ink-faint text-xs mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'cancellation' && (
                <div className="p-5">
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
              )}

              {activeTab === 'terms' && (
                <div className="p-5">
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
              )}
            </div>

            {/* 5. Add-ons */}
            <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
              <div className="p-5 border-b border-black/5">
                <h3 className="font-bold text-ink text-base">Add-ons &amp; preferences</h3>
                <p className="text-ink-faint text-xs mt-1">Optional — each adds a flat charge to your fare</p>
              </div>
              {ADD_ONS.map((a, i) => (
                <label
                  key={a.id}
                  className={`flex items-start gap-4 px-5 py-4 cursor-pointer hover:bg-ivory/60 transition-colors ${
                    i < ADD_ONS.length - 1 ? 'border-b border-black/5' : ''
                  }`}>
                  <span
                    onClick={() => toggleAddon(a.id)}
                    className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
                      addOns.includes(a.id) ? 'bg-cta border-cta text-white' : 'border-ink-faint/35'
                    }`}>
                    {addOns.includes(a.id) && <Check size={11} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-ink text-sm">{a.label}</p>
                    <p className="text-ink-faint text-xs mt-0.5">{a.desc}</p>
                    {a.extra && addOns.includes(a.id) && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {a.extra.map(lang => (
                          <button
                            key={lang}
                            type="button"
                            onClick={() => setLangChoice(lang)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              langChoice === lang
                                ? 'bg-cta text-white border-cta'
                                : 'border-black/15 text-ink-muted hover:border-forest/40'
                            }`}>
                            {lang}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-ink text-sm flex-shrink-0 mt-0.5">+₹{a.price}</span>
                </label>
              ))}
            </div>

            {/* 6. Traveller details */}
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 className="font-bold text-ink text-base mb-5">Traveller details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Name</label>
                  <input className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="Your full name" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">No. of Pax</label>
                  <select className="w-full bg-ivory rounded-xl px-4 py-3 text-sm font-semibold text-ink border-2 border-transparent focus:border-forest/25 outline-none appearance-none">
                    {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Contact No.</label>
                  <input className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="+91 98765 43213" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Email ID</label>
                  <input type="email" className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Notes for driver (optional)</label>
                <textarea rows={3} className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none resize-none" placeholder="Pickup from main gate…" />
              </div>
            </div>

          </main>

          {/* ── SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-black/5 p-5 sticky top-24">
              <h3 className="font-bold text-ink text-base mb-4">Fare breakdown</h3>

              <div className="space-y-2.5 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-muted">Base + slab KM</span>
                  <span className="font-mono font-semibold text-ink">₹{basefare.toLocaleString('en-IN')}</span>
                </div>
                {stops.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-ink-muted">Stops ({stops.length} × ₹100)</span>
                    <span className="font-mono font-semibold text-ink">₹{stopsCharge}</span>
                  </div>
                )}
                {ADD_ONS.filter(a => addOns.includes(a.id)).map(a => (
                  <div key={a.id} className="flex justify-between text-sm">
                    <span className="text-ink-muted">{a.label}</span>
                    <span className="font-mono font-semibold text-ink">₹{a.price}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-black/5 pt-3 mb-3">
                <div className="flex justify-between">
                  <span className="font-bold text-ink text-sm">Total fare</span>
                  <span className="font-mono font-bold text-cta text-lg">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="bg-cta/5 border border-cta/10 rounded-xl p-3.5 mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-ink-muted">Pay now (20%)</span>
                  <span className="font-mono font-bold text-cta">₹{payNow.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-ink-muted">Balance (offline)</span>
                  <span className="font-mono text-ink-faint">₹{balance.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 mb-4 cursor-pointer">
                <span
                  onClick={() => setAgreed(!agreed)}
                  className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
                    agreed ? 'bg-cta border-cta text-white' : 'border-ink-faint/40'
                  }`}>
                  {agreed && <Check size={10} />}
                </span>
                <span className="text-xs text-ink-muted leading-relaxed">
                  I agree to the{' '}
                  <Link href="/terms" className="text-cta font-semibold hover:underline">
                    Terms &amp; cancellation policy
                  </Link>
                </span>
              </label>

              <button
                disabled={!agreed}
                className={`w-full font-bold py-3.5 rounded-xl text-sm transition-colors ${
                  agreed
                    ? 'bg-cta hover:bg-cta-dark text-white'
                    : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
                }`}>
                Proceed to payment →
              </button>
            </div>
          </aside>

        </div>
      </div>

      {/* Mobile fixed pay bar */}
      <div className="lg:hidden fixed bottom-16 md:bottom-0 inset-x-0 z-40 bg-white border-t border-black/8 px-4 py-3 flex items-center gap-3 shadow-2xl">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-ink-faint">Pay now (20%)</p>
          <p className="font-mono font-bold text-cta text-xl leading-tight">₹{payNow.toLocaleString('en-IN')}</p>
          <p className="text-[10px] text-ink-faint">Total ₹{total.toLocaleString('en-IN')}</p>
        </div>
        <button
          disabled={!agreed}
          className={`flex-none font-bold px-6 py-3.5 rounded-xl text-sm transition-colors ${
            agreed
              ? 'bg-cta hover:bg-cta-dark text-white'
              : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
          }`}>
          Pay now →
        </button>
      </div>
    </div>
  )
}
