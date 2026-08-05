import type { Metadata } from "next";
import DataVault from "@/components/DataVault";

export const metadata: Metadata = {
  title: "ဒေတာအရန်နှင့် ပြန်လည်ရယူခြင်း | Goldfinder",
  description:
    "နမူနာနှင့် sampling plan ကို coordinate privacy ပါဝင်စွာ backup၊ validate နှင့် restore လုပ်ရန်။",
  alternates: {
    canonical: "/my/backup",
    languages: { "zh-CN": "/backup", en: "/en/backup", my: "/my/backup" },
  },
};

export default function MyanmarBackupPage() {
  return <DataVault lang="my" />;
}
