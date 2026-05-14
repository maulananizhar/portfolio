import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import SectionHeading from '../ui/SectionHeading'
import { projects } from '../../data/projects'

export default function RecentProjects() {
  const navigate = useNavigate()
  const recent = projects.slice(0, 3)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <SectionHeading>Recent Projects</SectionHeading>
        <Button variant="ghost" onClick={() => navigate('/projects')}>
          <span className="text-xs">View All</span>
          <ArrowUpRight size={12} />
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {recent.map((project) => (
          <Card key={project.title} hover className="p-4 flex flex-col">
            <div className="w-full h-28 border border-border-light overflow-hidden mb-3">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-bold text-text mb-1">{project.title}</h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-3 flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
