import type { IntroTextSpan } from "../config/content.ts";
import { content } from "../config/content.ts";
import { useIntroTaglineTypewriter } from "../hooks/useIntroTaglineTypewriter.ts";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

function renderIntroSpans(parts: IntroTextSpan[]) {
  return parts.map((part, i) =>
    part.accent ? (
      <span
        key={i}
        className={
          part.accentGradient
            ? "intro__title-accent"
            : `intro__accent intro__accent--${part.accentTone ?? 0}`
        }
      >
        {part.text}
      </span>
    ) : (
      <span key={i}>{part.text}</span>
    ),
  );
}

export function Intro() {
  const ref = useScrollReveal<HTMLDivElement>();
  const {
    greeting,
    name,
    headline,
    subheadline,
    taglineParagraphs,
    ctaLabel,
    ctaHref,
    photo,
  } = content.intro;

  const typewriter = useIntroTaglineTypewriter(taglineParagraphs, {
    lastParagraphCount: 2,
    msPerChar: 18,
    plainToRichMs: 120,
    betweenParagraphMs: 450,
  });

  return (
    <section id="intro" className="intro">
      <div className="intro__layout reveal" ref={ref}>
        <div className="intro__content">
          <p className="intro__greeting">{greeting}</p>
          <h1 className="intro__name">{name}</h1>
          <h2 className="intro__title">
            <span className="intro__title-line intro__title-line--headline">
              {renderIntroSpans(headline)}
            </span>
            <span className="intro__title-line">{renderIntroSpans(subheadline)}</span>
          </h2>
          <div className="intro__tagline">
            {taglineParagraphs.map((para, pi) => {
              if (pi < typewriter.twStart) {
                return <p key={pi}>{renderIntroSpans(para)}</p>;
              }
              if (typewriter.completedRich[pi]) {
                return <p key={pi}>{renderIntroSpans(para)}</p>;
              }
              if (typewriter.typingIndex === pi) {
                const full = typewriter.fullTexts[pi - typewriter.twStart];
                return (
                  <p key={pi} className="intro__tagline-typewriter">
                    {full.slice(0, typewriter.plainLen)}
                    <span className="intro__typewriter-cursor" aria-hidden />
                  </p>
                );
              }
              return null;
            })}
          </div>
          <a className="intro__cta" href={ctaHref}>
            {ctaLabel} &darr;
          </a>
        </div>
        <div className="intro__photo-wrap">
          <img
            className="intro__photo"
            src={photo}
            alt={`Photo of ${name}`}
            width={330}
            height={330}
          />
        </div>
      </div>
    </section>
  );
}
