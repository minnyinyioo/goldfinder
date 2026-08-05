import type { Metadata } from "next";
import FieldAssessment from "@/components/FieldAssessment";
import ContentReviewPanel from "@/components/ContentReviewPanel";
export const metadata: Metadata = {
  title: "Field Assessment | Goldfinder",
  description:
    "A combined placer and lode field-evidence scoring tool for prioritising verification sampling.",
};
export default function AssessPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">FIELD ASSESSMENT</p>
        <h1>Field assessment centre</h1>
        <p className="lead">
          Placer and lode observations in one tool. The score prioritises
          sampling; it does not replace assay data, resource estimation, or
          legal review.
        </p>
        <ContentReviewPanel lang="en" topic="assessment" />
      </header>
      <FieldAssessment lang="en" />
    </>
  );
}
