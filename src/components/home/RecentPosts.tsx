import { useNavigate } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import { useMdxPosts } from '../../hooks/useMdxPosts'

export default function RecentPosts() {
  const navigate = useNavigate()
  const posts = useMdxPosts()
  const recent = posts.slice(0, 3)

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <SectionHeading>Recent Posts</SectionHeading>
        <Button variant="ghost" onClick={() => navigate('/blog')}>
          <span className="text-xs">View All</span>
          <ArrowUpRight size={12} />
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {recent.map((post) => (
          <Card
            key={post.slug}
            hover
            className="p-4 cursor-pointer"
            onClick={() => navigate(`/blog/${post.slug}`)}
          >
            <div className="w-full h-20 border border-border-light bg-surface-alt mb-3 flex items-center justify-center overflow-hidden">
              {post.frontmatter.thumbnail ? (
                <img src={post.frontmatter.thumbnail} alt={post.frontmatter.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-text-tertiary tracking-wider uppercase">Post</span>
              )}
            </div>
            <h3 className="text-sm font-bold text-text mb-1">{post.frontmatter.title}</h3>
            <p className="text-[11px] text-text-tertiary mb-2">{post.frontmatter.date}</p>
            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{post.frontmatter.excerpt}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
