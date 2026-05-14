import SectionHeading from '../components/ui/SectionHeading'
import TimelineItem from '../components/experiences/TimelineItem'
import { experiences } from '../data/experiences'

export default function Experiences() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="border border-border bg-surface p-6 mb-6">
        <SectionHeading>Experience</SectionHeading>
        <p className="text-xs text-text-secondary mt-2">
          Professional background spanning full-stack engineering, architecture, and freelance work.
        </p>
      </div>

      <div className="space-y-0">
        {experiences.map((exp, i) => (
          <TimelineItem key={i} experience={exp} isLast={i === experiences.length - 1} />
        ))}
      </div>
    </div>
  )
}
