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
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /@keyframes signal-shift/);
  assert.match(css, /@keyframes friction-path-x/);
  assert.match(css, /@keyframes friction-path-y/);
  assert.match(css, /@media \(prefers-reduced-motion:reduce\)/);
});

test("keeps the method numbers prominent and the Act card readable", async () => {
  const css = await readCssTree(path.join(root, "dist"));

  assert.match(css, /\.method-number\{[^}]*font-size:clamp\(4\.8rem,7\.4vw,8rem\)/);
  assert.match(css, /\.method-steps \.method-action>p:not\(\.method-verb\)\{color:#fff\}/);
});
