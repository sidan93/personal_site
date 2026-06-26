'use client'

import { useEffect, useState } from 'react'

export type Variant = 'luxury' | 'aurora' | 'amber' | 'terminal' | 'mono'

const OPTIONS: { id: Variant; label: string; emoji: string }[] = [
  { id: 'luxury',   label: 'Luxury',   emoji: '◆' },
  { id: 'aurora',   label: 'Aurora',   emoji: '◈' },
  { id: 'amber',    label: 'Amber',    emoji: '◉' },
  { id: 'terminal', label: 'Terminal', emoji: '◧' },
  { id: 'mono',     label: 'Mono',     emoji: '◻' },
]

const VALID = OPTIONS.map(o => o.id)

export default function VariantSwitcher() {
  const [active, setActive] = useState<Variant>('luxury')

  useEffect(() => {
    const stored = localStorage.getItem('designVariant') as Variant | null
    const resolved = stored && VALID.includes(stored) ? stored : 'luxury'
    setActive(resolved)
    document.documentElement.setAttribute('data-variant', resolved)
  }, [])

  const apply = (v: Variant) => {
    setActive(v)
    document.documentElement.setAttribute('data-variant', v)
    localStorage.setItem('designVariant', v)
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 p-1 rounded-xl border border-[var(--border)]"
      style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)' }}
    >
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => apply(id)}
          title={label}
          className="px-3 py-1 rounded-lg text-xs font-code transition-all duration-200 whitespace-nowrap"
          style={
            active === id
              ? { background: 'var(--accent)', color: 'var(--card)' }
              : { color: 'var(--text-muted)' }
          }
        >
          {label}
        </button>
      ))}
    </div>
  )
}
