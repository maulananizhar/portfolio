import Card from '../ui/Card'
import StatusDot from '../ui/StatusDot'
import type { SetupItem } from '../../types'

interface HardwareCardProps {
  item: SetupItem
}

export default function HardwareCard({ item }: HardwareCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-2">
        <StatusDot active />
        <span className="text-xs font-bold text-text">{item.name}</span>
      </div>
      <p className="text-[11px] text-accent mb-1">{item.specs}</p>
      <p className="text-xs text-text-secondary">{item.description}</p>
    </Card>
  )
}
