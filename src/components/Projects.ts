import { content } from "../config/content.ts";

/**
 * Projects section -- card grid.
 */
export function renderProjects(): string {
  const { subtitle, title, description, items } = content.projects;

  const cards = items
    .map((project) => {
      const imageBlock = project.image
        ? `<img class="project-card__image" src="${project.image}" alt="${project.title}" />`
        : `<div class="project-card__image--placeholder">${project.emoji ?? ""}</div>`;

      const tags = project.tags
        .map((tag) => `<span class="project-card__tag">${tag}</span>`)
        .join("");

      const links: string[] = [];
      if (project.liveUrl) {
        links.push(
          `<a class="project-card__link" href="${project.liveUrl}" target="_blank" rel="noopener">Live Demo</a>`,
        );
      }
      if (project.repoUrl) {
        links.push(
          `<a class="project-card__link" href="${project.repoUrl}" target="_blank" rel="noopener">Source Code</a>`,
        );
      }

      return `
        <article class="project-card">
          ${imageBlock}
          <div class="project-card__body">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__desc">${project.description}</p>
            <div class="project-card__tags">${tags}</div>
            <div class="project-card__links">${links.join("")}</div>
          </div>
        </article>
      `;
    })
    .join("");

  return `
    <section id="projects" class="section">
      <div class="section__inner reveal">
        <span class="section__subtitle">${subtitle}</span>
        <h2 class="section__title">${title}</h2>
        <p class="section__description">${description}</p>
        <div class="projects-grid">
          ${cards}
        </div>
      </div>
    </section>
  `;
}
