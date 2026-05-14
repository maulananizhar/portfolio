import Divider from '../components/ui/Divider'
import BioSection from '../components/about/BioSection'
import SkillsGrid from '../components/about/SkillsGrid'
import CurrentlyLearning from '../components/about/CurrentlyLearning'
import SocialLinks from '../components/about/SocialLinks'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
      <BioSection />
      <Divider />
      <SkillsGrid />
      <Divider />
      <CurrentlyLearning />
      <Divider />
      <SocialLinks />
    </div>
  )
}
