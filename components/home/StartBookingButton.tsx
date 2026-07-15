'use client'

export default function StartBookingButton() {
  const handleClick = () => {
    const input = document.getElementById('search-from-input') as HTMLInputElement | null
    if (!input) return
    input.focus({ preventScroll: true })
    input.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <button
      onClick={handleClick}
      className="flex-none inline-flex items-center gap-2 bg-cta hover:bg-cta-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-colors shadow-xl shadow-cta/20">
      Start booking →
    </button>
  )
}
