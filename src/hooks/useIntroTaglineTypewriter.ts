import type { IntroTextSpan } from "../config/content.ts";
import { useEffect, useMemo, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion.ts";

export interface IntroTaglineTypewriterOptions {
  /** How many trailing paragraphs use the effect (default 2) */
  lastParagraphCount?: number;
  msPerChar?: number;
  /** Delay after plain text is complete before swapping to accented HTML */
  plainToRichMs?: number;
  /** Pause after rich reveal before starting the next paragraph */
  betweenParagraphMs?: number;
}

export interface IntroTaglineTypewriterState {
  twStart: number;
  completedRich: boolean[];
  typingIndex: number | null;
  plainLen: number;
  fullTexts: string[];
}

function flattenParagraph(parts: IntroTextSpan[]): string {
  return parts.map((s) => s.text).join("");
}

/**
 * Option A: type plain text first; after each paragraph finishes, show spans with accents.
 */
export function useIntroTaglineTypewriter(
  paragraphs: IntroTextSpan[][],
  options: IntroTaglineTypewriterOptions = {},
): IntroTaglineTypewriterState {
  const lastN = options.lastParagraphCount ?? 2;
  const charMs = options.msPerChar ?? 18;
  const plainToRichMs = options.plainToRichMs ?? 120;
  const betweenMs = options.betweenParagraphMs ?? 400;

  const twStart = Math.max(0, paragraphs.length - lastN);

  const fullTexts = useMemo(
    () => paragraphs.slice(twStart).map((p) => flattenParagraph(p)),
    [paragraphs, twStart],
  );

  const reducedMotion = usePrefersReducedMotion();

  const [completedRich, setCompletedRich] = useState(() =>
    paragraphs.map((_, i) => i < twStart || reducedMotion),
  );
  const [typingIndex, setTypingIndex] = useState<number | null>(() =>
    reducedMotion || twStart >= paragraphs.length ? null : twStart,
  );
  const [plainLen, setPlainLen] = useState(0);

  useEffect(() => {
    if (!reducedMotion) return;
    setCompletedRich(paragraphs.map(() => true));
    setTypingIndex(null);
  }, [reducedMotion, paragraphs.length]);

  useEffect(() => {
    setPlainLen(0);
  }, [typingIndex]);

  useEffect(() => {
    if (reducedMotion || typingIndex === null) return;
    if (completedRich[typingIndex]) return;
    const localIdx = typingIndex - twStart;
    const full = fullTexts[localIdx];
    if (!full) return;

    const id = window.setInterval(() => {
      setPlainLen((l) => (l >= full.length ? l : l + 1));
    }, charMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, typingIndex, twStart, fullTexts, charMs, completedRich]);

  useEffect(() => {
    if (reducedMotion || typingIndex === null) return;
    if (completedRich[typingIndex]) return;
    const localIdx = typingIndex - twStart;
    const full = fullTexts[localIdx];
    if (!full || plainLen < full.length) return;

    let betweenId: ReturnType<typeof window.setTimeout> | undefined;
    const t = window.setTimeout(() => {
      setCompletedRich((prev) => {
        const next = [...prev];
        next[typingIndex] = true;
        return next;
      });
      const nextIdx = typingIndex + 1;
      if (nextIdx < paragraphs.length) {
        betweenId = window.setTimeout(() => setTypingIndex(nextIdx), betweenMs);
      } else {
        setTypingIndex(null);
      }
    }, plainToRichMs);
    return () => {
      window.clearTimeout(t);
      if (betweenId !== undefined) window.clearTimeout(betweenId);
    };
  }, [
    reducedMotion,
    typingIndex,
    plainLen,
    fullTexts,
    twStart,
    paragraphs.length,
    completedRich,
    plainToRichMs,
    betweenMs,
  ]);

  return { twStart, completedRich, typingIndex, plainLen, fullTexts };
}
