import axios from 'axios'
import type { ContributionDay } from '../types'

const GITLAB_USERNAME = 'maulananizhar'
const GITHUB_USERNAME = 'maulananizhar'

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

interface GitHubDay {
  date: string
  contributionCount: number
}

interface GitHubWeek {
  contributionDays: GitHubDay[]
}

async function fetchGitHubContributions(since: string, until: string): Promise<GitHubDay[]> {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `
  const { data } = await axios.post('/api/github/graphql', {
    query,
    variables: {
      username: GITHUB_USERNAME,
      from: `${since}T00:00:00Z`,
      to: `${until}T23:59:59Z`,
    },
  })

  const weeks: GitHubWeek[] = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
  return weeks.flatMap(w => w.contributionDays)
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

  const dailyMap = new Map<string, number>()

  try {
    const user = await fetchGitLabUser()
    const events = await fetchGitLabEvents(user.id, after)

    for (const event of events) {
      const date = event.created_at?.split('T')[0]
      if (date) {
        dailyMap.set(date, (dailyMap.get(date) || 0) + 1)
      }
    }
  } catch {
    // GitLab API failed
  }

  try {
    const todayStr = new Date().toISOString().split('T')[0]
    const ghDays = await fetchGitHubContributions(after, todayStr)
    for (const day of ghDays) {
      dailyMap.set(day.date, (dailyMap.get(day.date) || 0) + day.contributionCount)
    }
  } catch {
    // GitHub API failed
  }

  const totalCommits = Array.from(dailyMap.values()).reduce((sum, c) => sum + c, 0)
  result.commits = totalCommits.toLocaleString()
  result.contributions = Array.from(dailyMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return result
}
