'use client'
import { forwardRef, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Value format (shared with SearchContext): "YYYY-MM-DDTHH:mm", local time.

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function toDate(value: string) {
  const [datePart, timePart = '00:00'] = value.split('T')
  const [y, m, d] = datePart.split('-').map(Number)
  const [hh, mm] = timePart.split(':').map(Number)
  const date = new Date(y, (m || 1) - 1, d || 1, hh || 0, mm || 0)
  return Number.isNaN(date.getTime()) ? null : date
}

function toValue(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

// Big, tappable trigger instead of the library's text input — no keyboard pops up on mobile.
const PickerTrigger = forwardRef<HTMLButtonElement, { value?: string; onClick?: () => void; label: string }>(
  ({ value, onClick, label }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${value}`}
      className="block w-full text-left text-sm font-semibold text-ink outline-none truncate">
      {value || 'Select date & time'}
    </button>
  ),
)
PickerTrigger.displayName = 'PickerTrigger'

type Props = {
  value: string
  onChange: (value: string) => void
  // Earliest selectable moment ("YYYY-MM-DDTHH:mm" or "YYYY-MM-DD"); defaults to now.
  minDate?: string
  label?: string
}

export default function DateTimePicker({ value, onChange, minDate, label = 'Select date and time' }: Props) {
  const selected = toDate(value)
  const min = (minDate && toDate(minDate)) || new Date()
  // Centered modal on phones (the popover would be cramped); anchored popover on larger screens.
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // On the earliest allowed day, hide times before `min`; other days allow the full day.
  const onMinDay = selected ? isSameDay(selected, min) : true
  const dayStart = startOfDay(selected ?? min)
  const minTime = onMinDay ? min : dayStart
  const maxTime = new Date(dayStart.getFullYear(), dayStart.getMonth(), dayStart.getDate(), 23, 59)

  return (
    <DatePicker
      selected={selected}
      onChange={(date: Date | null) => { if (date) onChange(toValue(date)) }}
      showTimeSelect
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="EEE, d MMM yyyy · HH:mm"
      timeFormat="HH:mm"
      minDate={startOfDay(min)}
      minTime={minTime}
      maxTime={maxTime}
      customInput={<PickerTrigger label={label} />}
      withPortal={isMobile}
      // Render the desktop popover at body level so modal/overflow containers can't clip it.
      portalId="datepicker-portal"
      popperPlacement="bottom-start"
      // Picking a day keeps it open for the time; picking a time closes it.
      calendarClassName="breeter-datepicker"
      wrapperClassName="w-full"
    />
  )
}
