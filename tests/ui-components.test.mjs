import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function readCssTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const contents = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return readCssTree(entryPath);
      return entry.name.endsWith(".css") ? readFile(entryPath, "utf8") : "";
    }),
  );
  return contents.join("\n");
}

test("preserves the two purposeful micro-interactions", async () => {
  const css = await readFile(path.join(root, "app", "globals.css"), "utf8");

  assert.match(css, /@keyframes signal-shift/);
  assert.match(css, /@keyframes friction-path-x/);
  assert.match(css, /@keyframes friction-path-y/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.doesNotMatch(css, /@keyframes team-progress/);
});

test("keeps the method numbers prominent and the Act card readable", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /\.method-number\{[^}]*font-size:clamp\(5\.4rem,8vw,8\.7rem\)/);
  assert.match(css, /\.method-steps \.method-action>p:not\(\.method-verb\)\{color:#fff\}/);
});

test("keeps the hero accent below the headline and removes the diagonal overlay", async () => {
  const css = await readFile(path.join(root, "app", "globals.css"), "utf8");

  assert.match(css, /\.hero h1 span::after/);
  assert.doesNotMatch(css, /\.hero::before/);
  assert.doesNotMatch(css, /clip-path/);
});

test("ships the selected A within D mark as the compact icon", async () => {
  const mark = await readFile(path.join(root, "public", "adaptance-mark.svg"), "utf8");
  const favicon = await readFile(path.join(root, "public", "favicon.svg"), "utf8");

  assert.match(mark, /A within D mark/);
  assert.match(mark, /fill-rule="evenodd"/);
  assert.doesNotMatch(mark, /#D8A03B/i);
  assert.match(favicon, /fill-rule="evenodd"/);
});
