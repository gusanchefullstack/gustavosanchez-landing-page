# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Type-check (tsc) then build for production
npm run preview   # Preview the production build locally
```

## Architecture

React 19 + TypeScript + Vite SPA. All UI is declarative JSX; no imperative DOM manipulation.

### Data flow

```
src/config/content.ts       ← single source of truth for all text/data
src/utils/icons.tsx         ← react-icons component maps + named icon exports
src/hooks/useScrollReveal.ts  ← IntersectionObserver hook for .reveal fade-in
src/hooks/useActiveSection.ts ← IntersectionObserver hook for active nav link
src/hooks/useTheme.ts       ← light/dark theme state (OS default, remembered once toggled)
       ↓
src/components/*.tsx        ← React components
       ↓
src/App.tsx                 ← root component composing all sections
src/main.tsx                ← createRoot().render(<App />)
```

### Component pattern

Every component is a named React function export. Interactive state is managed with hooks — no `init*()` functions.

- Scroll-reveal: attach `useScrollReveal` ref to the element that also has `className="... reveal"`
- Active nav: `useActiveSection(sectionIds)` returns the current section id as a string
- Theme: `useTheme()` lives in `App` and is passed down to `Header` (toggle) and `Intro` → `HeroCanvas` (redraws in the new colours). It writes `data-theme` on `<html>` in a layout effect; an inline script in `index.html` sets it before first paint so there is no flash
- Layout: sticky top `Header` (no sidebar). Sections sit between two vertical hairline "rails" (`.main__rails`) and are separated by horizontal hairlines
- Hero background: `HeroCanvas` draws the grid with travelling light beams and pointer-reactive intersections on a `<canvas>`. It pauses off-screen and draws a static grid under `prefers-reduced-motion`

### Icon system (`src/utils/icons.tsx`)

Icons are exported as component maps for direct JSX use:
```tsx
export const stackIconMap: Record<string, ComponentType<IconProps>> = { ... };
export const socialIconMap: Record<string, ComponentType<IconProps>> = { ... };
```

Usage in components:
```tsx
const Icon = stackIconMap[item.icon];
{Icon ? <Icon size={36} color="currentColor" /> : <span>{item.icon}</span>}
```

Icons that are **not** keyed from `content.ts` are plain named exports instead of map
entries — `LiveDemoIcon` / `SourceCodeIcon` (project card links), `CursorIcon`,
`FrontendMastersIcon`, plus UI chrome (`ThemeLightIcon`, `MenuIcon`, `SearchIcon`, …). Import them directly:
```tsx
<LiveDemoIcon size={15} aria-hidden="true" />
```
react-icons does not set `aria-hidden`, so pass it explicitly on decorative icons.

**All stack and social icons are monochrome** — rendered with `color="currentColor"` so they follow the theme. Do not reintroduce brand colours (the `brandColor` fields in `content.ts` are no longer rendered). `CursorIcon` uses opacity-shaded `currentColor` faces; `FrontendMastersIcon` is a monochrome "FM" roundel because SimpleIcons has no entry.

Icon sources used:
- `react-icons/si` — SimpleIcons (most tech logos)
- `react-icons/vsc` — VS Code icon set (`VscVscode`)
- `react-icons/fa6` — Font Awesome 6 (`FaLinkedin`)
- `react-icons/fi` — Feather (`FiArrowUpRight`)
- Cursor AI — `CursorIcon` custom component (monochrome version of the official cube)

## Key files

| File | Purpose |
|---|---|
| `src/config/content.ts` | All site copy, projects, social links, stack groups — edit here to personalise |
| `src/style.css` | All styles: `@theme` variables, BEM component classes, responsive breakpoints |
| `src/utils/icons.tsx` | Icon maps (`stackIconMap`, `socialIconMap`) plus named icon exports |
| `src/App.tsx` | Root component — owns the theme, composes Header, all sections, footer |
| `src/hooks/useScrollReveal.ts` | IntersectionObserver ref hook for scroll-reveal |
| `src/hooks/useActiveSection.ts` | IntersectionObserver hook returning active section id |
| `index.html` | Theme bootstrap script, Google Fonts (`Geist`, `Geist Mono`) import, meta tags |
| `vite.config.ts` | Vite config — plugins: `@vitejs/plugin-react`, `@tailwindcss/vite` |

## Styling conventions

- **Theme**: fonts live in the `@theme {}` block; colours are semantic tokens (`--color-bg`, `--color-fg`, `--color-muted`, `--color-line`, `--color-soft`, `--color-chip`, `--color-inv-bg/fg`, …) defined twice — under `:root[data-theme="dark"]` and `:root[data-theme="light"]`. Always add a new colour to **both** blocks. The palette is monochrome; the only colour is the hero glow and canvas beams.
- **Naming**: BEM — `.header__link`, `.header__link--active`, `.stack__item`, `.project-card__title`.
- **Hairline grids**: cells in the stack, projects and social grids draw their right/bottom lines with `box-shadow: 1px 0 0 var(--color-line), 0 1px 0 var(--color-line)` and the grid has `overflow: hidden`, so lines never double up against the rails.
- **Hover**: cells get `--color-soft` background; project screenshots lift `translateY(-4px)`; buttons `translateY(-2px)`. Project cards also have a cursor spotlight (`::before` radial gradient positioned by `--mx/--my`, set in `trackPointer`).
- **Header nav active state**: animated `scaleX` underline via `::after` pseudo-element transitioning from 0 → 1.
- **Scroll reveal**: elements with class `reveal` fade in via `IntersectionObserver` adding `reveal--visible`.
- **CSS custom properties in style prop**: use `style={{ "--some-var": value } as CSSProperties}` — the type assertion is required.
- **Project card heights**: all cards are locked to one height — `grid-auto-rows: 1fr` on `.projects-grid`, `.project-card` as a flex column, `.project-card__links` pinned with `margin-top: auto`. The badge row (24px), title (2-line clamp, `2.6em`), description (3-line clamp, `4.65em`) and tag row (2 rows, `54px`) each clamp **and** reserve their space with `min-height`. Changing a clamp, a font size or a line-height means re-measuring the matching `min-height`, or the cards go ragged again. Verify by asserting every `.project-card` reports the same `offsetHeight`.
- **Contrast**: `--color-muted` is the lightest text colour allowed — 7.9:1 on black (dark) and 6.4:1 on white (light). Do not use `--color-line` or `--color-chip` for text.

## Adding/changing content

- **Text, projects, social links, stack items** → `src/config/content.ts` only, no component changes needed.
- **New project** → every entry needs a required `kind: "frontend" | "fullstack"` (the build fails without it). Optional `deployment` takes one `DeployPlatform` or an array (`["vercel", "render"]`) — omit it entirely for undeployed projects. Optional `sdd: true` marks spec-driven builds. All three render as badges at the top of the card.
- **Project tags** → cards render at most `MAX_VISIBLE_TAGS` (4) plus a `+N` chip; the **Details** dialog shows the full description and every tag. `orderTags` hoists tags matched by the active filters to the front, so a filtered card always visibly shows why it matched.
- **Project filters** → chips are curated in `content.projects.filterGroups` (Frameworks / Methodologies / AI) — deliberately no HTML/CSS/JS basics. A `ProjectFilter` matches when a project has any of its `tags`, its description contains `text`, or (`sdd: true`) it is spec-driven. Chips that match no project are hidden automatically. Selected chips combine with AND; the search box matches title, description and tags.
- **Hero / stats** → `intro.badge`, `intro.heroLead` + rotating `intro.heroWords`, `intro.heroSummary`, and the `stats` array (`{projects}` is replaced with the live project count). The older `headline` / `taglineParagraphs` fields render in the About block under the stats.
- **New card link** → give it a unique `aria-label` (`` `Live Demo for ${project.title}` ``). The visible text repeats across every card, so without one the screen-reader link list is ambiguous; keep the visible text at the start of the label for WCAG 2.5.3.
- **New stack icon** → add entry to `stackIconMap` in `src/utils/icons.tsx`, reference key in `content.ts`.
- **New section** → create `src/components/NewSection.tsx` as a React component, import and compose in `src/App.tsx`.

## TypeScript notes

`tsconfig.json` enforces `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `jsx: react-jsx`. Type-only imports must use `import type`. The `react-jsx` transform means JSX works without importing React at the top of every file.

## dangerouslySetInnerHTML

Used in one place for `content.footer` (which may contain HTML entities or `<a>` tags):
- `src/App.tsx` — page footer

Content is developer-controlled so there is no XSS risk.
