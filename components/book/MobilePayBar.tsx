export default function MobilePayBar({ payNow, total, agreed }: { payNow: number; total: number; agreed: boolean }) {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-black/8 px-4 py-3 flex items-center gap-3 shadow-2xl will-change-transform [transform:translateZ(0)]">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] text-ink-faint">Pay now (20%)</p>
        <p className="font-mono font-bold text-cta text-xl leading-tight">₹{payNow.toLocaleString('en-IN')}</p>
        <p className="text-[10px] text-ink-faint">Total ₹{total.toLocaleString('en-IN')}</p>
      </div>
      <button
        disabled={!agreed}
        className={`flex-none font-bold px-6 py-3.5 rounded-xl text-sm transition-colors ${
          agreed
            ? 'bg-cta hover:bg-cta-dark text-white'
            : 'bg-ink-faint/15 text-ink-faint cursor-not-allowed'
        }`}>
        Pay now →
      </button>
    </div>
  )
}
