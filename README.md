# Gustavo Sanchez — Personal Landing Page

A personal developer portfolio and landing page built with React 19, TypeScript, Vite, and Tailwind CSS. Designed with a Hyperspace-inspired dark theme featuring a fixed sidebar navigation, smooth scroll-reveal animations, and a fully content-driven architecture.

## Live sections

| Section | Description |
|---|---|
| **Intro** | Hero with profile photo, name, title, tagline, and CTA |
| **Stack** | Tech skills grouped by category (Frontend, Backend, API, Database, Dev Tools) with react-icons |
| **Projects** | Card grid showcasing featured work with tags and links |
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
│   │   ├── useActiveSection.ts   # IntersectionObserver hook for active nav link
│   │   └── useScrollReveal.ts    # IntersectionObserver hook for scroll-reveal
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
src/config/content.ts         ← single source of truth
src/utils/icons.tsx           ← react-icons component maps
src/hooks/useScrollReveal.ts  ← scroll-reveal IntersectionObserver
src/hooks/useActiveSection.ts ← active nav IntersectionObserver
        ↓
src/components/*.tsx          ← React components
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
| Nav underline animation | CSS `::after` pseudo-element, `transform: scaleX()` transition |
| Mobile sidebar | `useState(isOpen)` drives `.sidebar--open` and overlay visibility |
| Contact form | `@formspree/react` — `useForm` hook handles submission, validation errors, and success state |

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

## Credits

Design inspired by [Hyperspace](https://html5up.net/hyperspace) by [HTML5 UP](https://html5up.net) (free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license)).
