export default function AboutCard() {
  return (
    <div className="h-full bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 card-elevated">
      <h2 className="font-code text-xs font-medium uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)' }}>
        О себе
      </h2>
      <p className="leading-relaxed mb-4 text-sm" style={{ color: 'var(--text)' }}>
        Более 13 лет в IT, последние годы — в роли технического руководителя.
        Строю команды, отвечаю за архитектуру, запускаю продукты.
        Руководил разработкой SaaS-продукта, ставшего частью экосистемы VK.
      </p>
      <ul className="space-y-2.5">
        {[
          'Команды до 35 человек: найм, менторство, инженерная культура',
          'Стек: Python, PostgreSQL, TypeScript, React',
          'CI/CD, мониторинг, снижение техдолга, стабильность',
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
