const token = process.env.TELEGRAM_BOT_TOKEN;
const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
const site = (process.env.NEXT_PUBLIC_SITE_URL || "https://goldfinder.vercel.app").replace(/\/$/, "");

if (!token || !secret) {
  throw new Error("Set TELEGRAM_BOT_TOKEN and TELEGRAM_WEBHOOK_SECRET before running this script.");
}
if (!/^[A-Za-z0-9_-]{1,256}$/.test(secret)) {
  throw new Error("TELEGRAM_WEBHOOK_SECRET may contain only A-Z, a-z, 0-9, _ and -.");
}

const api = `https://api.telegram.org/bot${token}`;
async function call(method, body) {
  const response = await fetch(`${api}/${method}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`${method}: ${result.description || response.status}`);
  return result;
}

const commandSets = [
  ["", [
    { command: "start", description: "Open the Goldfinder field toolkit" },
    { command: "app", description: "Launch the Mini App" },
    { command: "offline", description: "Prepare offline field use" },
    { command: "help", description: "How to use Goldfinder" },
  ]],
  ["zh", [
    { command: "start", description: "打开探金现场工具" },
    { command: "app", description: "启动 Mini App" },
    { command: "offline", description: "准备离线使用" },
    { command: "help", description: "查看使用方法" },
  ]],
  ["my", [
    { command: "start", description: "Goldfinder ကိရိယာဖွင့်ရန်" },
    { command: "app", description: "Mini App ဖွင့်ရန်" },
    { command: "offline", description: "Offline အသုံးပြုရန်" },
    { command: "help", description: "အသုံးပြုပုံ" },
  ]],
];

for (const [language_code, commands] of commandSets) {
  await call("setMyCommands", { commands, language_code });
}

await call("setMyDescription", {
  description: "Goldfinder is an offline-ready field toolkit for gold geology, mineral identification, representative sampling, grade calculations and sample records.",
});
await call("setMyShortDescription", {
  short_description: "Offline gold geology, sampling and field record toolkit.",
});
await call("setChatMenuButton", {
  menu_button: { type: "web_app", text: "Open Goldfinder", web_app: { url: site } },
});
await call("setWebhook", {
  url: `${site}/api/telegram/webhook`,
  secret_token: secret,
  allowed_updates: ["message"],
  drop_pending_updates: true,
});

console.log("Telegram bot commands, description, menu button and webhook configured.");
