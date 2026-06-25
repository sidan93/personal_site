'use client'

import FlipCard from './FlipCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
        Проекты
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.title} className="h-48">
            <FlipCard
              front={
                <div className="h-full bg-[var(--card-2)] border border-[var(--border)] rounded-xl p-4 flex flex-col justify-between cursor-pointer hover:border-[var(--accent)] card-inner">
                  <div>
                    <h3 className="font-heading font-semibold mb-1.5" style={{ color: 'var(--text)' }}>
                      {project.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span key={tech} className="font-code px-2 py-0.5 rounded text-xs bg-[var(--tag-bg)]" style={{ color: 'var(--tag-text)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              }
              back={
                <div className="h-full rounded-xl p-4 flex flex-col justify-between" style={{ background: 'var(--accent)' }}>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {project.details}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block px-4 py-2 bg-white rounded-lg text-sm font-medium hover:bg-white/90 transition-colors text-center font-heading"
                    style={{ color: 'var(--accent)' }}
                  >
                    Открыть на GitHub →
                  </a>
                </div>
              }
            />
          </div>
        ))}
      </div>
      <p className="font-code text-xs mt-4 text-center" style={{ color: 'var(--text-muted)' }}>
        нажми, чтобы перевернуть
      </p>
    </div>
  )
}
