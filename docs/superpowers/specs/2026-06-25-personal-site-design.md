# Personal Site Design

**Date:** 2026-06-25

## Goal

Developer portfolio site: showcase personal projects, articles, and resume link.

## Stack

- **Framework:** Next.js with static export (`output: 'export'`)
- **Styling:** Tailwind CSS
- **Hosting:** GitHub Pages with custom domain
- **Analytics:** Яндекс.Метрика (script in `<head>`)

## Design

Card-based layout inspired by bricohen.com. Light/dark theme toggle. Single page.

## Sections

1. **Intro card** — avatar placeholder, name, role tags, GitHub/Telegram/LinkedIn links
2. **About** — short bio text (placeholder, fill later)
3. **Projects** — cards with name, description, tech stack, link. Flip effect: front = overview, back = details
4. **Articles** — list of links with title + source (Habr, Medium, etc.)
5. **Resume** — single download button / PDF link

## What's out of scope

- Contact form (deferred)
- Backend / API routes
- Authentication
