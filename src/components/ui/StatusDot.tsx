interface StatusDotProps {
  active?: boolean
  className?: string
}

export default function StatusDot({ active = true, className = '' }: StatusDotProps) {
  return (
    <span
      className={`inline-block w-2 h-2 ${active ? 'bg-status-active' : 'bg-status-idle'} ${className}`}
    />
  )
}
