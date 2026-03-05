import type { CSSProperties } from "react";
import { content } from "../config/content.ts";
import { stackIconMap } from "../utils/icons.tsx";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Stack() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, groups } = content.stack;

  return (
    <section id="stack" className="section section--alt">
      <div className="section__inner reveal" ref={ref}>
        <span className="section__subtitle">{subtitle}</span>
        <h2 className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
        {groups.map((group) => (
          <div className="stack-group" key={group.category}>
            <h3 className="stack-group__title">{group.category}</h3>
            <div className="stack-grid">
              {group.items.map((item) => {
                const Icon = stackIconMap[item.icon];
                return (
                  <div
                    className="stack-card"
                    key={item.name}
                    style={{ "--brand-color": item.brandColor } as CSSProperties}
                  >
                    <span className="stack-card__icon">
                      {Icon ? (
                        <Icon size={36} color="currentColor" />
                      ) : (
                        <span>{item.icon}</span>
                      )}
                    </span>
                    <span className="stack-card__name">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
