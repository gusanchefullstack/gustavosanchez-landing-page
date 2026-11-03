import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import { socialIconMap } from "../utils/icons.tsx";

const DevIcon = socialIconMap.devto;

export function Blog() {
  const ref = useScrollReveal<HTMLUListElement>();
  const { subtitle, title, description, devUrl, items } = content.blog;

  return (
    <section id="blog" className="section" aria-labelledby="blog-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="blog-title" className="section__title">
          {title}
        </h2>
        <p className="section__description">{description}</p>
      </header>

      {items.length === 0 ? (
        <p className="blog-empty">
          Posts coming soon.{" "}
          <a href={devUrl} target="_blank" rel="noopener noreferrer">
            Follow me on DEV
          </a>{" "}
          to get notified.
        </p>
      ) : (
        <ul className="blog reveal" role="list" ref={ref}>
          {items.map((post) => (
            <li key={post.url}>
              <a
                className="blog__entry"
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="blog__source" aria-hidden="true">
                  <DevIcon size={16} color="currentColor" />
                </span>
                <span className="blog__title">{post.title}</span>
                <span className="blog__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
