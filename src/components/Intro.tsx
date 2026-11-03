import { useEffect, useState } from "react";
import type { IntroTextSpan } from "../config/content.ts";
import { content } from "../config/content.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";
import type { Theme } from "../hooks/useTheme.ts";
import { CopiedIcon, CopyIcon } from "../utils/icons.tsx";
import { HeroCanvas } from "./HeroCanvas.tsx";

const WORD_INTERVAL_MS = 2400;

function renderIntroSpans(parts: IntroTextSpan[]) {
  return parts.map((part, i) =>
    part.accent ? (
      <strong key={i} className="about__accent">
        {part.text}
      </strong>
    ) : (
      <span key={i}>{part.text}</span>
    ),
  );
}

function useRotatingIndex(length: number) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length < 2) return;
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
    <button type="button" className="button button--terminal" onClick={copy}>
      <span className="button__prompt" aria-hidden="true">
        $
      </span>
      {email}
      <span className="button__kbd" aria-hidden="true">
        {copied ? <CopiedIcon size={13} /> : <CopyIcon size={13} />}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email address copied" : "Copy email address"}
      </span>
    </button>
  );
}

export function Intro({ theme }: { theme: Theme }) {
  const aboutRef = useScrollReveal<HTMLDivElement>();
  const {
    name,
    headline,
    taglineParagraphs,
    ctaLabel,
    ctaHref,
    photo,
    badge,
    heroLead,
    heroWords,
    heroSummary,
  } = content.intro;
  const wordIndex = useRotatingIndex(heroWords.length);

  return (
    <>
      <section id="intro" className="hero frame" aria-labelledby="hero-title">
        {/* Clipped layer, so the crosshairs on the hero's corners can overhang the rails */}
        <div className="hero__bg" aria-hidden="true">
          <HeroCanvas theme={theme} />
          <div className="hero__glow" />
        </div>

        <a className="hero__badge" href={badge.href}>
          {badge.label}
          <span className="hero__badge-cta">Read more →</span>
        </a>
        <h1 id="hero-title" className="hero__title">
          {heroLead}{" "}
          <span className="hero__word" key={wordIndex} aria-hidden="true">
            {heroWords[wordIndex]}
          </span>
          <span className="sr-only">{heroWords.join(" ")}</span>
        </h1>
        <p className="hero__summary">{heroSummary}</p>
        <div className="hero__actions">
          <a className="button button--primary" href={ctaHref}>
            {ctaLabel}
          </a>
          <CopyEmailButton email={content.contact.info.email} />
        </div>

        <span className="crosshair crosshair--bl" aria-hidden="true" />
        <span className="crosshair crosshair--br" aria-hidden="true" />
      </section>

      <section className="stats" aria-label="At a glance">
        {content.stats.map((stat) => (
          <div className="stats__item" key={stat.label}>
            <span className="stats__value">
              {stat.value.replace(
                "{projects}",
                String(content.projects.items.length),
              )}
            </span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="about" aria-labelledby="about-title">
        <div className="about__layout reveal" ref={aboutRef}>
          <div className="about__photo-wrap">
            <img
              className="about__photo"
              src={photo}
              alt={`Photo of ${name}`}
              width={330}
              height={330}
            />
          </div>
          <div className="about__content">
            <span className="section__eyebrow">/about</span>
            <h2 id="about-title" className="about__title">
              {renderIntroSpans(headline)}
            </h2>
            {taglineParagraphs.map((para, pi) => (
              <p className="about__text" key={pi}>
                {renderIntroSpans(para)}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
