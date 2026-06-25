export default function AboutCard() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
        About Me
      </h2>
      <p className="leading-relaxed mb-4 text-sm" style={{ color: 'var(--text)' }}>
        Placeholder bio text. Describe yourself, what you do, what you&apos;re interested in.
        Keep it short &mdash; 2&ndash;3 sentences is enough.
      </p>
      <ul className="space-y-2.5">
        {[
          'What you build or work on',
          'Your main tech stack or specialization',
          'Something personal or interesting',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
            <span className="font-code mt-0.5" style={{ color: 'var(--accent)' }}>▸</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
