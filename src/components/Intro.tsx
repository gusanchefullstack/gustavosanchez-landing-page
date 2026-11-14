import { useEffect, useState } from "react";
import { content } from "../config/content.ts";
import type { Theme } from "../hooks/useTheme.ts";
import { CopiedIcon, CopyIcon } from "../utils/icons.tsx";
import { HeroCanvas } from "./HeroCanvas.tsx";

const WORD_INTERVAL_MS = 2400;

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
  const {
    ctaLabel,
    ctaHref,
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
          <span className="hero__badge-cta">Let&apos;s talk →</span>
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

      <section className="stats" aria-label="Evidence at a glance">
        {content.stats.map((stat) => (
          <div className="stats__item" key={stat.label}>
            <span className="stats__value">
              {stat.value}
            </span>
            <span className="stats__label">{stat.label}</span>
          </div>
        ))}
      </section>

    </>
  );
}
