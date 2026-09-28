import { AlertTriangle, Loader2 } from 'lucide-react'

// Two-step cancel: the first button only reveals the confirmation; the POST runs on "Yes, cancel".
export default function CancelBookingActions({
  confirming,
  cancelling,
  error,
  onRequestCancel,
  onKeep,
  onConfirm,
}: {
  confirming: boolean
  cancelling: boolean
  error?: string
  onRequestCancel: () => void
  onKeep: () => void
  onConfirm: () => void
}) {
  return (
    <>
      {error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700">{error}</p>
      )}

      {!confirming ? (
        <button
          type="button"
          onClick={onRequestCancel}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm py-3.5 rounded-xl transition-colors">
          Cancel booking
        </button>
      ) : (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 sm:p-5">
          <p className="flex items-start gap-2 text-sm font-semibold text-red-800 mb-1">
            <AlertTriangle size={16} className="mt-0.5 flex-none" /> Are you sure you want to cancel?
          </p>
          <p className="text-xs text-red-700 mb-4 pl-6">This can&apos;t be undone. Refunds follow our cancellation policy.</p>
          <div className="flex flex-col-reverse sm:flex-row gap-2">
            <button
              type="button"
              disabled={cancelling}
              onClick={onKeep}
              className="flex-1 bg-white border border-black/10 hover:border-black/20 disabled:opacity-60 text-ink font-bold text-sm py-3 rounded-xl transition-colors">
              Keep booking
            </button>
            <button
              type="button"
              disabled={cancelling}
              onClick={onConfirm}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold text-sm py-3 rounded-xl transition-colors">
              {cancelling ? <><Loader2 size={15} className="animate-spin" /> Cancelling…</> : 'Yes, cancel booking'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
