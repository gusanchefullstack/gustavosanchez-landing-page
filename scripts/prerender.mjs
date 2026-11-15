// Injects the server-rendered App into dist/index.html, then removes the SSR bundle.
// Runs after `vite build` and `vite build --ssr` (see the "build" script in package.json).
import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");
const htmlPath = resolve(root, "dist/index.html");
const ssrDir = resolve(root, "dist-ssr");

const { render } = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const appHtml = render();

const html = await readFile(htmlPath, "utf8");
const marker = '<div id="app"></div>';
if (!html.includes(marker)) throw new Error(`prerender: ${marker} not found in dist/index.html`);

await writeFile(htmlPath, html.replace(marker, `<div id="app">${appHtml}</div>`));
await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: injected ${(appHtml.length / 1024).toFixed(1)} kB of HTML into dist/index.html`);
