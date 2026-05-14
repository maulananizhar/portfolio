import SectionHeading from '../components/ui/SectionHeading'
import DeskSetup from '../components/uses/DeskSetup'
import HardwareCard from '../components/uses/HardwareCard'
import SoftwareCard from '../components/uses/SoftwareCard'
import DevToolsCard from '../components/uses/DevToolsCard'
import { hardware, software, devTools } from '../data/uses'

export default function Uses() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <div className="border border-border bg-surface p-6">
        <SectionHeading>Uses</SectionHeading>
        <p className="text-xs text-text-secondary mt-2">
          My current development setup, tools, and hardware.
        </p>
      </div>

      <section>
        <SectionHeading className="mb-4">Desk Setup</SectionHeading>
        <DeskSetup />
      </section>

      <section>
        <SectionHeading className="mb-4">Hardware</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {hardware.map((item) => (
            <HardwareCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading className="mb-4">Software</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3">
          {software.map((item) => (
            <SoftwareCard key={item.name} item={item} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading className="mb-4">Developer Tools</SectionHeading>
        <div className="grid sm:grid-cols-2 gap-3">
          {devTools.map((item) => (
            <DevToolsCard key={item.name} item={item} />
          ))}
        </div>
      </section>
    </div>
  )
}
