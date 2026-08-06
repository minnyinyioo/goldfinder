import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("all language home pages include usage guidance and Q&A", async () => {
  for (const file of [
    "src/app/page.tsx",
    "src/app/en/page.tsx",
    "src/app/my/page.tsx",
  ]) {
    const source = await readFile(new URL(file, root), "utf8");
    assert.match(source, /<HomeSupport/);
  }
  const support = await readFile(
    new URL("src/components/HomeSupport.tsx", root),
    "utf8",
  );
  assert.match(support, /<details/);
  assert.match(support, /usage-guide/);
  assert.match(support, /home-faq/);
});

test("global typography uses the compact heading and menu scale", async () => {
  const css = await readFile(new URL("src/app/globals.css", root), "utf8");
  assert.match(css, /main h1/);
  assert.match(css, /main h2/);
  assert.match(css, /font-size: clamp\(17px, 2vw, 24px\)/);
});

test("light theme retains layered surfaces instead of flat blocks", async () => {
  const css = await readFile(new URL("src/app/theme.css", root), "utf8");
  assert.match(css, /radial-gradient\(circle at 8% 20%/);
  assert.match(css, /\.usage-grid a/);
  assert.match(css, /box-shadow/);
});
