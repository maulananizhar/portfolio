import { useNavigate } from 'react-router-dom'
import Card from '../ui/Card'
import type { PostData } from '../../types'

interface BlogCardProps {
  post: PostData
}

export default function BlogCard({ post }: BlogCardProps) {
  const navigate = useNavigate()

  return (
    <Card
      hover
      className="cursor-pointer"
      onClick={() => navigate(`/blog/${post.slug}`)}
    >
      <div className="h-36 border-b border-border-light bg-surface-alt flex items-center justify-center overflow-hidden">
        {post.frontmatter.thumbnail ? (
          <img src={post.frontmatter.thumbnail} alt={post.frontmatter.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[10px] text-text-tertiary tracking-wider uppercase">Thumbnail</span>
        )}
      </div>
      <div className="p-4">
        <p className="text-[11px] text-text-tertiary mb-2">{post.frontmatter.date}</p>
        <h3 className="text-sm font-bold text-text mb-2 leading-snug">{post.frontmatter.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">{post.frontmatter.excerpt}</p>
      </div>
    </Card>
  )
}
