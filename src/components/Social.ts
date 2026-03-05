import { content } from "../config/content.ts";
import { socialIcons } from "../utils/icons.ts";

/**
 * Social links section — horizontal cards with icon circle, platform name, and handle.
 */
export function renderSocial(): string {
  const { subtitle, title, description, links } = content.social;

  const linkCards = links
    .map(
      (link) => `
      <a class="social-card" href="${link.url}" target="_blank" rel="noopener noreferrer">
        <div class="social-card__icon-wrap">
          ${socialIcons[link.icon] ?? link.icon}
        </div>
        <div class="social-card__body">
          <span class="social-card__platform">${link.platform}</span>
          <span class="social-card__handle">${link.handle}</span>
        </div>
      </a>
    `,
    )
    .join("");

  return `
    <section id="social" class="section section--alt">
      <div class="section__inner reveal">
        <span class="section__subtitle">${subtitle}</span>
        <h2 class="section__title">${title}</h2>
        <p class="section__description">${description}</p>
        <div class="social-cards-grid">
          ${linkCards}
        </div>
      </div>
    </section>
  `;
}
