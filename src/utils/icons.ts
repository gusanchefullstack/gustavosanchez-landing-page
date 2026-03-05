/**
 * icons.ts
 * -------------------------------------------------------
 * Converts react-icons components to SVG strings using
 * React's renderToStaticMarkup so they can be embedded
 * in vanilla HTML templates.
 * -------------------------------------------------------
 */
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { ComponentType } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVite,
  SiTailwindcss,
  SiExpress,
  SiNodedotjs,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiPostman,
  SiGit,
  SiGithub,
  SiVercel,
  SiHashnode,
  SiFreecodecamp,
  SiX,
  SiBluesky,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa6";

type IconProps = { size?: number; color?: string };

function icon(Icon: ComponentType<IconProps>): string {
  return renderToStaticMarkup(createElement(Icon, { size: 36, color: "currentColor" }));
}

// Cursor AI editor — 3D hexagonal gem logo with 6 triangular facets
const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
  <path d="M12,1 L2.5,6.5 L12,12 Z"    fill="#4a4845"/>
  <path d="M12,1 L21.5,6.5 L12,12 Z"  fill="#524f4c"/>
  <path d="M21.5,6.5 L21.5,17.5 L12,12 Z" fill="#f0eeea"/>
  <path d="M21.5,17.5 L12,23 L12,12 Z" fill="#cbc8c3"/>
  <path d="M12,23 L2.5,17.5 L12,12 Z"  fill="#5a5754"/>
  <path d="M2.5,17.5 L2.5,6.5 L12,12 Z" fill="#4d4a47"/>
  <polygon points="12,1 21.5,6.5 21.5,17.5 12,23 2.5,17.5 2.5,6.5" fill="none" stroke="#3a3835" stroke-width="0.75"/>
</svg>`;

export const stackIcons: Record<string, string> = {
  javascript: icon(SiJavascript),
  typescript: icon(SiTypescript),
  react: icon(SiReact),
  vite: icon(SiVite),
  tailwind: icon(SiTailwindcss),
  express: icon(SiExpress),
  nodejs: icon(SiNodedotjs),
  prisma: icon(SiPrisma),
  postgresql: icon(SiPostgresql),
  mongodb: icon(SiMongodb),
  vscode: icon(VscVscode),
  cursor: cursorSvg,
  postman: icon(SiPostman),
  git: icon(SiGit),
  github: icon(SiGithub),
  vercel: icon(SiVercel),
};

export const socialIcons: Record<string, string> = {
  github: icon(SiGithub),
  linkedin: icon(FaLinkedin),
  x: icon(SiX),
  bluesky: icon(SiBluesky),
  hashnode: icon(SiHashnode),
  freecodecamp: icon(SiFreecodecamp),
};
