const ITEMS = [
  'Transparent pricing, zero surprises',
  'Verified drivers across South India',
  '24/7 customer support',
  'Outstation cabs · Hourly rentals · Curated holidays',
  'Instant fare estimates',
  'Trusted by 10,000+ travellers',
]

function MarqueeSet({ hidden }: { hidden?: boolean }) {
  return (
    <div className="flex items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {ITEMS.map((text, i) => (
        <span key={i} className="whitespace-nowrap text-sm font-semibold text-white/90">
          {text}
        </span>
      ))}
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="overflow-hidden bg-forest py-3" aria-label="Breeter highlights">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeSet />
        <MarqueeSet hidden />
      </div>
    </div>
  )
}
