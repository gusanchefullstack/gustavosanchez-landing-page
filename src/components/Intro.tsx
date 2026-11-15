import { useEffect, useState } from "react";
import { content } from "../config/content.ts";
import { CopiedIcon, CopyIcon } from "../utils/icons.tsx";

const WORD_INTERVAL_MS = 2600;

function useRotatingIndex(length: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setIndex((prev) => (prev + 1) % length),
      WORD_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [length]);
  return index;
}

function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button type="button" className="button button--ghost" onClick={copy}>
      {email}
      {copied ? <CopiedIcon size={15} aria-hidden="true" /> : <CopyIcon size={15} aria-hidden="true" />}
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : "Copy email address"}
      </span>
    </button>
  );
}

export function Intro() {
  const { ctaLabel, ctaHref, badge, heroLead, heroWords, heroSummary, photo, name } =
    content.intro;
  const wordIndex = useRotatingIndex(heroWords.length);

  return (
    <>
      <section id="intro" className="hero container" aria-labelledby="hero-title">
        <div className="hero__id">
          <div className="hero__avatar">
            <img src={photo} alt={`Portrait of ${name}`} width={96} height={96} />
          </div>
          <div className="hero__who">
            <p className="hero__name">{name}</p>
            <p className="hero__location">{content.resume.location}</p>
          </div>
        </div>

        <a className="hero__badge" href={badge.href}>
          <span className="hero__pulse" aria-hidden="true" />
          {badge.label}
        </a>
        <h1 id="hero-title" className="hero__title">
          <span className="hero__lead">{heroLead}</span>{" "}
          <span className="hero__word" key={wordIndex} aria-hidden="true">
            {heroWords[wordIndex]}
          </span>
          <span className="sr-only">{heroWords.join(" ")}</span>
        </h1>
        <div className="hero__foot">
          <p className="hero__summary">{heroSummary}</p>
          <div className="hero__actions">
            <a className="button button--primary" href={ctaHref}>
              {ctaLabel} <span aria-hidden="true">→</span>
            </a>
            <CopyEmailButton email={content.contact.info.email} />
          </div>
        </div>
      </section>

      <section className="stats container" aria-label="Evidence at a glance">
        {content.stats.map((stat) => (
          <div className="stats__item" key={stat.label}>
            <span className="stats__value">{stat.value}</span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </section>
    </>
  );
}
