---
version: alpha
name: absidorov.ru
description: Personal developer portfolio in a single Bento design.
colors:
  primary: "#6366F1"
  background: "#FAFAF8"
  text: "#111111"
  primary-dark: "#818CF8"
  background-dark: "#111113"
  text-dark: "#F0F0F8"
typography:
  sans:
    fontFamily: "Inter, sans-serif"
  heading:
    fontFamily: "Onest, sans-serif"
  mono:
    fontFamily: "JetBrains Mono, monospace"
rounded:
  card: "1rem"
spacing:
  page-max: "56rem"
  card-gap: "1.25rem"
components:
  card:
    rounded: "1rem"
---

# Portfolio design

## Overview

A Russian-language portfolio for visitors evaluating Andrei Sidorov's experience,
projects and articles. The signature is a compact Bento grid of translucent cards.
The user selected Bento as the only design; the former design selector is removed.
Keep the established light/dark theme toggle and content.

Runtime tokens in `src/app/globals.css` are canonical. The colors above mirror
`--accent`, `--bg` and `--text` in `:root` and `.dark`; this document does not generate CSS.
Fonts are loaded in `src/app/layout.tsx`, and their role utilities live in globals.css.

## Colors

Light surfaces use soft white and indigo; dark surfaces use charcoal and violet.
Both themes retain the same content hierarchy. Old `designVariant` preferences
must never change the palette. Bento must render before client hydration.

## Typography

Use Onest for headings, Inter for body content and JetBrains Mono for compact
technical labels. Preserve Latin and Cyrillic support and existing font weights.

## Layout

The page is capped at 56rem with 1rem horizontal padding and 1.25rem card gaps.
The grid changes from one to two columns at the existing Tailwind `md` breakpoint.
Removing the selector also removes its wrapper and unused space.

## Elevation & Depth

Retain the existing glass treatment, subtle background glow, grain and card shadows.
Dark glass uses the original Bento tint, not the old default design's tint.

## Shapes

Major cards retain their existing 1rem rounded corners; tags and actions keep
their existing smaller or pill shapes.

## Components

Reuse the existing portfolio cards, links, theme toggle and cookie banner.
Theme switching must persist across reloads. No design-selection control remains.

## Do's and Don'ts

- Preserve Bento's existing palette and card composition on desktop and mobile.
- Check both themes and previously saved non-Bento preferences.
- Do not add alternate designs or restore the design selector.
- Do not change content or unrelated interactions for this fix.
