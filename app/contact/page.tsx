import type { Metadata } from 'next'
import { getSeoMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return getSeoMetadata('page-contact-us', {
    title: 'Contact Us — Breeter',
    description: "Questions about a booking or a holiday package? Send us a message and we'll get back to you within 2 hours.",
  })
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <p className="font-mono text-forest/40 text-xs tracking-[0.2em] uppercase mb-2">Reach us</p>
          <h1 className="font-display text-ink text-4xl font-bold mb-2">Get in touch</h1>
          <p className="text-ink-muted text-sm max-w-md">Questions about a booking or a holiday package? Send us a message and we&apos;ll get back to you within 2 hours.</p>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row items-start">

          {/* Form */}
          <main className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-bold text-ink text-lg mb-5">Send an enquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {['Name', 'Phone'].map(f => (
                  <div key={f}>
                    <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">{f}</label>
                    <input className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder={`Your ${f.toLowerCase()}`} />
                  </div>
                ))}
              </div>

              {['Email'].map(f => (
                <div key={f} className="mb-4">
                  <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">{f}</label>
                  <input className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder={`Your ${f.toLowerCase()}`} />
                </div>
              ))}

              <div className="mb-6">
                <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Message</label>
                <textarea rows={5} className="w-full bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none resize-none" placeholder="Tell us how we can help…" />
              </div>

              <button className="w-full bg-cta hover:bg-cta-dark text-white font-bold py-3.5 rounded-xl transition-colors text-sm">
                Send message →
              </button>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-4">
            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 className="font-bold text-ink text-sm mb-4">Reach us</h3>
              <div className="space-y-3">
                {[
                  { label: 'Phone', value: '+91 98765 43210' },
                  { label: 'WhatsApp', value: '+91 98765 43210' },
                  { label: 'Email', value: 'hello@breeter.com' },
                  { label: 'Hours', value: '24 × 7' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between py-2 border-b border-black/5 last:border-0">
                    <span className="text-ink-faint text-xs">{item.label}</span>
                    <span className="font-semibold text-ink text-xs">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-black/5 p-5">
              <h3 className="font-bold text-ink text-sm mb-2">Office</h3>
              <p className="text-ink-muted text-xs leading-relaxed">
                Breeter Travel Express<br />
                MG Road, Kochi 682 035<br />
                Kerala, India
              </p>
            </div>

            <div className="bg-forest/5 rounded-2xl p-5 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#25D366] rounded-xl grid place-items-center flex-shrink-0">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">Fastest reply on WhatsApp</p>
                <p className="text-ink-faint text-xs">Usually within 5 minutes</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
