import { useState } from "react";
import { content } from "../config/content.ts";
import { useActiveSection } from "../hooks/useActiveSection.ts";
import type { Theme } from "../hooks/useTheme.ts";
import {
  CloseIcon,
  MenuIcon,
  ThemeDarkIcon,
  ThemeLightIcon,
} from "../utils/icons.tsx";

const sectionIds = content.nav.map((item) => item.href.replace("#", ""));

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export function Header({ theme, onToggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <header className="header">
      <div className="header__inner">
        <a className="header__brand" href="#intro" onClick={() => setIsOpen(false)}>
          <span className="header__mark" aria-hidden="true">
            {initials(content.siteTitle)}
          </span>
          {content.siteTitle}
        </a>

        <nav
          id="primary-nav"
          className={`header__nav${isOpen ? " header__nav--open" : ""}`}
          aria-label="Primary"
        >
          {content.nav.map((item) => (
            <a
              key={item.href}
              className={`header__link${activeSection === item.href.replace("#", "") ? " header__link--active" : ""}`}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
          >
            {theme === "dark" ? (
              <ThemeLightIcon size={16} aria-hidden="true" />
            ) : (
              <ThemeDarkIcon size={16} aria-hidden="true" />
            )}
          </button>
          <a className="button button--primary button--small header__cta" href="#contact">
            Contact
          </a>
          <button
            type="button"
            className="icon-button header__menu"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            aria-controls="primary-nav"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <CloseIcon size={18} aria-hidden="true" />
            ) : (
              <MenuIcon size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
