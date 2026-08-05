import type { Metadata } from "next";
import MapWorkspace from "@/components/MapWorkspace";
import InteractiveSampleMap from "@/components/InteractiveSampleMap";

export const metadata: Metadata = {
  title: "နမူနာမြေပုံနှင့် ဘူမိဗေဒဆက်စပ်မှု | Goldfinder",
  description:
    "GPS နမူနာမှတ်များ၊ အထက်ရေ–အောက်ရေ ဆက်စပ်မှု၊ assay နှင့် QA/QC အခြေအနေကို မြန်မာဘာသာဖြင့် စစ်ဆေးရန်။",
  alternates: {
    canonical: "/my/map",
    languages: { "zh-CN": "/map", en: "/en/map", my: "/my/map" },
  },
};

export default function MyanmarMapPage() {
  return (
    <>
      <MapWorkspace lang="my" />
      <InteractiveSampleMap lang="my" />
    </>
  );
}
