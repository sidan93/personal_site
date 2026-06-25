import FlipCard from './FlipCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.title} className="h-48">
            <FlipCard
              front={
                <div className="h-full bg-gray-50 dark:bg-[#2e2e2e] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              }
              back={
                <div className="h-full bg-gray-900 dark:bg-black rounded-xl p-4 flex flex-col justify-between">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.details}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors text-center"
                  >
                    View on GitHub →
                  </a>
                </div>
              }
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 text-center">
        Click a card to flip
      </p>
    </div>
  )
}
