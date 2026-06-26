import ThemeToggle from './ThemeToggle'

export default function IntroCard() {
  return (
    <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated relative overflow-hidden">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar with gradient ring */}
          <div className="relative w-20 h-20 flex-shrink-0">
            <div className="absolute inset-0 rounded-full" style={{ background: 'conic-gradient(from 180deg, var(--accent), #6EE7B7, var(--accent))' }} />
            <div className="absolute inset-[2px] rounded-full bg-[var(--card)] flex items-center justify-center">
              <span className="font-heading text-2xl font-bold" style={{ color: 'var(--accent)' }}>А</span>
            </div>
          </div>
          <div>
            <p className="font-code text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>Привет, заходи!</p>
            <h1 className="font-heading text-3xl font-bold leading-tight" style={{ color: 'var(--text)' }}>Андрей Сидоров</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Role tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['Backend Developer', 'Python', 'TypeScript'].map((tag) => (
          <span key={tag} className="font-code px-2.5 py-1 rounded-md text-xs border border-[var(--border)] bg-[var(--tag-bg)]" style={{ color: 'var(--tag-text)' }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Social links */}
      <div className="flex gap-2 flex-wrap">
        <a href="https://github.com/sidan93" target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:opacity-85 transition-opacity"
          style={{ background: 'var(--accent)' }}>
          GitHub
        </a>
        <a href="https://t.me/absidorov" target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          style={{ color: 'var(--text-muted)' }}>
          Telegram
        </a>
        <a href="https://linkedin.com/in/absidorov" target="_blank" rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
          style={{ color: 'var(--text-muted)' }}>
          LinkedIn
        </a>
      </div>
    </div>
  )
}
