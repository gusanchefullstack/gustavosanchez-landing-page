import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import { LiveDemoIcon, SourceCodeIcon } from "../utils/icons.tsx";

export function CaseStudies() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, items } = content.caseStudies;

  return (
    <section id="work" className="section cases" aria-labelledby="work-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="work-title" className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
      </header>

      <div className="cases__list reveal" ref={ref}>
        {items.map((study) => (
          <article className="case-study" key={study.name}>
            <div className="case-study__visual">
              <span className="case-study__number">{study.number} / 03</span>
              <img
                className="case-study__image"
                src={study.image}
                alt={study.imageAlt}
                loading="lazy"
              />
            </div>
            <div className="case-study__content">
              <p className="case-study__descriptor">{study.descriptor}</p>
              <h3 className="case-study__name">{study.name}</h3>
              <p className="case-study__thesis">{study.thesis}</p>

              <dl className="case-study__narrative">
                <div>
                  <dt>Constraint</dt>
                  <dd>{study.challenge}</dd>
                </div>
                <div>
                  <dt>System</dt>
                  <dd>{study.approach}</dd>
                </div>
                <div>
                  <dt>Outcome</dt>
                  <dd>{study.outcome}</dd>
                </div>
              </dl>

              <div className="case-study__proof" aria-label={`${study.name} results`}>
                {study.proof.map((item) => (
                  <div className="case-study__metric" key={item.label}>
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              <ul className="case-study__tags" aria-label="Technologies">
                {study.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>

              <div className="case-study__links">
                <a href={study.liveUrl} target="_blank" rel="noopener">
                  <LiveDemoIcon size={15} aria-hidden="true" /> Visit product
                </a>
                <a href={study.repoUrl} target="_blank" rel="noopener">
                  <SourceCodeIcon size={15} aria-hidden="true" /> View source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
