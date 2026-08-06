import type { Metadata } from "next";
import { Noto_Serif_Myanmar } from "next/font/google";
import MyanmarLang from "@/components/MyanmarLang";

const myanmarSerif = Noto_Serif_Myanmar({
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
  fallback: ["Myanmar Text", "Padauk", "serif"],
});

export const metadata: Metadata = {
  title: {
    default: "Goldfinder မြန်မာဘာသာ",
    template: "%s | Goldfinder မြန်မာ",
  },
  description:
    "ရွှေကျင်သိုက်၊ မူလရွှေသိုက်၊ သတ္တုခွဲခြားခြင်း၊ ကိုယ်စားပြုနမူနာနှင့် QA/QC ဆိုင်ရာ သက်သေအထောက်အထားအခြေပြု လမ်းညွှန်။",
  alternates: {
    canonical: "/my",
    languages: { "zh-CN": "/", en: "/en", my: "/my", "x-default": "/" },
  },
  openGraph: {
    locale: "my_MM",
    title: "Goldfinder မြန်မာဘာသာ",
    description:
      "Evidence-led gold geology and sampling guidance in Myanmar language.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MyanmarLang fontClassName={myanmarSerif.className} />
      {children}
    </>
  );
}
