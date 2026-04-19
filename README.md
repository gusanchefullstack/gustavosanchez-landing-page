# Gustavo Sanchez — Personal Landing Page

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

A personal developer portfolio and landing page built with React 19, TypeScript, Vite, and Tailwind CSS. Designed with a Hyperspace-inspired dark theme featuring a fixed sidebar navigation, smooth scroll-reveal animations, and a fully content-driven architecture.

## Live sections

| Section | Description |
|---|---|
| **Intro** | Hero with profile photo, name, two-line headline (rich text spans), multi-paragraph tagline with optional typewriter on the last two paragraphs, and CTA |
| **Stack** | Tech skills grouped by category (Frontend, Backend, API, Database, Dev Tools) with react-icons |
| **Projects** | Card grid showcasing featured work with tags and links; filterable by title (text search) and technology (tag chips with AND logic) |
| **Social** | Profile cards for LinkedIn, GitHub, Hashnode, X, Bluesky, freeCodeCamp |
| **Contact** | Contact form (powered by Formspree) with info sidebar |

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5.9 (strict mode) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Icons | react-icons 5 (si / vsc / fa6 sets) |
| Form handling | Formspree (`@formspree/react`) |
| Font | Outfit (Google Fonts) |
| Deployment | — |

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
│   └── projects/                 # Project screenshot images (served as static assets)
│       ├── qr-component.png
│       ├── blog-preview-card.png
│       ├── social-links-profile.png
│       └── nft-preview-card.png
├── src/
│   ├── components/
│   │   ├── Contact.tsx           # Contact form + info sidebar
│   │   ├── Intro.tsx             # Hero section with profile photo
│   │   ├── Projects.tsx          # Project card grid
│   │   ├── Sidebar.tsx           # Fixed nav + mobile hamburger
│   │   ├── Social.tsx            # Social profile cards
│   │   └── Stack.tsx             # Tech stack grouped by category
│   ├── config/
│   │   ├── content.ts            # ← All site copy, projects, links (edit here)
│   │   └── theme.ts              # Theme tokens mirroring CSS variables
│   ├── hooks/
│   │   ├── useActiveSection.ts        # IntersectionObserver hook for active nav link
│   │   ├── useIntroTaglineTypewriter.ts  # Plain-text typing then rich reveal (last N tagline paragraphs)
│   │   ├── usePrefersReducedMotion.ts    # `prefers-reduced-motion` for accessible motion defaults
│   │   └── useScrollReveal.ts         # IntersectionObserver hook for scroll-reveal
│   ├── utils/
│   │   └── icons.tsx             # react-icons component maps
│   ├── App.tsx                   # Root component composing all sections
│   ├── main.tsx                  # Entry point — createRoot().render(<App />)
│   └── style.css                 # All styles: @theme variables, BEM classes, breakpoints
├── index.html                    # Entry HTML, Google Fonts import
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

**Intro copy** is structured as span arrays:

- **`headline`** / **`subheadline`** — arrays of `IntroTextSpan` (`text`, optional `accent`, `accentTone`, `accentGradient`).
- **`accentTone`** (`0`–`4`) maps to gray/white emphasis in CSS (`.intro__accent--*`).
- **`accentGradient: true`** uses the brand gradient (e.g. “learning mode”) instead of gray tones.
- **`taglineParagraphs`** — each paragraph is an array of spans; the **last two** paragraphs use a **typewriter** effect by default (plain characters first, then accented markup). Timing is configured in `Intro.tsx` (`useIntroTaglineTypewriter`). Users with **`prefers-reduced-motion: reduce`** see full rich text immediately.

### Change the visual theme
All colours, fonts, spacing, and transition speeds are CSS custom properties in the `@theme {}` block at the top of `src/style.css`:

```css
@theme {
  --color-bg-primary: #1a1a2e;
  --color-accent-start: #6c63ff;
  --color-accent-end: #e942f5;
  --font-body: "Outfit", sans-serif;
  /* ... */
}
```

Change values here to re-skin the entire site.

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
src/hooks/useIntroTaglineTypewriter.ts  ← intro tagline typewriter (last paragraphs)
src/hooks/usePrefersReducedMotion.ts    ← reduced-motion preference
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
      <div className="section__inner reveal" ref={ref}>
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

Icons use `color="currentColor"` so CSS controls their colour. The Cursor AI icon is a custom `CursorIcon` component with the official multi-color 3D cube SVG.

### Interactivity

| Feature | Implementation |
|---|---|
| Active nav link | `useActiveSection` hook — `IntersectionObserver` returns current section id |
| Scroll-reveal | `useScrollReveal` hook — adds `.reveal--visible` when element enters viewport |
| Intro tagline typewriter | `useIntroTaglineTypewriter` — types plain text, then swaps to `IntroTextSpan` markup; disabled when `usePrefersReducedMotion` is true |
| Nav underline animation | CSS `::after` pseudo-element, `transform: scaleX()` transition |
| Mobile sidebar | `useState(isOpen)` drives `.sidebar--open` and overlay visibility |
| Contact form | `@formspree/react` — `useForm` hook handles submission, validation errors, and success state |
| Projects filter | `useState` + `useMemo` in `Projects.tsx` — text input filters by title substring, chip toggles filter by tag with AND logic, derived tag list from `content.ts` |

### Contact form (Formspree)

The contact form is wired to [Formspree](https://formspree.io). Submissions are handled server-side — no backend code required.

```tsx
// src/components/Contact.tsx
import { useForm, ValidationError } from "@formspree/react";

const [state, handleSubmit] = useForm("YOUR_FORM_ID");
```

To use your own form endpoint, replace the form ID string in `src/components/Contact.tsx` with the one from your Formspree dashboard.

## Styling conventions

- **BEM naming** — `.sidebar__link`, `.sidebar__link--active`, `.stack-card__icon`
- **Gradients** — always `135deg` from `--color-accent-start` → `--color-accent-end`
- **Hover elevations** — `translateY(-4px)` on cards, `translateY(-2px)` on buttons
- **Responsive breakpoints** — `900px` (sidebar → hamburger), `600px` (further mobile)
- **Intro** — `.intro__title` scales both headline lines; `.intro__accent--0`…`--4` are gray/white keyword highlights; `.intro__title-accent` is the gradient highlight; `.intro__typewriter-cursor` styles the tagline cursor. Layout/spacing for the hero is tuned under `.intro` (including a `901px` media query).

## What I learned

This project is both a personal portfolio and a learning log. Notes captured along the way:

### Architecture
- **Content-driven UI.** A single `src/config/content.ts` typed with `SiteContent` keeps copy, projects, stack, and social links out of component files. Components stay about rendering; edits never require touching JSX.
- **Client-side filtering with `useMemo`.** The Projects filter derives the unique tag list and the filtered items via memoized selectors over `content.projects.items` — avoids recomputation on every render and keeps the component readable.
- **Hooks over imperative DOM.** `IntersectionObserver` logic lives in `useScrollReveal` / `useActiveSection`; reduced-motion handling in `usePrefersReducedMotion`. Composable, testable, no manual cleanup boilerplate in components.

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

### Errors solved
- **Vite port collision.** `5173` was in use; Vite auto-falls back to `5174`. Always read the actual URL from the dev server log instead of assuming.
- **Invisible typewriter cursor under reduced motion.** Fixed by gating the typewriter hook on `usePrefersReducedMotion` so users who opt out see the full rich markup immediately.
- **`verbatimModuleSyntax` build failures.** Type-only imports (e.g. `CSSProperties`) must use `import type`, otherwise the emitted JS retains an unused runtime import and fails type-check.

## Author

**Gustavo Sanchez** — [gustavosanchez.dev](https://www.gustavosanchez.dev) — gustavosanchezgalarza@gmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gustavosanchezgalarza/)
[![GitHub](https://img.shields.io/badge/GitHub-24292f?logo=github&logoColor=white)](https://github.com/gusanchefullstack)
[![Hashnode](https://img.shields.io/badge/Hashnode-2962FF?logo=hashnode&logoColor=white)](https://hashnode.com/@gusanchedev)
[![X](https://img.shields.io/badge/X-000000?logo=x&logoColor=white)](https://x.com/gusanchedev)
[![Bluesky](https://img.shields.io/badge/Bluesky-0085FF?logo=bluesky&logoColor=white)](https://bsky.app/profile/gusanchedev.bsky.social)
[![freeCodeCamp](https://img.shields.io/badge/freeCodeCamp-0A0A23?logo=freecodecamp&logoColor=white)](https://www.freecodecamp.org/gusanchedev)

## Credits

Design inspired by [Hyperspace](https://html5up.net/hyperspace) by [HTML5 UP](https://html5up.net) (free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license)).
