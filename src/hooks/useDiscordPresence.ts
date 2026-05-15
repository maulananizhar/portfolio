import { useState, useEffect, useRef } from 'react'
import { fetchDiscordPresence } from '../services/discord'
import type { DiscordPresence } from '../services/discord'

const USER_ID = import.meta.env.VITE_DISCORD_USER_ID

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
      if (!USER_ID) {
        if (!cancelled) setState({ presence: null, loading: false })
        return
      }

      try {
        const presence = await fetchDiscordPresence(USER_ID)
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
