import { experience } from '@/data/experience'

export default function ExperienceSection() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-5" style={{ color: 'var(--text-muted)' }}>
        Опыт работы
      </h2>
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
  )
}
