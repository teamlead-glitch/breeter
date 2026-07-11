export default function TravellerDetailsForm() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5">
      <h3 className="font-bold text-ink text-base mb-5">Traveller details</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Name</label>
          <input name="name" autoComplete="name" className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="Your full name" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">No. of Pax</label>
          <select className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm font-semibold text-ink border-2 border-transparent focus:border-forest/25 outline-none appearance-none">
            {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Contact No.</label>
          <input type="tel" inputMode="tel" autoComplete="tel" className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="+91 98765 43213" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Email ID</label>
          <input type="email" autoComplete="email" className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none" placeholder="you@email.com" />
        </div>
      </div>
      <div>
        <label className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1.5">Notes for driver (optional)</label>
        <textarea rows={3} className="w-full bg-ivory rounded-xl px-4 py-3 text-base sm:text-sm text-ink border-2 border-transparent focus:border-forest/25 outline-none resize-none" placeholder="Pickup from main gate…" />
      </div>
    </div>
  )
}
