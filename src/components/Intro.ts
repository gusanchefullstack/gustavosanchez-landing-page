import { content } from "../config/content.ts";

/**
 * Hero / Intro section — two-column layout with profile photo.
 */
export function renderIntro(): string {
  const { greeting, name, title, tagline, ctaLabel, ctaHref, photo } =
    content.intro;

  return `
    <section id="intro" class="intro">
      <div class="intro__layout reveal">
        <div class="intro__content">
          <p class="intro__greeting">${greeting}</p>
          <h1 class="intro__name">${name}</h1>
          <h2 class="intro__title">${title}</h2>
          <p class="intro__tagline">${tagline}</p>
          <a class="intro__cta" href="${ctaHref}">${ctaLabel} &darr;</a>
        </div>
        <div class="intro__photo-wrap">
          <img
            class="intro__photo"
            src="${photo}"
            alt="Photo of ${name}"
            width="280"
            height="280"
          />
        </div>
      </div>
    </section>
  `;
}
