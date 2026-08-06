import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("core guide families map to primary evidence sources", async () => {
  const source = await readFile(
    new URL("src/components/GuideCitations.tsx", root),
    "utf8",
  );
  for (const id of [
    "basics",
    "formation",
    "placer",
    "lode",
    "atlas",
    "tools",
    "sampling",
    "false-gold",
    "qaqc",
    "fraud",
  ])
    assert.match(
      source,
      new RegExp(`(?:^|[\\s,{\"])${id.replace("-", "\\-")}(?:[\":]|$)`),
    );
  assert.match(source, /pubs\.usgs\.gov/);
  assert.match(source, /epa\.gov/);
});

test("citations render inside Chinese, English and Myanmar guides", async () => {
  for (const file of [
    "src/app/knowledge/page.tsx",
    "src/app/en/knowledge/page.tsx",
    "src/components/MyanmarKnowledge.tsx",
  ]) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /<GuideCitations/);
  }
});
