# Gustavo Sanchez — Personal Landing Page

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)

The portfolio of Gustavo Sanchez, full-stack AI engineer — live at **[gustavosanchez.dev](https://www.gustavosanchez.dev)**. Built with React 19, TypeScript, Vite and Tailwind CSS 4 in the two-colour **Ink & Mist** design (`#212227` / `#bdd4e7`), with light and dark themes, a content-driven architecture and a build-time prerender so search engines, LLMs and agents can read every word without running JavaScript.

## Live sections

| Section | Description |
|---|---|
| **Signal** (`#intro`) | Small duotone avatar, availability badge, headline with a rotating ending, summary, CTA + copy-email button, stats row |
| **Proof** (`#work`) | Three case studies — challenge, approach, outcome, measured proof — with tech tags plus **SDD** (spec-driven) and **AI** flags |
| **Process** (`#process`) | Four-stage workflow from framing the problem to proving the outcome |
| **Experience** (`#experience`) | Software engineering, enterprise GTM leadership and telecom engineering timeline |
| **Social** (`#social`) | LinkedIn, X, Master.dev, Bluesky, GitHub, Frontend Mentor and DEV, with monochrome icons |
| **Contact** (`#contact`) | Contact form (Formspree) with email, location and availability |
| **Résumé dock** | Always-available link to the one-page PDF résumé |

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 (client render + build-time `renderToString` prerender) |
| Language | TypeScript 5.9 (strict mode) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties derived with `color-mix()` |
| Icons | react-icons 5 (si / vsc / fa6 / fi sets) |
| Form handling | Formspree (`@formspree/react`) |
| Fonts | Bricolage Grotesque, Manrope, JetBrains Mono (Google Fonts) |
| Deployment | Vercel — production from `main`, preview for every pushed branch |

## Getting started

```bash
# Install dependencies
npm install

# Start dev server → http://localhost:5173
npm run dev

# Type-check, build, and prerender the page into dist/index.html
npm run build

# Preview the production build locally
npm run preview
```

## Project structure

```
├── public/
│   ├── Me.jpg                     # Profile photo (cropped to a duotone avatar in CSS)
│   ├── Gustavo-Sanchez-Resume.pdf # One-page résumé
│   ├── resume.md                  # Text version of the résumé for agents and LLMs
│   ├── llms.txt / llms-full.txt   # LLM-readable site summaries
│   ├── robots.txt / sitemap.xml
│   └── projects/                  # Project screenshots
├── resume/
│   └── Gustavo-Sanchez-Resume.html  # Print-styled source of the PDF résumé
├── scripts/
│   └── prerender.mjs              # Injects the server-rendered app into dist/index.html
├── src/
│   ├── components/
│   │   ├── Header.tsx             # Sticky top nav, theme toggle, mobile menu
│   │   ├── Intro.tsx              # Hero and stats row
│   │   ├── CaseStudies.tsx        # Case-study cards with SDD / AI flags
│   │   ├── Process.tsx            # How I work
│   │   ├── Experience.tsx         # Role timeline
│   │   ├── Social.tsx             # Social profile links
│   │   ├── Contact.tsx            # Contact form + info
│   │   └── ResumeDock.tsx         # Fixed résumé link
│   ├── config/
│   │   └── content.ts             # ← All site copy, case studies, links (edit here)
│   ├── hooks/                     # useTheme, useScrollReveal, useActiveSection
│   ├── utils/icons.tsx            # Social icon map + named UI icons
│   ├── App.tsx                    # Root component composing all sections
│   ├── main.tsx                   # Client entry — createRoot().render(<App />)
│   ├── entry-server.tsx           # Build-time entry — renderToString(<App />)
│   └── style.css                  # Tokens, BEM component classes, breakpoints
├── index.html                     # Meta tags, JSON-LD, theme bootstrap script, fonts
├── vercel.json                    # Pins the build command so the prerender always runs
├── vite.config.ts
└── tsconfig.json
```

## Customisation

### Change content
All text, case studies, social links and metadata live in **one file**:

```
src/config/content.ts
```

Edit values there — no component changes needed. The TypeScript interfaces catch structural mistakes at compile time.

- **Hero** — `intro.badge`, `intro.heroLead`, `intro.heroWords` (the rotating endings), `intro.heroSummary`, and the `stats` row.
- **Case studies** — `caseStudies.items`. Add `sdd: true` for spec-driven builds and `ai: true` for projects with AI features; both render as filled chips at the start of the tag row.
- **Social links** — `social.links`; the first entry is shown as the featured card. When you change them, also update `sameAs` / `rel="me"` in `index.html` and the profile lists in `public/llms*.txt`.

### Change the visual theme
The palette is defined by two colours at the top of `src/style.css`; every other tone is mixed from them:

```css
:root {
  --mist: #bdd4e7;
  --ink: #212227;
}

:root,
:root[data-theme="dark"] {
  --color-bg: var(--ink);
  --color-fg: var(--mist);
  --color-muted: color-mix(in srgb, var(--mist) 74%, var(--ink));
  /* ... */
}

:root[data-theme="light"] {
  --color-bg: var(--mist);
  --color-fg: var(--ink);
  --color-muted: color-mix(in srgb, var(--ink) 78%, var(--mist));
  /* ... */
}
```

Change `--mist` / `--ink` to re-skin the whole site, and add any new token to **both** theme blocks. Re-check text contrast afterwards: `--color-muted` is tuned to stay above 4.8:1 on every surface. The theme follows the visitor's OS setting until they use the toggle, after which the choice is remembered in `localStorage`.

### Update the résumé
Edit `resume/Gustavo-Sanchez-Resume.html`, open it through the dev server and print to PDF (Letter, no margins, background graphics on) into `public/Gustavo-Sanchez-Resume.pdf`. Mirror the wording in `public/resume.md`.

### Add a new section
1. Create `src/components/NewSection.tsx` as a React component
2. Import and compose it in `src/App.tsx`, and add a `content.nav` entry

```tsx
// src/components/NewSection.tsx
import { content } from "../config/content.ts";

export function NewSection() {
  return <section id="new-section" className="section container">...</section>;
}
```

Don't read `window` / `document` during render — the page is prerendered in Node at build time. Use effects or event handlers instead.

## Discoverability for search engines, LLMs and agents

| Layer | What it provides |
|---|---|
| Build-time prerender | Full page text in the HTML response, no JavaScript required |
| JSON-LD (`index.html`) | `Person` (role, location, education, certifications, languages, `sameAs`), case studies as `SoftwareApplication`s, `ProfilePage` |
| `rel="me"` links | Identity links to each social profile |
| `/llms.txt`, `/llms-full.txt` | Plain-text summaries following the [llms.txt](https://llmstxt.org) convention |
| `/resume.md` | Machine-friendly résumé alongside the PDF |
| `sitemap.xml`, `robots.txt` | All crawlers allowed; sitemap lists the page, résumés and llms files |

## Architecture

### Data flow

```
src/config/content.ts            ← single source of truth
src/utils/icons.tsx              ← social icon map + named icons
src/hooks/*.ts                   ← theme, scroll-reveal, active nav
        ↓
src/components/*.tsx             ← React components
        ↓
src/App.tsx                      ← root component
src/main.tsx                     ← client: createRoot().render(<StrictMode><App /></StrictMode>)
src/entry-server.tsx             ← build: renderToString(<App />) → scripts/prerender.mjs
```

### Component pattern

Every component is a named React function export. State and side effects use hooks — no imperative DOM manipulation.

```tsx
// Scroll-reveal: attach ref to the element with className="... reveal"
export function MySection() {
  const ref = useScrollReveal<HTMLDivElement>();
  return (
    <section className="section container">
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
const Icon = socialIconMap[link.icon];
{Icon ? <Icon size={18} color="currentColor" /> : link.icon}
```

Icons use `color="currentColor"` so every icon follows the theme in both colours.

### Interactivity

| Feature | Implementation |
|---|---|
| Active nav link | `useActiveSection` hook — `IntersectionObserver` returns current section id |
| Scroll-reveal | `useScrollReveal` hook — adds `.reveal--visible` when element enters viewport |
| Mobile menu | `useState(isOpen)` in `Header.tsx` |
| Light/dark theme | `useTheme` hook + inline script in `index.html` that sets `data-theme` before first paint (no flash) |
| Rotating headline | `setInterval` index in `Intro.tsx`; the visible word is drawn with CSS `content: attr(data-word)`, and an `sr-only` span holds the full sentence for screen readers and crawlers. Paused under `prefers-reduced-motion` |
| Copy email | `navigator.clipboard.writeText` with a `mailto:` fallback and a polite live-region confirmation |
| Contact form | `@formspree/react` — `useForm` handles submission, validation errors and success state |

### Contact form (Formspree)

The contact form is wired to [Formspree](https://formspree.io). Submissions are handled server-side — no backend code required.

```tsx
// src/components/Contact.tsx
import { useForm, ValidationError } from "@formspree/react";

const [state, handleSubmit] = useForm("YOUR_FORM_ID");
```

To use your own form endpoint, replace the form ID string in `src/components/Contact.tsx` with the one from your Formspree dashboard.

## Styling conventions

- **BEM naming** — `.hero__word`, `.case-study__tag--flag`, `.social__link`
- **Two-colour palette** — only `#bdd4e7` and `#212227` appear in the stylesheet; everything else is `color-mix()`
- **Inverse panels** — Process, the featured social card and the SDD/AI chips use the `--color-inv-*` tokens
- **Duotone avatar** — grayscale photo multiplied over `--photo-bg`
- **Stable headline** — the hero title reserves its height so the rotating word never shifts the layout
- **Responsive** — no horizontal scroll from 360px up; social grid goes 4 → 2 → 1 columns at 1100px and 560px

## What I learned

This project is both a personal portfolio and a learning log. Notes captured along the way:

### Architecture
- **Content-driven UI.** A single `src/config/content.ts` typed with `SiteContent` keeps copy, case studies and social links out of component files. Components stay about rendering; edits never require touching JSX.
- **Prerendering a client app.** A second Vite build (`--ssr src/entry-server.tsx`) renders the app to a string in Node, and a small script injects it into `dist/index.html`. The client still uses `createRoot`, so there are no hydration mismatches — the trade-off is that render code can't touch browser APIs.
- **One palette, many tones.** Two hex values plus `color-mix(in srgb, …)` produce every surface, line and muted text colour in both themes, so the whole site can be re-skinned by changing two variables.
- **Hooks over imperative DOM.** `IntersectionObserver` logic lives in `useScrollReveal` / `useActiveSection`. Composable, testable, no manual cleanup boilerplate in components.
- **Theme without a flash.** React mounts too late to pick the theme, so a tiny inline script in `index.html` sets `data-theme` before first paint; `useTheme` then takes over. It writes the attribute in a `useLayoutEffect` so child effects always see the new theme.
- **Accessible rotating text.** Drawing the changing word with CSS `content: attr()` keeps it out of the accessible name and the crawlable text, which both get one complete sentence instead.

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
- [MDN: `color-mix()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix) — deriving the palette from two colours.
- [React `renderToString`](https://react.dev/reference/react-dom/server/renderToString) — build-time prerender.
- [llms.txt](https://llmstxt.org) — the LLM-readable site summary convention.
- [Schema.org `Person`](https://schema.org/Person) — structured profile data.

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
[![Master.dev](https://img.shields.io/badge/Master.dev-212227?logoColor=white)](https://master.dev/u/gustavosanchezdev/)
[![Frontend Mentor](https://img.shields.io/badge/Frontend%20Mentor-3F54A3?logo=frontendmentor&logoColor=white)](https://www.frontendmentor.io/profile/gusanchefullstack)

## Credits

Typefaces: [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque), [Manrope](https://fonts.google.com/specimen/Manrope) and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (SIL Open Font License). Earlier versions of the site used a Vercel-inspired monochrome grid design and, before that, [Hyperspace](https://html5up.net/hyperspace) by [HTML5 UP](https://html5up.net).
