import type { Metadata } from "next";
import FieldAssessment from "@/components/FieldAssessment";
import ContentReviewPanel from "@/components/ContentReviewPanel";
export const metadata: Metadata = {
  title: "现场判断中心｜探金",
  description: "合并式砂金与山金现场线索评分工具，用于安排下一步代表性取样。",
};
export default function AssessPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">FIELD ASSESSMENT</p>
        <h1>现场判断中心</h1>
        <p className="lead">
          把砂金与山金的观察项集中在一个工具里。评分用于安排取样优先级，不替代化验、资源估算或合规审查。
        </p>
        <ContentReviewPanel topic="assessment" />
      </header>
      <FieldAssessment />
    </>
  );
}
