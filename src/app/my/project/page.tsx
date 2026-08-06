import type { Metadata } from "next";
import ProjectDashboard from "@/components/ProjectDashboard";

export const metadata: Metadata = {
  title: "နမူနာ Project Workspace | Goldfinder",
  description:
    "နမူနာမှတ်တမ်း၊ မြေပုံ၊ report၊ backup၊ sampling plan နှင့် QA/QC ကို မြန်မာဘာသာဖြင့် တစ်နေရာတည်းမှ စီမံပါ။",
  alternates: {
    canonical: "/my/project",
    languages: { "zh-CN": "/project", en: "/en/project", my: "/my/project" },
  },
};

export default function Project() {
  return <ProjectDashboard lang="my" />;
}
