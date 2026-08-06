import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("provides a keyboard skip link and focusable main landmark", async () => {
  const layout = await readFile(new URL("src/app/layout.tsx", root), "utf8");
  const navigation = await readFile(new URL("src/components/SiteNav.tsx", root), "utf8");
  assert.match(navigation, /className="skip-link"/);
  assert.match(navigation, /href="#main-content"/);
  assert.match(navigation, /main\?\.focus\(\)/);
  assert.match(layout, /<main id="main-content" tabIndex=\{-1\}>/);
});

test("overlay navigation supports Escape and trapped Tab focus", async () => {
  const navigation = await readFile(new URL("src/components/SiteNav.tsx", root), "utf8");
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /event\.key === "Tab"/);
  assert.match(navigation, /menuButton\.current\?\.focus\(\)/);
  assert.match(navigation, /aria-expanded=\{open\}/);
});

test("all interactive controls receive a visible keyboard focus ring", async () => {
  const css = await readFile(new URL("src/app/globals.css", root), "utf8");
  assert.match(css, /:focus-visible/);
  assert.match(css, /outline: 3px solid var\(--gold2\)/);
});
