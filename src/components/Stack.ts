import { content } from "../config/content.ts";
import { stackIcons } from "../utils/icons.ts";

/**
 * Tech Stack section — technologies grouped by category.
 */
export function renderStack(): string {
  const { subtitle, title, description, groups } = content.stack;

  const groupsHtml = groups
    .map(
      (group) => `
      <div class="stack-group">
        <h3 class="stack-group__title">${group.category}</h3>
        <div class="stack-grid">
          ${group.items
            .map(
              (item) => `
            <div class="stack-card">
              <span class="stack-card__icon">${stackIcons[item.icon] ?? item.icon}</span>
              <span class="stack-card__name">${item.name}</span>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    `,
    )
    .join("");

  return `
    <section id="stack" class="section section--alt">
      <div class="section__inner reveal">
        <span class="section__subtitle">${subtitle}</span>
        <h2 class="section__title">${title}</h2>
        <p class="section__description">${description}</p>
        ${groupsHtml}
      </div>
    </section>
  `;
}
