import type { Metadata } from "next";
import MyanmarFieldTools from "@/components/MyanmarFieldTools";
export const metadata: Metadata = {
  title: "ကွင်းဆင်းကိရိယာနှင့် ဓာတ်ခွဲနည်းလမ်း",
  description:
    "ရွှေကျင်ပန်းကန်၊ sluice၊ sieve၊ magnet၊ GPS၊ compass၊ XRF၊ fire assay နှင့် ICP ၏ လုပ်ဆောင်နိုင်မှု၊ ကန့်သတ်ချက်နှင့် မှတ်တမ်းနည်းကို မြန်မာဘာသာဖြင့် ဖတ်ရန်။",
  alternates: {
    canonical: "/my/tools",
    languages: { "zh-CN": "/tools", en: "/en/tools", my: "/my/tools" },
  },
};
export default function Page() {
  return <MyanmarFieldTools />;
}
