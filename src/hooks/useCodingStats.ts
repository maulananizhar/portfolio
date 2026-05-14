import { useState, useEffect } from 'react'
import { fetchCodingStats } from '../services/codingStats'
import type { CodingStatsResult } from '../services/codingStats'

interface CodingStatsState extends CodingStatsResult {
  loading: boolean
  error: string | null
}

export function useCodingStats() {
  const [state, setState] = useState<CodingStatsState>({
    codingHours: '0 hrs',
    commits: '0',
    topLanguage: 'N/A',
    currentFocus: 'Not tracking',
    contributions: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetchCodingStats()
        if (!cancelled) {
          setState(prev => ({ ...prev, ...data, loading: false }))
        }
      } catch (err) {
        if (!cancelled) {
          setState(prev => ({
            ...prev,
            error: err instanceof Error ? err.message : 'Failed to fetch stats',
            loading: false,
          }))
        }
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return state
}
