import type { SkillCategory } from '../types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'SQL', 'Kotlin', 'Java', 'C#', 'PHP', 'Python'],
  },
  {
    title: 'Frameworks',
    items: ['Node.js', 'React.js', 'Next.js', 'NestJS', 'Express.js', 'Laravel', 'Tailwind CSS'],
  },
  {
    title: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Prisma ORM'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Vercel'],
  },
  {
    title: 'Tools',
    items: ['Visual Studio Code', 'Git', 'GitHub', 'GitLab', 'Bash', 'Figma', 'Postman'],
  },
]

export const currentlyLearning: string[] = [
  'Machine learning for my undergraduate thesis',
  'Kubernetes in production environments',
  'Advanced TypeScript patterns and best practices',
  'Mobile development with Kotlin',
]
