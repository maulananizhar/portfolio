import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type ThemeMode = 'system' | 'dark' | 'light'
export type AccentColor = 'blue' | 'red' | 'green' | 'yellow' | 'purple'

interface ThemeContextType {
  mode: ThemeMode
  cycle: () => void
  accentColor: AccentColor
  setAccentColor: (color: AccentColor) => void
}

const accentPalette: Record<AccentColor, string> = {
  blue: '#0E7490',
  red: '#DC2626',
  green: '#059669',
  yellow: '#D97706',
  purple: '#7C3AED',
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

function applyAccent(color: AccentColor, isDark: boolean) {
  const hex = accentPalette[color]
  const root = document.documentElement
  root.style.setProperty('--theme-accent', hex)
  root.style.setProperty('--theme-accent-dim', hexToRgba(hex, isDark ? 0.3 : 0.25))
  root.style.setProperty('--theme-accent-subtle', hexToRgba(hex, isDark ? 0.1 : 0.08))
  root.style.setProperty('--theme-border', hexToRgba(hex, isDark ? 0.25 : 0.2))
  root.style.setProperty('--theme-border-light', hexToRgba(hex, isDark ? 0.12 : 0.1))
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  cycle: () => {},
  accentColor: 'blue',
  setAccentColor: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved
    return 'system'
  })

  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accent-color')
    if (saved === 'blue' || saved === 'red' || saved === 'green' || saved === 'yellow' || saved === 'purple') return saved
    return 'blue'
  })

  const isDark =
    mode === 'dark' ||
    (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')

    if (mode === 'dark') {
      root.classList.add('dark')
    } else if (mode === 'light') {
      root.classList.add('light')
    }

    localStorage.setItem('theme-mode', mode)
  }, [mode])

  useEffect(() => {
    applyAccent(accentColor, isDark)
    localStorage.setItem('accent-color', accentColor)
  }, [accentColor, isDark])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      if (mode === 'system') {
        applyAccent(accentColor, mq.matches)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode, accentColor])

  const cycle = () => {
    setMode((prev) => {
      if (prev === 'system' || prev === 'dark') return 'light'
      return 'dark'
    })
  }

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color)
  }

  return (
    <ThemeContext.Provider value={{ mode, cycle, accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
