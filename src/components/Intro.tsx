import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Intro() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { greeting, name, title, tagline, ctaLabel, ctaHref, photo } = content.intro;

  return (
    <section id="intro" className="intro">
      <div className="intro__layout reveal" ref={ref}>
        <div className="intro__content">
          <p className="intro__greeting">{greeting}</p>
          <h1 className="intro__name">{name}</h1>
          <h2 className="intro__title">{title}</h2>
          <p className="intro__tagline">{tagline}</p>
          <a className="intro__cta" href={ctaHref}>
            {ctaLabel} &darr;
          </a>
        </div>
        <div className="intro__photo-wrap">
          <img
            className="intro__photo"
            src={photo}
            alt={`Photo of ${name}`}
            width={280}
            height={280}
          />
        </div>
      </div>
    </section>
  );
}
