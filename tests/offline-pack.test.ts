import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("offline pack includes all language surfaces and local reference images", async () => {
  const worker = await readFile(new URL("public/sw.js", root), "utf8");
  for (const route of ["/sampling", "/en/sampling", "/my/knowledge", "/backup"]) {
    assert.match(worker, new RegExp(`"${route.replace("/", "\\/")}"`));
  }
  assert.match(worker, /CACHE_OFFLINE_PACK/);
  assert.match(worker, /OFFLINE_PROGRESS/);
  assert.match(worker, /discoverAssets/);
  assert.match(worker, /#0\*38/);
  assert.match(worker, /#x0\*26/);
  assert.match(worker, /gold-native\.jpg/);
});

test("data vault exposes the trilingual offline pack manager", async () => {
  const vault = await readFile(new URL("src/components/DataVault.tsx", root), "utf8");
  const manager = await readFile(
    new URL("src/components/OfflinePackManager.tsx", root),
    "utf8",
  );
  assert.match(vault, /<OfflinePackManager lang=\{lang\}/);
  assert.match(manager, /iPhone \/ iPad/);
  assert.match(manager, /Android/);
  assert.match(manager, /Windows/);
  assert.match(manager, /serviceWorker\.register\("\/sw\.js"/);
});
