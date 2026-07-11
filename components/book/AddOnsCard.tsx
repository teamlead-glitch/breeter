'use client'
import { useState } from 'react'
import { Check } from 'lucide-react'
import { ADD_ONS } from './data'

export default function AddOnsCard({ addOns, onToggle }: { addOns: string[]; onToggle: (id: string) => void }) {
  const [langChoice, setLangChoice] = useState('English')

  return (
    <div className="bg-white rounded-2xl border border-black/5 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-black/5">
        <h3 className="font-bold text-ink text-base">Add-ons &amp; preferences</h3>
        <p className="text-ink-faint text-xs mt-1">Optional — each adds a flat charge to your fare</p>
      </div>
      {ADD_ONS.map((a, i) => (
        <label
          key={a.id}
          onClick={() => onToggle(a.id)}
          className={`flex items-start gap-4 px-4 sm:px-5 py-4 cursor-pointer hover:bg-ivory/60 transition-colors ${
            i < ADD_ONS.length - 1 ? 'border-b border-black/5' : ''
          }`}>
          <span
            aria-hidden
            className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 grid place-items-center transition-colors ${
              addOns.includes(a.id) ? 'bg-cta border-cta text-white' : 'border-ink-faint/35'
            }`}>
            {addOns.includes(a.id) && <Check size={11} />}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm">{a.label}</p>
            <p className="text-ink-faint text-xs mt-0.5">{a.desc}</p>
            {a.extra && addOns.includes(a.id) && (
              <div className="flex flex-wrap gap-2 mt-3" onClick={e => e.stopPropagation()}>
                {a.extra.map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLangChoice(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
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
  )
}
