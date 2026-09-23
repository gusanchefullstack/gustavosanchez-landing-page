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
`FrontendMastersIcon`. Import them directly:
```tsx
<LiveDemoIcon size={15} aria-hidden="true" />
```
react-icons does not set `aria-hidden`, so pass it explicitly on decorative icons.

Icon sources used:
- `react-icons/si` — SimpleIcons (most tech logos)
- `react-icons/vsc` — VS Code icon set (`VscVscode`)
- `react-icons/fa6` — Font Awesome 6 (`FaLinkedin`)
- `react-icons/fi` — Feather (`FiArrowUpRight`)
- Cursor AI — `CursorIcon` custom component with official multi-color SVG

## Key files

| File | Purpose |
|---|---|
| `src/config/content.ts` | All site copy, projects, social links, stack groups — edit here to personalise |
| `src/config/theme.ts` | Theme tokens as TS constants mirroring CSS variables |
| `src/style.css` | All styles: `@theme` variables, BEM component classes, responsive breakpoints |
| `src/utils/icons.tsx` | Icon maps (`stackIconMap`, `socialIconMap`) plus named icon exports |
| `src/App.tsx` | Root component — composes Sidebar, all sections, footer |
| `src/hooks/useScrollReveal.ts` | IntersectionObserver ref hook for scroll-reveal |
| `src/hooks/useActiveSection.ts` | IntersectionObserver hook returning active section id |
| `index.html` | Google Fonts (`Outfit`) import, meta tags |
| `vite.config.ts` | Vite config — plugins: `@vitejs/plugin-react`, `@tailwindcss/vite` |

## Styling conventions

- **Theme**: CSS custom properties defined in a `@theme {}` block at the top of `style.css`. Change colours or fonts by editing variables there only.
- **Naming**: BEM — `.sidebar__link`, `.sidebar__link--active`, `.stack-card`, `.stack-card__icon`.
- **Gradients**: Always `135deg` from `--color-accent-start` → `--color-accent-end`.
- **Hover elevations**: `translateY(-4px)` on cards, `translateY(-2px)` on buttons.
- **Sidebar nav active state**: animated `scaleX` underline via `::after` pseudo-element transitioning from 0 → 1.
- **Scroll reveal**: elements with class `reveal` fade in via `IntersectionObserver` adding `reveal--visible`.
- **CSS custom properties in style prop**: use `style={{ "--brand-color": value } as CSSProperties}` — the type assertion is required.
- **Project card heights**: all cards are locked to one height — `grid-auto-rows: 1fr` on `.projects-grid`, `.project-card` as a flex column, `.project-card__links` pinned with `margin-top: auto`. The badge row, title (2-line clamp), description (3-line clamp) and tag row each clamp **and** reserve their space with `min-height`. Changing a clamp, a font size or a line-height means re-measuring the matching `min-height`, or the cards go ragged again. Verify by asserting every `.project-card` reports the same `offsetHeight`.
- **Link contrast**: project card links use `--color-text-link` (#9d97ff, 5.79:1 on cards). Do not unify them with `--color-text-accent` (#6c63ff) — that is the tag-chip colour and measures 3.39:1, below WCAG AA.

## Adding/changing content

- **Text, projects, social links, stack items** → `src/config/content.ts` only, no component changes needed.
- **New project** → every entry needs a required `kind: "frontend" | "fullstack"` (the build fails without it). Optional `deployment` takes one `DeployPlatform` or an array (`["vercel", "render"]`) — omit it entirely for undeployed projects. Optional `sdd: true` marks spec-driven builds. All three render as badges at the top of the card.
- **Project tags** → cards render at most `MAX_VISIBLE_TAGS` (4) plus a `+N` chip. `orderTags` hoists tags matching the active filter to the front, so a filtered card always visibly shows the tag it matched. Both live in `Projects.tsx`; the filter itself still matches against the full `tags` array.
- **New card link** → give it a unique `aria-label` (`` `Live Demo for ${project.title}` ``). The visible text repeats across every card, so without one the screen-reader link list is ambiguous; keep the visible text at the start of the label for WCAG 2.5.3.
- **New stack icon** → add entry to `stackIconMap` in `src/utils/icons.tsx`, reference key in `content.ts`.
- **New section** → create `src/components/NewSection.tsx` as a React component, import and compose in `src/App.tsx`.

## TypeScript notes

`tsconfig.json` enforces `strict`, `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, and `jsx: react-jsx`. Type-only imports must use `import type`. The `react-jsx` transform means JSX works without importing React at the top of every file.

## dangerouslySetInnerHTML

Used in two places for `content.footer` (which contains `<a>` tags):
- `src/components/Sidebar.tsx` — sidebar footer
- `src/App.tsx` — main page footer

Content is developer-controlled so there is no XSS risk.
