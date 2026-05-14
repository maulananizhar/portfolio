import axios from 'axios'
import type { ContributionDay } from '../types'

const GITLAB_USERNAME = 'maulananizhar'

export interface CodingStatsResult {
  codingHours: string
  commits: string
  topLanguage: string
  currentFocus: string
  contributions: ContributionDay[]
}

interface GitLabUser {
  id: number
  name: string
  username: string
}

interface GitLabEvent {
  created_at: string
  action_name: string
  push_data: {
    commit_count: number
    ref: string
  }
}

async function fetchGitLabUser(): Promise<GitLabUser> {
  const { data } = await axios.get('/api/gitlab/users', {
    params: { username: GITLAB_USERNAME },
  })
  if (!data?.length) throw new Error('GitLab user not found')
  return data[0]
}

async function fetchGitLabEvents(userId: number, after: string): Promise<GitLabEvent[]> {
  const first = await axios.get(`/api/gitlab/users/${userId}/events`, {
    params: { action: 'pushed', per_page: 100, page: 1, after },
  })

  const totalPages = parseInt(first.headers['x-total-pages'] || '1')
  const events: GitLabEvent[] = [...first.data]

  if (totalPages > 1) {
    const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
    const remaining = await Promise.all(
      pages.map(page =>
        axios.get(`/api/gitlab/users/${userId}/events`, {
          params: { action: 'pushed', per_page: 100, page, after },
        })
      )
    )
    remaining.forEach(r => events.push(...r.data))
  }

  return events
}

async function fetchWakaTime() {
  const { data } = await axios.get('/api/wakatime/users/current/stats/last_year')
  return data.data
}

export async function fetchCodingStats(): Promise<CodingStatsResult> {
  const result: CodingStatsResult = {
    codingHours: '0 hrs',
    commits: '0',
    topLanguage: 'N/A',
    currentFocus: 'Not tracking',
    contributions: [],
  }

  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const after = oneYearAgo.toISOString().split('T')[0]

  try {
    const waka = await fetchWakaTime()
    if (waka?.human_readable_total) {
      result.codingHours = waka.human_readable_total
        .replace(/ hrs?/g, 'h')
        .replace(/ mins?/g, 'm')
    }
    if (waka?.languages?.length) {
      result.topLanguage = waka.languages[0].name
    }
    if (waka?.projects?.length) {
      result.currentFocus = waka.projects[0].name
    }
  } catch {
    // WakaTime not configured
  }

  try {
    const user = await fetchGitLabUser()
    const events = await fetchGitLabEvents(user.id, after)

    let totalCommits = 0
    const dailyMap = new Map<string, number>()

    for (const event of events) {
      const date = event.created_at?.split('T')[0]
      const count = event.push_data?.commit_count || 1
      if (date) {
        totalCommits += count
        dailyMap.set(date, (dailyMap.get(date) || 0) + count)
      }
    }

    result.commits = totalCommits.toLocaleString()
    result.contributions = Array.from(dailyMap.entries())
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
  } catch {
    // GitLab API failed
  }

  return result
}
