export default function ResumeSection() {
  return (
    <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex items-center justify-between card-elevated">
      <div>
        <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          Резюме
        </h2>
        <p className="font-heading text-sm" style={{ color: 'var(--text-muted)' }}>
          Обновлено в 2026
        </p>
      </div>
      <a
        href="/personal_site/resume.pdf"
        download
        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-85 transition-opacity font-heading"
        style={{ background: 'var(--accent)' }}
      >
        Скачать PDF
      </a>
    </div>
  )
}
