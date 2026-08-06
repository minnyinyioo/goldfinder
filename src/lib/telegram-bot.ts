import { SITE_URL } from "@/lib/site";

export type TelegramMessage = {
  chat: { id: number; type: string };
  from?: { language_code?: string };
  text?: string;
};

type Locale = "zh" | "en" | "my";

const content = {
  zh: {
    welcome:
      "<b>欢迎使用 Goldfinder 探金现场工具</b>\n\n这里可以进行矿物与土质对照、砂金和山金现场评分、品位计算、样品记录、地图管理及离线资料下载。\n\n现场迹象只能确定验证优先级，不能单独证明存在矿体或经济开采价值。",
    help:
      "<b>使用方法</b>\n\n1. 打开 Goldfinder\n2. 看图排除常见误判\n3. 完成现场评分\n4. 固定体积取样并建档\n5. 输入实测金重或化验结果\n\n进入山区前请先下载完整离线资料，并备份样品档案。",
    app: "打开 Goldfinder",
    offline: "离线应用与数据备份",
    safety: "安全与免责声明",
  },
  en: {
    welcome:
      "<b>Welcome to the Goldfinder field toolkit</b>\n\nUse real-reference identification, placer and lode field assessment, grade calculations, sample records, mapping and offline field resources.\n\nField indicators only prioritise verification. They do not demonstrate a deposit or economic viability.",
    help:
      "<b>How to use Goldfinder</b>\n\n1. Open Goldfinder\n2. Exclude common look-alikes\n3. Complete the field assessment\n4. Take a fixed-volume sample and create a record\n5. Enter measured gold mass or an assay result\n\nDownload the complete offline pack and back up records before entering an area without coverage.",
    app: "Open Goldfinder",
    offline: "Offline app & backup",
    safety: "Safety & disclaimer",
  },
  my: {
    welcome:
      "<b>Goldfinder ကွင်းဆင်းကိရိယာမှ ကြိုဆိုပါသည်</b>\n\nဓာတ်ပုံဖြင့် သတ္တုခွဲခြားခြင်း၊ ရွှေကျင်နှင့် မူလရွှေသိုက် အကဲဖြတ်ခြင်း၊ grade တွက်ချက်ခြင်း၊ sample record၊ map နှင့် offline အချက်အလက်များကို အသုံးပြုနိုင်သည်။\n\nကွင်းဆင်းလက္ခဏာသည် စစ်ဆေးရန်ဦးစားပေးမှုကိုသာ ပြသည်။ သိုက်ရှိခြင်း သို့မဟုတ် စီးပွားရေးအရ တူးဖော်နိုင်ခြင်းကို မသက်သေပြပါ။",
    help:
      "<b>Goldfinder အသုံးပြုပုံ</b>\n\n1. Goldfinder ကိုဖွင့်ပါ\n2. မှားယွင်းနိုင်သော သတ္တုများကို ဓာတ်ပုံဖြင့်စစ်ပါ\n3. Field assessment ဖြည့်ပါ\n4. Volume သတ်မှတ်၍ sample ယူပြီး record ပြုလုပ်ပါ\n5. ရွှေအလေးချိန် သို့မဟုတ် assay result ထည့်ပါ\n\nလိုင်းမရှိသောနေရာမသွားမီ offline pack ဒေါင်းလုဒ်နှင့် record backup ပြုလုပ်ပါ။",
    app: "Goldfinder ဖွင့်ရန်",
    offline: "Offline app နှင့် backup",
    safety: "လုံခြုံရေးနှင့် Disclaimer",
  },
} as const;

export function localeFor(languageCode?: string): Locale {
  const language = languageCode?.toLowerCase() || "";
  if (language.startsWith("zh")) return "zh";
  if (language.startsWith("my")) return "my";
  return "en";
}

export function replyFor(message: TelegramMessage) {
  const locale = localeFor(message.from?.language_code);
  const c = content[locale];
  const command = message.text?.trim().split(/\s+/)[0].split("@")[0].toLowerCase();
  const text = command === "/help" || command === "/offline" ? c.help : c.welcome;
  const prefix = locale === "zh" ? "" : locale === "my" ? "/my" : "/en";

  return {
    chat_id: message.chat.id,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: c.app, web_app: { url: `${SITE_URL}${prefix || "/"}` } }],
        [{ text: c.offline, web_app: { url: `${SITE_URL}${prefix}/backup` } }],
        [{ text: c.safety, url: `${SITE_URL}${prefix}/copyright` }],
      ],
    },
  };
}
