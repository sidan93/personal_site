'use client'

import { useEffect, useState } from 'react'

export type Variant = 'luxury' | 'aurora' | 'amber' | 'terminal' | 'mono' | 'liquid-noir' | 'spatial' | 'analog' | 'swiss' | 'bento'

const OPTIONS: { id: Variant; label: string }[] = [
  { id: 'luxury',      label: 'Luxury'   },
  { id: 'aurora',      label: 'Aurora'   },
  { id: 'amber',       label: 'Amber'    },
  { id: 'terminal',    label: 'Terminal' },
  { id: 'mono',        label: 'Mono'     },
  { id: 'liquid-noir', label: 'Noir'     },
  { id: 'spatial',     label: 'Spatial'  },
  { id: 'analog',      label: 'Analog'   },
  { id: 'swiss',       label: 'Swiss'    },
  { id: 'bento',       label: 'Bento'    },
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
      className="inline-flex flex-wrap items-center gap-0.5 p-1 rounded-xl border border-[var(--border)]"
      style={{ background: 'var(--card)', boxShadow: 'var(--shadow-card)', maxWidth: '100%' }}
    >
      {OPTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => apply(id)}
          title={label}
          className="px-2.5 py-1 rounded-lg text-xs font-code transition-all duration-200 whitespace-nowrap"
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
