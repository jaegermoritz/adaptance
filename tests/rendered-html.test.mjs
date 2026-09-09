import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function readPage(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

test("renders the Adaptance landing page with local production assets", async () => {
  const html = await readPage("dist/index.html");

  assert.match(html, /Make change workable\./);
  assert.match(html, /The Adaptance Sprint/);
  assert.match(html, /Reveal\. Align\. Act\./);
  assert.match(html, /adaptance-logo-light\.svg/);
  assert.match(html, /adaptance-mark\.svg/);
  assert.match(html, /images\/workshop-mapping-sebastien-bonneval\.jpg/);
  assert.match(html, /images\/team-collaboration-luke-miller\.jpg/);
  assert.match(html, /One accountable delivery line/);
  assert.match(html, /Finance &amp; grants/);
  assert.match(html, /Built around the challenge, not a staffing chart\./);
  assert.match(html, /rel="canonical" href="https:\/\/adaptance\.org\/"/);
  assert.match(html, /href="\/privacy\/"/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("renders the Adaptance privacy policy", async () => {
  const html = await readPage("dist/privacy/index.html");

  assert.match(html, /Clear by design\./);
  assert.match(html, /private, single-user social media automation tool/);
  assert.match(html, /Every externally visible\s+post or comment requires human review/);
  assert.match(html, /rel="canonical" href="https:\/\/adaptance\.org\/privacy\/"/);
  assert.doesNotMatch(html, /<form\b/i);
});
