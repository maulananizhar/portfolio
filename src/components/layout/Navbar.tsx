import { NavLink } from 'react-router-dom'
import { Terminal } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const tabs = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Experiences', path: '/experiences' },
  { label: 'Projects', path: '/projects' },
  { label: 'Uses', path: '/uses' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/95 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-text font-bold tracking-wider uppercase text-sm">
          <Terminal size={18} className="text-accent" />
          <span>Nizhar</span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 text-xs tracking-widest uppercase border transition-colors ${
                  isActive
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-transparent text-text-secondary hover:text-text hover:border-border'
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="md:hidden border border-border-light p-2 text-text-secondary cursor-pointer">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="4" x2="14" y2="4" />
              <line x1="2" y1="8" x2="14" y2="8" />
              <line x1="2" y1="12" x2="14" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
