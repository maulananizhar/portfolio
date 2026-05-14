import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

function loadEnv() {
  const envPath = resolve(root, '.env')
  if (!existsSync(envPath)) return
  const content = readFileSync(envPath, 'utf-8')
  for (const line of content.split('\n')) {
    const trimmed = line.replace(/\r$/, '').trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
}
loadEnv()

const GITLAB_USERNAME = 'maulananizhar'
const GITLAB_TOKEN = process.env.GITLAB_ACCESS_TOKEN || ''
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY || ''

interface ContributionDay {
  date: string
  count: number
}

interface CodingActivityData {
  codingHours: string
  commits: string
  topLanguage: string
  currentFocus: string
  contributions: ContributionDay[]
  fetchedAt: string
}

interface GitLabEvent {
  created_at: string
  action_name: string
  push_data: {
    commit_count: number
    ref: string
  }
}

function base64(str: string): string {
  return Buffer.from(str).toString('base64')
}

async function fetchWakaTime() {
  const url = 'https://wakatime.com/api/v1/users/current/stats/last_year'
  const res = await fetch(url, {
    headers: { Authorization: `Basic ${base64(`${WAKATIME_API_KEY}:`)}` },
  })
  if (!res.ok) throw new Error(`WakaTime ${res.status}`)
  const json = await res.json()
  return json
}

async function fetchGitLabUser() {
  const url = `https://gitlab.com/api/v4/users?username=${GITLAB_USERNAME}`
  const res = await fetch(url, {
    headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN },
  })
  if (!res.ok) throw new Error(`GitLab user ${res.status}`)
  const users = await res.json() as { id: number; name: string }[]
  if (!users?.length) throw new Error('User not found')
  return users[0]
}

async function fetchAllGitLabEvents(userId: number) {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  const after = oneYearAgo.toISOString().split('T')[0]

  let page = 1
  let totalCommits = 0
  const dailyCounts = new Map<string, number>()

  while (true) {
    const url = `https://gitlab.com/api/v4/users/${userId}/events?action=pushed&per_page=100&page=${page}&after=${after}`
    const res = await fetch(url, {
      headers: { 'PRIVATE-TOKEN': GITLAB_TOKEN },
    })
    if (!res.ok) throw new Error(`GitLab events ${res.status}`)

    const events = await res.json() as GitLabEvent[]
    if (!events.length) break

    for (const event of events) {
      const date = event.created_at?.split('T')[0]
      const count = event.push_data?.commit_count || 1

      if (date && date >= after) {
        totalCommits += count
        dailyCounts.set(date, (dailyCounts.get(date) || 0) + count)
      }
    }

    const totalPages = res.headers.get('X-Total-Pages')
    if (!totalPages || page >= Number(totalPages)) break
    page++
  }

  const contributions: ContributionDay[] = []
  for (const [date, count] of dailyCounts) {
    contributions.push({ date, count })
  }
  contributions.sort((a, b) => a.date.localeCompare(b.date))

  return { totalCommits, contributions }
}

function formatHours(raw: string): string {
  return raw
    .replace(/ hrs?/g, 'h')
    .replace(/ mins?/g, 'm')
    .split(/[,.]/)[0]
    .trim()
}

async function main() {
  const data: CodingActivityData = {
    codingHours: '0 hrs',
    commits: '0',
    topLanguage: 'N/A',
    currentFocus: 'Not tracking',
    contributions: [],
    fetchedAt: new Date().toISOString(),
  }

  if (WAKATIME_API_KEY) {
    try {
      const waka = await fetchWakaTime()
      const d = waka?.data
      if (d) {
        if (d.human_readable_total) {
          data.codingHours = formatHours(d.human_readable_total)
        }
        if (d.languages?.length) {
          data.topLanguage = d.languages[0].name
        }
        if (d.projects?.length) {
          data.currentFocus = d.projects[0].name
        }
      }
      console.log('✓ WakaTime data fetched')
    } catch (e) {
      console.warn('⚠ WakaTime fetch failed:', e instanceof Error ? e.message : e)
    }
  } else {
    console.warn('⚠ WAKATIME_API_KEY not set, skipping')
  }

  if (GITLAB_TOKEN) {
    try {
      const user = await fetchGitLabUser()
      console.log(`✓ GitLab user found: ${user.name} (id=${user.id})`)

      const { totalCommits, contributions } = await fetchAllGitLabEvents(user.id)
      data.commits = totalCommits.toLocaleString()
      data.contributions = contributions

      console.log(`✓ GitLab events: ${totalCommits} commits in 12 months`)
    } catch (e) {
      console.warn('⚠ GitLab fetch failed:', e instanceof Error ? e.message : e)
    }
  } else {
    console.warn('⚠ GITLAB_ACCESS_TOKEN not set, skipping')
  }

  const outPath = resolve(root, 'src', 'data', 'coding-activity.json')
  writeFileSync(outPath, JSON.stringify(data, null, 2))
  console.log(`✓ Coding activity data saved to src/data/coding-activity.json`)
}

main().catch((e) => {
  console.error('Fatal error:', e)
  process.exit(1)
})
