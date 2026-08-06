import type { Metadata } from "next";
import SearchHub from "@/components/SearchHub";

export const metadata: Metadata = {
  title: "Goldfinder တွင် ရှာဖွေရန်",
  description:
    "ဓာတ်ပုံ atlas၊ ဘူမိဗေဒ၊ နမူနာ၊ ဓာတ်ခွဲ၊ ကိရိယာနှင့် project feature များကို မြန်မာဘာသာဖြင့် ရှာပါ။",
  alternates: {
    canonical: "/my/search",
    languages: { "zh-CN": "/search", en: "/en/search", my: "/my/search" },
  },
};

export default function Page() {
  return <SearchHub lang="my" />;
}
