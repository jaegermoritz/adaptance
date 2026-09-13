import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

async function readPage(relativePath) {
  return readFile(path.join(root, relativePath), "utf8");
}

function headingTexts(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi"))].map((match) =>
    match[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  );
}

test("renders the Adaptance landing page with local production assets", async () => {
  const html = await readPage("dist/index.html");

  assert.match(html, /Work changes more slowly\./);
  assert.match(html, /Reveal\. Align\. Act\./);
  assert.match(html, /adaptance-logo-light\.svg/);
  assert.match(html, /adaptance-mark\.svg/);
  assert.match(html, /images\/workshop-mapping-sebastien-bonneval\.jpg/);
  assert.match(html, /images\/team-collaboration-luke-miller\.jpg/);
  assert.match(html, /Constraint map/);
  assert.match(html, /Finance &amp; grants/);
  assert.match(html, /rel="canonical" href="https:\/\/adaptance\.org\/"/);
  assert.match(html, /href="\/privacy\/"/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("tells the landing-page story in the agreed order", async () => {
  const html = await readPage("dist/index.html");
  const [hero] = headingTexts(html, "h1");
  const sections = headingTexts(html, "h2");

  assert.equal(hero, "Technology moves fast. Work changes more slowly.");
  assert.deepEqual(sections, [
    "The tool is rarely the whole problem.",
    "You know something needs to change, but the next step is unclear.",
    "A small team, built around the work.",
    "Reveal. Align. Act.",
    "Start with one problem that matters.",
    "What keeps getting stuck in your organisation?",
  ]);
});

test("keeps the Reality Map labels and drops inflated language", async () => {
  const html = await readPage("dist/index.html");

  assert.match(html, /class="reality-map"/);
  assert.match(html, /<span class="layer-label">Visible<\/span>/);
  assert.match(html, /<span class="layer-label">Underlying<\/span>/);
  assert.match(html, /<span class="layer-label">Constraint<\/span>/);
  assert.match(html, /<span class="layer-label">Action<\/span>/);
  assert.match(html, /AI strategy/);
  assert.match(html, /One focused experiment/);

  for (const phrase of [
    "AI ambition",
    "absorption problem",
    "coordination capacity",
    "the system can realistically carry",
    "route into real work",
    "transformation theatre",
    "technological possibility",
    "staffing chart",
    "funding partners",
    "continuity by design",
    "Make change workable",
  ]) {
    assert.doesNotMatch(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("keeps at most three primary conversation CTAs", async () => {
  const html = await readPage("dist/index.html");
  const conversationCtas = [
    ...html.matchAll(/<a\b[^>]*class="[^"]*(?:nav-cta|button)[^"]*"[^>]*>[\s\S]*?<\/a>/gi),
  ].filter((match) => match[0].includes("linkedin.com"));

  assert.equal(conversationCtas.length, 3);
  assert.match(html, /Discuss a sprint with Adaptance/);
  assert.match(html, /Talk it through with Adaptance/);
});

test("renders the Adaptance privacy policy", async () => {
  const html = await readPage("dist/privacy/index.html");

  assert.match(html, /Clear by design\./);
  assert.match(html, /private, single-user social media automation tool/);
  assert.match(html, /Every externally visible\s+post or comment requires human review/);
  assert.match(html, /rel="canonical" href="https:\/\/adaptance\.org\/privacy\/"/);
  assert.doesNotMatch(html, /<form\b/i);
});
