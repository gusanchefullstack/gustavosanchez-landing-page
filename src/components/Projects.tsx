import { useMemo, useState } from "react";
import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

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
        )}
      </div>
    </section>
  );
}
