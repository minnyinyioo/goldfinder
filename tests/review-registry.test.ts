import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("review register never represents unassigned professional reviews as complete", async () => {
  const source = await readFile(
    new URL("src/components/ReviewRegistry.tsx", root),
    "utf8",
  );
  assert.match(source, /Independent geological accuracy review/);
  assert.match(
    source,
    /Professional Burmese and geological terminology review/,
  );
  assert.match(source, /No genuine reviewer appointed/);
  assert.match(source, /status === c\.complete/);
});

test("trilingual review routes are included in deployment verification", async () => {
  const verifier = await readFile(
    new URL("scripts/verify-deployment.mjs", root),
    "utf8",
  );
  for (const route of ["/review", "/en/review", "/my/review"])
    assert.match(verifier, new RegExp(`"${route}"`));
});
