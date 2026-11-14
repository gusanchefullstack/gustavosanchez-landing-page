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
  SiDevdotto,
  SiFrontendmentor,
  SiX,
  SiBluesky,
  SiClaude,
  SiFigma,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaLinkedin } from "react-icons/fa6";
import {
  FiArrowUpRight,
  FiCheck,
  FiCopy,
  FiDownload,
  FiInfo,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSun,
  FiX,
} from "react-icons/fi";

type IconProps = { size?: number; color?: string };

// Cursor AI cube, monochrome — faces are shades of currentColor so it follows the theme
export function CursorIcon({ size = 36, color = "currentColor" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 466.73 533.32" width={size} height={size} fill={color}>
      <path opacity="0.55" d="M233.37,266.66l231.16,133.46c-1.42,2.46-3.48,4.56-6.03,6.03l-216.06,124.74c-5.61,3.24-12.53,3.24-18.14,0L8.24,406.15c-2.55-1.47-4.61-3.57-6.03-6.03l231.16-133.46h0Z" />
      <path opacity="0.75" d="M233.37,0v266.66L2.21,400.12c-1.42-2.46-2.21-5.3-2.21-8.24v-250.44c0-5.89,3.14-11.32,8.24-14.27L224.29,2.43c2.81-1.62,5.94-2.43,9.07-2.43h.01Z" />
      <path opacity="0.9" d="M464.52,133.2c-1.42-2.46-3.48-4.56-6.03-6.03L242.43,2.43c-2.8-1.62-5.93-2.43-9.06-2.43v266.66l231.16,133.46c1.42-2.46,2.21-5.3,2.21-8.24v-250.44c0-2.95-.78-5.77-2.21-8.24h-.01Z" />
      <path opacity="0.3" d="M448.35,142.54c1.31,2.26,1.49,5.16,0,7.74l-209.83,363.42c-1.41,2.46-5.16,1.45-5.16-1.38v-239.48c0-1.91-.51-3.75-1.44-5.36l216.42-124.95h.01Z" />
      <path opacity="0.15" d="M448.35,142.54l-216.42,124.95c-.92-1.6-2.26-2.96-3.92-3.92L20.62,143.83c-2.46-1.41-1.45-5.16,1.38-5.16h419.65c2.98,0,5.4,1.61,6.7,3.87Z" />
    </svg>
  );
}

export const stackIconMap: Record<string, ComponentType<IconProps>> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  vite: SiVite,
  tailwind: SiTailwindcss,
  express: SiExpress,
  nodejs: SiNodedotjs,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  mongodb: SiMongodb,
  vscode: VscVscode,
  cursor: CursorIcon,
  postman: SiPostman,
  git: SiGit,
  github: SiGithub,
  vercel: SiVercel,
  claude: SiClaude,
  figma: SiFigma,
};

// Official Master.dev mark, adapted to currentColor for the monochrome theme
export function MasterDevIcon({ size = 36, color = "currentColor" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 260" width={size} height={size} fill={color}>
      <path d="m92.5 40.1c-35.1 8.1-64.2 33.8-75.3 66.7-2.4 7-2.7 9.2-2.7 23.2 0 14.9.1 15.7 2.8 21.5 2.9 6.3 8.1 12.5 13.1 15.5 2.8 1.8 2.9 1.9 2.7 10.7-.2 8.2.1 9.3 3.3 16 4.5 9.2 10.2 15.5 17.9 19.3 5.7 2.8 6.7 3 17.6 3 10.3 0 12.2-.3 17-2.5 7.8-3.7 14.2-8.7 20.8-16.3l5.8-6.8 3.4 2.3c1.8 1.2 5.8 3.2 8.9 4.4 4.8 1.8 7.1 2 14.7 1.6 5.6-.3 11.1-1.3 14.7-2.7l5.7-2.1 4.5 3.5c7.9 6 14.4 7.8 27.1 7.4 9.5-.3 11.8-.7 17.1-3.1 7.4-3.4 13.5-9.4 16.5-16.1 2-4.6 2.1-6 1.5-16.6-.5-8.6-.3-14.3.8-21.3 2-12.4 8.6-37.8 12.5-48.5 4-10.8 4.2-20.2.7-27.7-3-6.3-5.5-8.6-13.6-12.4-15.2-7.1-24.4-7.5-39.1-2-8.4 3.2-14 7.5-18 13.9l-1.6 2.5-2.6-5c-3.5-6.8-15.8-18.6-23.2-22.3-11.9-5.9-18.2-7.2-34.4-7.1-8 .1-16.4.5-18.6 1zm36.9 26.9c7.1 2.7 14.8 9.6 18.1 16 5 9.9 5.7 14.3 6.2 36.8.4 15.3.8 21.2 1.7 20.9.6-.2 7.2-9.1 14.6-19.8s14.3-20.6 15.3-21.9l1.7-2.4v3.4c0 1.9.6 6.1 1.4 9.2.7 3.2 1 5.8.6 5.8-.7 0-21.7 31.2-33.9 50.2-4 6.4-7.1 8-15.4 8.1-4.3.1-5.3-.3-7.4-2.7-1.8-2.1-2.2-3.6-1.8-5.9.8-5 2.5-33 2.5-41.3 0-4.3-.4-7.4-1-7.4s-1-3.3-1-7.8c0-19.7-10.3-29.6-28.8-27.9-20.3 1.9-38 22.3-40.7 47-.7 5.8.8 12.7 2.6 12.7 2 0-1.1 3.8-4.5 5.4-4.3 2-10.8 2.1-14.6.1-4.3-2.2-6-6.3-6-14.1 0-24.3 18.7-50.1 44.6-61.6 14.3-6.3 33.8-7.5 45.8-2.8zm86 13.6c2.6.9 5 2.2 5.2 2.8.3.7-.9 5-2.6 9.6-4.5 12.2-11.6 40.7-13.5 54.6-1.5 10.5-1.6 17-.3 26.4.4 3.4-4.8 6-11.9 6-4.5 0-5.6-.4-8.9-3.5l-3.7-3.5.6-10.3c.7-11.5 5.7-34.1 11.2-50.1 1.9-5.5 4.8-14.8 6.5-20.6 1.8-5.8 3.9-11.1 4.8-11.8 2.2-1.7 6.9-1.5 12.6.4zm-92.1 39.6 2.8 2.6-2.2 4.4c-8.7 17.1-26.7 45.2-34.9 54-6.7 7.4-10.9 9.8-17 9.8-5.6 0-9.1-2-11.8-6.8-3.1-5.6-2.9-6.8 1.7-7.6 8.7-1.4 19-13.1 38.1-43.5 5.7-9 11.4-17.6 12.7-19.2l2.5-2.9 2.6 3.3c1.4 1.7 3.9 4.4 5.5 5.9z" />
    </svg>
  );
}

/** Project card link icons — used directly by components, not keyed from content.ts */
export const LiveDemoIcon = FiArrowUpRight;
export const SourceCodeIcon = SiGithub;
export const DetailsIcon = FiInfo;

/** UI chrome icons */
export const ThemeLightIcon = FiSun;
export const ThemeDarkIcon = FiMoon;
export const MenuIcon = FiMenu;
export const CloseIcon = FiX;
export const SearchIcon = FiSearch;
export const CopyIcon = FiCopy;
export const CopiedIcon = FiCheck;
export const DownloadIcon = FiDownload;

export const socialIconMap: Record<string, ComponentType<IconProps>> = {
  github: SiGithub,
  linkedin: FaLinkedin,
  x: SiX,
  bluesky: SiBluesky,
  devto: SiDevdotto,
  frontendmentor: SiFrontendmentor,
  masterdev: MasterDevIcon,
};
