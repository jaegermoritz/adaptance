import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const scriptPath = path.join(root, "scripts", "normalize-uberspace-target.sh");
const workflowPath = path.join(root, ".github", "workflows", "deploy.yml");
const pagesWorkflowPath = path.join(root, ".github", "workflows", "deploy-pages.yml");

function runNormalize(extraEnv) {
  return new Promise(async (resolve, reject) => {
    const directory = await mkdtemp(path.join(tmpdir(), "adaptance-deploy-"));
    const githubEnv = path.join(directory, "github.env");
    await writeFile(githubEnv, "");

    const child = spawn("bash", [scriptPath], {
      env: {
        PATH: process.env.PATH,
        GITHUB_ENV: githubEnv,
        ...extraEnv,
      },
    });

    let output = "";
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });
    child.on("error", reject);
    child.on("close", async (code) => {
      resolve({
        code,
        output,
        envFile: await readFile(githubEnv, "utf8"),
      });
    });
  });
}

test("requires the Uberspace deploy path and writes Adaptance SSH settings", async () => {
  const missingPath = await runNormalize({
    UBERSPACE_HOST: "stardust.uberspace.de",
    UBERSPACE_USER: "adaptance",
  });
  assert.notEqual(missingPath.code, 0);
  assert.match(missingPath.output, /UBERSPACE_DEPLOY_PATH/);

  const htmlFallback = await runNormalize({
    UBERSPACE_HOST: "stardust.uberspace.de",
    UBERSPACE_USER: "adaptance",
    UBERSPACE_DEPLOY_PATH: "html/",
  });
  assert.notEqual(htmlFallback.code, 0);
  assert.match(htmlFallback.output, /html/);

  const ok = await runNormalize({
    UBERSPACE_HOST: "ssh://adaptance@stardust.uberspace.de",
    UBERSPACE_USER: "adaptance",
    UBERSPACE_DEPLOY_PATH: "Applications/adaptance.org/",
  });
  assert.equal(ok.code, 0);
  assert.match(ok.envFile, /ADAPTANCE_UBERSPACE_USER=adaptance/);
  assert.match(ok.envFile, /ADAPTANCE_UBERSPACE_HOST=stardust\.uberspace\.de/);
  assert.match(ok.envFile, /ADAPTANCE_DEPLOY_PATH=Applications\/adaptance\.org\//);

  const messy = await runNormalize({
    UBERSPACE_HOST: "stardust.uberspace.de:22\n",
    UBERSPACE_USER: "adaptance\r\n",
    UBERSPACE_DEPLOY_PATH: "Applications/adaptance.org/",
  });
  assert.equal(messy.code, 0, messy.output);
  assert.match(messy.envFile, /ADAPTANCE_UBERSPACE_HOST=stardust\.uberspace\.de/);
  assert.match(messy.envFile, /ADAPTANCE_UBERSPACE_USER=adaptance/);
});

test("deploys the verified dist directory to Uberspace instead of GitHub Pages", async () => {
  await assert.rejects(() => access(pagesWorkflowPath));

  const workflow = await readFile(workflowPath, "utf8");
  const readme = await readFile(path.join(root, "README.md"), "utf8");

  assert.match(workflow, /actions\/checkout@v7/);
  assert.match(workflow, /actions\/setup-node@v7/);
  assert.match(workflow, /node-version: 22\.13\.0/);
  assert.match(workflow, /npm run verify/);
  assert.match(workflow, /adaptance-production/);
  assert.match(workflow, /timeout-minutes: 15/);
  assert.match(workflow, /StrictHostKeyChecking=yes/);
  assert.match(workflow, /dist\//);
  assert.doesNotMatch(workflow, /--delete/);
  assert.doesNotMatch(workflow, /deploy-pages|configure-pages|github-pages/i);
  assert.match(workflow, /ADAPTANCE_PUBLIC_URL/);
  assert.match(workflow, /UBERSPACE_DEPLOY_PATH/);

  assert.match(readme, /Uberspace deployment/);
  assert.match(readme, /UBERSPACE_HOST/);
  assert.match(readme, /UBERSPACE_USER/);
  assert.match(readme, /DEPLOY_KEY_PRIVATE/);
  assert.match(readme, /UBERSPACE_DEPLOY_PATH/);
  assert.match(readme, /Applications\/adaptance\.org\//);
  assert.match(readme, /Secrets and variables/);
  assert.match(readme, /no `html\/` fallback|not fall back to `html\/`/i);
  assert.match(readme, /npm run verify/);
  assert.match(readme, /workflow_dispatch|manually/);
  assert.doesNotMatch(readme, /jaegermoritz\.github\.io\/adaptance/);
});
