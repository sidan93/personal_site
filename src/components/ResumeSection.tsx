export default function ResumeSection() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex items-center justify-between card-elevated">
      <div>
        <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
          Resume
        </h2>
        <p className="font-heading text-sm" style={{ color: 'var(--text-muted)' }}>
          Updated 2025
        </p>
      </div>
      <a
        href="/personal_site/resume.pdf"
        download
        className="px-5 py-2.5 rounded-xl text-sm font-medium text-white hover:opacity-85 transition-opacity font-heading"
        style={{ background: 'var(--accent)' }}
      >
        Download PDF
      </a>
    </div>
  )
}
