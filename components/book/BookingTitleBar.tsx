import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function BookingTitleBar() {
  return (
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
  )
}
