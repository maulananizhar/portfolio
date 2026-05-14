import { BookOpen } from 'lucide-react'
import StatusDot from '../ui/StatusDot'
import SectionHeading from '../ui/SectionHeading'
import { currentlyLearning } from '../../data/skills'

export default function CurrentlyLearning() {
  return (
    <section>
      <SectionHeading className="mb-4">Currently Learning</SectionHeading>
      <div className="border border-border bg-surface p-5">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen size={16} className="text-accent" />
          <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">In Progress</span>
          <StatusDot active />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {currentlyLearning.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-text-secondary border border-border-light p-3">
              <span className="text-accent text-sm">&rarr;</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
