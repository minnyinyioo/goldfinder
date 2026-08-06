import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { localeFor, replyFor } from "../src/lib/telegram-bot";

const root = new URL("../", import.meta.url);

test("bot welcome copy and buttons are localized without storing user data", () => {
  assert.equal(localeFor("zh-hans"), "zh");
  assert.equal(localeFor("my"), "my");
  assert.equal(localeFor("de"), "en");

  const reply = replyFor({ chat: { id: 123, type: "private" }, from: { language_code: "zh" }, text: "/start" });
  assert.equal(reply.chat_id, 123);
  assert.match(reply.text, /欢迎使用 Goldfinder/);
  assert.equal(reply.reply_markup.inline_keyboard.length, 3);
  const appButton = reply.reply_markup.inline_keyboard[0][0];
  assert.ok("web_app" in appButton);
  assert.equal(appButton.web_app.url, "https://goldfinder.vercel.app/");
});

test("webhook verifies Telegram secret header and keeps token server-only", async () => {
  const route = await readFile(new URL("src/app/api/telegram/webhook/route.ts", root), "utf8");
  const env = await readFile(new URL(".env.example", root), "utf8");
  assert.match(route, /x-telegram-bot-api-secret-token/);
  assert.match(route, /timingSafeEqual/);
  assert.match(route, /process\.env\.TELEGRAM_BOT_TOKEN/);
  assert.doesNotMatch(route, /NEXT_PUBLIC_TELEGRAM/);
  assert.match(env, /TELEGRAM_BOT_TOKEN=\n/);
  assert.match(env, /TELEGRAM_WEBHOOK_SECRET=\n/);
});

test("setup script configures commands, menu button and webhook", async () => {
  const setup = await readFile(new URL("scripts/setup-telegram-bot.mjs", root), "utf8");
  for (const method of ["setMyCommands", "setMyDescription", "setChatMenuButton", "setWebhook"]) {
    assert.match(setup, new RegExp(method));
  }
  assert.match(setup, /secret_token/);
});
