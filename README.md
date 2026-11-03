# Gustavo Sanchez — Personal Landing Page

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

A personal developer portfolio and landing page built with React 19, TypeScript, Vite, and Tailwind CSS. A monochrome, hairline-grid design with light and dark themes, an animated canvas hero, smooth scroll-reveal animations, and a fully content-driven architecture.

## Live sections

| Section | Description |
|---|---|
| **Intro** | Animated canvas hero (grid with travelling light beams, pointer-reactive intersections), rotating headline, copy-email button, stats row, and an About block with profile photo |
| **Stack** | Tech skills grouped by category (Frontend, Backend, API, AI, Database, Dev Tools), each with a monochrome icon |
| **Projects** | Card grid with badges, tags, links and a **Details** dialog (full description + complete tech list); searchable by name, description or technology and filterable by curated Framework / Methodology / AI chips |
| **Blog** | Latest posts published on DEV |
| **Social** | Profile links with monochrome icons for LinkedIn, GitHub, DEV, X, Bluesky, Frontend Mentor, Frontend Masters |
| **Contact** | Contact form (powered by Formspree) with email, location and availability |

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 (strict mode) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Icons | react-icons 5 (si / vsc / fa6 / fi sets) |
| Form handling | Formspree (`@formspree/react`) |
| Fonts | Geist + Geist Mono (Google Fonts) |
| Deployment | Vercel (preview deployment for every pushed branch) |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:5173
npm run dev

# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
├── public/
│   ├── Me.jpg                    # Profile photo
│   └── projects/                 # Project screenshots (*.png / *.jpg, served as static assets)
├── src/
│   ├── components/
│   │   ├── Blog.tsx              # DEV posts list
│   │   ├── Contact.tsx           # Contact form + info
│   │   ├── Header.tsx            # Sticky top nav, theme toggle, mobile menu
│   │   ├── HeroCanvas.tsx        # Animated grid/beam canvas behind the hero
│   │   ├── Intro.tsx             # Hero, stats row and About block
│   │   ├── Projects.tsx          # Search, curated filters, card grid, Details dialog
│   │   ├── Social.tsx            # Social profile links
│   │   └── Stack.tsx             # Tech stack grouped by category
│   ├── config/
│   │   └── content.ts            # ← All site copy, projects, filters, links (edit here)
│   ├── hooks/
│   │   ├── useActiveSection.ts        # IntersectionObserver hook for active nav link
│   │   ├── useScrollReveal.ts         # IntersectionObserver hook for scroll-reveal
│   │   └── useTheme.ts                # Light/dark theme state
│   ├── utils/
│   │   └── icons.tsx             # react-icons component maps
│   ├── App.tsx                   # Root component composing all sections
│   ├── main.tsx                  # Entry point — createRoot().render(<App />)
│   └── style.css                 # All styles: @theme variables, BEM classes, breakpoints
├── index.html                    # Entry HTML, theme bootstrap script, Google Fonts import
├── vite.config.ts
└── tsconfig.json
```

## Customisation

### Change content
All text, projects, social links, stack items, and metadata live in **one file**:

```
src/config/content.ts
```

Edit values there — no component changes needed for most copy updates. The TypeScript interfaces (`SiteContent`, `IntroContent`, `IntroTextSpan`, `Project`, `SocialLink`, `StackGroup`, etc.) will catch structural mistakes at compile time.

**Hero and About copy:**

- **`intro.badge`**, **`intro.heroLead`**, **`intro.heroWords`** (the rotating endings) and **`intro.heroSummary`** drive the hero.
- **`stats`** — the "at a glance" row; `{projects}` in a value is replaced with the live project count.
- **`headline`** and **`taglineParagraphs`** — arrays of `IntroTextSpan` rendered in the About block; spans with `accent: true` are emphasised.

**Project filters** are curated in `content.projects.filterGroups` (Frameworks / Methodologies / AI). A filter matches a project that has any of its `tags`, whose description contains its `text`, or — with `sdd: true` — that was built spec-driven. Chips that match no project are hidden automatically.

### Change the visual theme
Fonts live in the `@theme {}` block at the top of `src/style.css`. Colours are semantic tokens defined once per theme:

```css
:root[data-theme="dark"] {
  --color-bg: #000000;
  --color-fg: #ededed;
  --color-muted: #a1a1a1;
  --color-line: #262626;
  /* ... */
}

:root[data-theme="light"] {
  --color-bg: #ffffff;
  --color-fg: #171717;
  --color-muted: #5f5f5f;
  --color-line: #e5e5e5;
  /* ... */
}
```

Add any new colour to **both** blocks. The theme follows the visitor's OS setting until they use the toggle, after which the choice is remembered in `localStorage`.

### Add a stack icon
1. Import the icon in `src/utils/icons.tsx`
2. Add it to the `stackIconMap` record with a string key
3. Reference that key in `content.ts` under the relevant stack group

```tsx
// src/utils/icons.tsx
import { SiDocker } from "react-icons/si";
export const stackIconMap = {
  // ...
  docker: SiDocker,
};

// src/config/content.ts
{ name: "Docker", icon: "docker", brandColor: "#2496ED" }
```

Icons render in monochrome (`color="currentColor"`) so they follow the theme; `brandColor` is kept in the data but not displayed.

### Add a new section
1. Create `src/components/NewSection.tsx` as a React component
2. Import and compose it in `src/App.tsx`

```tsx
// src/components/NewSection.tsx
import { content } from "../config/content.ts";

export function NewSection() {
  return <section id="new-section" className="section">...</section>;
}

// src/App.tsx
import { NewSection } from "./components/NewSection.tsx";
// Add <NewSection /> inside the <main> element
```

## Architecture

### Data flow

```
src/config/content.ts              ← single source of truth
src/utils/icons.tsx              ← react-icons component maps
src/hooks/useScrollReveal.ts     ← scroll-reveal IntersectionObserver
src/hooks/useActiveSection.ts    ← active nav IntersectionObserver
src/hooks/useTheme.ts            ← light/dark theme state
        ↓
src/components/*.tsx             ← React components
        ↓
src/App.tsx                   ← root component
src/main.tsx                  ← createRoot().render(<StrictMode><App /></StrictMode>)
```

### Component pattern

Every component is a named React function export. State and side effects use hooks — no imperative DOM manipulation.

```tsx
// Scroll-reveal: attach ref to the element with className="... reveal"
export function MySection() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section>
      <div className="reveal" ref={ref}>
        {/* content */}
      </div>
    </section>
  );
}
```

### Icon system

Icons are `ComponentType` maps — rendered directly in JSX with a string-key fallback:

```tsx
const Icon = stackIconMap[item.icon];
{Icon ? <Icon size={36} color="currentColor" /> : <span>{item.icon}</span>}
```

Icons use `color="currentColor"` so CSS controls their colour and every icon stays black-and-white in both themes. `CursorIcon` is a monochrome version of the official Cursor cube, and `FrontendMastersIcon` is a custom "FM" roundel (SimpleIcons has no entry).

### Interactivity

| Feature | Implementation |
|---|---|
| Active nav link | `useActiveSection` hook — `IntersectionObserver` returns current section id |
| Scroll-reveal | `useScrollReveal` hook — adds `.reveal--visible` when element enters viewport |
| Nav underline animation | CSS `::after` pseudo-element, `transform: scaleX()` transition |
| Mobile menu | `useState(isOpen)` in `Header.tsx` drives `.header__nav--open` |
| Light/dark theme | `useTheme` hook + inline script in `index.html` that sets `data-theme` before first paint (no flash) |
| Hero animation | `HeroCanvas` — `<canvas>` + `requestAnimationFrame`; pauses off-screen, static under `prefers-reduced-motion` |
| Rotating headline | `setInterval` index in `Intro.tsx`; screen readers get the full list via an `sr-only` span |
| Contact form | `@formspree/react` — `useForm` hook handles submission, validation errors, and success state |
| Projects search & filters | `useState` + `useMemo` in `Projects.tsx` — search matches title, description and tags; curated chips combine with AND logic; matched tags are hoisted to the front of each card |
| Project details | Native `<dialog>` with `showModal()` — Escape, focus trapping and backdrop come for free |
| Card spotlight | `onPointerMove` sets `--mx`/`--my` on the card; a `::before` radial gradient follows them |

### Contact form (Formspree)

The contact form is wired to [Formspree](https://formspree.io). Submissions are handled server-side — no backend code required.

```tsx
// src/components/Contact.tsx
import { useForm, ValidationError } from "@formspree/react";

const [state, handleSubmit] = useForm("YOUR_FORM_ID");
```

To use your own form endpoint, replace the form ID string in `src/components/Contact.tsx` with the one from your Formspree dashboard.

## Styling conventions

- **BEM naming** — `.header__link`, `.header__link--active`, `.stack__item`, `.project-card__title`
- **Monochrome palette** — the only colour on the page is the hero glow and canvas beams
- **Hairline grid** — sections sit between two vertical rails; grid cells draw their lines with `box-shadow` so borders never double up
- **Hover** — cells tint to `--color-soft`, project screenshots lift `translateY(-4px)`, buttons `translateY(-2px)`
- **Uniform project cards** — `grid-auto-rows: 1fr` plus clamped, min-height-reserved title / description / tag rows
- **Responsive breakpoints** — `900px` (nav → menu button, single-column stats/about/contact), `600px` (further mobile)

## What I learned

This project is both a personal portfolio and a learning log. Notes captured along the way:

### Architecture
- **Content-driven UI.** A single `src/config/content.ts` typed with `SiteContent` keeps copy, projects, stack, and social links out of component files. Components stay about rendering; edits never require touching JSX.
- **Client-side filtering with `useMemo`.** The Projects filter derives the unique tag list and the filtered items via memoized selectors over `content.projects.items` — avoids recomputation on every render and keeps the component readable.
- **Hooks over imperative DOM.** `IntersectionObserver` logic lives in `useScrollReveal` / `useActiveSection`. Composable, testable, no manual cleanup boilerplate in components.
- **Theme without a flash.** React mounts too late to pick the theme, so a tiny inline script in `index.html` sets `data-theme` before first paint; `useTheme` then takes over. It writes the attribute in a `useLayoutEffect` so child effects (the hero canvas reads CSS colour tokens) always see the new theme.
- **Canvas animation etiquette.** The hero canvas scales for `devicePixelRatio`, stops drawing when an `IntersectionObserver` says it's off-screen, and falls back to a static grid under `prefers-reduced-motion`.

### Tooling & stack
- **React 19 + `jsx: react-jsx`** — no per-file `import React`; the runtime handles it.
- **TypeScript `verbatimModuleSyntax: true`** — type-only symbols must use `import type` or the build fails. Clear separation pays off in tree-shaking.
- **CSS custom properties in `style` prop** — `style={{ "--brand-color": val } as CSSProperties}`. The cast is mandatory; TS doesn't widen arbitrary CSS vars.
- **Tailwind v4 `@theme {}`** — tokens declared in CSS, not `tailwind.config.js`. Simpler mental model when the palette is already a design system.

### Key references
- [React 19 docs](https://react.dev) — `useMemo`, ref callbacks, transitions.
- [Vite guide](https://vitejs.dev/guide/) — dev server, static asset handling for `public/`.
- [TypeScript 5.9 handbook](https://www.typescriptlang.org/docs/) — `verbatimModuleSyntax`, `erasableSyntaxOnly`.
- [Tailwind CSS v4](https://tailwindcss.com/docs) — `@theme` directive and CSS-first config.
- [react-icons](https://react-icons.github.io/react-icons/) — SimpleIcons, VS Code, Font Awesome sets.
- [Formspree React](https://formspree.io/react/) — `useForm` / `ValidationError`.
- [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) — root, threshold, entry lifecycle.
- [WAI-ARIA `aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed) — the correct attribute for toggle buttons (used by the filter chips).
- [MDN: `<dialog>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) — `showModal()`, `::backdrop`, the `close` event.
- [Geist font](https://vercel.com/font) — open-source typeface used for headings, body and mono.

### Errors solved
- **Vite port collision.** `5173` was in use; Vite auto-falls back to `5174`. Always read the actual URL from the dev server log instead of assuming.
- **`verbatimModuleSyntax` build failures.** Type-only imports (e.g. `CSSProperties`) must use `import type`, otherwise the emitted JS retains an unused runtime import and fails type-check.

## Author

**Gustavo Sanchez** — [gustavosanchez.dev](https://www.gustavosanchez.dev) — gustavosanchezgalarza@gmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavosanchezgalarza/)
[![GitHub](https://img.shields.io/badge/GitHub-24292f?logo=github&logoColor=white)](https://github.com/gusanchefullstack)
[![DEV](https://img.shields.io/badge/DEV-0A0A0A?logo=devdotto&logoColor=white)](https://dev.to/gusanchedev)
[![X](https://img.shields.io/badge/X-000000?logo=x&logoColor=white)](https://x.com/gusanchedev)
[![Bluesky](https://img.shields.io/badge/Bluesky-0085FF?logo=bluesky&logoColor=white)](https://bsky.app/profile/gusanchedev.bsky.social)
[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-3F54A3?logo=frontendmentor&logoColor=white)](https://www.frontendmentor.io/profile/gusanchefullstack)

## Credits

Visual direction inspired by the monochrome, grid-based style of [vercel.com](https://vercel.com). Typeface: [Geist](https://vercel.com/font) (SIL Open Font License). The previous version of the site was based on [Hyperspace](https://html5up.net/hyperspace) by [HTML5 UP](https://html5up.net).
