import SectionHeading from '../components/ui/SectionHeading'
import ProjectCard from '../components/projects/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="border border-border bg-surface p-6 mb-6">
        <SectionHeading>Projects</SectionHeading>
        <p className="text-xs text-text-secondary mt-2">
          Open-source tools and applications I've built or contributed to.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  )
}
