/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISCORD_USER_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mdx' {
  import type { ComponentType } from 'react'
  export const frontmatter: {
    title: string
    date: string
    excerpt: string
    thumbnail?: string
    tags?: string[]
  }
  const Component: ComponentType
  export default Component
}
