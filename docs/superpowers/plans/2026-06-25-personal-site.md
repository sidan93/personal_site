# Personal Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page developer portfolio with card layout, dark/light toggle, flip-card projects, articles list, and resume link — deployed as a static site to GitHub Pages with a custom domain.

**Architecture:** Next.js App Router with `output: 'export'` generates a fully static site. Tailwind CSS with `darkMode: 'class'` handles theming. Data (projects, articles) lives in TypeScript files under `src/data/`. GitHub Actions builds and deploys to the `gh-pages` branch on every push to `main`.

**Tech Stack:** Next.js 14, Tailwind CSS 3, TypeScript, GitHub Actions, Яндекс.Метрика

## Global Constraints

- Node.js >= 18
- Next.js `output: 'export'` — no server-side features, no API routes
- Tailwind `darkMode: 'class'` — theme class on `<html>` element
- All components in `src/components/`, data in `src/data/`
- No external UI libraries — plain Tailwind + CSS

---

## File Map

| File | Responsibility |
|------|----------------|
| `next.config.js` | Static export, image unoptimized |
| `tailwind.config.js` | Dark mode class, content paths, custom colors |
| `src/app/layout.tsx` | Root layout: theme script, Yandex Metrica, font |
| `src/app/page.tsx` | Single page — assembles all sections |
| `src/app/globals.css` | Base Tailwind directives + flip card CSS |
| `src/components/ThemeToggle.tsx` | Light/dark toggle button |
| `src/components/IntroCard.tsx` | Avatar placeholder, name, role tags, social links |
| `src/components/AboutCard.tsx` | Short bio text |
| `src/components/FlipCard.tsx` | Reusable flip card wrapper |
| `src/components/ProjectsSection.tsx` | Grid of project flip cards |
| `src/components/ArticlesSection.tsx` | List of article links |
| `src/components/ResumeSection.tsx` | Resume download button |
| `src/data/projects.ts` | Project data array |
| `src/data/articles.ts` | Articles data array |
| `public/CNAME` | Custom domain for GitHub Pages |
| `.github/workflows/deploy.yml` | Build + deploy to gh-pages |

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `tsconfig.json`
- Create: `src/app/globals.css`

- [ ] **Step 1: Init Next.js project**

```bash
npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Expected output: files created, dependencies installed.

- [ ] **Step 2: Configure static export**

Edit `next.config.js`:
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

- [ ] **Step 3: Configure Tailwind dark mode**

Edit `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          light: '#f5f5f5',
          dark: '#1a1a1a',
        },
        card: {
          light: '#ffffff',
          dark: '#242424',
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Add flip card CSS to globals.css**

Replace contents of `src/app/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }

  .transform-style-3d {
    transform-style: preserve-3d;
  }

  .backface-hidden {
    backface-visibility: hidden;
  }

  .rotate-y-180 {
    transform: rotateY(180deg);
  }
}
```

- [ ] **Step 5: Verify build runs**

```bash
npm run build
```

Expected: `out/` directory created with `index.html`.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js project with static export and Tailwind"
```

---

### Task 2: Theme Toggle

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/app/layout.tsx`

**Produces:** `<ThemeToggle />` component; `dark` class on `<html>` persisted in localStorage.

- [ ] **Step 1: Create ThemeToggle component**

Create `src/components/ThemeToggle.tsx`:
```tsx
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
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
        bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400
        hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      <span>{dark ? '☀️' : '🌙'}</span>
      <span>{dark ? 'LIGHT' : 'DARK'}</span>
    </button>
  )
}
```

- [ ] **Step 2: Add flash-prevention script to layout**

Replace `src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

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
                var stored = localStorage.getItem('theme');
                var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (stored === 'dark' || (!stored && prefersDark)) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-[#f5f5f5] dark:bg-[#1a1a1a] min-h-screen transition-colors duration-300`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 3: Verify dev server**

```bash
npm run dev
```

Open http://localhost:3000 — page loads, no flash of wrong theme on reload.

- [ ] **Step 4: Commit**

```bash
git add src/components/ThemeToggle.tsx src/app/layout.tsx
git commit -m "feat: add dark/light theme toggle with localStorage persistence"
```

---

### Task 3: Data Layer

**Files:**
- Create: `src/data/projects.ts`
- Create: `src/data/articles.ts`

**Produces:** `Project[]` and `Article[]` typed arrays imported by section components.

- [ ] **Step 1: Create projects data**

Create `src/data/projects.ts`:
```ts
export interface Project {
  title: string
  description: string
  stack: string[]
  url: string
  details: string
}

export const projects: Project[] = [
  {
    title: 'Project One',
    description: 'Short description of the project.',
    stack: ['TypeScript', 'React', 'Node.js'],
    url: 'https://github.com/yourusername/project-one',
    details: 'Longer description shown on card flip. What problem it solves, what you learned.',
  },
  {
    title: 'Project Two',
    description: 'Short description of the project.',
    stack: ['Python', 'FastAPI', 'PostgreSQL'],
    url: 'https://github.com/yourusername/project-two',
    details: 'Longer description shown on card flip.',
  },
]
```

- [ ] **Step 2: Create articles data**

Create `src/data/articles.ts`:
```ts
export interface Article {
  title: string
  source: string
  url: string
  date: string
}

export const articles: Article[] = [
  {
    title: 'Article Title One',
    source: 'Habr',
    url: 'https://habr.com/your-article',
    date: '2025-01',
  },
  {
    title: 'Article Title Two',
    source: 'Medium',
    url: 'https://medium.com/your-article',
    date: '2024-11',
  },
]
```

- [ ] **Step 3: Commit**

```bash
git add src/data/
git commit -m "feat: add typed data layer for projects and articles"
```

---

### Task 4: IntroCard Component

**Files:**
- Create: `src/components/IntroCard.tsx`

**Consumes:** `<ThemeToggle />` from Task 2.

- [ ] **Step 1: Create IntroCard**

Create `src/components/IntroCard.tsx`:
```tsx
import ThemeToggle from './ThemeToggle'

export default function IntroCard() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-0.5">HI, WELCOME!</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Name</h1>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Role tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['Backend Developer', 'Python', 'TypeScript'].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Social links */}
      <div className="flex gap-3">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-80 transition-opacity"
        >
          GitHub
        </a>
        <a
          href="https://t.me/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Telegram
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/IntroCard.tsx
git commit -m "feat: add IntroCard component with avatar, tags, social links"
```

---

### Task 5: AboutCard Component

**Files:**
- Create: `src/components/AboutCard.tsx`

- [ ] **Step 1: Create AboutCard**

Create `src/components/AboutCard.tsx`:
```tsx
export default function AboutCard() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
        About Me
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Placeholder bio text. Describe yourself, what you do, what you're interested in.
        Keep it short — 2-3 sentences is enough.
      </p>
      <ul className="space-y-2">
        {[
          'What you build or work on',
          'Your main tech stack or specialization',
          'Something personal or interesting',
        ].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="text-green-500 mt-0.5">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/AboutCard.tsx
git commit -m "feat: add AboutCard component"
```

---

### Task 6: FlipCard + ProjectsSection

**Files:**
- Create: `src/components/FlipCard.tsx`
- Create: `src/components/ProjectsSection.tsx`

**Consumes:** `Project` interface and `projects` array from `src/data/projects.ts`.

- [ ] **Step 1: Create FlipCard component**

Create `src/components/FlipCard.tsx`:
```tsx
'use client'

import { useState } from 'react'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

export default function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`perspective-1000 cursor-pointer h-full ${className}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative transform-style-3d transition-transform duration-500 h-full ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Create ProjectsSection**

Create `src/components/ProjectsSection.tsx`:
```tsx
import FlipCard from './FlipCard'
import { projects } from '@/data/projects'

export default function ProjectsSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
        Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.title} className="h-48">
            <FlipCard
              front={
                <div className="h-full bg-gray-50 dark:bg-[#2e2e2e] rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              }
              back={
                <div className="h-full bg-gray-900 dark:bg-black rounded-xl p-4 flex flex-col justify-between">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.details}
                  </p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-block px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors text-center"
                  >
                    View on GitHub →
                  </a>
                </div>
              }
            />
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-600 mt-3 text-center">
        Click a card to flip
      </p>
    </div>
  )
}
```

- [ ] **Step 3: Verify flip card in browser**

```bash
npm run dev
```

Open http://localhost:3000, navigate to projects section. Click a card — it should flip 180° and show the back. Click again — flips back.

- [ ] **Step 4: Commit**

```bash
git add src/components/FlipCard.tsx src/components/ProjectsSection.tsx
git commit -m "feat: add flip card component and projects section"
```

---

### Task 7: ArticlesSection + ResumeSection

**Files:**
- Create: `src/components/ArticlesSection.tsx`
- Create: `src/components/ResumeSection.tsx`

**Consumes:** `Article` interface and `articles` array from `src/data/articles.ts`.

- [ ] **Step 1: Create ArticlesSection**

Create `src/components/ArticlesSection.tsx`:
```tsx
import { articles } from '@/data/articles'

export default function ArticlesSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
        Articles
      </h2>
      <ul className="space-y-3">
        {articles.map((article) => (
          <li key={article.url}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between group"
            >
              <div>
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-gray-400">{article.source}</span>
                  <span className="text-xs text-gray-300 dark:text-gray-600">·</span>
                  <span className="text-xs text-gray-400">{article.date}</span>
                </div>
              </div>
              <span className="text-gray-300 dark:text-gray-600 group-hover:text-blue-400 transition-colors">
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

- [ ] **Step 2: Create ResumeSection**

Create `src/components/ResumeSection.tsx`:
```tsx
export default function ResumeSection() {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-sm flex items-center justify-between">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">
          Resume
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Updated 2025
        </p>
      </div>
      <a
        href="/resume.pdf"
        download
        className="px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl text-sm font-medium hover:opacity-80 transition-opacity"
      >
        Download PDF
      </a>
    </div>
  )
}
```

- [ ] **Step 3: Add resume placeholder to public/**

```bash
echo "placeholder" > public/resume.pdf
```

- [ ] **Step 4: Commit**

```bash
git add src/components/ArticlesSection.tsx src/components/ResumeSection.tsx public/resume.pdf
git commit -m "feat: add articles section and resume download button"
```

---

### Task 8: Assemble Page + Yandex Metrica

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

**Consumes:** All components from Tasks 4-7.

- [ ] **Step 1: Assemble the page**

Replace `src/app/page.tsx`:
```tsx
import IntroCard from '@/components/IntroCard'
import AboutCard from '@/components/AboutCard'
import ProjectsSection from '@/components/ProjectsSection'
import ArticlesSection from '@/components/ArticlesSection'
import ResumeSection from '@/components/ResumeSection'

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <IntroCard />
        <AboutCard />
      </div>
      <div className="mb-4">
        <ProjectsSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ArticlesSection />
        <ResumeSection />
      </div>
    </main>
  )
}
```

- [ ] **Step 2: Add Yandex Metrica to layout**

In `src/app/layout.tsx`, add the Metrica script inside `<head>` after the theme script. Replace `XXXXXXXX` with your actual counter ID:

```tsx
<head>
  {/* existing theme script */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          var stored = localStorage.getItem('theme');
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
          }
        })();
      `,
    }}
  />
  {/* Yandex Metrica */}
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(XXXXXXXX, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true
        });
      `,
    }}
  />
  <noscript>
    <div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="https://mc.yandex.ru/watch/XXXXXXXX" style={{ position: 'absolute', left: '-9999px' }} alt="" />
    </div>
  </noscript>
</head>
```

- [ ] **Step 3: Verify full page in browser**

```bash
npm run dev
```

Open http://localhost:3000. Check:
- All sections visible
- Theme toggle works and persists on reload
- Projects flip on click
- Articles links open in new tab
- Resume button present

- [ ] **Step 4: Verify static build**

```bash
npm run build
```

Expected: `out/` directory with `index.html`, no build errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: assemble full page layout with Yandex Metrica"
```

---

### Task 9: GitHub Pages Deployment

**Files:**
- Create: `public/CNAME`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Add CNAME file**

Create `public/CNAME` with your domain (no `https://`, no trailing slash):
```
yourdomain.com
```

- [ ] **Step 2: Create GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci

      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

- [ ] **Step 3: Enable GitHub Pages in repo settings**

Go to repo Settings → Pages → Source: **GitHub Actions**. Save.

- [ ] **Step 4: Add DNS records for custom domain**

In your domain registrar, add these A records pointing to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

And a CNAME record: `www` → `yourusername.github.io`

- [ ] **Step 5: Commit and push**

```bash
git add public/CNAME .github/workflows/deploy.yml
git commit -m "feat: add GitHub Pages deployment workflow with custom domain"
git push origin main
```

- [ ] **Step 6: Verify deployment**

Open GitHub repo → Actions tab. Wait for the workflow to complete (2-3 minutes). Then open your domain — site should be live.
