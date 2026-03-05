import { content } from "../config/content.ts";

/**
 * Renders the fixed sidebar navigation.
 * On mobile it is hidden off-screen and toggled via a hamburger button.
 */
export function renderSidebar(): string {
  const links = content.nav
    .map(
      (item) =>
        `<a class="sidebar__link" href="${item.href}" data-nav>${item.label}</a>`,
    )
    .join("");

  return `
    <!-- Mobile toggle -->
    <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle navigation">
      <span id="sidebar-toggle-icon">&#9776;</span>
    </button>

    <!-- Overlay (mobile) -->
    <div class="sidebar-overlay" id="sidebar-overlay"></div>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div>
        <div class="sidebar__logo">${content.siteTitle}</div>
        <nav class="sidebar__nav">
          ${links}
        </nav>
      </div>
      <div class="sidebar__footer">${content.footer}</div>
    </aside>
  `;
}

/**
 * Bind sidebar interactivity:
 *  - hamburger toggle on mobile
 *  - active link highlighting on scroll
 *  - close sidebar when a link is clicked (mobile)
 */
export function initSidebar(): void {
  const toggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const toggleIcon = document.getElementById("sidebar-toggle-icon");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>("[data-nav]");

  function openSidebar(): void {
    sidebar?.classList.add("sidebar--open");
    overlay?.classList.add("sidebar-overlay--visible");
    if (toggleIcon) toggleIcon.innerHTML = "&#10005;";
  }

  function closeSidebar(): void {
    sidebar?.classList.remove("sidebar--open");
    overlay?.classList.remove("sidebar-overlay--visible");
    if (toggleIcon) toggleIcon.innerHTML = "&#9776;";
  }

  toggle?.addEventListener("click", () => {
    sidebar?.classList.contains("sidebar--open")
      ? closeSidebar()
      : openSidebar();
  });

  overlay?.addEventListener("click", closeSidebar);

  // Close sidebar on nav click (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar();
    });
  });

  // Highlight active nav link on scroll
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle(
              "sidebar__link--active",
              link.getAttribute("href") === `#${id}`,
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );

  sections.forEach((section) => observer.observe(section));
}
