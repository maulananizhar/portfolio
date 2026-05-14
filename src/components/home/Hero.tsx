import { ArrowUpRight, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../ui/Button'
import StatusDot from '../ui/StatusDot'
import { profile } from '../../data/profile'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="border border-border bg-surface p-6 md:p-8">
      <div className="flex flex-col md:flex-row items-start gap-6">
        <div className="w-20 h-20 md:w-24 md:h-24 border border-accent/50 flex-shrink-0 overflow-hidden">
          <img
            src="https://avatars.githubusercontent.com/u/114682946?v=4"
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <StatusDot active />
            <span className="text-xs text-text-secondary tracking-wider uppercase">Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-text mb-1">{profile.name}</h1>
          <p className="text-sm text-accent font-mono tracking-wider uppercase mb-3">{profile.role}</p>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">{profile.shortBio}</p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary" onClick={() => navigate('/projects')}>
              <span>View Projects</span>
              <ArrowUpRight size={14} />
            </Button>
            <Button variant="outline" onClick={() => window.location.href = `mailto:${profile.email}`}>
              <Mail size={14} />
              <span>Contact</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
