import type { Metadata } from "next";
import FieldRecords from "@/components/FieldRecords";

export const metadata: Metadata = {
  title: "နမူနာမှတ်တမ်း | Goldfinder",
  description:
    "Sample ID၊ GPS၊ ပစ္စည်း၊ recovery၊ assay နှင့် chain of custody အတွက် မြန်မာဘာသာ နမူနာမှတ်တမ်း။",
  alternates: {
    canonical: "/my/field",
    languages: { "zh-CN": "/field", en: "/en/field", my: "/my/field" },
  },
};

export default function MyanmarFieldPage() {
  return <FieldRecords lang="my" />;
}
