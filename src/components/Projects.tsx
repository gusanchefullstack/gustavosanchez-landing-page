import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { content } from "../config/content.ts";
import type {
  DeployPlatform,
  Project,
  ProjectFilter,
} from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import {
  CloseIcon,
  DetailsIcon,
  LiveDemoIcon,
  SearchIcon,
  SourceCodeIcon,
} from "../utils/icons.tsx";

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

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter.sdd && project.sdd) return true;
  if (filter.tags?.some((t) => project.tags.includes(t))) return true;
  if (filter.text && project.description.includes(filter.text)) return true;
  return false;
}

/** Tags matched by the active filters first, so a filtered card always shows why it matched. */
function orderTags(tags: string[], hoisted: Set<string>): string[] {
  if (hoisted.size === 0) return tags;
  return [
    ...tags.filter((t) => hoisted.has(t)),
    ...tags.filter((t) => !hoisted.has(t)),
  ];
}

/** Feeds the cursor spotlight in `.project-card::before` */
function trackPointer(e: ReactPointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function ProjectBadges({ project }: { project: Project }) {
  return (
    <div className="project-card__badges">
      <span className="project-badge">
        {project.kind === "fullstack" ? "Full-stack" : "Frontend"}
      </span>
      {deploymentList(project.deployment).map((platform) => (
        <span className="project-badge" key={platform}>
          {deploymentLabels[platform]}
        </span>
      ))}
      {project.sdd && (
        <span
          className="project-badge project-badge--strong"
          title="Spec-driven development"
        >
          Spec-driven
        </span>
      )}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <>
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
    </>
  );
}

function ProjectDialog({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (project && dialog && !dialog.open) dialog.showModal();
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onClose={onClose}
      // A click on the backdrop lands on the <dialog> itself
      onClick={(e) => {
        if (e.target === e.currentTarget) e.currentTarget.close();
      }}
    >
      {project && (
        <div className="project-dialog__body">
          <button
            type="button"
            className="icon-button project-dialog__close"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close project details"
          >
            <CloseIcon size={18} aria-hidden="true" />
          </button>
          {project.image && (
            <img
              className="project-dialog__image"
              src={project.image}
              alt={project.title}
            />
          )}
          <div className="project-dialog__content">
            <ProjectBadges project={project} />
            <h3 id="project-dialog-title" className="project-dialog__title">
              {project.title}
            </h3>
            <p className="project-dialog__desc">{project.description}</p>
            <h4 className="project-dialog__label">Built with</h4>
            <ul className="project-dialog__tags" role="list">
              {project.tags.map((tag) => (
                <li className="project-card__tag" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
            <div className="project-card__links">
              <ProjectLinks project={project} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function Projects() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, filterGroups, items } =
    content.projects;

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  // Hide chips that would match nothing
  const groups = useMemo(
    () =>
      filterGroups
        .map((group) => ({
          ...group,
          filters: group.filters.filter((f) =>
            items.some((p) => matchesFilter(p, f)),
          ),
        }))
        .filter((group) => group.filters.length > 0),
    [filterGroups, items],
  );

  const activeFilters = useMemo(
    () =>
      groups
        .flatMap((g) => g.filters)
        .filter((f) => selected.includes(f.label)),
    [groups, selected],
  );

  const hoistedTags = useMemo(
    () => new Set(activeFilters.flatMap((f) => f.tags ?? [])),
    [activeFilters],
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    return items.filter((p) => {
      const matchesQuery =
        normalizedQuery === "" ||
        p.title.toLowerCase().includes(normalizedQuery) ||
        p.description.toLowerCase().includes(normalizedQuery) ||
        p.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
      return matchesQuery && activeFilters.every((f) => matchesFilter(p, f));
    });
  }, [items, normalizedQuery, activeFilters]);

  const toggleFilter = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const clearFilters = () => {
    setQuery("");
    setSelected([]);
  };

  const hasActiveFilters = query !== "" || selected.length > 0;

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="projects-title" className="section__title">
          {title}
        </h2>
        <p className="section__description">{description}</p>
      </header>

      <div className="projects-filter" role="search">
        <label className="projects-filter__search">
          <SearchIcon
            size={16}
            aria-hidden="true"
            className="projects-filter__search-icon"
          />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            className="projects-filter__input"
            placeholder="Search by name, description or technology…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        {groups.map((group) => (
          <div
            className="projects-filter__group"
            role="group"
            aria-label={`Filter by ${group.category}`}
            key={group.category}
          >
            <span className="projects-filter__group-label">
              {group.category}
            </span>
            <div className="projects-filter__chips">
              {group.filters.map((filter) => {
                const active = selected.includes(filter.label);
                return (
                  <button
                    key={filter.label}
                    type="button"
                    className={`projects-filter__chip${active ? " projects-filter__chip--active" : ""}`}
                    onClick={() => toggleFilter(filter.label)}
                    aria-pressed={active}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="projects-filter__meta">
          <span className="projects-filter__count" aria-live="polite">
            {filtered.length} of {items.length} project
            {items.length === 1 ? "" : "s"}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              className="projects-filter__clear"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Reveal wrapper stays mounted, so the grid can unmount on an empty result */}
      <div className="reveal" ref={ref}>
        {filtered.length === 0 ? (
          <p className="projects-filter__empty">
            No projects match your filters.
          </p>
        ) : (
          <div className="projects-grid">
            {filtered.map((project) => (
              <article
                className="project-card"
                key={project.title}
                onPointerMove={trackPointer}
              >
                {project.image ? (
                  <img
                    className="project-card__image"
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-card__image project-card__image--placeholder">
                    {project.emoji ?? ""}
                  </div>
                )}
                <div className="project-card__body">
                  <ProjectBadges project={project} />
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__desc">{project.description}</p>
                  <div className="project-card__tags">
                    {orderTags(project.tags, hoistedTags)
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
                    <ProjectLinks project={project} />
                    <button
                      type="button"
                      className="project-card__link project-card__details"
                      onClick={() => setOpenProject(project)}
                      aria-label={`Details for ${project.title}`}
                      aria-haspopup="dialog"
                    >
                      <DetailsIcon size={15} aria-hidden="true" />
                      Details
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <ProjectDialog
        project={openProject}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
}
