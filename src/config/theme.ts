/**
 * theme.ts
 * ---------------------------------------------------------
 * Central theme configuration.
 *
 * CSS custom properties are defined in style.css under the
 * @theme block.  This file exposes the *same* token names
 * so TypeScript code can reference them when building
 * inline styles or dynamic class-names.
 *
 * To re-skin the site, edit the CSS variables in style.css
 * (visual) and, if needed, update this map (programmatic).
 * ---------------------------------------------------------
 */

export const theme = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgSecondary: "var(--color-bg-secondary)",
    bgSidebar: "var(--color-bg-sidebar)",
    bgCard: "var(--color-bg-card)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textHeading: "var(--color-text-heading)",
    textAccent: "var(--color-text-accent)",
    accentStart: "var(--color-accent-start)",
    accentEnd: "var(--color-accent-end)",
    accentAltStart: "var(--color-accent-alt-start)",
    accentAltEnd: "var(--color-accent-alt-end)",
    border: "var(--color-border)",
    inputBg: "var(--color-input-bg)",
  },
  fonts: {
    heading: "var(--font-heading)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },
  spacing: {
    sidebarWidth: "var(--spacing-sidebar-width)",
  },
  transition: {
    speed: "var(--transition-speed)",
  },
} as const;

/**
 * Gradient helper used across components to build
 * consistent gradient strings via inline styles.
 */
export function gradient(startVar: string, endVar: string, angle = 135): string {
  return `linear-gradient(${angle}deg, ${startVar}, ${endVar})`;
}
