import { MapPin, Target, BookOpen } from 'lucide-react'
import StatusDot from '../ui/StatusDot'
import { profile } from '../../data/profile'

export default function BioSection() {
  return (
    <section>
      <div className="border border-border bg-surface p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
          <StatusDot active />
          <span className="tracking-wider uppercase">About</span>
        </div>

        <div className="flex items-start gap-5 mb-4">
          <img
            src="https://avatars.githubusercontent.com/u/114682946?v=4"
            alt={profile.name}
            className="w-20 h-20 rounded-full border-2 border-border object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-text mb-1">{profile.name}</h1>
            <p className="text-sm text-accent tracking-wider uppercase">{profile.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-text-secondary mb-6">
          <MapPin size={12} />
          <span>{profile.location}</span>
        </div>

        <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
          {profile.longBio.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="border border-border bg-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-accent" />
            <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">Goals</span>
          </div>
          <ul className="space-y-2">
            {profile.goals.map((goal, i) => (
              <li key={i} className="text-xs text-text-secondary flex gap-2">
                <span className="text-accent mt-0.5">&rarr;</span>
                {goal}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-border bg-surface p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-accent" />
            <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">Philosophy</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{profile.philosophy}</p>
        </div>
      </div>
    </section>
  )
}
