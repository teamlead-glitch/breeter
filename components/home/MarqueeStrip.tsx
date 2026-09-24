const FALLBACK_TEXT = [
  'Transparent pricing, zero surprises',
  'Verified drivers across South India',
  '24/7 customer support',
  'Outstation cabs · Hourly rentals · Curated holidays',
  'Instant fare estimates',
  'Trusted by 10,000+ travellers',
].join('   •   ')

export default function MarqueeStrip({ text }: { text?: string | null }) {
  const marqueeText = text?.trim() || FALLBACK_TEXT

  return (
    <div className="overflow-hidden bg-[#0A2A80] py-3" aria-label="Breeter highlights">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <span className="whitespace-nowrap text-sm font-semibold text-white/90">{marqueeText}</span>
      </div>
    </div>
  )
}
