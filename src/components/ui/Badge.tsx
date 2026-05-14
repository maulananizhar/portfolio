interface BadgeProps {
  children: string
  variant?: 'default' | 'accent'
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const base = 'inline-block px-2 py-0.5 text-xs font-mono uppercase tracking-wider border'

  const variants = {
    default: 'border-border text-text-secondary',
    accent: 'border-accent text-accent',
  }

  return <span className={`${base} ${variants[variant]}`}>{children}</span>
}
