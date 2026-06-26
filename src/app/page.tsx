import IntroCard from '@/components/IntroCard'
import AboutCard from '@/components/AboutCard'
import ProjectsSection from '@/components/ProjectsSection'
import ArticlesSection from '@/components/ArticlesSection'
import ResumeSection from '@/components/ResumeSection'
import VariantSwitcher from '@/components/VariantSwitcher'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex justify-end mb-5">
        <VariantSwitcher />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="card-animate" style={{ animationDelay: '0ms' }}>
          <IntroCard />
        </div>
        <div className="card-animate" style={{ animationDelay: '80ms' }}>
          <AboutCard />
        </div>
      </div>
      <div className="mb-5 card-animate" style={{ animationDelay: '160ms' }}>
        <ProjectsSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 card-animate" style={{ animationDelay: '240ms' }}>
        <ArticlesSection />
        <ResumeSection />
      </div>
    </main>
  )
}
