import type { Metadata } from "next";
import ReportBuilder from "@/components/ReportBuilder";

export const metadata: Metadata = {
  title: "မြေပြင်အစီရင်ခံစာ | Goldfinder",
  description:
    "Project သို့မဟုတ် sample တစ်ခုချင်းအတွက် မြန်မာဘာသာ ပုံနှိပ်နိုင်သော field report။",
  alternates: {
    canonical: "/my/reports",
    languages: { "zh-CN": "/reports", en: "/en/reports", my: "/my/reports" },
  },
};

export default function MyanmarReportsPage() {
  return <ReportBuilder lang="my" />;
}
