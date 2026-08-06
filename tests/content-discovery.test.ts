import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("search indexes trilingual knowledge articles", async () => {
  const source = await readFile(
    new URL("src/components/SearchHub.tsx", root),
    "utf8",
  );
  assert.match(source, /guides\.map/);
  assert.match(source, /enGuides\.map/);
  assert.match(source, /myanmarTopics\.map/);
  assert.match(source, /category === "all"/);
});

test("all three knowledge surfaces provide contextual guide navigation", async () => {
  for (const file of [
    "src/app/knowledge/page.tsx",
    "src/app/en/knowledge/page.tsx",
    "src/components/MyanmarKnowledge.tsx",
  ]) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /<RelatedGuideNav/);
  }
});
