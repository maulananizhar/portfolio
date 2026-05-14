import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'outline' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
}

export default function Button({ children, variant = 'primary', href, onClick, className = '' }: ButtonProps) {
  const base = 'inline-flex items-center gap-2 px-4 py-2 text-sm font-mono tracking-wide uppercase transition-colors cursor-pointer'

  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/80 border border-accent',
    outline: 'border border-accent text-accent hover:bg-accent hover:text-white',
    ghost: 'text-text-secondary hover:text-text border border-transparent hover:border-border',
  }

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
