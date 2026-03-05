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

export interface IntroContent {
  greeting: string;
  name: string;
  title: string;
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  photo: string;
}

export interface StackItem {
  name: string;
  icon: string; // key into stackIcons record in utils/icons.ts
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
    title: "Full-Stack Developer & Creative Technologist",
    tagline:
      "I build modern web experiences with clean code, thoughtful architecture, and a passion for great user interfaces. Currently exploring the intersection of AI and front-end engineering.",
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
          { name: "JavaScript", icon: "javascript" },
          { name: "TypeScript", icon: "typescript" },
          { name: "React.js", icon: "react" },
          { name: "Vite.js", icon: "vite" },
          { name: "Tailwind CSS", icon: "tailwind" },
        ],
      },
      {
        category: "Backend",
        items: [
          { name: "Node.js", icon: "nodejs" },
          { name: "Express.js", icon: "express" },
        ],
      },
      {
        category: "API",
        items: [{ name: "Prisma ORM", icon: "prisma" }],
      },
      {
        category: "Database",
        items: [
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
        ],
      },
      {
        category: "Dev Tools",
        items: [
          { name: "VS Code", icon: "vscode" },
          { name: "Cursor", icon: "cursor" },
          { name: "Postman", icon: "postman" },
          { name: "Git", icon: "git" },
          { name: "GitHub", icon: "github" },
          { name: "Vercel", icon: "vercel" },
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
        title: "Cloud Dashboard",
        description:
          "Real-time monitoring dashboard for cloud infrastructure with live metrics, alerting, and team collaboration features.",
        tags: ["React", "TypeScript", "D3.js", "WebSocket"],
        emoji: "C",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com",
      },
      {
        title: "AI Writing Assistant",
        description:
          "An intelligent writing companion powered by LLMs that helps draft, edit, and refine technical documentation.",
        tags: ["Vue.js", "Python", "OpenAI", "FastAPI"],
        emoji: "A",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com",
      },
      {
        title: "E-Commerce Platform",
        description:
          "Full-stack marketplace with Stripe integration, inventory management, and a headless CMS for content.",
        tags: ["Next.js", "Prisma", "Stripe", "PostgreSQL"],
        emoji: "E",
        liveUrl: "https://example.com",
        repoUrl: "https://github.com",
      },
      {
        title: "Design System",
        description:
          "A comprehensive component library and design token system used across multiple products and teams.",
        tags: ["Storybook", "Tailwind", "Figma", "a11y"],
        emoji: "D",
        repoUrl: "https://github.com",
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
      },
      {
        platform: "GitHub",
        handle: "gusanchefullstack",
        url: "https://github.com/gusanchefullstack",
        icon: "github",
      },
      {
        platform: "Hashnode",
        handle: "@gusanchedev",
        url: "https://hashnode.com/@gusanchedev",
        icon: "hashnode",
      },
      {
        platform: "X / Twitter",
        handle: "@gusanchedev",
        url: "https://x.com/gusanchedev",
        icon: "x",
      },
      {
        platform: "Bluesky",
        handle: "gusanchedev.bsky.social",
        url: "https://bsky.app/profile/gusanchedev.bsky.social",
        icon: "bluesky",
      },
      {
        platform: "freeCodeCamp",
        handle: "gusanchedev",
        url: "https://www.freecodecamp.org/gusanchedev",
        icon: "freecodecamp",
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
      location: "Remote / Worldwide",
      availability: "Open to freelance & full-time roles",
    },
  },

  footer:
    'Designed & built with Vite, TypeScript & Tailwind CSS. Design inspired by <a href="https://html5up.net/hyperspace" target="_blank" rel="noopener">Hyperspace</a> by <a href="https://html5up.net" target="_blank" rel="noopener noreferrer">HTML5 UP</a>.',
};
