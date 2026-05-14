import Card from '../ui/Card'
import StatusDot from '../ui/StatusDot'
import SectionHeading from '../ui/SectionHeading'
import ContributionGraph from './ContributionGraph'
import { useCodingStats } from '../../hooks/useCodingStats'

const skeleton = [
  { label: 'Coding Hours', w: 'w-20' },
  { label: 'Commits', w: 'w-16' },
  { label: 'Top Language', w: 'w-24' },
  { label: 'Current Focus', w: 'w-28' },
]

export default function CodingActivity() {
  const { codingHours, commits, topLanguage, currentFocus, contributions, loading } = useCodingStats()

  const activities = [
    { label: 'Coding Hours', value: codingHours, subtitle: 'This year (WakaTime)' },
    { label: 'Commits', value: commits, subtitle: 'Last 12 months (GitLab)' },
    { label: 'Top Language', value: topLanguage, subtitle: 'Most used language' },
    { label: 'Current Focus', value: currentFocus, subtitle: 'Active project' },
  ] as const

  return (
    <section>
      <SectionHeading className="mb-4">Coding Activity</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {loading
          ? skeleton.map(item => (
              <Card key={item.label} className="p-4 animate-pulse">
                <div className="h-3 bg-[#e5e7eb] dark:bg-[#2a2a3e] rounded w-24 mb-3" />
                <div className={`h-5 bg-[#e5e7eb] dark:bg-[#2a2a3e] rounded ${item.w} mb-1`} />
                <div className="h-3 bg-[#e5e7eb] dark:bg-[#2a2a3e] rounded w-20" />
              </Card>
            ))
          : activities.map(item => (
              <Card key={item.label} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <StatusDot active />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">{item.label}</span>
                </div>
                <p className="text-lg font-bold text-text mb-0.5">{item.value}</p>
                <p className="text-xs text-text-secondary">{item.subtitle}</p>
              </Card>
            ))}
      </div>
      {!loading && contributions.length > 0 && <ContributionGraph data={contributions} />}
    </section>
  )
}
