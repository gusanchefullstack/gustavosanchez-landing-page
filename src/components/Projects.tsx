import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Projects() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, items } = content.projects;

  return (
    <section id="projects" className="section">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
        <div className="projects-grid">
          {items.map((project) => (
            <article className="project-card" key={project.title}>
              {project.image ? (
                <img
                  className="project-card__image"
                  src={project.image}
                  alt={project.title}
                />
              ) : (
                <div className="project-card__image--placeholder">
                  {project.emoji ?? ""}
                </div>
              )}
              <div className="project-card__body">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => (
                    <span className="project-card__tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="project-card__links">
                  {project.liveUrl && (
                    <a
                      className="project-card__link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      className="project-card__link"
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
