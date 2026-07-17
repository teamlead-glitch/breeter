import { X } from 'lucide-react'
import SearchWidget from '@/components/common/SearchWidget'

export default function BookCabModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} />
      {/* Modal */}
      <div className="relative w-full max-w-2xl md:max-w-5xl lg:max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5">
          <div>
            <p className="font-mono text-forest/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">Quick booking</p>
            <h2 className="font-bold text-ink text-xl">Book a Cab</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-ivory hover:bg-ivory-dark grid place-items-center transition-colors text-ink-muted hover:text-ink">
            <X size={18} />
          </button>
        </div>
        {/* Search widget */}
        <div className="px-6 py-6 bg-ivory/50">
          <SearchWidget />
        </div>
      </div>
    </div>
  )
}
