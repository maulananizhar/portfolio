import { Palette } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTheme, type AccentColor } from '../../context/ThemeContext'

const colorOptions: { key: AccentColor; hex: string }[] = [
  { key: 'blue', hex: '#0E7490' },
  { key: 'red', hex: '#DC2626' },
  { key: 'green', hex: '#059669' },
  { key: 'yellow', hex: '#D97706' },
  { key: 'purple', hex: '#7C3AED' },
]

export default function AccentColorPicker() {
  const [open, setOpen] = useState(false)
  const { accentColor, setAccentColor } = useTheme()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="border border-border-light p-2 text-text-secondary hover:text-text hover:border-accent transition-colors cursor-pointer"
        aria-label="Change accent color"
      >
        <Palette size={16} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 p-2 border border-border bg-surface shadow-lg flex gap-1.5 z-50">
          {colorOptions.map((c) => (
            <button
              key={c.key}
              onClick={() => {
                setAccentColor(c.key)
                setOpen(false)
              }}
              className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer ${
                accentColor === c.key
                  ? 'border-white scale-110 ring-2 ring-accent/50'
                  : 'border-border-light hover:scale-110'
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.key}
            />
          ))}
        </div>
      )}
    </div>
  )
}