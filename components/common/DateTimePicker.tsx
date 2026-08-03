'use client'

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseValue(value: string) {
  const [datePart, timePart] = value.split('T')
  const [hour, minute] = (timePart || '00:00').split(':').map(Number)
  return { datePart, hour, minute }
}

function formatValue(datePart: string, hour: number, minute: number) {
  return `${datePart}T${pad(hour)}:${pad(minute)}`
}

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)

type Props = {
  value: string
  onChange: (value: string) => void
}

export default function DateTimePicker({ value, onChange }: Props) {
  const { datePart, hour, minute } = parseValue(value)

  return (
    <div className="flex flex-nowrap items-center gap-3 min-w-0 flex-1">
      <input
        type="date"
        value={datePart}
        onChange={e => e.target.value && onChange(formatValue(e.target.value, hour, minute))}
        className="w-28 h-6 flex-none text-sm font-semibold text-ink bg-transparent outline-none"
      />
      <div className="flex items-center gap-1 flex-shrink-0">
        <select
          aria-label="Hour"
          value={hour}
          onChange={e => onChange(formatValue(datePart, Number(e.target.value), minute))}
          className="w-11 h-6 appearance-none bg-ivory-dark rounded-md px-1 py-0 text-sm font-semibold text-ink text-center outline-none">
          {HOURS.map(h => <option key={h} value={h}>{pad(h)}</option>)}
        </select>
        <span className="text-ink-faint font-bold">:</span>
        <select
          aria-label="Minute"
          value={minute}
          onChange={e => onChange(formatValue(datePart, hour, Number(e.target.value)))}
          className="w-11 h-6 appearance-none bg-ivory-dark rounded-md px-1 py-0 text-sm font-semibold text-ink text-center outline-none">
          {MINUTES.map(m => <option key={m} value={m}>{pad(m)}</option>)}
        </select>
      </div>
    </div>
  )
}
