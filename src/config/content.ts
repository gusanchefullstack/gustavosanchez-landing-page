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
  /** Secondary line under the headline */
  subheadline: IntroTextSpan[];
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

export interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  emoji?: string;
  liveUrl?: string;
  repoUrl?: string;
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
    { label: "Social", href: "#social" },
    { label: "Contact", href: "#contact" },
  ],

  intro: {
    greeting: "Hello, I am",
    name: "Gustavo Sanchez",
    headline: [
      { text: "Building at the Intersection of Software " },
      { text: "Engineering", accent: true, accentTone: 0 },
      { text: ", " },
      { text: "AI", accent: true, accentTone: 2 },
      { text: " and " },
      { text: "Sales", accent: true, accentTone: 4 },
      { text: "." },
    ],
    subheadline: [
      {
        text: "Software Engineer focused in fullstack applications & always in ",
      },
      { text: "learning mode", accent: true, accentGradient: true },
      { text: "." },
    ],
    taglineParagraphs: [
      [
        {
          text: "I build modern web experiences with clean code, thoughtful architecture and a passion for great user interfaces. Because today the operational part of coding is already AI assisted, the key contributions of an engineer are ",
        },
        { text: "judgment", accent: true, accentTone: 3 },
        { text: " and " },
        { text: "business acumen", accent: true, accentTone: 0 },
        {
          text: " to understand why and when to build, ",
        },
        { text: "execution planning", accent: true, accentTone: 4 },
        {
          text: " to orchestrate AI agents and to ",
        },
  
        { text: "make decisions", accent: true, accentTone: 1 },
        { text: " about architecture and integrations." },
      ],
      [
        {
          text: "My massive transformation purpose is to help people to elevate their lives up to their full potential through technology adoption",
        },
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
        title: "Pomodoro App",
        description:
          "Frontend Mentor challenge — a fully-featured Pomodoro timer with customizable modes (pomodoro, short break, long break), an SVG circular progress ring, a font picker (Kumbh Sans, Roboto Slab, Space Mono), and an accent color picker (red, cyan, purple). Settings persist via localStorage. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        image: "/projects/pomodoro-app.png",
        liveUrl: "https://fsdev-pomodoro-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-pomodoro-app",
      },
      {
        title: "Galleria Slideshow Site",
        description:
          "Frontend Mentor challenge — a responsive art gallery slideshow web app. Browse 15 famous paintings in a masonry grid and navigate through them in a full-screen detail view with lightbox, progress bar, and source attribution. Built with React 19, TypeScript, Vite, CSS Modules, and React Router v6.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "React Router v6"],
        image: "/projects/galleria-slideshow-site.jpg",
        liveUrl: "https://fsdev-galleria-slideshow-site.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-galleria-slideshow-site",
      },
      {
        title: "Maker Pre-Launch Landing Page",
        description:
          "Frontend Mentor challenge — a responsive pre-launch landing page featuring a hero section with side illustrations, a 4-column features grid, side-by-side pricing cards with a highlighted paid tier, and an email notification form with inline validation. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Vitest"],
        image: "/projects/maker-pre-launch-landing-page.jpg",
        liveUrl: "https://fsdev-maker-pre-launch-landing-page.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-maker-pre-launch-landing-page",
      },
      {
        title: "Flashcard App",
        description:
          "Frontend Mentor challenge — an interactive flashcard study app with card flip animation, category filtering, shuffle mode, and per-card progress tracking (Not Started / In Progress / Mastered). Study Statistics sidebar shows real-time totals. Data persists via localStorage. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "localStorage", "Vitest"],
        image: "/projects/flashcard-app.png",
        liveUrl: "https://fsdev-flashcard-app-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-flashcard-app",
      },
      {
        title: "Shortly — URL Shortening API",
        description:
          "Frontend Mentor challenge — a responsive URL shortening landing page that integrates with the CleanURI API to shorten links, persists results in localStorage across page refreshes, and features one-click clipboard copy with visual feedback. Includes accessible form validation and a full Vitest test suite. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "CleanURI API", "localStorage", "Vitest"],
        image: "https://raw.githubusercontent.com/gusanchefullstack/fsdev-url-shortening-api-landing-page/main/screenshots/desktop-1440px.png",
        liveUrl: "https://fsdev-url-shortening-api-landing-pa.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-url-shortening-api-landing-page",
      },
      {
        title: "Savings Tracker",
        description:
          "Frontend Mentor premium challenge — a savings goals tracker SPA with full goal CRUD, deposit tracking, monthly bar chart (Recharts), filter/sort controls, and a responsive card grid layout. Data persists via localStorage across sessions. Built with React 19, TypeScript, Vite, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Recharts", "localStorage"],
        image: "/projects/savings-tracker.png",
        liveUrl: "https://fsdev-savings-tracker-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-savings-tracker",
      },
      {
        title: "Job Listings with Filtering",
        description:
          "Frontend Mentor challenge — a responsive job listing page with tag-based filtering. Users click category tags (role, level, languages, tools) to narrow listings in real time; active filters appear in a persistent filter bar that can be cleared individually or all at once. Built with React 19, TypeScript, and CSS Modules.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules", "Responsive Design", "Accessibility"],
        image: "/projects/job-listings-with-filtering.png",
        liveUrl: "https://fsdev-job-listings-with-filtering-d.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-job-listings-with-filtering",
      },
      {
        title: "Password Generator App",
        description:
          "Frontend Mentor challenge — a fully accessible, responsive password generator built with React 19 and TypeScript. Users configure character length and character types (uppercase, lowercase, numbers, symbols), generate a secure password, see its strength rating, and copy it to the clipboard.",
        tags: ["React 19", "TypeScript", "Vite", "CSS Modules"],
        image: "/projects/password-generator-app.png",
        liveUrl: "https://fsdev-password-generator-app.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-password-generator-app",
      },
      {
        title: "IP Address Tracker",
        description:
          "Frontend Mentor challenge — a React 19 + TypeScript single-page app that looks up any IP address or domain and displays geolocation data (IP, location, timezone, ISP) in an info card, then plots the location on an interactive Leaflet map. Powered by the IPify Geo API via Axios.",
        tags: ["React", "TypeScript", "Vite", "Leaflet", "Axios", "IPify API"],
        image: "/projects/ip-address-tracker.png",
        liveUrl: "https://fsdev-ip-address-tracker-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-ip-address-tracker",
      },
      {
        title: "Weather App",
        description:
          "Frontend Mentor challenge — a responsive weather app that searches any city worldwide and displays current conditions, a 7-day daily forecast, and an hourly breakdown. Metric/Imperial unit toggle re-fetches data live. Built mobile-first with semantic HTML, vanilla JS (ES modules), CSS custom properties, and Vite. No API key required — powered by Open-Meteo.",
        tags: ["HTML", "CSS", "JavaScript", "Vite", "Open-Meteo API"],
        image: "/projects/weather-app.png",
        liveUrl: "https://fsdev-weather-app-dev.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-weather-app",
      },
      {
        title: "Character Counter",
        description:
          "Frontend Mentor challenge — a real-time text analyzer with character, word, and sentence counts; approximate reading time; letter density with sort + collapse; and a persistent dark/light theme. Built mobile-first with semantic HTML, vanilla JS (ES modules), CSS custom properties for design tokens, and Vite. WCAG-minded focus states and prefers-reduced-motion support.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "/projects/character-counter.png",
        liveUrl: "https://fsdev-character-counter.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-character-counter",
      },
      {
        title: "Intro Section with Dropdown Navigation",
        description:
          "Frontend Mentor challenge — a responsive landing page with interactive dropdown navigation menus, a slide-in mobile sidebar with overlay, and a two-column hero layout. Built with semantic HTML, CSS custom properties, vanilla JS, and Vite; three breakpoints for mobile, tablet, and desktop.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "/projects/intro-section-dropdown-nav.png",
        liveUrl: "https://fsdev-intro-section-with-dropdown-navigation-60umnjew7.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-intro-section-with-dropdown-navigation",
      },
      {
        title: "Body Mass Index Calculator",
        description:
          "Frontend Mentor challenge — a responsive BMI calculator with metric and imperial unit support, live calculation, weight classification, and healthy weight range. Built mobile-first with vanilla HTML/CSS/JS and Vite; design tokens parameterize colors, gradients, and typography.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "/projects/bmi-calculator.png",
        liveUrl: "https://fsdev-bmi-calculator-figma-hm1yyo0s0-gustavo-sanchezs-projects.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-bmi-calculator-figma-dev",
      },
      {
        title: "Budgeteer",
        description:
          "Full-stack personal budgeting app: hierarchical categories, groups, and items; calendar-based tracking buckets by frequency; planned vs actual progress; immutable transaction ledger. React UI with Express, Prisma, and MongoDB Atlas.",
        tags: [
          "React",
          "TypeScript",
          "Express",
          "Prisma",
          "MongoDB",
          "TanStack Query",
          "Tailwind CSS",
        ],
        image: "/projects/budgeteer-dashboard.png",
        repoUrl: "https://github.com/gusanchefullstack/budgeteerApp",
      },
      {
        title: "Officelite Coming Soon Site",
        description:
          "Frontend Mentor challenge — a 2-page coming soon site with pricing plans, a live 30-day countdown timer, and a sign-up form with custom-styled select and validation. Built mobile-first with vanilla HTML/CSS/JS and Vite; design tokens parameterize colors, typography, and spacing.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "/projects/officelite-coming-soon.png",
        liveUrl: "https://fsdev-officelite-coming-soon-site-d.vercel.app",
        repoUrl:
          "https://github.com/gusanchefullstack/fsdev-officelite-coming-soon-site",
      },
      {
        title: "Interactive Card Details Form",
        description:
          "Frontend Mentor challenge — an interactive credit card details form with real-time card preview, input formatting, validation, and a success state. Built mobile-first with vanilla HTML/CSS/JS and Vite; design tokens parameterize colors, gradients, and typography.",
        tags: ["HTML", "CSS", "JavaScript", "Vite"],
        image: "/projects/interactive-card-details-form.png",
        liveUrl: "https://fsdev-interactive-card-details-form.vercel.app/",
        repoUrl:
          "https://github.com/gusanchefullstack/fsdev-interactive-card-details-form",
      },
      {
        title: "QR Code Component",
        description:
          "Frontend Mentor challenge solution — a QR code card built with React and TailwindCSS, featuring a mobile-first layout with custom Tailwind theme variables for colors and typography.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        image: "/projects/qr-component.png",
        liveUrl: "https://fsdev-qr-component-code.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-qr-component-code",
      },
      {
        title: "Blog Preview Card",
        description:
          "Frontend Mentor blog preview card solution with interactive hover and focus states. Built mobile-first with custom Tailwind theme configuration for colors, typography, border radius, and shadows.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        image: "/projects/blog-preview-card.png",
        liveUrl: "https://fsdev-blog-preview-card.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-blog-preview-card",
      },
      {
        title: "Social Links Profile",
        description:
          "A social links profile card UI with a clean, accessible layout. Mobile-first responsive design built with TypeScript and Vite.",
        tags: ["TypeScript", "CSS", "Vite"],
        image: "/projects/social-links-profile.png",
        liveUrl: "https://fsdev-social-links-profile.vercel.app",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-social-links-profile",
      },
      {
        title: "NFT Preview Card",
        description:
          "Frontend Mentor NFT preview card solution showcasing a hover overlay image effect using Tailwind's group utility. Responsive, mobile-first design with custom Tailwind theme tokens.",
        tags: ["React", "TypeScript", "TailwindCSS", "Vite"],
        image: "/projects/nft-preview-card.png",
        liveUrl: "https://fsdev-nft-preview-card-component.vercel.app/",
        repoUrl: "https://github.com/gusanchefullstack/fsdev-NFT-preview-card-component",
      },
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
        platform: "freeCodeCamp",
        handle: "gusanchedev",
        url: "https://www.freecodecamp.org/gusanchedev",
        icon: "freecodecamp",
        brandColor: "#0A0A23",
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
