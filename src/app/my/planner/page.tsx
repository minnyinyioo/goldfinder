import type { Metadata } from "next";
import SamplingPlanner from "@/components/SamplingPlanner";
export const metadata: Metadata = {
  title: "စနစ်တကျ နမူနာစီမံကိန်း",
  description:
    "砂金体积样、山金槽样、样线、垂向分层、重复样、空白样与标准样工作量的专业缅语规划工具。",
  alternates: {
    canonical: "/my/planner",
    languages: { "zh-CN": "/planner", en: "/en/planner", my: "/my/planner" },
  },
};
export default function Page() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">SYSTEMATIC SAMPLE DESIGN · မြန်မာဘာသာ</p>
        <h1>စနစ်တကျ နမူနာဒီဇိုင်း</h1>
        <p className="lead">
          ကွင်းဆင်းမသွားမီ sample fence၊ point၊ vertical interval၊ volume နှင့်
          QA/QC workload ကို တွက်ချက်ပါ။
        </p>
      </div>
      <SamplingPlanner lang="my" />
    </>
  );
}
