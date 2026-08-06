import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("metadata, robots and sitemap use the central public origin", async () => {
  for (const file of [
    "src/app/layout.tsx",
    "src/app/robots.ts",
    "src/app/sitemap.ts",
  ]) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /SITE_URL/);
    assert.doesNotMatch(source, /https:\/\/goldfinder\.vercel\.app/);
  }
});

test("deployment verification accepts the configured production origin", async () => {
  const source = await readFile(
    new URL("scripts/verify-deployment.mjs", root),
    "utf8",
  );
  assert.match(source, /process\.env\.NEXT_PUBLIC_SITE_URL/);
});
