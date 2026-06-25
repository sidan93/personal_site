export default function AboutCard() {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
        О себе
      </h2>
      <p className="leading-relaxed mb-4 text-sm" style={{ color: 'var(--text)' }}>
        Бэкенд-разработчик. Пишу на Python и TypeScript, строю сервисы и инструменты,
        которые решают реальные задачи.
      </p>
      <ul className="space-y-2.5">
        {[
          'Бэкенд: Python, FastAPI, PostgreSQL',
          'Фронтенд: TypeScript, React, Next.js',
          'Люблю чистый код и хорошие инструменты',
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
