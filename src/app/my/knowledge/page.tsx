import type { Metadata } from "next";
import MyanmarKnowledge from "@/components/MyanmarKnowledge";
import "../../atlas/atlas-facts.css";

export const metadata: Metadata = {
  title: "ရွှေရှာဖွေရေး ဘူမိဗေဒနှင့် နမူနာ အသိပညာ",
  description:
    "ရွှေဖြစ်ပေါ်ပုံ၊ ရွှေကျင်နှင့် မူလရွှေ၊ black sand၊ representative sampling၊ grade၊ QA/QC နှင့် fraud verification ကို မြန်မာဘာသာဖြင့် လေ့လာရန်။",
  alternates: {
    canonical: "/my/knowledge",
    languages: {
      "zh-CN": "/knowledge",
      en: "/en/knowledge",
      my: "/my/knowledge",
    },
  },
};
export default function Page() {
  return <MyanmarKnowledge />;
}
