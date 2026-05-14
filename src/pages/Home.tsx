import Divider from '../components/ui/Divider'
import Hero from '../components/home/Hero'
import CodingActivity from '../components/home/CodingActivity'
import RecentProjects from '../components/home/RecentProjects'
import RecentPosts from '../components/home/RecentPosts'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <Hero />
      <CodingActivity />
      <Divider />
      <RecentProjects />
      <Divider />
      <RecentPosts />
    </div>
  )
}
