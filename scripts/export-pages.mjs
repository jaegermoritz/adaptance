import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const clientDirectory = path.join(projectRoot, "dist", "client");
const outputDirectory = path.join(projectRoot, "dist", "pages");
const siteOrigin = (process.env.SITE_ORIGIN ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const configuredBasePath = process.env.BASE_PATH ?? "";
const basePath = configuredBasePath
  ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

function prepareHtml(source) {
  const withoutRuntime = source
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, "");

  return withoutRuntime.replace(
    /(href|src|data-rsc-css-href)=(["'])\/(?!\/)/gi,
    `$1=$2${basePath}/`,
  );
}

async function fetchRoute(route) {
  const response = await fetch(`${siteOrigin}${route}`);
  if (!response.ok) {
    throw new Error(`Could not export ${route}: ${response.status} ${response.statusText}`);
  }
  return prepareHtml(await response.text());
}

await rm(outputDirectory, { recursive: true, force: true });
await cp(clientDirectory, outputDirectory, { recursive: true });

const home = await fetchRoute("/");
const privacy = await fetchRoute("/privacy");

if (!home.includes("Make change workable.")) {
  throw new Error("The exported home page is missing its primary heading.");
}
if (!privacy.includes("Clear by design.")) {
  throw new Error("The exported privacy page is missing its primary heading.");
}

await mkdir(path.join(outputDirectory, "privacy"), { recursive: true });
await writeFile(path.join(outputDirectory, "index.html"), home);
await writeFile(path.join(outputDirectory, "privacy", "index.html"), privacy);
await writeFile(path.join(outputDirectory, "404.html"), home);
await writeFile(path.join(outputDirectory, ".nojekyll"), "");

const manifest = JSON.parse(
  await readFile(path.join(clientDirectory, ".vite", "manifest.json"), "utf8"),
);
if (Object.keys(manifest).length === 0) {
  throw new Error("The client asset manifest is empty.");
}

console.log(`Static GitHub Pages bundle written to ${outputDirectory}`);
