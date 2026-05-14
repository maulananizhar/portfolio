import type { PostData } from '../types'

const modules = import.meta.glob('/src/content/blog/*.mdx', { eager: true })

export function useMdxPosts(): PostData[] {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.split('/').pop()?.replace('.mdx', '') ?? ''
      const { frontmatter, default: Component } = mod as {
        frontmatter: PostData['frontmatter']
        default: PostData['Component']
      }
      return { slug, frontmatter, Component }
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    )
}

export function useMdxPost(slug: string): PostData | undefined {
  return useMdxPosts().find((p) => p.slug === slug)
}
