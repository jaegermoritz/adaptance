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

  assert.match(html, /Reveal\. Align\. Act\./);
  assert.match(html, /adaptance-logo-light\.svg/);
  assert.match(html, /images\/workshop-mapping-sebastien-bonneval\.jpg/);
  assert.match(html, /images\/team-workshop-md-jawadur-rahman\.jpg/);
  assert.match(html, /Constraint map/);
  assert.match(html, /Finance and grants/);
  assert.match(html, /rel="canonical" href="https:\/\/adaptance\.org\/"/);
  assert.match(html, /href="\/privacy\/"/);
  assert.doesNotMatch(html, /<form\b/i);
});

test("tells the landing-page story in the agreed order", async () => {
  const html = await readPage("dist/index.html");
  const [hero] = headingTexts(html, "h1");
  const sections = headingTexts(html, "h2");

  assert.equal(hero, "What is getting stuck between technological possibility and real work?");
  assert.deepEqual(sections, [
    "You know something needs to change, but the next step is unclear.",
    "The tool is rarely the whole problem.",
    "Reveal. Align. Act.",
    "Start with one problem that matters.",
    "A small team, built around the work.",
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
    "staffing chart",
    "funding partners",
    "continuity by design",
    "Make change workable",
  ]) {
    assert.doesNotMatch(html, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
  }
});

test("keeps the A-within-D mark visible next to the wordmark in the header", async () => {
  const html = await readPage("dist/index.html");
  const header = html.match(/<header class="site-header">[\s\S]*?<\/header>/)?.[0] ?? "";

  assert.match(header, /adaptance-mark\.svg/);
  assert.match(header, /adaptance-logo-light\.svg/);
});

test("shows the documentary team photograph with a source credit off the image", async () => {
  const html = await readPage("dist/index.html");
  const teamPhoto = html.match(/<figure class="team-photo">[\s\S]*?<\/figure>/)?.[0] ?? "";

  assert.match(teamPhoto, /images\/team-workshop-md-jawadur-rahman\.jpg/);
  assert.match(teamPhoto, /Photo · Md Jawadur Rahman \/ Pexels/);
  assert.match(
    teamPhoto,
    /https:\/\/www\.pexels\.com\/photo\/collaborative-team-meeting-with-casual-notes-32074767\//,
  );
  assert.doesNotMatch(teamPhoto, /luke-miller|Luke Miller|Trusted specialists/i);
});

test("shows the four team areas as one static accountable team", async () => {
  const html = await readPage("dist/index.html");
  const teamMap = html.match(/<div class="team-map"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/)?.[0] ?? "";

  assert.match(teamMap, /Systems and change/);
  assert.match(teamMap, /Software delivery/);
  assert.match(teamMap, /Finance and grants/);
  assert.match(teamMap, /Programme management/);
  assert.match(teamMap, /One accountable team/);
});

test("gives Reveal. Align. Act. the same section rail as the gap", async () => {
  const html = await readPage("dist/index.html");
  const method = html.match(/<section class="method-section"[\s\S]*?<\/section>/)?.[0] ?? "";

  assert.match(method, /<div class="section-rail">/);
  assert.match(method, /<span>04<\/span>/);
  assert.match(method, /<p>The method<\/p>/);
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
