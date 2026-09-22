const FALLBACK_TEXT = [
  'Transparent pricing, zero surprises',
  'Verified drivers across South India',
  '24/7 customer support',
  'Outstation cabs · Hourly rentals · Curated holidays',
  'Instant fare estimates',
  'Trusted by 10,000+ travellers',
].join('   •   ')

function MarqueeSet({ text, hidden }: { text: string; hidden?: boolean }) {
  return (
    <span className="whitespace-nowrap pr-10 text-sm font-semibold text-white/90" aria-hidden={hidden || undefined}>
      {text}
    </span>
  )
}

export default function MarqueeStrip({ text }: { text?: string | null }) {
  const marqueeText = text?.trim() || FALLBACK_TEXT

  return (
    <div className="overflow-hidden bg-forest py-3" aria-label="Breeter highlights">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <MarqueeSet text={marqueeText} />
        <MarqueeSet text={marqueeText} hidden />
      </div>
    </div>
  )
}
