import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'

// Full-page result screen: invalid/used link (error) or booking cancelled (success).
export default function CancelNotice({ tone, title, message }: { tone: 'error' | 'success'; title: string; message: string }) {
  const Icon = tone === 'success' ? CheckCircle2 : XCircle
  return (
    <div className="min-h-screen bg-ivory grid place-items-center px-4 py-16 pt-28">
      <div className="max-w-md w-full text-center">
        <div className={`mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl ${tone === 'success' ? 'bg-cta/10 text-cta' : 'bg-red-50 text-red-500'}`}>
          <Icon size={32} />
        </div>
        <h1 className="font-display text-ink text-xl md:text-2xl font-bold mb-2">{title}</h1>
        <p className="text-ink-muted text-sm leading-relaxed mb-7">{message}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-cta hover:bg-cta-dark text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
          Back to home
        </Link>
      </div>
    </div>
  )
}
