import { useState, useEffect } from 'react'
import { fetchContributions } from '../services/codingStats'
import type { ContributionDay } from '../types'

export function useContributions(yearOffset: number) {
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      try {
        const data = await fetchContributions(yearOffset)
        if (!cancelled) {
          setContributions(data)
          setLoading(false)
        }
      } catch {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [yearOffset])

  return { contributions, loading }
}
