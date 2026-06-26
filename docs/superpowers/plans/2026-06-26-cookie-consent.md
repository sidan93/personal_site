# Cookie Consent Banner — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить cookie-баннер снизу страницы, который блокирует загрузку Яндекс Метрики до явного согласия пользователя.

**Architecture:** Убрать безусловный `<script>` Метрики из `<head>` в `layout.tsx`. Создать клиентский компонент `CookieBanner`, который при монтировании проверяет `localStorage` и либо тихо инициализирует Метрику (если согласие уже дано), либо показывает баннер. При нажатии «Принять» — динамически инжектирует `tag.js` и инициализирует Метрику на месте.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, CSS-переменные (`--bg`, `--card`, `--border`, `--text`, `--text-muted`, `--accent`)

## Global Constraints

- Metrica ID: `110162866` — константа, не выносить в env
- localStorage key: `'cookieConsent'`, значения: `'accepted'` | `'declined'`
- Компонент обязательно `"use client"` — читает localStorage
- Ссылка на политику: `https://ai.absidorov.ru/Политика-конфиденциальности`
- Текст баннера: «Я использую cookie-файлы для сбора анонимной статистики.»
- Стиль: только CSS-переменные + Tailwind, без хардкода цветов

---

## File Map

| Действие | Файл | Ответственность |
|----------|------|-----------------|
| Создать | `src/components/CookieBanner.tsx` | Баннер + логика согласия + инициализация Метрики |
| Изменить | `src/app/layout.tsx` | Убрать Метрику из `<head>`, добавить `<CookieBanner />` |

---

### Task 1: Создать компонент CookieBanner

**Files:**
- Create: `src/components/CookieBanner.tsx`

**Interfaces:**
- Produces: `export default function CookieBanner(): JSX.Element | null`
- Внутренняя функция: `initMetrica(): void` — добавляет `tag.js` в `<head>` и вызывает `ym(..., "init", ...)`

- [ ] **Step 1: Создать файл с базовой структурой и функцией initMetrica**

Создать `src/components/CookieBanner.tsx`:

```tsx
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
```

- [ ] **Step 2: Проверить TypeScript-компиляцию**

```bash
cd /Users/andrey.sidorov/Documents/ProjAi/personal_site && npx tsc --noEmit
```

Ожидаемый результат: нет ошибок (пустой вывод).

- [ ] **Step 3: Закоммитить компонент**

```bash
git add src/components/CookieBanner.tsx
git commit -m "feat: add CookieBanner component with deferred Metrica init"
```

---

### Task 2: Обновить layout.tsx — убрать Метрику, добавить баннер

**Files:**
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `CookieBanner` из `'../components/CookieBanner'` (default export)

- [ ] **Step 1: Обновить layout.tsx**

Заменить весь файл `src/app/layout.tsx` на:

```tsx
import type { Metadata } from 'next'
import { Inter, Onest, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import CookieBanner from '../components/CookieBanner'

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' })
const onest = Onest({ subsets: ['latin', 'cyrillic'], variable: '--font-onest', weight: ['400', '500', '600', '700'] })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', weight: ['400', '500'] })

export const metadata: Metadata = {
  title: 'Your Name — Developer',
  description: 'Personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var el = document.documentElement;
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) el.classList.add('dark');
                var valid = ['luxury','aurora','amber','terminal','mono'];
                var v = localStorage.getItem('designVariant');
                el.setAttribute('data-variant', valid.indexOf(v) !== -1 ? v : 'luxury');
                el.classList.add('cards-glass');
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${onest.variable} ${jetbrains.variable} font-[var(--font-inter)] bg-[var(--bg)] text-[var(--text)] min-h-screen transition-colors duration-300`}>
        {children}
        <CookieBanner />
        <footer className="text-center text-sm text-gray-400 py-6 mt-8">
          <a href="https://ai.absidorov.ru/Политика-конфиденциальности" className="hover:underline">
            Политика конфиденциальности
          </a>
        </footer>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Проверить TypeScript-компиляцию**

```bash
npx tsc --noEmit
```

Ожидаемый результат: нет ошибок.

- [ ] **Step 3: Проверить сборку**

```bash
npm run build
```

Ожидаемый результат: `✓ Compiled successfully`, без ошибок.

- [ ] **Step 4: Запустить и проверить вручную**

```bash
npm run dev
```

Открыть `http://localhost:3000` в браузере в режиме инкогнито.

Чеклист проверки:
1. ✅ Баннер появляется внизу страницы
2. ✅ В DevTools → Network нет запроса к `mc.yandex.ru/metrika/tag.js`
3. ✅ Нажать «Принять» → баннер исчезает, в Network появляется `tag.js`
4. ✅ Перезагрузить страницу → баннер не появляется, `tag.js` грузится сразу
5. ✅ Очистить localStorage, нажать «Отказать» → баннер исчезает, `tag.js` не грузится
6. ✅ Перезагрузить после «Отказать» → баннер не появляется, `tag.js` не грузится

- [ ] **Step 5: Закоммитить изменения**

```bash
git add src/app/layout.tsx
git commit -m "feat: remove unconditional Metrica init, wire up CookieBanner"
```
