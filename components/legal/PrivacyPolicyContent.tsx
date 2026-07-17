export default function PrivacyPolicyContent() {
  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Legal</p>
        <h1 className="font-display text-ink text-4xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-ink-muted text-sm mb-8">Last updated: 1 Jan 2026</p>

        <div className="bg-white rounded-2xl border border-black/5 p-8 space-y-8">
          {[
            {
              title: '1. Information we collect',
              content: 'We collect the details you provide when booking a trip or sending an enquiry — name, phone number, email address, pickup/drop locations, and travel dates. We also collect basic device and usage data to improve our services.',
            },
            {
              title: '2. How we use your information',
              content: 'Your information is used to process bookings, share trip details with the assigned cab operator, send booking confirmations and updates, and respond to enquiries and support requests.',
            },
            {
              title: '3. Sharing with cab operators',
              content: 'To fulfil your booking, we share your name, phone number, and trip details with the verified cab operator assigned to your trip. We do not sell your personal data to third parties.',
            },
            {
              title: '4. Cookies',
              content: 'Our website uses cookies to remember your search preferences and keep you signed in. You can disable cookies in your browser settings, though some features may not work as expected.',
            },
            {
              title: '5. Data security',
              content: 'We use industry-standard safeguards to protect your data against unauthorised access, alteration, or disclosure. Payment details are processed by PCI-DSS compliant payment gateways — we do not store your card details.',
            },
            {
              title: '6. Your rights',
              content: 'You may request access to, correction of, or deletion of your personal data at any time by contacting hello@breeter.com.',
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
