import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App.tsx";

/**
 * Build-time prerender (see scripts/prerender.mjs). Crawlers and LLM agents
 * that don't run JavaScript get the full page text instead of an empty #app.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
