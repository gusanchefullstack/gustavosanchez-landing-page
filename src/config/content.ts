/**
 * content.ts
 * ---------------------------------------------------------
 * All site copy, project data, social links, and stack
 * items live here.  Swap this file or its values to
 * personalise the landing page -- no component edits needed.
 * ---------------------------------------------------------
 */

/* ---------- Types ---------- */

export interface NavItem {
  label: string;
  href: string;
}

/** Gray/white emphasis steps for accented words (see `.intro__accent--*` in style.css) */
export type IntroAccentTone = 0 | 1 | 2 | 3 | 4;

export interface IntroTextSpan {
  text: string;
  accent?: boolean;
  /** When `accent` is true, picks a distinct light-gray / white tone (default 0); ignored if `accentGradient` */
  accentTone?: IntroAccentTone;
  /** When `accent` is true, use brand gradient (legacy highlight) instead of gray tones */
  accentGradient?: boolean;
}

export interface IntroContent {
  greeting: string;
  name: string;
  /** Primary headline (e.g. role positioning) */
  headline: IntroTextSpan[];
  /** Body paragraphs; each array is one paragraph of mixed plain / accented spans */
  taglineParagraphs: IntroTextSpan[][];
  ctaLabel: string;
  ctaHref: string;
  photo: string;
  /** Small pill above the hero headline */
  badge: { label: string; href: string };
  /** Static start of the hero headline; one of `heroWords` is appended and rotates */
  heroLead: string;
  heroWords: string[];
  /** One-sentence summary under the hero headline */
  heroSummary: string;
}

export interface Stat {
  value: string;
  label: string;
}

/**
 * A project filter chip. A project matches when it carries any of `tags`,
 * when its description mentions `text`, or — for `sdd` — when it was built spec-driven.
 */
export interface ProjectFilter {
  label: string;
  tags?: string[];
  text?: string;
  sdd?: boolean;
}

export interface ProjectFilterGroup {
  category: string;
  filters: ProjectFilter[];
}

export interface StackItem {
  name: string;
  icon: string; // key into stackIcons record in utils/icons.ts
  brandColor: string; // official brand hex color for hover state
}

export interface StackGroup {
  category: string;
  items: StackItem[];
}

/** Whether the project is UI-only or ships its own backend/database. */
export type ProjectKind = "frontend" | "fullstack";

/** Hosting platform(s) the live build runs on. */
export type DeployPlatform = "vercel" | "render" | "aws" | "netlify" | "cloudflare";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Frontend-only vs. full-stack — rendered as a card badge */
  kind: ProjectKind;
  /** Where the live build is hosted; omit when the project is not deployed */
  deployment?: DeployPlatform | DeployPlatform[];
  /** True when the project was built spec-driven (constitution → spec → plan → tasks) */
  sdd?: boolean;
  image?: string;
  emoji?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface BlogPost {
  title: string;
  url: string;
  /** Optional short description shown under the title */
  brief?: string;
}

export interface SocialLink {
  platform: string;
  handle: string;
  url: string;
  icon: string; // key into socialIcons record in utils/icons.ts
  brandColor: string; // official brand hex for icon circle fill on hover
}

export interface ContactInfo {
  email: string;
  location: string;
  availability: string;
}

export interface CaseStudy {
  number: string;
  name: string;
  descriptor: string;
  thesis: string;
  image: string;
  imageAlt: string;
  challenge: string;
  approach: string;
  outcome: string;
  proof: { value: string; label: string }[];
  tags: string[];
  liveUrl: string;
  repoUrl: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  output: string;
}

export interface CareerChapter {
  period: string;
  role: string;
  organization: string;
  summary: string;
  proof: string[];
}

export interface SiteContent {
  siteTitle: string;
  nav: NavItem[];
  intro: IntroContent;
  /** "At a glance" row under the hero; `{projects}` is replaced with the project count */
  stats: Stat[];
  caseStudies: {
    subtitle: string;
    title: string;
    description: string;
    items: CaseStudy[];
  };
  process: {
    subtitle: string;
    title: string;
    description: string;
    steps: ProcessStep[];
  };
  experience: {
    subtitle: string;
    title: string;
    description: string;
    chapters: CareerChapter[];
    credentials: string[];
  };
  resume: {
    href: string;
    label: string;
    location: string;
    workAuthorization: string;
  };
  stack: {
    subtitle: string;
    title: string;
    description: string;
    groups: StackGroup[];
  };
  projects: {
    subtitle: string;
    title: string;
    description: string;
    /** Curated chips: frameworks, methodologies and AI tooling only — no HTML/CSS/JS basics */
    filterGroups: ProjectFilterGroup[];
    items: Project[];
  };
  blog: {
    subtitle: string;
    title: string;
    description: string;
    devUrl: string;
    items: BlogPost[];
  };
  social: {
    subtitle: string;
    title: string;
    description: string;
    links: SocialLink[];
  };
  contact: {
    subtitle: string;
    title: string;
    description: string;
    info: ContactInfo;
  };
  footer: string;
}

/* ---------- Data ---------- */

export const content: SiteContent = {
  siteTitle: "Gustavo Sanchez",

  nav: [
    { label: "Signal", href: "#intro" },
    { label: "Proof", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  intro: {
    greeting: "Hello, I am",
    name: "Gustavo Sanchez",
    headline: [
      {
        text: "I’m an engineer (in electronic and telecommunications) from Colombia 🇨🇴. Recently I moved to the US and I’m dedicated to continue my pathway as software engineer.",
      },
    ],
    taglineParagraphs: [
      [
        {
          text: "I love to build modern web experiences using clean code, thoughtful architectures and great user interfaces. Because today the operational part of coding is already AI assisted or even replaced, the key contributions of an engineer are ",
        },
        { text: "judgment", accent: true, accentGradient: true },
        { text: " and " },
        { text: "business acumen", accent: true, accentGradient: true },
        { text: " to understand why and when to build, " },
        { text: "execution planning", accent: true, accentGradient: true },
        { text: " to orchestrate AI agents and to " },
        { text: "make decisions", accent: true, accentGradient: true },
        {
          text: " about architecture and integrations based in solid technical background and systems design.",
        },
      ],
      [
        {
          text: "In this new journey of my career I want to craft software solutions leveraging my previous knowledge of systems engineering and software B2B sales to combine them with new learnings about Artificial Intelligence for designing, developing and deployment of powerful AI apps.",
        },
      ],
      [
        { text: "This new time demands from us an " },
        { text: "always be learning", accent: true, accentGradient: true },
        { text: " mindset." },
      ],
    ],
    ctaLabel: "View case studies",
    ctaHref: "#work",
    photo: "/Me.jpg",
    badge: { label: "Open to full-stack AI engineering roles", href: "#contact" },
    heroLead: "I turn product ambiguity into",
    heroWords: [
      "shipped AI systems.",
      "production software.",
      "measurable proof.",
      "customer value.",
    ],
    heroSummary:
      "Full-stack software engineer in San Francisco. I combine systems engineering, production AI delivery and 17 years of enterprise GTM leadership to build the right thing—and prove it works.",
  },

  stats: [
    {
      value: "20+",
      label: "Software projects shipped in 2026.",
    },
    {
      value: "17 yrs",
      label: "Enterprise software and GTM leadership.",
    },
    {
      value: "$19M",
      label: "ACV pipeline built while leading at Genesys.",
    },
  ],

  caseStudies: {
    subtitle: "Selected proof",
    title: "Three products. Three kinds of engineering judgment.",
    description:
      "Not a gallery of screenshots. These are short case studies about the tradeoffs, systems and verification behind production-minded software.",
    items: [
      {
        number: "01",
        name: "EnglishChunks.guru",
        descriptor: "AI speaking coach in production",
        thesis:
          "A privacy-first learning product that turns open speech models into useful, specific feedback.",
        image: "/projects/englishchunks-guru.png",
        imageAlt: "EnglishChunks.guru daily speaking lesson interface",
        challenge:
          "Give English learners pronunciation feedback that is fast and specific without sending sensitive voice recordings to a third-party AI API.",
        approach:
          "I split the product across a Next.js application and a self-hosted speech pipeline on DigitalOcean. Silero VAD, NVIDIA Parakeet and wav2vec2 handle scoring; Gemma writes personalized feedback; an admin queue keeps content quality human-reviewed.",
        outcome:
          "The result is a subscription-ready daily practice loop with level-based lessons, writing feedback, streaks and progress tracking—built around a deliberate privacy boundary.",
        proof: [
          { value: "0", label: "recordings sent to third-party AI APIs" },
          { value: "A1–C2", label: "learner levels supported" },
          { value: "4", label: "AI and speech systems orchestrated" },
        ],
        tags: ["Next.js 16", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Stripe"],
        liveUrl: "https://englishchunks.guru",
        repoUrl: "https://github.com/gusanchefullstack/englishchunks.guru",
      },
      {
        number: "02",
        name: "Nelson",
        descriptor: "Full-stack personal budgeting",
        thesis:
          "A financial model designed around how people actually reserve and spend money.",
        image: "/projects/nelson-personal-budget-app.png",
        imageAlt: "Nelson personal budget dashboard",
        challenge:
          "Make forecast-versus-actual budgeting understandable while preserving the precision needed for balances, payment buckets and threshold alerts.",
        approach:
          "I modeled each expected payment as its own bucket, then connected the React product to an Express and Prisma backend with authentication, runtime validation and date-safe financial logic.",
        outcome:
          "Users can build a budget in guided or complete mode, see live balances and projections, and act on in-product insights across an accessible responsive interface.",
        proof: [
          { value: "3", label: "viewport sizes audited with axe" },
          { value: "AA", label: "WCAG 2.2 accessibility target" },
          { value: "2", label: "budget creation modes" },
        ],
        tags: ["React 19", "Express 5", "Prisma 7", "PostgreSQL", "Playwright"],
        liveUrl: "https://fsdev-nelson-frontend.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-nelson-frontend",
      },
      {
        number: "03",
        name: "FX Checker",
        descriptor: "Tested currency intelligence",
        thesis:
          "A focused converter expanded into a resilient market research workflow.",
        image: "/projects/fx-checker.png",
        imageAlt: "FX Checker currency converter and rate history chart",
        challenge:
          "Go beyond a one-off conversion and help users compare, revisit, share and export exchange-rate decisions without making the interface feel like a trading terminal.",
        approach:
          "I built rate history, multi-currency comparison, favorites, shareable pair URLs, keyboard shortcuts, CSV export and an offline fallback on top of live central-bank data.",
        outcome:
          "The product balances information density with accessible interaction, backed by broad component and behavior coverage rather than demo-only happy paths.",
        proof: [
          { value: "121", label: "automated tests" },
          { value: "100", label: "Lighthouse accessibility score" },
          { value: "5 yrs", label: "rate history available" },
        ],
        tags: ["React 19", "TypeScript", "Vitest", "Testing Library", "Frankfurter API"],
        liveUrl: "https://fsdev-foreign-exchange-checker.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-foreign-exchange-checker",
      },
    ],
  },

  process: {
    subtitle: "How I work",
    title: "Reduce uncertainty before increasing velocity.",
    description:
      "AI makes implementation faster. That raises the value of framing, architecture, review and verification—the parts of the work I keep firmly human-led.",
    steps: [
      {
        number: "01",
        title: "Frame the signal",
        description:
          "Clarify the user, business outcome, constraints and evidence that would make the work worth shipping.",
        output: "Problem brief + success criteria",
      },
      {
        number: "02",
        title: "Specify the system",
        description:
          "Turn ambiguity into flows, data boundaries, architecture decisions and testable requirements before code.",
        output: "Constitution + spec + plan",
      },
      {
        number: "03",
        title: "Orchestrate the build",
        description:
          "Use coding agents for leverage while I control decomposition, integrations, review and the decisions with lasting cost.",
        output: "Small tasks + reviewed changes",
      },
      {
        number: "04",
        title: "Prove the outcome",
        description:
          "Verify behavior, accessibility, failure states and production constraints, then document what the evidence says.",
        output: "Tests + audits + shipped product",
      },
    ],
  },

  experience: {
    subtitle: "Experience",
    title: "Engineering depth. Commercial context.",
    description:
      "I started in telecommunications, spent 17 years helping enterprises adopt complex software, and returned to hands-on engineering with a sharper understanding of customers, adoption and revenue.",
    chapters: [
      {
        period: "2026 — now",
        role: "Full-Stack Software Engineer",
        organization: "Independent products · San Francisco",
        summary:
          "Building and deploying full-stack and AI products with modern TypeScript, Python, open models and production integrations.",
        proof: ["20+ projects shipped", "AI speech systems", "Spec-driven delivery"],
      },
      {
        period: "2017 — 2026",
        role: "Sales leader",
        organization: "Genesys · Colombia and Latin America",
        summary:
          "Led enterprise CCaaS growth across sales, partners, presales, marketing, customer success and engineering.",
        proof: ["$19M ACV pipeline", "$4.2M bookings", "40+ new customers"],
      },
      {
        period: "2008 — 2016",
        role: "Enterprise account executive",
        organization: "Microsoft · Colombia",
        summary:
          "Helped enterprise and public-sector customers adopt Office 365, Azure and unified communications.",
        proof: ["Up to 185% of quota", "3× Gold Club", "Cloud revenue growth"],
      },
      {
        period: "1999 — 2008",
        role: "Telecom and network engineer",
        organization: "Ericsson, Damovo, Getronics and Telmex",
        summary:
          "Designed voice and network systems, including a multitenant IP-PBX platform that reached 3,000 seats in one year.",
        proof: ["Systems engineering", "Solution design", "3,000 deployed seats"],
      },
    ],
    credentials: [
      "B.Eng. Electronic & Telecommunications Engineering",
      "MBA, Cum Laude",
      "AWS Certified AI Practitioner",
      "AWS Certified Cloud Practitioner",
      "Google Cloud Digital Leader",
    ],
  },

  resume: {
    href: "/Gustavo-Sanchez-Resume.pdf",
    label: "Résumé",
    location: "San Francisco, CA",
    workAuthorization: "U.S. work authorized · No sponsorship required",
  },

  stack: {
    subtitle: "Tech Stack",
    title: "Tools & Technologies",
    description:
      "The core technologies I work with on a daily basis to build fast, reliable, and beautiful applications.",
    groups: [
      {
        category: "Frontend",
        items: [
          { name: "JavaScript", icon: "javascript", brandColor: "#F7DF1E" },
          { name: "TypeScript", icon: "typescript", brandColor: "#3178C6" },
          { name: "React.js",   icon: "react",      brandColor: "#61DAFB" },
          { name: "Vite.js",    icon: "vite",       brandColor: "#646CFF" },
          { name: "Tailwind CSS", icon: "tailwind", brandColor: "#06B6D4" },
        ],
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js",    icon: "nodejs",  brandColor: "#5FA04E" },
          { name: "Express.js", icon: "express", brandColor: "#c8c8c8" },
        ],
      },
      {
        category: "API",
        items: [{ name: "Postman", icon: "postman", brandColor: "#FF6C37" }],
      },
      {
        category: "AI",
        items: [
          { name: "Claude Code", icon: "claude", brandColor: "#D4A27F" },
          { name: "Cursor",      icon: "cursor", brandColor: "#d6d5d2" },
          { name: "Figma",       icon: "figma",  brandColor: "#F24E1E" },
        ],
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL", icon: "postgresql", brandColor: "#4169E1" },
          { name: "MongoDB",    icon: "mongodb",    brandColor: "#47A248" },
          { name: "Prisma ORM", icon: "prisma", brandColor: "#5C6AC4" }
        ],
      },
      {
        category: "Dev Tools",
        items: [
          { name: "VS Code", icon: "vscode",  brandColor: "#007ACC" },
          { name: "Git",     icon: "git",     brandColor: "#F05032" },
          { name: "GitHub",  icon: "github",  brandColor: "#ffffff" },
          { name: "Vercel",  icon: "vercel",  brandColor: "#ffffff" },
        ],
      },
    ],
  },

  projects: {
    subtitle: "Portfolio",
    title: "Featured Projects",
    description:
      "A selection of recent work spanning web apps, developer tools, and creative experiments.",
    filterGroups: [
      {
        category: "Frameworks",
        filters: [
          { label: "React", tags: ["React", "React 19"] },
          { label: "Next.js", tags: ["Next.js 16"] },
          { label: "Express", tags: ["Express"] },
          { label: "FastAPI", tags: ["FastAPI"] },
          { label: "Prisma", tags: ["Prisma"] },
          { label: "TanStack", tags: ["TanStack Query", "TanStack Router"] },
          { label: "React Router", tags: ["React Router", "React Router v6"] },
          { label: "Tailwind CSS", tags: ["TailwindCSS"] },
        ],
      },
      {
        category: "Methodologies",
        filters: [
          { label: "Spec-driven", sdd: true },
          { label: "Testing", tags: ["Vitest", "Playwright", "React Testing Library"] },
          { label: "Accessibility", tags: ["Accessibility"], text: "WCAG" },
        ],
      },
      {
        category: "AI",
        filters: [
          { label: "AI apps", tags: ["AI"] },
          { label: "Gemma", tags: ["Gemma"] },
          { label: "Ollama", tags: ["Ollama"] },
          { label: "Speech", tags: ["faster-whisper", "ElevenLabs"] },
        ],
      },
    ],
    items: [
      {
        title: "EnglishChunks.guru — Daily English Speaking Coach",
        description:
          "\"Real English. Ready when you need it.\" A 12-minute daily speaking coach for English learners built around chunks, the ready-made phrases native speakers use. Each day brings one chunk at your level (A1–C2): hear it with three examples, record yourself twice for a 0–100 score with a tip on the exact sounds to fix, write three sentences that come back polished, then read them aloud. Pronunciation is scored by self-hosted open models on a DigitalOcean Droplet (Silero VAD, NVIDIA Parakeet, wav2vec2 phoneme alignment), so recordings never reach a third-party API and are deleted once scored. Gemma 4 writes the feedback, gpt-oss-20b audits every library chunk, and ElevenLabs voices the audio. Includes streaks, progress charts, an admin moderation queue, Stripe plans and WCAG 2.2 AA axe checks. Built spec-first with GitHub Spec Kit.",
        tags: ["AI", "Next.js 16", "TypeScript", "React 19", "Gemma", "Python", "FastAPI", "DigitalOcean", "PostgreSQL", "Drizzle", "Better Auth", "ElevenLabs", "Stripe", "Playwright"],
        kind: "fullstack",
        deployment: "vercel",
        sdd: true,
        image: "/projects/englishchunks-guru.png",
        liveUrl: "https://englishchunks.guru",
        repoUrl: "https://github.com/gusanchefullstack/englishchunks.guru",
      },
      {
        title: "IdiomsMasterGirl — Daily Idiom Practice",
        description:
          "\"One idiom a day: learn it, say it, write it.\" A local-first English practice partner I built for my wife, an A2 learner in San Francisco. Each day she hears a curated idiom in a natural American voice, records herself twice and gets accuracy and clarity scores with warm tips that name the exact words she missed. She then writes three sentences that the tutor grades and corrects, and reads them aloud, with a daily score, a 30-day chart and a streak. The open core runs on the laptop: Gemma 4 via Ollama as the tutor and faster-whisper for speech recognition with per-word confidence, so her recordings never leave the device. ElevenLabs voice is opt-in and cached. Built spec-first with GitHub Spec Kit.",
        tags: ["AI", "Next.js 16", "Ollama", "faster-whisper", "TypeScript", "React 19", "Gemma", "Python", "FastAPI", "SQLite", "ElevenLabs", "Vitest"],
        kind: "fullstack",
        sdd: true,
        image: "/projects/idioms-master-girl.png",
        repoUrl: "https://github.com/gusanchefullstack/idioms-master-girl",
      },
      {
        title: "Nelson — Personal Budget App",
        description:
          "\"Every dollar, on the wing.\" A full-stack personal budget app that tracks every expected payment in its own bucket, with live balances, Guided or Complete budget creation, forecast-vs-actual reports with projections and insights, and in-app threshold alerts. Features a low-poly 3D hummingbird landing (React Three Fiber), light/dark themes, and WCAG 2.2 AA axe audits at 375/768/1440 px with Playwright. Built spec-first with GitHub Spec Kit; the Express 5 + Prisma 7 backend on Neon PostgreSQL uses Better Auth, Zod, and the Temporal API.",
        tags: ["React 19", "TypeScript", "Vite", "TanStack Query", "TanStack Router", "TailwindCSS", "Recharts", "Express", "Prisma", "PostgreSQL", "Vitest"],
        kind: "fullstack",
        deployment: "vercel",
        sdd: true,
        image: "/projects/nelson-personal-budget-app.png",
        liveUrl: "https://fsdev-nelson-frontend.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-nelson-frontend",
      },
      {
        title: "FX Checker",
        description:
          "Frontend Mentor challenge — a currency converter with live central-bank exchange rates, a searchable currency picker, a live-markets ticker, and a rate-history chart from 1 day to 5 years, plus multi-currency compare, favorites, and a browser-saved conversion log. Adds shareable pair URLs, keyboard shortcuts, CSV export, an offline fallback, and a 100 Lighthouse accessibility score. Built spec-first with GitHub Spec Kit and tested with 121 Vitest + React Testing Library tests, with rates from the Frankfurter API.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        sdd: true,
        image: "/projects/fx-checker.png",
        liveUrl: "https://fsdev-foreign-exchange-checker.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-foreign-exchange-checker",
      },
      {
        title: "GitHub User Search App",
        description:
          "Frontend Mentor challenge — a React 19 + TypeScript app that looks up any GitHub user through the GitHub REST API and shows their profile card with light/dark themes, responsive layouts, and friendly error states. Built spec-first with GitHub Spec Kit and tested with 34 Vitest + React Testing Library tests.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        sdd: true,
        image: "/projects/github-user-search-app.png",
        liveUrl: "https://fsdev-github-user-search-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-github-user-search-app",
      },
      {
        title: "Advice Generator App",
        description:
          "Frontend Mentor challenge — a single-page app that serves a random piece of advice and fetches a new one at the roll of a dice, powered by the Advice Slip API. Built spec-first: the constitution, specification, plan, and task breakdown were each committed before any source file existed. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        sdd: true,
        image: "/projects/advice-generator-app.png",
        liveUrl: "https://fsdev-advice-generator-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-advice-generator-app",
      },
      {
        title: "Bookmark Manager App",
        description:
          "A full-stack bookmark manager (Frontend Mentor challenge) — save, search, filter by tags, sort, archive/pin bookmarks, and toggle light/dark theme, behind real user accounts (JWT auth) rather than a static mock. Built with React 19, TypeScript, Vite, Express, Prisma, PostgreSQL (Neon), and Resend.",
        tags: ["React 19", "TypeScript", "Vite", "Express", "Prisma", "PostgreSQL", "JWT Auth", "Resend"],
        kind: "fullstack",
        deployment: "vercel",
        image: "/projects/bookmark-manager-app.png",
        liveUrl: "https://fsdev-bookmark-manager-frontend.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-bookmark-manager-app",
      },
      {
        title: "Devjobs Web App",
        description:
          "Frontend Mentor premium challenge — a responsive job board where users browse job listings, filter by title/company, location, and full-time status, view full job details, and apply. Includes light/dark theme support (system preference + manual toggle) and fully responsive layouts for mobile, tablet, and desktop. Built with React 19, TypeScript, Vite, React Router, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "React Router", "CSS Modules", "Vitest", "React Testing Library"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/devjobs-web-app.png",
        liveUrl: "https://fsdev-devjobs-web-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-devjobs-web-app",
      },
      {
        title: "Note-taking App",
        description:
          "Frontend Mentor challenge — a full-featured note-taking SPA with CRUD, archive, tag filtering, search, light/dark/system theme switching, font switching (sans-serif/serif/monospace), and localStorage-based auth simulation. Fully keyboard accessible with skip link, arrow-key list nav, and live search region. Built with React 19, TypeScript, Vite, CSS Modules, React Router v6, and Vitest (28 tests).",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "React Router v6", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/note-taking-app.png",
        liveUrl: "https://fsdev-note-taking-web-app-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-note-taking-web-app",
      },
      {
        title: "Pomodoro App",
        description:
          "Frontend Mentor challenge — a fully-featured Pomodoro timer with customizable modes (pomodoro, short break, long break), an SVG circular progress ring, a font picker (Kumbh Sans, Roboto Slab, Space Mono), and an accent color picker (red, cyan, purple). Settings persist via localStorage. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/pomodoro-app.png",
        liveUrl: "https://fsdev-pomodoro-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-pomodoro-app",
      },
      {
        title: "Galleria Slideshow Site",
        description:
          "Frontend Mentor challenge — a responsive art gallery slideshow web app. Browse 15 famous paintings in a masonry grid and navigate through them in a full-screen detail view with lightbox, progress bar, and source attribution. Built with React 19, TypeScript, Vite, CSS Modules, and React Router v6.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "React Router v6"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/galleria-slideshow-site.jpg",
        liveUrl: "https://fsdev-galleria-slideshow-site.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-galleria-slideshow-site",
      },
      {
        title: "Maker Pre-Launch Landing Page",
        description:
          "Frontend Mentor challenge — a responsive pre-launch landing page featuring a hero section with side illustrations, a 4-column features grid, side-by-side pricing cards with a highlighted paid tier, and an email notification form with inline validation. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/maker-pre-launch-landing-page.jpg",
        liveUrl: "https://fsdev-maker-pre-launch-landing-page.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-maker-pre-launch-landing-page",
      },
      {
        title: "Flashcard App",
        description:
          "Frontend Mentor challenge — an interactive flashcard study app with card flip animation, category filtering, shuffle mode, and per-card progress tracking (Not Started / In Progress / Mastered). Study Statistics sidebar shows real-time totals. Data persists via localStorage. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "localStorage", "Vitest"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/flashcard-app.png",
        liveUrl: "https://fsdev-flashcard-app-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-flashcard-app",
      },
      {
        title: "Savings Tracker",
        description:
          "Frontend Mentor premium challenge — a savings goals tracker SPA with full goal CRUD, deposit tracking, monthly bar chart (Recharts), filter/sort controls, and a responsive card grid layout. Data persists via localStorage across sessions. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Recharts", "localStorage"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/savings-tracker.png",
        liveUrl: "https://fsdev-savings-tracker-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-savings-tracker",
      },
      {
        title: "Job Listings with Filtering",
        description:
          "Frontend Mentor challenge — a responsive job listing page with tag-based filtering. Users click category tags (role, level, languages, tools) to narrow listings in real time; active filters appear in a persistent filter bar that can be cleared individually or all at once. Built with React 19, TypeScript, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Responsive Design", "Accessibility"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/job-listings-with-filtering.png",
        liveUrl: "https://fsdev-job-listings-with-filtering-d.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-job-listings-with-filtering",
      },
      {
        title: "Password Generator App",
        description:
          "Frontend Mentor challenge — a fully accessible, responsive password generator built with React 19 and TypeScript. Users configure character length and character types (uppercase, lowercase, numbers, symbols), generate a secure password, see its strength rating, and copy it to the clipboard.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/password-generator-app.png",
        liveUrl: "https://fsdev-password-generator-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-password-generator-app",
      },
      {
        title: "IP Address Tracker",
        description:
          "Frontend Mentor challenge — a React 19 + TypeScript single-page app that looks up any IP address or domain and displays geolocation data (IP, location, timezone, ISP) in an info card, then plots the location on an interactive Leaflet map. Powered by the IPify Geo API via Axios.",
        tags: ["React", "TypeScript", "Vite", "Leaflet", "Axios", "IPify API"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/ip-address-tracker.png",
        liveUrl: "https://fsdev-ip-address-tracker-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-ip-address-tracker",
      },
      {
        title: "Body Mass Index Calculator",
        description:
          "Frontend Mentor challenge — a responsive BMI calculator with metric and imperial unit support, live calculation, weight classification, and healthy weight range. Built mobile-first with vanilla HTML/CSS/JS and Vite; design tokens parameterize colors, gradients, and typography.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/bmi-calculator.png",
        liveUrl: "https://fsdev-bmi-calculator-figma-hm1yyo0s0-gustavo-sanchezs-projects.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-bmi-calculator-figma-dev",
      },
      {
        title: "QR Code Component",
        description:
          "Frontend Mentor challenge solution — a QR code card built with React and TailwindCSS, featuring a mobile-first layout with custom Tailwind theme variables for colors and typography.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/qr-component.png",
        liveUrl: "https://fsdev-qr-component-code.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-qr-component-code",
      },
      {
        title: "Blog Preview Card",
        description:
          "Frontend Mentor blog preview card solution with interactive hover and focus states. Built mobile-first with custom Tailwind theme configuration for colors, typography, border radius, and shadows.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/blog-preview-card.png",
        liveUrl: "https://fsdev-blog-preview-card.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-blog-preview-card",
      },
      {
        title: "Social Links Profile",
        description:
          "A social links profile card UI with a clean, accessible layout. Mobile-first responsive design built with TypeScript and Vite.",
        tags: ["TypeScript", "CSS", "Vite"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/social-links-profile.png",
        liveUrl: "https://fsdev-social-links-profile.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-social-links-profile",
      },
      {
        title: "NFT Preview Card",
        description:
          "Frontend Mentor NFT preview card solution showcasing a hover overlay image effect using Tailwind's group utility. Responsive, mobile-first design with custom Tailwind theme tokens.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        kind: "frontend",
        deployment: "vercel",
        image: "/projects/nft-preview-card.png",
        liveUrl: "https://fsdev-nft-preview-card-component.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-NFT-preview-card-component",
      },
    ],
  },

  blog: {
    subtitle: "Writing",
    title: "Blog",
    description:
      "Thoughts on web development, software engineering, and the intersection of technology and business — published on DEV.",
    devUrl: "https://dev.to/gusanchedev",
    items: [
      // Add entries here as you publish posts on DEV:
      // { title: "My First Post", url: "https://dev.to/gusanchedev/my-first-post" },
      { title: "EnglishChunks.guru — speak real English, one chunk a day, scored by open-source AI", url: "https://dev.to/gusanchedev/englishchunksguru-speak-real-english-one-chunk-a-day-scored-by-open-source-ai-5f93" },
      { title: "I Built My Wife a Patient English Idiom Coach That Runs on Our Laptop", url: "https://dev.to/gusanchedev/i-built-my-wife-a-patient-english-idiom-coach-that-runs-on-our-laptop-2m0h" },
      { title: "My learning path to software engineer", url: "https://dev.to/gusanchedev/my-learning-path-to-software-engineer-2lb" },
    ],
  },

  social: {
    subtitle: "Connect",
    title: "Find Me Online",
    description:
      "I share code, write about web development, and occasionally post design experiments.",
    links: [
      {
        platform: "LinkedIn",
        handle: "gustavosanchezgalarza",
        url: "https://www.linkedin.com/in/gustavosanchezgalarza/",
        icon: "linkedin",
        brandColor: "#0A66C2",
      },
      {
        platform: "GitHub",
        handle: "gusanchefullstack",
        url: "https://github.com/gusanchefullstack",
        icon: "github",
        brandColor: "#24292f",
      },
      {
        platform: "DEV",
        handle: "@gusanchedev",
        url: "https://dev.to/gusanchedev",
        icon: "devto",
        brandColor: "#0A0A0A",
      },
      {
        platform: "X / Twitter",
        handle: "@gusanchedev",
        url: "https://x.com/gusanchedev",
        icon: "x",
        brandColor: "#000000",
      },
      {
        platform: "Bluesky",
        handle: "gusanchedev.bsky.social",
        url: "https://bsky.app/profile/gusanchedev.bsky.social",
        icon: "bluesky",
        brandColor: "#0085FF",
      },
      {
        platform: "Frontend Mentor",
        handle: "gusanchefullstack",
        url: "https://www.frontendmentor.io/profile/gusanchefullstack",
        icon: "frontendmentor",
        brandColor: "#3F54A3",
      },
      {
        platform: "Master.dev",
        handle: "gustavosanchezdev",
        url: "https://master.dev/u/gustavosanchezdev/",
        icon: "masterdev",
        brandColor: "#C02D28",
      },
    ],
  },

  contact: {
    subtitle: "Start a conversation",
    title: "Have a hard product problem?",
    description:
      "I’m looking for a full-stack AI engineering role where product judgment, customer context and rigorous delivery all matter. Tell me what you are trying to ship.",
    info: {
      email: "hello@gustavosanchez.dev",
      location: "San Francisco, CA",
      availability: "Open to full-time roles",
    },
  },

  footer:
    "Designed &amp; built with React 19, TypeScript &amp; Vite.",
};
