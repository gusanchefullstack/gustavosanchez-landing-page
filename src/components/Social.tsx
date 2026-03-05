import type { CSSProperties } from "react";
import { content } from "../config/content.ts";
import { socialIconMap } from "../utils/icons.tsx";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Social() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, links } = content.social;

  return (
    <section id="social" className="section section--alt">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
        <div className="social-cards-grid">
          {links.map((link) => {
            const Icon = socialIconMap[link.icon];
            return (
              <a
                className="social-card"
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ "--brand-color": link.brandColor } as CSSProperties}
              >
                <div className="social-card__icon-wrap">
                  {Icon ? (
                    <Icon size={36} color="currentColor" />
                  ) : (
                    <span>{link.icon}</span>
                  )}
                </div>
                <div className="social-card__body">
                  <span className="social-card__platform">{link.platform}</span>
                  <span className="social-card__handle">{link.handle}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
