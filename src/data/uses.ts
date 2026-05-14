import type { SetupItem } from '../types'

export const deskSetup = {
  description:
    'Standing desk setup with a focus on ergonomics and clean cable management. Dual monitor arm setup with a laptop stand to keep everything at eye level.',
  desk: 'Jarvis Bamboo Standing Desk (72" x 30")',
}

export const hardware: SetupItem[] = [
  {
    name: 'MacBook Pro 16" M3 Pro',
    specs: 'M3 Pro chip · 18GB RAM · 512GB SSD',
    description: 'Primary development machine running macOS Sequoia.',
  },
  {
    name: 'LG 27" 4K Display',
    specs: '27" IPS · 3840x2160 · 60Hz · USB-C',
    description: 'Main monitor for code editing and documentation.',
  },
  {
    name: 'Keychron Q1 Pro',
    specs: '75% layout · Gateron G Pro Brown · QMK/VIA',
    description: 'Custom mechanical keyboard with hot-swappable switches.',
  },
  {
    name: 'Logitech MX Master 3S',
    specs: '8K DPI · USB-C · 70-day battery',
    description: 'Ergonomic vertical mouse with customizable gestures.',
  },
  {
    name: 'AirPods Pro 2',
    specs: 'ANC · USB-C · Adaptive Audio',
    description: 'Noise-canceling earbuds for focus and calls.',
  },
]

export const software: SetupItem[] = [
  {
    name: 'VS Code',
    specs: 'Theme: One Dark Pro · Font: JetBrains Mono 14px',
    description: 'Primary editor with custom keybindings and 20+ extensions.',
  },
  {
    name: 'Neovim',
    specs: 'LazyVim · Lua config · Mason LSP',
    description: 'Secondary editor for quick edits and terminal-based workflows.',
  },
  {
    name: 'Warp',
    specs: 'GPU-accelerated · AI suggestions · Blocks',
    description: 'Modern terminal with intelligent autocomplete and workflow blocks.',
  },
  {
    name: 'Arc Browser',
    specs: 'Chrome-based · Split View · Spaces',
    description: 'Daily driver browser with organized profiles and split tabs.',
  },
]

export const devTools: SetupItem[] = [
  {
    name: 'Linear',
    specs: 'Issue tracking · Cycle planning · Integrations',
    description: 'Project management and issue tracking for engineering teams.',
  },
  {
    name: 'Figma',
    specs: 'Design · Prototyping · Dev Mode',
    description: 'Collaborative design tool for UI mockups and design systems.',
  },
  {
    name: 'Postman',
    specs: 'API client · Collections · Environments',
    description: 'API development and testing with environment management.',
  },
  {
    name: 'Raycast',
    specs: 'Launcher · Extensions · Quick Actions',
    description: 'macOS productivity launcher replacing Spotlight and Alfred.',
  },
]
