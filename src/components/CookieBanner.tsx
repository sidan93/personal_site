'use client'

import { useEffect, useState } from 'react'

const METRICA_ID = 110162866

function initMetrica() {
  type YmFn = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number }
  const w = window as typeof window & { ym?: YmFn }

  w.ym = w.ym || function (...args: unknown[]) {
    ;(w.ym!.a = w.ym!.a || []).push(args)
  }
  w.ym.l = +new Date()

  const existing = document.querySelector(
    'script[src="https://mc.yandex.ru/metrika/tag.js"]'
  )
  if (existing) return

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  script.onload = () => {
    w.ym!(METRICA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true,
    })
  }
  document.head.appendChild(script)
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (consent === 'accepted') {
      initMetrica()
    } else if (!consent) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem('cookieConsent', 'accepted')
    initMetrica()
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem('cookieConsent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4"
      role="dialog"
      aria-label="Согласие на использование cookie"
    >
      <div
        className="max-w-3xl mx-auto rounded-2xl border px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 backdrop-blur-md"
        style={{
          background: 'var(--card)',
          borderColor: 'var(--border)',
          boxShadow: 'var(--shadow-card)',
          color: 'var(--text)',
        }}
      >
        <p className="text-sm flex-1" style={{ color: 'var(--text-muted)' }}>
          🍪 Я использую cookie-файлы для сбора анонимной статистики.{' '}
          <a
            href="https://ai.absidorov.ru/Политика-конфиденциальности"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-75 transition-opacity"
            style={{ color: 'var(--accent)' }}
          >
            Политика конфиденциальности
          </a>
          .
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg text-sm font-medium border transition-colors hover:opacity-75"
            style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
          >
            Отказать
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-85"
            style={{ background: 'var(--accent)' }}
          >
            Принять
          </button>
        </div>
      </div>
    </div>
  )
}
