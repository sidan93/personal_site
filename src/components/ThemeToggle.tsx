'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored === 'dark' || (!stored && prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      className="font-code flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs
        border border-[var(--border)] text-[var(--text-muted)]
        hover:border-[var(--accent)] hover:text-[var(--text)] transition-colors"
      aria-label="Toggle theme"
    >
      <span style={{ color: 'var(--accent)' }}>{dark ? '◑' : '◐'}</span>
      <span>{dark ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}
