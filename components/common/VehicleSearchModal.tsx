'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import SearchWidget from '@/components/common/SearchWidget'

// Opened from a vehicle card (home page or /cabs): the vehicle is already chosen (its id was
// dispatched to search state before this opened), so submitting here goes straight to /book
// instead of the /search results list.
export default function VehicleSearchModal({ vehicleName, onClose }: { vehicleName: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-3 sm:px-4" role="dialog" aria-modal="true" aria-label={`Search a trip for ${vehicleName}`}>
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-h-[90vh] sm:max-h-none max-w-2xl md:max-w-5xl lg:max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-5 border-b border-black/5">
          <div>
            <p className="font-mono text-forest/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">Selected vehicle</p>
            <h2 className="font-bold text-ink text-xl">{vehicleName}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>
        <div className="px-2 py-3 sm:px-6 sm:py-6 bg-ivory/50">
          <SearchWidget onSearch={onClose} bare searchHref="/book" submitLabel="Continue to book" />
        </div>
      </div>
    </div>
  )
}
