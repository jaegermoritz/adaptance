import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function readTree(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const parts = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) return readTree(entryPath);
      if (/\.(html|js|mjs|css|json|txt|map)$/i.test(entry.name)) {
        return readFile(entryPath, "utf8");
      }
      return "";
    }),
  );
  return parts.join("\n");
}

test("exposes the predictable Astro scripts", async () => {
  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));

  assert.equal(pkg.scripts.dev, "astro dev");
  assert.equal(pkg.scripts.check, "astro check");
  assert.equal(pkg.scripts.build, "astro build");
  assert.match(pkg.scripts.verify, /astro check/);
  assert.match(pkg.scripts.verify, /astro build/);
  assert.doesNotMatch(JSON.stringify(pkg.dependencies ?? {}), /"(next|vinext)"/);
  assert.doesNotMatch(JSON.stringify(pkg.devDependencies ?? {}), /"(next|vinext)"/);
});

test("production output is static HTML without a Next.js or Vinext runtime", async () => {
  const output = await readTree(path.join(root, "dist"));

  assert.doesNotMatch(output, /\/_next\//);
  assert.doesNotMatch(output, /__NEXT_DATA__/);
  assert.doesNotMatch(output, /vinext/i);
  assert.doesNotMatch(output, /_vinext/);
});
