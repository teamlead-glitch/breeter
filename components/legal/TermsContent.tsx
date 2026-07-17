export default function TermsContent() {
  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Legal</p>
        <h1 className="font-display text-ink text-4xl font-bold mb-2">Terms & Conditions</h1>
        <p className="text-ink-muted text-sm mb-8">Last updated: 1 Jan 2026</p>

        <div className="bg-white rounded-2xl border border-black/5 p-8 space-y-8">
          {[
            {
              title: '1. Acceptance of terms',
              content: 'By accessing or using Breeter Travel Express services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
            },
            {
              title: '2. Booking & payment',
              content: 'All bookings require a 20% advance payment to confirm the trip. The remaining balance is payable directly to the cab operator after trip completion. Fares shown are all-inclusive — they include base fare, slab-based distance charges, tolls, state taxes, and driver allowance.',
            },
            {
              title: '3. Vehicle & driver',
              content: 'Breeter partners with verified local cab operators. While we specify the vehicle category, the exact model is subject to availability. All listed categories include AC. If the operator cannot fulfill the booking, Breeter will arrange an equivalent vehicle or offer a full refund.',
            },
            {
              title: '4. Liability',
              content: 'Breeter acts as a technology intermediary between travellers and cab operators. We are not liable for delays due to weather, traffic, or events beyond our control. We are not liable for loss or damage to personal belongings during the trip.',
            },
            {
              title: '5. Contact & disputes',
              content: 'For disputes, please contact hello@breeter.com within 7 days of the trip. Breeter will mediate between the traveller and operator in good faith. Disputes not resolved within 30 days may be referred to consumer courts in Kochi, Kerala.',
            },
          ].map(section => (
            <div key={section.title}>
              <h2 className="font-bold text-ink text-base mb-2">{section.title}</h2>
              <p className="text-ink-muted text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
