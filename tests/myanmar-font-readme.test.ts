import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("Myanmar routes load Noto Serif Myanmar across the page chrome", async () => {
  const layout = await readFile(new URL("src/app/my/layout.tsx", root), "utf8");
  const language = await readFile(
    new URL("src/components/MyanmarLang.tsx", root),
    "utf8",
  );
  assert.match(layout, /Noto_Serif_Myanmar/);
  assert.match(layout, /subsets: \["myanmar"\]/);
  assert.match(layout, /fontClassName=\{myanmarSerif\.className\}/);
  assert.match(language, /document\.body\.classList\.add\(fontClassName\)/);
});

test("README documents the current product surface", async () => {
  const readme = await readFile(new URL("README.md", root), "utf8");
  for (const topic of [
    "看图识别",
    "现场评分",
    "品位计算",
    "样品档案",
    "地图与样点",
    "QA/QC",
    "Noto Serif Myanmar",
    "Local Storage",
    "Vercel",
  ]) {
    assert.match(readme, new RegExp(topic));
  }
});
