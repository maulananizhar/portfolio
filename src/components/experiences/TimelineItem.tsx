import Badge from '../ui/Badge'
import StatusDot from '../ui/StatusDot'
import type { Experience } from '../../types'

interface TimelineItemProps {
  experience: Experience
  isLast: boolean
}

export default function TimelineItem({ experience, isLast }: TimelineItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <StatusDot active />
        {!isLast && <div className="w-px flex-1 bg-border-light mt-2" />}
      </div>

      <div className={`flex-1 pb-${isLast ? '0' : '8'}`}>
        <div className="border border-border bg-surface p-5 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
            <div>
              <h3 className="text-sm font-bold text-text">{experience.title}</h3>
              <p className="text-xs text-accent">{experience.company}</p>
            </div>
            <div className="text-[11px] text-text-tertiary">{experience.duration}</div>
          </div>

          <ul className="space-y-1.5 mb-3">
            {experience.responsibilities.map((item, i) => (
              <li key={i} className="text-xs text-text-secondary flex gap-2">
                <span className="text-accent mt-0.5">&rarr;</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {experience.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
