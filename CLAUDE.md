# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Vite dev server (http://localhost:5173)
npm run build     # tsc → vite build → SSR build of src/entry-server.tsx → scripts/prerender.mjs
npm run preview   # Serve the production build (dist/) locally
```

Production is **gustavosanchez.dev** on Vercel, built from `main` (`vercel.json` pins `npm run build` / `dist`). Every pushed branch gets a Vercel preview. Never push or merge to `main` without the owner's explicit go-ahead.

## Architecture

React 19 + TypeScript + Vite SPA, **prerendered at build time**. All UI is declarative JSX; no imperative DOM manipulation.

### Data flow

```
src/config/content.ts         ← single source of truth for all text/data
src/utils/icons.tsx           ← socialIconMap + named icon exports
src/hooks/useScrollReveal.ts  ← IntersectionObserver hook for .reveal fade-in
src/hooks/useActiveSection.ts ← IntersectionObserver hook for active nav link
src/hooks/useTheme.ts         ← light/dark theme state (OS default, remembered once toggled)
       ↓
src/components/*.tsx          ← React components
       ↓
src/App.tsx                   ← Header, Intro, CaseStudies, Process, Experience, Social, Contact, ResumeDock, footer
src/main.tsx                  ← createRoot().render(<App />)   (client)
src/entry-server.tsx          ← renderToString(<App />)        (build-time prerender)
```

### Prerender (LLM / crawler discoverability)

`scripts/prerender.mjs` injects the server-rendered App into `dist/index.html`'s `<div id="app">`, so crawlers and agents that don't run JavaScript get the full page text. The client still uses `createRoot` (not `hydrateRoot`) and simply re-renders over it, so theme-dependent markup can't cause hydration mismatches.

**Consequence:** nothing may touch `window`, `document`, `localStorage` or `navigator` during render — only inside effects or event handlers. Guard any render-time access with `typeof document === "undefined"` (see `initialTheme` in `useTheme.ts`), or `npm run build` fails.

### Components

| Component | Section |
|---|---|
| `Header` | Sticky top nav (`content.nav`), theme toggle, mobile menu |
| `Intro` | `#intro` hero: small cropped avatar + name/location, badge, h1 with rotating word, summary, CTA + copy-email button; stats row |
| `CaseStudies` | `#work` — three case-study cards (challenge / approach / outcome / proof, tag row with SDD + AI flags) |
| `Process` | `#process` — four-stage workflow on an inverse panel |
| `Experience` | `#experience` — role timeline |
| `Social` | `#social` — the **only** set of social links on the page (LinkedIn card is featured, spans 2 columns) |
| `Contact` | `#contact` — Formspree form + contact info |
| `ResumeDock` | Fixed résumé pill (compact single pill ≤1600px) |

### Component pattern

- Every component is a named React function export.
- Scroll-reveal: attach `useScrollReveal` ref to the element that also has `className="... reveal"`.
- Sections use `className="section container"` and `aria-labelledby` pointing at their `h2`.
- Theme: `useTheme()` lives in `App` and is passed to `Header`. It writes `data-theme` on `<html>` in a layout effect; an inline script in `index.html` sets it before first paint so there is no flash.
- Rotating hero word: the visible word is drawn by CSS (`.hero__word::before { content: attr(data-word) }`, `aria-hidden`), and an `sr-only` span holds the full sentence ("a, b, c or d."). This keeps the h1's text — what screen readers and no-JS crawlers read — a single clean sentence. Keep it that way. Rotation is skipped under `prefers-reduced-motion`.

### Icon system (`src/utils/icons.tsx`)

```tsx
export const socialIconMap: Record<string, ComponentType<IconProps>> = { ... };

const Icon = socialIconMap[link.icon];
{Icon ? <Icon size={18} color="currentColor" /> : link.icon}
```

Case-study link icons (`LiveDemoIcon`, `SourceCodeIcon`) and UI chrome icons (`CopyIcon`, `CopiedIcon`, `ThemeLightIcon`, `MenuIcon`, `DownloadIcon`, …) are plain named exports. `MasterDevIcon` is a custom monochrome SVG. All icons are monochrome `currentColor` — never reintroduce brand colours (`brandColor` in `content.ts` is not rendered). react-icons doesn't set `aria-hidden`; pass it on decorative icons.

## Design: Ink & Mist

- **Palette is exactly two colours:** Mist `#bdd4e7` and Ink `#212227`. Every other tone is derived with `color-mix(in srgb, …)`. Do not add another hex — grep `src/style.css` for `#` to check.
- Dark theme = mist on ink; light theme = ink on mist. Tokens are defined under `:root, :root[data-theme="dark"]` and again under `:root[data-theme="light"]` — always add a new token to **both**: `--color-bg/fg/muted/line/line-strong/surface/surface-2`, `--color-inv-bg/fg/muted/line` (inverse panels: Process, featured social card, SDD/AI flags), `--photo-bg/--photo-blend` (duotone avatar).
- **Contrast floor:** `--color-muted` is the lightest text allowed (≥4.8:1 on every surface it sits on, both themes). Never use `--color-line*` for text.
- **Fonts** (`@theme` block + Google Fonts link in `index.html`): Bricolage Grotesque (`--font-display`), Manrope (`--font-body`), JetBrains Mono (`--font-mono`, labels/handles).
- **Avatar:** `public/Me.jpg`, grayscale + `mix-blend-mode: multiply` over `--photo-bg`, scaled and cropped to the upper part of the photo in a 72px circle.
- **Headline:** `.hero__title` reserves `min-height` for two lines (three at ≤600px) so the rotating word never shifts the layout. If you change its font size or line-height, re-check at 360px and 1440px.
- **Naming:** BEM (`.case-study__tag--flag`, `.social__link`, `.hero__word`).
- **CSS custom properties in style prop:** `style={{ "--some-var": value } as CSSProperties}`.
- Breakpoints in use: 1600 (résumé dock), 1100/560 (social grid 4 → 2 → 1 columns), 1000, 960, 900, 860, 760, 700, 600, 520, 420. Verify there's no horizontal overflow at 390px after layout changes.

## Adding/changing content

- **Text, case studies, social links, experience** → `src/config/content.ts` only.
- **Case study flags** → `sdd: true` (spec-driven: constitution → spec → plan → tasks) and `ai: true` (ships AI features) render as filled chips at the start of the tag row. `inProgress: true` adds an outlined "In progress" pill after the descriptor.
- **Social links** → `content.social.links`; the first entry is the featured card. Keep `index.html` JSON-LD `sameAs` and `<link rel="me">`, and `public/llms*.txt`, in sync with this list. Social anchors use `rel="me noopener noreferrer"`.
- **Hero** → `intro.badge`, `intro.heroLead` + rotating `intro.heroWords`, `intro.heroSummary`, `stats`.
- **New section** → `src/components/NewSection.tsx`, compose in `App.tsx`, add a `content.nav` entry and a line in `public/llms.txt`.

## Discoverability files (keep in sync with content)

| File | Purpose |
|---|---|
| `index.html` | Meta/OG tags, JSON-LD (`Person` with education, credentials, languages, `sameAs`; `ItemList` of case studies; `ProfilePage`), `rel="me"` + `rel="alternate"` links |
| `public/llms.txt` | Short llms.txt summary for LLMs |
| `public/llms-full.txt` | Full context: summary, experience, education, certifications, projects, writing, profiles |
| `public/resume.md` | Text version of the résumé (worded exactly as the PDF) |
| `public/sitemap.xml` / `robots.txt` | Bump `<lastmod>` when content changes |

Facts in these files must match `content.ts` and the résumé — never invent credentials or metrics.

## Résumé

`resume/Gustavo-Sanchez-Resume.html` is the source of `public/Gustavo-Sanchez-Resume.pdf` (plain single-column ATS layout on white paper, two Letter pages, Skills starts page 2). Only finished projects go on the résumé — in-progress ones (`inProgress: true` in `content.ts`) stay site-only. Regenerate: run the dev server, open `/resume/Gustavo-Sanchez-Resume.html`, print to PDF (Letter, margins "Default" so the page's `@page` margins apply, headers/footers off) or use Playwright `page.pdf({ format: "Letter", printBackground: true, preferCSSPageSize: true })`. Check it is exactly two pages. Update `public/resume.md` with the same wording.

## TypeScript notes

`tsconfig.json` enforces `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `erasableSyntaxOnly` and `jsx: react-jsx`. Type-only imports must use `import type`. No need to import React for JSX.

## dangerouslySetInnerHTML

Used in one place for `content.footer` (may contain HTML entities or `<a>` tags) in `src/App.tsx`. Content is developer-controlled, so there is no XSS risk.

The `stack`, `projects` and `blog` blocks in `content.ts` are not rendered any more (their components were removed). They remain as the full project catalog that `public/llms-full.txt` summarises.
