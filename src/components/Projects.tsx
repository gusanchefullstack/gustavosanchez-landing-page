import { useMemo, useState } from "react";
import { content } from "../config/content.ts";
import type { DeployPlatform, Project } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import { LiveDemoIcon, SourceCodeIcon } from "../utils/icons.tsx";

/** Tech tags rendered on a card before collapsing the rest into a "+N" chip. */
const MAX_VISIBLE_TAGS = 4;

const deploymentLabels: Record<DeployPlatform, string> = {
  vercel: "Vercel",
  render: "Render",
  aws: "AWS",
  netlify: "Netlify",
  cloudflare: "Cloudflare",
};

function deploymentList(deployment: Project["deployment"]): DeployPlatform[] {
  if (!deployment) return [];
  return Array.isArray(deployment) ? deployment : [deployment];
}

/** Selected tags first, so an active filter is always visible on the card. */
function orderTags(tags: string[], selected: string[]): string[] {
  if (selected.length === 0) return tags;
  return [
    ...tags.filter((t) => selected.includes(t)),
    ...tags.filter((t) => !selected.includes(t)),
  ];
}

export function Projects() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, items } = content.projects;

  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    items.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesQuery =
        normalizedQuery === "" ||
        p.title.toLowerCase().includes(normalizedQuery);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => p.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [items, normalizedQuery, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = query !== "" || selectedTags.length > 0;

  return (
    <section id="projects" className="section">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>

        <div className="projects-filter" role="search">
          <label className="projects-filter__search">
            <span className="projects-filter__label">Search by title</span>
            <input
              type="text"
              className="projects-filter__input"
              placeholder="Type a project name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search projects by title"
            />
          </label>

          <div className="projects-filter__tags" role="group" aria-label="Filter by technology">
            {allTags.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  className={`projects-filter__chip${active ? " projects-filter__chip--active" : ""}`}
                  onClick={() => toggleTag(tag)}
                  aria-pressed={active}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {hasActiveFilters && (
            <div className="projects-filter__meta">
              <span className="projects-filter__count">
                {filtered.length} of {items.length} project
                {items.length === 1 ? "" : "s"}
              </span>
              <button
                type="button"
                className="projects-filter__clear"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="projects-filter__empty">
            No projects match your filters.
          </p>
        ) : (
          <div className="projects-grid">
            {filtered.map((project) => (
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
                  <div className="project-card__badges">
                    <span
                      className={`project-badge project-badge--${project.kind}`}
                    >
                      {project.kind === "fullstack" ? "Full-stack" : "Frontend"}
                    </span>
                    {deploymentList(project.deployment).map((platform) => (
                      <span
                        className={`project-badge project-badge--${platform}`}
                        key={platform}
                      >
                        {deploymentLabels[platform]}
                      </span>
                    ))}
                    {project.sdd && (
                      <span
                        className="project-badge project-badge--sdd"
                        title="Spec-driven development"
                      >
                        SDD
                      </span>
                    )}
                  </div>
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tags">
                    {orderTags(project.tags, selectedTags)
                      .slice(0, MAX_VISIBLE_TAGS)
                      .map((tag) => (
                        <span className="project-card__tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    {project.tags.length > MAX_VISIBLE_TAGS && (
                      <span
                        className="project-card__tag project-card__tag--more"
                        title={project.tags.join(", ")}
                      >
                        +{project.tags.length - MAX_VISIBLE_TAGS}
                      </span>
                    )}
                  </div>
                  <div className="project-card__links">
                    {project.liveUrl && (
                      <a
                        className="project-card__link"
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener"
                        aria-label={`Live Demo for ${project.title}`}
                      >
                        <LiveDemoIcon size={15} aria-hidden="true" />
                        Live Demo
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        className="project-card__link"
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener"
                        aria-label={`Source Code for ${project.title}`}
                      >
                        <SourceCodeIcon size={15} aria-hidden="true" />
                        Source Code
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
