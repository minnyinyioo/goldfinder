import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("root layout loads the official Telegram Mini App bridge", async () => {
  const layout = await readFile(new URL("src/app/layout.tsx", root), "utf8");
  assert.match(layout, /telegram\.org\/js\/telegram-web-app\.js\?63/);
  assert.match(layout, /strategy="beforeInteractive"/);
  assert.match(layout, /<TelegramMiniApp/);
});

test("Telegram bridge respects theme, safe-area navigation and untrusted data boundaries", async () => {
  const bridge = await readFile(
    new URL("src/components/TelegramMiniApp.tsx", root),
    "utf8",
  );
  const css = await readFile(
    new URL("src/components/telegram-mini-app.css", root),
    "utf8",
  );
  assert.match(bridge, /webApp\.ready\(\)/);
  assert.match(bridge, /webApp\.expand\(\)/);
  assert.match(bridge, /enableClosingConfirmation/);
  assert.match(bridge, /BackButton\.show\(\)/);
  assert.match(bridge, /themeChanged/);
  assert.match(bridge, /\^\[a-zA-Z0-9_-\]/);
  assert.doesNotMatch(bridge, /initDataUnsafe\?\.user/);
  assert.match(css, /tg-content-safe-area-inset-top/);
  assert.match(css, /tg-theme-button-color/);
});
