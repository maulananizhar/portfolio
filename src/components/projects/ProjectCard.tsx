import { ExternalLink, Github } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import type { Project } from '../../types'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="h-36 border-b border-border-light overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-text mb-2">{project.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-4 flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.stack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.liveUrl && (
            <Button variant="primary" href={project.liveUrl}>
              <ExternalLink size={12} />
              <span>Demo</span>
            </Button>
          )}
          <Button variant="outline" href={project.githubUrl}>
            <Github size={12} />
            <span>Source</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
