export default function CancellationPolicyContent() {
  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Legal</p>
        <h1 className="font-display text-ink text-4xl font-bold mb-2">Cancellation Policy</h1>
        <p className="text-ink-muted text-sm mb-8">Last updated: 1 Jan 2026</p>

        <div className="bg-white rounded-2xl border border-black/5 p-8 space-y-8">
          <div>
            <h2 className="font-bold text-ink text-base mb-2">1. Free cancellation window</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Free cancellation is available up to 12 hours before your scheduled pickup time. You&apos;ll receive a full refund of your advance payment.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-ink text-base mb-3">2. Refund tiers</h2>
            <ul className="space-y-2">
              {[
                ['Before 12 hrs of pickup', 'Full refund'],
                ['6–12 hrs before pickup', '10% cancellation charge'],
                ['Within 6 hrs of pickup', '25% cancellation charge'],
                ['No-show', '50% of total fare charged'],
              ].map(([when, what]) => (
                <li key={when} className="flex items-start gap-2 text-sm text-ink-muted">
                  <span className="w-1.5 h-1.5 bg-ink-faint/40 rounded-full mt-1.5 flex-shrink-0" />
                  {when} — <span className="font-semibold text-ink">{what}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-ink text-base mb-2">3. How refunds are processed</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              Refunds are issued to the original payment method within 5–7 business days of cancellation. The balance amount (if any) payable to the driver is never charged for a cancelled trip.
            </p>
          </div>

          <div>
            <h2 className="font-bold text-ink text-base mb-2">4. Operator-side cancellations</h2>
            <p className="text-ink-muted text-sm leading-relaxed">
              If Breeter or the cab operator cancels a confirmed booking, you will receive a full refund of your advance payment regardless of how close to pickup time the cancellation occurs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
