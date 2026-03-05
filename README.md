# Gustavo Sanchez — Personal Landing Page

A personal developer portfolio and landing page built with vanilla TypeScript, Vite, and Tailwind CSS. Designed with a Hyperspace-inspired dark theme featuring a fixed sidebar navigation, smooth scroll-reveal animations, and a fully content-driven architecture.

## Live sections

| Section | Description |
|---|---|
| **Intro** | Hero with profile photo, name, title, tagline, and CTA |
| **Stack** | Tech skills grouped by category (Frontend, Backend, API, Database, Dev Tools) with react-icons SVG icons |
| **Projects** | Card grid showcasing featured work with tags and links |
| **Social** | Profile cards for LinkedIn, GitHub, Hashnode, X, Bluesky, freeCodeCamp |
| **Contact** | Contact form with info sidebar |

## Tech stack

| Layer | Technology |
|---|---|
| Language | TypeScript 5.9 (strict mode) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Icons | react-icons 5 (si / vsc / fa6 sets) + React 19 for SVG rendering |
| Font | Outfit (Google Fonts) |
| Deployment | — |

> React is used **only** as a server-side utility to convert `react-icons` components to inline SVG strings via `renderToStaticMarkup`. There is no React rendering in the browser.

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
│   └── Me.jpg               # Profile photo
├── src/
│   ├── components/
│   │   ├── Contact.ts       # Contact form + info sidebar
│   │   ├── Intro.ts         # Hero section with profile photo
│   │   ├── Projects.ts      # Project card grid
│   │   ├── Sidebar.ts       # Fixed nav + mobile hamburger
│   │   ├── Social.ts        # Social profile cards
│   │   └── Stack.ts         # Tech stack grouped by category
│   ├── config/
│   │   ├── content.ts       # ← All site copy, projects, links (edit here)
│   │   └── theme.ts         # Theme tokens mirroring CSS variables
│   ├── utils/
│   │   └── icons.ts         # react-icons → SVG string conversion
│   ├── main.ts              # Composes page, mounts to DOM, inits behaviour
│   └── style.css            # All styles: @theme variables, BEM classes, breakpoints
├── index.html               # Entry HTML, Google Fonts import
├── vite.config.ts
└── tsconfig.json
```

## Customisation

### Change content
All text, projects, social links, stack items, and metadata live in **one file**:

```
src/config/content.ts
```

Edit values there — no component changes needed. The TypeScript interfaces (`SiteContent`, `Project`, `SocialLink`, `StackGroup`, etc.) will catch any structural mistakes at compile time.

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
1. Import the icon in `src/utils/icons.ts`
2. Add it to the `stackIcons` record with a string key
3. Reference that key in `content.ts` under the relevant stack group

```ts
// src/utils/icons.ts
import { SiDocker } from "react-icons/si";
export const stackIcons = {
  // ...
  docker: icon(SiDocker),
};

// src/config/content.ts
{ name: "Docker", icon: "docker" }
```

### Add a new section
1. Create `src/components/NewSection.ts` following the `render*` / `init*` pattern
2. Import and compose it in `src/main.ts`

```ts
// src/components/NewSection.ts
import { content } from "../config/content.ts";

export function renderNewSection(): string {
  return `<section id="new-section" class="section">...</section>`;
}

// src/main.ts
import { renderNewSection } from "./components/NewSection.ts";
app.innerHTML = `... ${renderNewSection()} ...`;
```

## Architecture

### Data flow

```
src/config/content.ts     ← single source of truth
src/utils/icons.ts        ← react-icons → SVG strings (build-time)
        ↓
src/components/*.ts       ← render*() → HTML string, init*() → event listeners
        ↓
src/main.ts               ← composes HTML, writes to #app, calls init*()
```

### Component pattern

Every component is a plain TypeScript module with up to two exports:

```ts
// Pure function — returns an HTML string from content.*
export function renderXxx(): string { ... }

// Optional — binds DOM event listeners after HTML is in the DOM
export function initXxx(): void { ... }
```

### Icon pipeline

```ts
// icons.ts — runs once at module load time
function icon(Icon: ComponentType<IconProps>): string {
  return renderToStaticMarkup(createElement(Icon, { size: 36, color: "currentColor" }));
}

export const stackIcons: Record<string, string> = {
  javascript: icon(SiJavascript),
  // ...
};

// In a component template:
${stackIcons[item.icon] ?? item.icon}  // fallback to raw string if key missing
```

Icons use `color: "currentColor"` so CSS controls their colour. The Cursor AI icon is a custom hand-crafted SVG (the 3D hexagonal gem logo) since it is not yet in SimpleIcons.

### Interactivity

| Feature | Implementation |
|---|---|
| Active nav link | `IntersectionObserver` on each section, adds `.sidebar__link--active` |
| Scroll-reveal | `IntersectionObserver` on `.reveal` elements, adds `.reveal--visible` |
| Nav underline animation | CSS `::after` pseudo-element, `transform: scaleX()` transition |
| Mobile sidebar | Hamburger toggle + overlay, `transform: translateX()` transition |
| Contact form | `preventDefault` + button feedback, 3 s timeout, form reset |

## Styling conventions

- **BEM naming** — `.sidebar__link`, `.sidebar__link--active`, `.stack-card__icon`
- **Gradients** — always `135deg` from `--color-accent-start` → `--color-accent-end`
- **Hover elevations** — `translateY(-4px)` on cards, `translateY(-2px)` on buttons
- **Responsive breakpoints** — `900px` (sidebar → hamburger), `600px` (further mobile)

## Credits

Design inspired by [Hyperspace](https://html5up.net/hyperspace) by [HTML5 UP](https://html5up.net) (free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license)).
