import type { Project } from '../types'

const colors = [
  { bg: '#0E7490', text: '#ffffff' },
  { bg: '#1D4ED8', text: '#ffffff' },
  { bg: '#7C3AED', text: '#ffffff' },
  { bg: '#059669', text: '#ffffff' },
  { bg: '#D97706', text: '#ffffff' },
  { bg: '#DC2626', text: '#ffffff' },
  { bg: '#DB2777', text: '#ffffff' },
  { bg: '#D4A017', text: '#000000' },
  { bg: '#4F46E5', text: '#ffffff' },
  { bg: '#65A30D', text: '#ffffff' },
  { bg: '#CA8A04', text: '#000000' },
]

function svgThumbnail(index: number, title: string, pattern: string): string {
  const c = colors[index % colors.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225">
    <rect width="400" height="225" fill="${c.bg}"/>
    <text x="200" y="110" text-anchor="middle" fill="${c.text}" font-family="system-ui" font-weight="700" font-size="48">${pattern}</text>
    <text x="200" y="150" text-anchor="middle" fill="${c.text}" opacity="0.6" font-family="system-ui" font-size="14">${title}</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const projects: Project[] = [
  {
    title: 'website',
    description: 'My personal website built with Next.js and Tailwind CSS.',
    stack: ['TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
    thumbnail: svgThumbnail(0, 'website', 'W'),
    liveUrl: 'https://maulananizhar.my.id',
    githubUrl: 'https://github.com/maulananizhar/website',
  },
  {
    title: 'dev-danaku',
    description: 'Village Economic Management Application built with Next.js.',
    stack: ['TypeScript', 'Next.js', 'React', 'PostgreSQL'],
    thumbnail: svgThumbnail(1, 'dev-danaku', 'D'),
    liveUrl: 'https://danaku-production.vercel.app',
    githubUrl: 'https://github.com/maulananizhar/dev-danaku',
  },
  {
    title: 'spk-ahp-kelompok-9',
    description:
      'Best laptop selection system using the Analytical Hierarchy Process (AHP) method built with Next.js.',
    stack: ['TypeScript', 'Next.js', 'React', 'MongoDB'],
    thumbnail: svgThumbnail(2, 'spk-ahp', 'SA'),
    githubUrl: 'https://github.com/maulananizhar/spk-ahp-kelompok-9',
  },
  {
    title: 'empu-store',
    description: 'Cashier system to help record and manage store transactions.',
    stack: ['TypeScript', 'Next.js', 'React', 'MySQL'],
    thumbnail: svgThumbnail(3, 'empu-store', 'ES'),
    githubUrl: 'https://github.com/maulananizhar/empu-store',
  },
  {
    title: 'epl-machine-learning',
    description: 'Machine learning project for English Premier League analysis.',
    stack: ['Jupyter Notebook', 'Python'],
    thumbnail: svgThumbnail(4, 'epl-ml', 'ML'),
    githubUrl: 'https://github.com/maulananizhar/epl-machine-learning',
  },
  {
    title: 'edom-filler',
    description: 'Automatic fill your State University of Jakarta EDOM.',
    stack: ['JavaScript'],
    thumbnail: svgThumbnail(5, 'edom-filler', 'EF'),
    githubUrl: 'https://github.com/maulananizhar/edom-filler',
  },
  {
    title: 'next-omdb-app',
    description: 'Movie search application built with Next.js and OMDB API.',
    stack: ['JavaScript', 'Next.js', 'React'],
    thumbnail: svgThumbnail(6, 'next-omdb', 'NO'),
    liveUrl: 'https://deploy-next-omdb-app.vercel.app',
    githubUrl: 'https://github.com/maulananizhar/next-omdb-app',
  },
  {
    title: 'effortless-survival',
    description: 'Mod for mindustry with effortless survival mechanics.',
    stack: ['JavaScript'],
    thumbnail: svgThumbnail(7, 'effortless', 'ES'),
    githubUrl: 'https://github.com/maulananizhar/effortless-survival',
  },
  {
    title: 'java-aplikasi-kasir',
    description: 'Cashier application built with Java.',
    stack: ['Java'],
    thumbnail: svgThumbnail(8, 'java-kasir', 'JK'),
    githubUrl: 'https://github.com/maulananizhar/java-aplikasi-kasir',
  },
  {
    title: 'color-guess',
    description: 'A game to test CSS styling skills by guessing the hex color.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    thumbnail: svgThumbnail(9, 'color-guess', 'CG'),
    liveUrl: 'https://maulananizhar.github.io/color-guess',
    githubUrl: 'https://github.com/maulananizhar/color-guess',
  },
  {
    title: 'game-suit',
    description: 'Traditional Indonesian rock-paper-scissors game (Suit).',
    stack: ['HTML', 'CSS', 'JavaScript'],
    thumbnail: svgThumbnail(10, 'game-suit', 'GS'),
    liveUrl: 'https://maulananizhar.github.io/game-suit',
    githubUrl: 'https://github.com/maulananizhar/game-suit',
  },
]
