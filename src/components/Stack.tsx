import { content } from "../config/content.ts";
import { stackIconMap } from "../utils/icons.tsx";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Stack() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, groups } = content.stack;

  return (
    <section id="stack" className="section" aria-labelledby="stack-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="stack-title" className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
      </header>
      <div className="stack reveal" ref={ref}>
        {groups.map((group) => (
          <div className="stack__group" key={group.category}>
            <h3 className="stack__category">{group.category}</h3>
            <ul className="stack__items" role="list">
              {group.items.map((item) => {
                const Icon = stackIconMap[item.icon];
                return (
                  <li className="stack__item" key={item.name}>
                    <span className="stack__icon" aria-hidden="true">
                      {Icon ? <Icon size={18} color="currentColor" /> : item.icon}
                    </span>
                    {item.name}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
