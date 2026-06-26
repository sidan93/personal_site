'use client'

import { useState } from 'react'
import { experience } from '@/data/experience'

export default function ExperienceSection() {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="perspective-1000 cursor-pointer"
      style={{ minHeight: '160px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative transform-style-3d transition-transform duration-500 h-full ${
          flipped ? 'rotate-y-180' : ''
        }`}
        style={{ minHeight: '160px' }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated flex items-center justify-between">
            <div>
              <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>
                Опыт работы
              </h2>
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="font-heading text-2xl font-bold" style={{ color: 'var(--text)' }}>13 лет</p>
                  <p className="font-code text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>в индустрии</p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold" style={{ color: 'var(--text)' }}>35+</p>
                  <p className="font-code text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>человек в команде</p>
                </div>
                <div>
                  <p className="font-heading text-2xl font-bold" style={{ color: 'var(--text)' }}>{experience.length}</p>
                  <p className="font-code text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>компании</p>
                </div>
              </div>
            </div>
            <span className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>нажми →</span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-code text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Опыт работы
              </h2>
              <span className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>← закрыть</span>
            </div>
            <div className="space-y-5">
              {experience.map((job, i) => (
                <div key={i} className="relative pl-4 border-l border-[var(--border)]">
                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[var(--accent)] bg-[var(--card)]" />
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-heading font-semibold text-sm hover:opacity-75 transition-opacity"
                      style={{ color: 'var(--accent)' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {job.company}
                    </a>
                    <span className="font-code text-xs" style={{ color: 'var(--text-muted)' }}>
                      {job.duration}
                    </span>
                  </div>
                  <p className="font-heading text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>
                    {job.role}
                  </p>
                  <p className="font-code text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
                    {job.period}
                  </p>
                  <p className="text-sm leading-relaxed mb-2.5" style={{ color: 'var(--text-muted)' }}>
                    {job.description}
                  </p>
                  {job.stack && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <span key={tech} className="font-code px-2 py-0.5 rounded text-xs bg-[var(--tag-bg)]" style={{ color: 'var(--tag-text)' }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
