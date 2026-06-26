'use client'

import { useEffect, useState } from 'react'

type CardStyle = 'clean' | 'glass'

export default function StyleSwitcher() {
  const [active, setActive] = useState<CardStyle>('glass')

  useEffect(() => {
    const stored = localStorage.getItem('cardStyle') as CardStyle | null
    const resolved = (stored === 'clean' || stored === 'glass') ? stored : 'glass'
    setActive(resolved)
    document.documentElement.classList.toggle('cards-glass', resolved === 'glass')
  }, [])

  const apply = (s: CardStyle) => {
    setActive(s)
    document.documentElement.classList.toggle('cards-glass', s === 'glass')
    localStorage.setItem('cardStyle', s)
  }

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-xl border border-[var(--border)] bg-[var(--card)]" style={{ boxShadow: 'var(--shadow-card)' }}>
      <span className="font-code text-xs px-2" style={{ color: 'var(--text-muted)' }}>карточки</span>
      {(['clean', 'glass'] as CardStyle[]).map((id) => (
        <button
          key={id}
          onClick={() => apply(id)}
          className={`px-3 py-1 rounded-lg text-xs font-code transition-all duration-200 ${
            active === id
              ? 'text-white'
              : 'hover:text-[var(--text)]'
          }`}
          style={active === id ? { background: 'var(--accent)', color: 'white' } : { color: 'var(--text-muted)' }}
        >
          {id === 'clean' ? 'Чистый' : 'Стекло'}
        </button>
      ))}
    </div>
  )
}
