import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function validAuthorization(received: string | null, secret: string) {
  if (!received) return false;
  const expected = `Bearer ${secret}`;
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function POST(request: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET?.trim();
  if (!token || !secret) {
    return NextResponse.json(
      { ok: false, error: "Telegram environment variables are missing in Production." },
      { status: 503 },
    );
  }
  if (!validAuthorization(request.headers.get("authorization"), secret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const api = `https://api.telegram.org/bot${token}`;
  async function call(method: string, body: Record<string, unknown> = {}) {
    const response = await fetch(`${api}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const result = (await response.json()) as { ok?: boolean; description?: string; result?: unknown };
    if (!response.ok || !result.ok) {
      throw new Error(`${method}: ${result.description || response.status}`);
    }
    return result.result;
  }

  try {
    const bot = (await call("getMe")) as { username?: string };
    const commandSets = [
      {
        language_code: "",
        commands: [
          { command: "start", description: "Open the Goldfinder field toolkit" },
          { command: "app", description: "Launch the Mini App" },
          { command: "offline", description: "Prepare offline field use" },
          { command: "help", description: "How to use Goldfinder" },
        ],
      },
      {
        language_code: "zh",
        commands: [
          { command: "start", description: "打开探金现场工具" },
          { command: "app", description: "启动 Mini App" },
          { command: "offline", description: "准备离线使用" },
          { command: "help", description: "查看使用方法" },
        ],
      },
      {
        language_code: "my",
        commands: [
          { command: "start", description: "Goldfinder ကိရိယာဖွင့်ရန်" },
          { command: "app", description: "Mini App ဖွင့်ရန်" },
          { command: "offline", description: "Offline အသုံးပြုရန်" },
          { command: "help", description: "အသုံးပြုပုံ" },
        ],
      },
    ];

    for (const commandSet of commandSets) await call("setMyCommands", commandSet);
    await call("setMyDescription", {
      description:
        "Goldfinder is an offline-ready field toolkit for gold geology, mineral identification, representative sampling, grade calculations and sample records.",
    });
    await call("setMyShortDescription", {
      short_description: "Offline gold geology, sampling and field record toolkit.",
    });
    await call("setChatMenuButton", {
      menu_button: {
        type: "web_app",
        text: "Open Goldfinder",
        web_app: { url: SITE_URL },
      },
    });
    await call("setWebhook", {
      url: `${SITE_URL}/api/telegram/webhook`,
      secret_token: secret,
      allowed_updates: ["message"],
      drop_pending_updates: true,
    });

    return NextResponse.json({
      ok: true,
      bot: bot.username || "configured",
      commands: ["start", "app", "offline", "help"],
      webhook: `${SITE_URL}/api/telegram/webhook`,
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Telegram setup failed." },
      { status: 502 },
    );
  }
}
