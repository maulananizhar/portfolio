import { Github, Linkedin, Instagram, Mail } from 'lucide-react'
import { profile } from '../../data/profile'

const links = [
  { label: 'GitHub', icon: Github, url: profile.github },
  { label: 'LinkedIn', icon: Linkedin, url: profile.linkedin },
  { label: 'Instagram', icon: Instagram, url: profile.instagram },
  { label: 'Email', icon: Mail, url: `mailto:${profile.email}` },
]

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-2">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 text-xs border border-border text-text-secondary hover:text-text hover:border-accent transition-colors"
        >
          <link.icon size={14} />
          <span className="tracking-wider uppercase">{link.label}</span>
        </a>
      ))}
    </div>
  )
}
