import { content } from "../config/content.ts";
import { socialIconMap } from "../utils/icons.tsx";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Social() {
  const ref = useScrollReveal<HTMLUListElement>();
  const { subtitle, title, description, links } = content.social;

  return (
    <section id="social" className="section container" aria-labelledby="social-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="social-title" className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
      </header>
      <ul className="social reveal" ref={ref}>
        {links.map((link) => {
          const Icon = socialIconMap[link.icon];
          return (
            <li key={link.platform}>
              <a
                className="social__link"
                href={link.url}
                target="_blank"
                rel="me noopener noreferrer"
              >
                <span className="social__icon" aria-hidden="true">
                  {Icon ? <Icon size={18} color="currentColor" /> : link.icon}
                </span>
                <span className="social__body">
                  <span className="social__platform">{link.platform}</span>
                  <span className="social__handle">{link.handle}</span>
                </span>
                <span className="social__arrow" aria-hidden="true">↗</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
