import { HiOutlineDocumentText } from "react-icons/hi";
import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Blog() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, hashnodeUrl, items } = content.blog;

  return (
    <section id="blog" className="section section--alt">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>

        {items.length === 0 ? (
          <p className="blog-empty">
            Posts coming soon.{" "}
            <a href={hashnodeUrl} target="_blank" rel="noopener noreferrer">
              Follow me on Hashnode
            </a>{" "}
            to get notified.
          </p>
        ) : (
          <ul className="blog-list" role="list">
            {items.map((post) => (
              <li key={post.url}>
                <a
                  className="blog-entry"
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="blog-entry__icon" aria-hidden>
                    <HiOutlineDocumentText size={18} />
                  </span>
                  <span className="blog-entry__title">{post.title}</span>
                  <span className="blog-entry__arrow" aria-hidden>→</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
