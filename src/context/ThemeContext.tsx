import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type ThemeMode = 'system' | 'dark' | 'light'

interface ThemeContextType {
  mode: ThemeMode
  cycle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  cycle: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode')
    if (saved === 'dark' || saved === 'light' || saved === 'system') return saved
    return 'system'
  })

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

  const cycle = () => {
    setMode((prev) => {
      if (prev === 'system' || prev === 'dark') return 'light'
      return 'dark'
    })
  }

  return (
    <ThemeContext.Provider value={{ mode, cycle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
