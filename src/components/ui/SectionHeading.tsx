interface SectionHeadingProps {
  children: string
  className?: string
}

export default function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-lg font-bold tracking-[0.15em] uppercase text-text ${className}`}>
      {children}
    </h2>
  )
}
