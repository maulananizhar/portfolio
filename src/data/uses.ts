import type { SetupItem } from '../types'

export const deskSetup = {
  description:
    'My desk is a vintage Singer sewing machine table — sturdy, characterful, and the perfect fit for my workflow. No external monitor or additional keyboard; just the essentials.',
  desk: 'Singer Sewing Machine Desk',
}

export const hardware: SetupItem[] = [
  {
    name: 'Advan WorkPlus',
    specs: 'Ryzen 5 6600H · 16GB RAM · 512GB NVMe M.2',
    description: 'Primary development machine running Windows 11.',
  },
  {
    name: 'Fantech Raigor III WG12R',
    specs: '6-button · 3200 DPI · USB-A',
    description: 'Reliable wired mouse for daily use.',
  },
  {
    name: 'Fantech HQ50',
    specs: 'Over-ear · 3.5mm · RGB',
    description: 'Comfortable wired earphones for focus and calls.',
  },
]

export const software: SetupItem[] = [
  {
    name: 'VS Code',
    specs: 'Theme: One Dark Pro · Font: JetBrains Mono',
    description: 'Primary editor for all development work.',
  },
  {
    name: 'Windows Terminal + Oh My Posh',
    specs: 'PowerShell · Custom prompt · Git integration',
    description: 'Terminal setup with a personalized prompt theme.',
  },
  {
    name: 'Brave',
    specs: 'Chromium-based · Built-in ad blocker · Shields',
    description: 'Daily driver browser with privacy-first features.',
  },
  {
    name: 'Opencode',
    specs: 'AI-assisted · Terminal-first · CLI native',
    description: 'Coding assistant integrated directly in the terminal.',
  },
]

export const devTools: SetupItem[] = [
  {
    name: 'Postman',
    specs: 'API client · Collections · Environments',
    description: 'API development and testing with environment management.',
  },
  {
    name: 'GitKraken',
    specs: 'Git GUI · Gloo · Merge conflict editor',
    description: 'Visual Git client for repository management.',
  },
  {
    name: 'Figma',
    specs: 'Design · Prototyping · Dev Mode',
    description: 'Collaborative design tool for UI mockups and design systems.',
  },
  {
    name: 'LTL',
    specs: 'Company collaboration platform',
    description: 'Internal team collaboration and project management tool.',
  },
]
