import { useState, useCallback } from 'react'
import Card from '../ui/Card'
import type { ContributionDay } from '../../types'

interface Props {
  data: ContributionDay[]
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function getIntensity(count: number): string {
  if (count === 0) return 'bg-surface-alt'
  if (count <= 2) return 'bg-accent-subtle'
  if (count <= 5) return 'bg-accent-dim'
  if (count <= 10) return 'bg-accent/60'
  return 'bg-accent'
}

export default function ContributionGraph({ data }: Props) {
  const [tooltip, setTooltip] = useState<{
    show: boolean
    x: number
    y: number
    text: string
    date: string
  }>({ show: false, x: 0, y: 0, text: '', date: '' })

  const handleMouseEnter = useCallback((day: ContributionDay, e: React.MouseEvent) => {
    const text = day.count > 0
      ? `${day.count} contribution${day.count !== 1 ? 's' : ''}`
      : 'No contributions'
    const date = new Date(day.date).toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
    })
    setTooltip({ show: true, x: e.clientX, y: e.clientY, text, date })
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltip(prev => prev.show ? { ...prev, x: e.clientX, y: e.clientY } : prev)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, show: false }))
  }, [])

  const countMap = new Map<string, number>()
  for (const d of data) {
    countMap.set(d.date, d.count)
  }

  const today = new Date()
  const daysSinceSunday = today.getDay() // 0 = Sun
  const lastSunday = new Date(today)
  lastSunday.setDate(lastSunday.getDate() - daysSinceSunday)

  const startDate = new Date(lastSunday)
  startDate.setDate(startDate.getDate() - (52 * 7 - 1))

  const rawDays: { date: string; count: number }[] = []
  const cursor = new Date(startDate)
  while (cursor <= lastSunday) {
    const key = cursor.toISOString().slice(0, 10)
    rawDays.push({ date: key, count: countMap.get(key) || 0 })
    cursor.setDate(cursor.getDate() + 1)
  }

  const weeks: { date: string; count: number }[][] = []
  for (let i = 0; i < rawDays.length; i += 7) {
    weeks.push(rawDays.slice(i, i + 7))
  }

  const monthLabels: { label: string; weekCount: number }[] = []
  let mi = 0
  while (mi < weeks.length) {
    const month = new Date(weeks[mi][0].date).getMonth()
    let count = 1
    while (mi + count < weeks.length) {
      const nextMonth = new Date(weeks[mi + count][0].date).getMonth()
      if (nextMonth !== month) break
      count++
    }
    monthLabels.push({ label: MONTHS[month], weekCount: count })
    mi += count
  }

  return (
    <Card className="p-4 sm:p-6 overflow-x-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">Contribution Calendar</span>
        <span className="text-xs text-text-secondary">(Last 12 months)</span>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `28px repeat(${weeks.length}, minmax(0, 1fr))`,
          gap: 3,
        }}
      >
        {(() => {
          let col = 2
          return monthLabels.map((m) => {
            const span = col
            col += m.weekCount
            return (
              <div
                key={m.label}
                className="text-[10px] text-text-secondary truncate pl-0.5"
                style={{ gridColumn: `${span} / span ${m.weekCount}` }}
              >
                {m.label}
              </div>
            )
          })
        })()}

        {DAY_LABELS.map((label, i) => (
          <div
            key={label || `day-${i}`}
            className="text-[10px] text-text-secondary flex items-center leading-none"
            style={{ gridRowStart: i + 2, gridColumn: 1 }}
          >
            {label}
          </div>
        ))}

        {weeks.map((week, wi) =>
          week.map((day, di) => (
            <div
              key={day.date}
              className={`aspect-square rounded-sm ${getIntensity(day.count)} cursor-default`}
              style={{ gridRowStart: di + 2, gridColumnStart: wi + 2 }}
              onMouseEnter={(e) => handleMouseEnter(day, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
          ))
        )}
      </div>

      <div className="flex items-center gap-1.5 mt-4 justify-end">
        <span className="text-[10px] text-text-secondary">Less</span>
        <div className="w-3 h-3 rounded-sm bg-surface-alt" />
        <div className="w-3 h-3 rounded-sm bg-accent-subtle" />
        <div className="w-3 h-3 rounded-sm bg-accent-dim" />
        <div className="w-3 h-3 rounded-sm bg-accent/60" />
        <div className="w-3 h-3 rounded-sm bg-accent" />
        <span className="text-[10px] text-text-secondary">More</span>
      </div>

      {tooltip.show && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y - 10, transform: 'translate(-50%, -100%)' }}
        >
          <div className="bg-surface border border-border px-2.5 py-1.5 rounded text-xs text-text whitespace-nowrap shadow-sm">
            {tooltip.text}
            <br />
            <span className="text-text-secondary">{tooltip.date}</span>
          </div>
        </div>
      )}
    </Card>
  )
}
