import SectionHeading from '../ui/SectionHeading'
import { skillCategories } from '../../data/skills'

export default function SkillsGrid() {
  return (
    <section>
      <SectionHeading className="mb-4">Tech Stack</SectionHeading>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {skillCategories.map((category) => (
          <div key={category.title} className="border border-border bg-surface p-4">
            <span className="text-[10px] tracking-[0.2em] uppercase text-accent block mb-3">{category.title}</span>
            <div className="flex flex-wrap gap-1.5">
              {category.items.map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 text-xs border border-border-light text-text-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
