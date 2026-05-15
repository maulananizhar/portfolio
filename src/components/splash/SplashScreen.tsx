import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'lucide-react'

const accentPalette: Record<string, string> = {
  blue: '#0E7490',
  red: '#DC2626',
  green: '#059669',
  yellow: '#D97706',
  purple: '#7C3AED',
}

function getAccentColor(): string {
  if (typeof window === 'undefined') return '#0E7490'
  const saved = localStorage.getItem('accent-color')
  if (saved && accentPalette[saved]) return accentPalette[saved]
  return '#0E7490'
}

interface SplashScreenProps {
  onFinish: () => void
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [accent] = useState(getAccentColor)
  const [showText, setShowText] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [phase, setPhase] = useState<'logo-in' | 'typing' | 'erasing' | 'logo-out' | 'done'>('logo-in')
  const fullText = 'Nizhar Maulana'
  const logoRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    let charIndex = 0
    let typeInterval: ReturnType<typeof setInterval> | undefined

    const textTimer = setTimeout(() => {
      setShowText(true)
      setPhase('typing')

      typeInterval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypedText(fullText.slice(0, charIndex + 1))
          charIndex++
        } else {
          clearInterval(typeInterval)
          setTimeout(() => {
            setPhase('erasing')
          }, 500)
        }
      }, 60)
    }, 600)

    return () => {
      clearTimeout(textTimer)
      if (typeInterval) clearInterval(typeInterval)
    }
  }, [])

  useEffect(() => {
    if (phase !== 'erasing') return

    let charIndex = fullText.length
    const eraseInterval = setInterval(() => {
      if (charIndex > 0) {
        charIndex--
        setTypedText(fullText.slice(0, charIndex))
      } else {
        clearInterval(eraseInterval)
        setTimeout(() => {
          setPhase('logo-out')
          setTimeout(() => {
            setPhase('done')
            onFinish()
          }, 500)
        }, 200)
      }
    }, 30)

    return () => clearInterval(eraseInterval)
  }, [phase, onFinish, fullText])

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg">
      <Terminal
        ref={logoRef}
        size={64}
        style={{
          color: accent,
          transform: phase === 'logo-out' ? 'scale(0)' : phase === 'logo-in' ? undefined : 'scale(1)',
          transition: phase === 'logo-out' ? 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : undefined,
        }}
        className={phase === 'logo-in' ? 'animate-boot-logo' : ''}
      />
      <div className="h-8 mt-6">
        {showText && (
          <span className="text-xl font-bold tracking-widest uppercase text-text">
            {typedText}
            {phase === 'typing' && (
              <span style={{ color: accent }} className="animate-blink">|</span>
            )}
          </span>
        )}
      </div>
    </div>
  )
}
