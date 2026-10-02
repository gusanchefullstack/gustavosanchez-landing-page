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

export interface SiteContent {
  siteTitle: string;
  nav: NavItem[];
  intro: IntroContent;
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
    items: Project[];
  };
  blog: {
    subtitle: string;
    title: string;
    description: string;
    hashnodeUrl: string;
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
    { label: "Intro", href: "#intro" },
    { label: "Stack", href: "#stack" },
    { label: "Projects", href: "#projects" },
    { label: "Blog", href: "#blog" },
    { label: "Social", href: "#social" },
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
    ctaLabel: "View my work",
    ctaHref: "#projects",
    photo: "/Me.jpg",
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
    items: [
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
      "Thoughts on web development, software engineering, and the intersection of technology and business — published on Hashnode.",
    hashnodeUrl: "https://hashnode.com/@gusanchedev",
    items: [
      // Add entries here as you publish posts on Hashnode:
      // { title: "My First Post", url: "https://gusanchedev.hashnode.dev/my-first-post" },
      { title: "My learning path to software engineer", url: "https://gustavosanchez.hashnode.dev/my-learning-path-to-software-engineer" },
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
        platform: "Hashnode",
        handle: "@gusanchedev",
        url: "https://hashnode.com/@gusanchedev",
        icon: "hashnode",
        brandColor: "#2962FF",
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
        platform: "Frontend Masters",
        handle: "gustavosanchezdev",
        url: "https://frontendmasters.com/u/gustavosanchezdev/",
        icon: "frontendmasters",
        brandColor: "#C02D28",
      },
    ],
  },

  contact: {
    subtitle: "Get in Touch",
    title: "Let's Work Together",
    description:
      "Have a project in mind or just want to say hello? Drop me a message and I will get back to you as soon as possible.",
    info: {
      email: "hello@gustavosanchez.dev",
      location: "San Francisco, CA",
      availability: "Open to full-time roles",
    },
  },

  footer:
    'Designed & built with Vite, TypeScript & Tailwind CSS. Design inspired by <a href="https://html5up.net/hyperspace" target="_blank" rel="noopener">Hyperspace</a> by <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a>.',
};
