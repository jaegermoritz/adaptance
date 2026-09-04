import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, pathname) {
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  return response.text();
}

test("renders the Adaptance landing page with local production assets", async () => {
  const html = await render(await loadWorker(), "/");

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
});

test("renders the Adaptance privacy policy", async () => {
  const html = await render(await loadWorker(), "/privacy");

  assert.match(html, /Clear by design\./);
  assert.match(html, /private, single-user social media automation tool/);
  assert.match(html, /Every externally visible\s+post or comment requires human review/);
});
