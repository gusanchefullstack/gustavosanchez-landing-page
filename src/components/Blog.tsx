import { HiOutlineDocumentText } from "react-icons/hi";
import { content } from "../config/content.ts";
import { useHashnodePosts } from "../hooks/useHashnodePosts.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Blog() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description } = content.blog;
  const { posts, loading, error } = useHashnodePosts();

  return (
    <section id="blog" className="section section--alt">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>

        {loading && <p className="blog-status">Loading articles…</p>}
        {error && <p className="blog-status blog-status--error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="blog-status">No articles found.</p>
        )}

        {posts.length > 0 && (
          <ul className="blog-list" role="list">
            {posts.map((post) => (
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
