import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

export function Process() {
  const ref = useScrollReveal<HTMLOListElement>();
  const { subtitle, title, description, steps } = content.process;

  return (
    <section id="process" className="section process" aria-labelledby="process-title">
      <header className="section__head">
        <span className="section__eyebrow">{subtitle}</span>
        <h2 id="process-title" className="section__title">{title}</h2>
        <p className="section__description">{description}</p>
      </header>
      <ol className="process__steps reveal" ref={ref}>
        {steps.map((step) => (
          <li className="process__step" key={step.number}>
            <span className="process__number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            <span className="process__output">{step.output}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
