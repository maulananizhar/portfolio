import { useState, useEffect, useRef } from 'react'
import { fetchDiscordPresence } from '../services/discord'
import type { DiscordPresence } from '../services/discord'

interface DiscordState {
  presence: DiscordPresence | null
  loading: boolean
}

export function useDiscordPresence() {
  const [state, setState] = useState<DiscordState>({
    presence: null,
    loading: true,
  })

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const presence = await fetchDiscordPresence()
        if (!cancelled) setState({ presence, loading: false })
      } catch {
        if (!cancelled) setState(prev => ({ ...prev, loading: false }))
      }
    }

    load()
    intervalRef.current = setInterval(load, 30_000)

    return () => {
      cancelled = true
      clearInterval(intervalRef.current)
    }
  }, [])

  return state
}
