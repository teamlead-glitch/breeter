'use client'
import { useCallback, useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

// Frontend-only spam guard: a simple addition question plus a hidden honeypot field. Stops basic
// bots; it is NOT verified by the backend, so it won't stop someone posting to the API directly.

type Question = { a: number; b: number }

function randomQuestion(): Question {
  const n = () => Math.floor(Math.random() * 9) + 1
  return { a: n(), b: n() }
}

export function useMathCaptcha() {
  // Generated after mount so server and client render the same (random numbers would mismatch).
  const [question, setQuestion] = useState<Question | null>(null)
  const [answer, setAnswer] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState<string | undefined>()

  useEffect(() => { setQuestion(randomQuestion()) }, [])

  const refresh = useCallback(() => {
    setQuestion(randomQuestion())
    setAnswer('')
  }, [])

  // Returns true when the answer is correct and the honeypot is empty.
  const verify = useCallback(() => {
    if (honeypot) return false
    if (!question) return false
    if (!answer.trim()) {
      setError('Please answer the question')
      return false
    }
    if (Number(answer.trim()) !== question.a + question.b) {
      setError('Incorrect answer, please try again')
      refresh()
      return false
    }
    setError(undefined)
    return true
  }, [answer, honeypot, question, refresh])

  const onAnswerChange = (value: string) => {
    setAnswer(value.replace(/\D/g, '').slice(0, 2))
    if (error) setError(undefined)
  }

  return { question, answer, honeypot, error, onAnswerChange, setHoneypot, verify, refresh }
}

export type MathCaptchaState = ReturnType<typeof useMathCaptcha>

export default function MathCaptchaField({ captcha, className = '' }: { captcha: MathCaptchaState; className?: string }) {
  const { question, answer, honeypot, error, onAnswerChange, setHoneypot, refresh } = captcha

  return (
    <div className={className}>
      {/* Honeypot — hidden from people and screen readers; bots that fill every field get rejected. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <label htmlFor="math-captcha" className="block text-[10px] font-bold text-ink-faint uppercase tracking-wider mb-1">
        Security check
      </label>
      <div className="flex items-center gap-2">
        <span className="flex-none rounded-xl bg-ivory px-4 py-3 text-sm font-semibold text-ink font-mono select-none">
          {question ? `${question.a} + ${question.b} =` : '… + … ='}
        </span>
        <input
          id="math-captcha"
          inputMode="numeric"
          autoComplete="off"
          value={answer}
          onChange={e => onAnswerChange(e.target.value)}
          placeholder="?"
          aria-invalid={Boolean(error)}
          className={`w-20 bg-ivory rounded-xl px-4 py-3 text-sm text-ink border-2 outline-none transition-colors ${
            error ? 'border-red-300' : 'border-transparent focus:border-forest/25'
          }`}
        />
        <button
          type="button"
          onClick={refresh}
          aria-label="New question"
          className="grid h-10 w-10 flex-none place-items-center rounded-xl text-ink-faint transition-colors hover:bg-ivory hover:text-ink">
          <RefreshCw size={15} />
        </button>
      </div>
      {error && <p className="text-red-500 text-[11px] mt-1">{error}</p>}
    </div>
  )
}
