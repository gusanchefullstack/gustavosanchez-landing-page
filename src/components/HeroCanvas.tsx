import { useEffect, useRef } from "react";
import type { Theme } from "../hooks/useTheme.ts";

/** Grid pitch in CSS px — matches the hairline grid used across the page. */
const CELL = 72;
const BEAM_COUNT = 9;
const BEAM_COLORS = ["0, 112, 243", "121, 40, 202", "255, 0, 128", "80, 227, 194"];

interface Beam {
  vertical: boolean;
  /** Index of the grid line the beam runs along */
  line: number;
  /** Head position along the line, px */
  pos: number;
  speed: number;
  length: number;
  color: string;
}

function randomBeam(cols: number, rows: number, width: number, height: number): Beam {
  const vertical = Math.random() < 0.5;
  const length = 80 + Math.random() * 140;
  return {
    vertical,
    line: Math.floor(Math.random() * ((vertical ? cols : rows) + 1)),
    pos: -length - Math.random() * (vertical ? height : width),
    speed: 0.6 + Math.random() * 1.4,
    length,
    color: BEAM_COLORS[Math.floor(Math.random() * BEAM_COLORS.length)],
  };
}

/**
 * Decorative hero background: the page's hairline grid with light pulses
 * travelling along its lines, and grid intersections that brighten near
 * the pointer. Static grid only when the visitor prefers reduced motion.
 */
export function HeroCanvas({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const styles = getComputedStyle(document.documentElement);
    const lineColor = styles.getPropertyValue("--color-line").trim() || "#262626";
    const dotRgb = theme === "dark" ? "255, 255, 255" : "0, 0, 0";
    const beamAlpha = theme === "dark" ? 0.9 : 0.7;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let beams: Beam[] = [];
    let frame = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      beams = Array.from({ length: BEAM_COUNT }, () => randomBeam(cols, rows, width, height));
      if (reducedMotion) draw();
    }

    // Grid lines are offset so the grid stays centred on the hero
    const offsetX = () => (width % CELL) / 2;
    const offsetY = () => (height % CELL) / 2;

    function drawGrid() {
      ctx!.strokeStyle = lineColor;
      ctx!.lineWidth = 1;
      ctx!.beginPath();
      for (let i = 0; i <= cols; i++) {
        const x = Math.round(offsetX() + i * CELL) + 0.5;
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, height);
      }
      for (let j = 0; j <= rows; j++) {
        const y = Math.round(offsetY() + j * CELL) + 0.5;
        ctx!.moveTo(0, y);
        ctx!.lineTo(width, y);
      }
      ctx!.stroke();
    }

    function drawPointerGlow() {
      const radius = CELL * 2.5;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = offsetX() + i * CELL;
          const y = offsetY() + j * CELL;
          const d = Math.hypot(x - pointer.x, y - pointer.y);
          if (d > radius) continue;
          const strength = 1 - d / radius;
          ctx!.fillStyle = `rgba(${dotRgb}, ${0.55 * strength})`;
          ctx!.beginPath();
          ctx!.arc(x, y, 1.5 + strength * 1.5, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
    }

    function drawBeams() {
      for (let k = 0; k < beams.length; k++) {
        const b = beams[k];
        const fixed = b.vertical
          ? Math.round(offsetX() + b.line * CELL) + 0.5
          : Math.round(offsetY() + b.line * CELL) + 0.5;
        const tail = b.pos - b.length;
        const gradient = b.vertical
          ? ctx!.createLinearGradient(fixed, tail, fixed, b.pos)
          : ctx!.createLinearGradient(tail, fixed, b.pos, fixed);
        gradient.addColorStop(0, `rgba(${b.color}, 0)`);
        gradient.addColorStop(1, `rgba(${b.color}, ${beamAlpha})`);
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1.5;
        ctx!.beginPath();
        if (b.vertical) {
          ctx!.moveTo(fixed, tail);
          ctx!.lineTo(fixed, b.pos);
        } else {
          ctx!.moveTo(tail, fixed);
          ctx!.lineTo(b.pos, fixed);
        }
        ctx!.stroke();

        b.pos += b.speed;
        if (tail > (b.vertical ? height : width)) {
          beams[k] = randomBeam(cols, rows, width, height);
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      drawGrid();
      if (!reducedMotion) {
        drawBeams();
        drawPointerGlow();
      }
    }

    function loop() {
      if (visible) draw();
      frame = requestAnimationFrame(loop);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    if (reducedMotion) {
      return () => resizeObserver.disconnect();
    }

    // Stop drawing while the hero is scrolled out of view
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibilityObserver.observe(canvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="hero__canvas" />;
}
