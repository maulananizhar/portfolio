import SectionHeading from '../components/ui/SectionHeading'
import BlogCard from '../components/blog/BlogCard'
import { useMdxPosts } from '../hooks/useMdxPosts'

export default function Blog() {
  const posts = useMdxPosts()

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="border border-border bg-surface p-6 mb-6">
        <SectionHeading>Blog</SectionHeading>
        <p className="text-xs text-text-secondary mt-2">
          Thoughts on TypeScript, distributed systems, and software engineering.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-tertiary">No posts yet.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
