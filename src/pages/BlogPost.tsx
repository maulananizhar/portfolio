import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import StatusDot from '../components/ui/StatusDot'
import { useMdxPost } from '../hooks/useMdxPosts'
import { useTheme } from '../context/ThemeContext'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = useMdxPost(slug ?? '')
  const { mode } = useTheme()
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const isDark = mode === 'dark' || (mode === 'system' && systemDark)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-text-tertiary text-sm mb-4">Post not found.</p>
        <Button variant="outline" onClick={() => navigate('/blog')}>
          <ArrowLeft size={14} />
          Back to Blog
        </Button>
      </div>
    )
  }

  const { frontmatter, Component } = post

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <Button variant="ghost" onClick={() => navigate('/blog')} className="mb-6">
        <ArrowLeft size={14} />
        <span className="text-xs">Back</span>
      </Button>

      <article>
        <header className="border border-border bg-surface p-6 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <StatusDot active />
            <span className="text-[10px] tracking-[0.2em] uppercase text-text-secondary">Blog</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-text mb-3">{frontmatter.title}</h1>
          <div className="flex items-center gap-3 text-xs text-text-tertiary">
            <span>{frontmatter.date}</span>
          </div>
          <p className="text-xs text-text-secondary mt-3">{frontmatter.excerpt}</p>
        </header>

        <div className={`prose prose-sm max-w-none ${isDark ? 'prose-invert prose-custom' : ''}`}>
          <Component />
        </div>
      </article>
    </div>
  )
}
