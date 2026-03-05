import { useState } from "react";
import { content } from "../config/content.ts";
import { useActiveSection } from "../hooks/useActiveSection.ts";

const sectionIds = content.nav.map((item) => item.href.replace("#", ""));

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);

  function closeSidebar() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        className="sidebar-toggle"
        aria-label="Toggle navigation"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{isOpen ? "\u2715" : "\u2630"}</span>
      </button>

      <div
        className={`sidebar-overlay${isOpen ? " sidebar-overlay--visible" : ""}`}
        onClick={closeSidebar}
      />

      <aside className={`sidebar${isOpen ? " sidebar--open" : ""}`}>
        <div>
          <div className="sidebar__logo">{content.siteTitle}</div>
          <nav className="sidebar__nav">
            {content.nav.map((item) => (
              <a
                key={item.href}
                className={`sidebar__link${activeSection === item.href.replace("#", "") ? " sidebar__link--active" : ""}`}
                href={item.href}
                onClick={closeSidebar}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div
          className="sidebar__footer"
          dangerouslySetInnerHTML={{ __html: content.footer }}
        />
      </aside>
    </>
  );
}
