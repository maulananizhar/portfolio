import { Monitor } from 'lucide-react'
import { deskSetup } from '../../data/uses'

export default function DeskSetup() {
  return (
    <div className="border border-border bg-surface p-5">
      <div className="flex items-center gap-2 mb-3">
        <Monitor size={16} className="text-accent" />
        <span className="text-xs tracking-[0.2em] uppercase text-text-secondary">Desk Setup</span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{deskSetup.description}</p>
      <p className="text-xs text-text mt-2">
        <span className="text-text-tertiary">Desk: </span>
        {deskSetup.desk}
      </p>
    </div>
  )
}
