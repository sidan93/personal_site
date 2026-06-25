import IntroCard from '@/components/IntroCard'
import AboutCard from '@/components/AboutCard'
import ProjectsSection from '@/components/ProjectsSection'
import ArticlesSection from '@/components/ArticlesSection'
import ResumeSection from '@/components/ResumeSection'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <IntroCard />
        <AboutCard />
      </div>
      <div className="mb-4">
        <ProjectsSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ArticlesSection />
        <ResumeSection />
      </div>
    </main>
  )
}
