# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (http://localhost:5173)
npm run build     # Type-check (tsc) then build for production
npm run preview   # Preview the production build locally
```

## Architecture

Vanilla TypeScript + Vite SPA. React is used **only** in `src/utils/icons.ts` to convert `react-icons` components to SVG strings via `renderToStaticMarkup`. There is no React rendering in the app.

### Data flow

```
src/config/content.ts   ← single source of truth for all text/data
src/utils/icons.ts      ← converts react-icons → SVG strings
       ↓
src/components/*.ts     ← render*() returns HTML string, init*() binds events
       ↓
src/main.ts             ← composes all sections, writes to #app, calls init*()
```

### Component pattern

Every component exports one or two functions:
- `render*(): string` — returns an HTML template literal, reads from `content`
- `init*(): void` — optional, binds DOM event listeners after HTML is inserted

**Sidebar** additionally uses `IntersectionObserver` to highlight the active nav link as sections scroll into view.

### Icon system (`src/utils/icons.ts`)

Icons are pre-rendered to SVG strings at module load time:
```ts
function icon(Icon: ComponentType<IconProps>): string {
  return renderToStaticMarkup(createElement(Icon, { size: 36, color: "currentColor" }));
}
export const stackIcons: Record<string, string> = { ... };
export const socialIcons: Record<string, string> = { ... };
```

Components look up icons by string key with a fallback:
```ts
${stackIcons[item.icon] ?? item.icon}
```

Icon sources used:
- `react-icons/si` — SimpleIcons (most tech logos)
- `react-icons/vsc` — VS Code icon set (`VscVscode`)
- `react-icons/fa6` — Font Awesome 6 (`FaLinkedin`)
- Cursor AI — custom inline SVG (not yet in SimpleIcons)

## Key files

| File | Purpose |
|---|---|
| `src/config/content.ts` | All site copy, projects, social links, stack groups — edit here to personalise |
| `src/config/theme.ts` | Theme tokens as TS constants mirroring CSS variables |
| `src/style.css` | All styles: `@theme` variables, BEM component classes, responsive breakpoints |
| `src/utils/icons.ts` | Icon conversion utility; exports `stackIcons` and `socialIcons` maps |
| `index.html` | Google Fonts (`Outfit`) import, meta tags |
| `vite.config.ts` | Vite config — only plugin is `@tailwindcss/vite` |

## Styling conventions

- **Theme**: CSS custom properties defined in a `@theme {}` block at the top of `style.css`. Change colours or fonts by editing variables there only.
- **Naming**: BEM — `.sidebar__link`, `.sidebar__link--active`, `.stack-card`, `.stack-card__icon`.
- **Gradients**: Always `135deg` from `--color-accent-start` → `--color-accent-end`.
- **Hover elevations**: `translateY(-4px)` on cards, `translateY(-2px)` on buttons.
- **Sidebar nav active state**: animated `scaleX` underline via `::after` pseudo-element transitioning from 0 → 1.
- **Scroll reveal**: elements with class `reveal` fade in via `IntersectionObserver` adding `reveal--visible`.

## Adding/changing content

- **Text, projects, social links, stack items** → `src/config/content.ts` only, no component changes needed.
- **New stack icon** → add key to `stackIcons` in `src/utils/icons.ts`, reference key in `content.ts`.
- **New section** → create `src/components/NewSection.ts` following the `render*`/`init*` pattern, import and compose in `src/main.ts`.

## TypeScript notes

`tsconfig.json` enforces `strict`, `noUnusedLocals`, `noUnusedParameters`, and `verbatimModuleSyntax`. Type-only imports must use `import type`.
