import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Experience() {
  const ref = useScrollReveal<HTMLDivElement>();
  const { subtitle, title, description, chapters, credentials } = content.experience;

  return (
    <section id="experience" className="section experience" aria-labelledby="experience-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="experience-title" className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
      </header>

      <div className="experience__body reveal" ref={ref}>
        <div className="experience__timeline">
          {chapters.map((chapter) => (
            <article className="experience__chapter" key={chapter.period}>
              <p className="experience__period">{chapter.period}</p>
              <div>
                <h3>{chapter.role}</h3>
                <p className="experience__org">{chapter.organization}</p>
                <p className="experience__summary">{chapter.summary}</p>
                <ul className="experience__proof">
                  {chapter.proof.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <aside className="experience__credentials" aria-label="Education and certifications">
          <span>Credentials</span>
          <ul>
            {credentials.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </aside>
      </div>
    </section>
  );
}
