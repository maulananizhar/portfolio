export interface ProfileData {
  name: string
  role: string
  location: string
  email: string
  github: string
  linkedin: string
  twitter?: string
  instagram?: string
  shortBio: string
  longBio: string
  goals: string[]
  philosophy: string
}

export interface ContributionDay {
  date: string
  count: number
}



export interface SkillCategory {
  title: string
  items: string[]
}

export interface Experience {
  title: string
  company: string
  duration: string
  location: string
  responsibilities: string[]
  technologies: string[]
}

export interface Project {
  title: string
  description: string
  stack: string[]
  liveUrl?: string
  githubUrl: string
  thumbnail?: string
}

export interface PostFrontmatter {
  title: string
  date: string
  excerpt: string
  thumbnail?: string
  tags?: string[]
}

export interface PostData {
  slug: string
  frontmatter: PostFrontmatter
  Component: React.ComponentType
}

export interface SetupItem {
  name: string
  specs: string
  description: string
}
