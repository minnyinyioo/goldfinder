import Image from "next/image";
import Link from "next/link";
import { enGuides } from "@/data/english";
import ContentReviewPanel from "@/components/ContentReviewPanel";
import RelatedGuideNav from "@/components/RelatedGuideNav";
import GuideCitations from "@/components/GuideCitations";
import "../../knowledge/knowledge.css";
export default function EnglishKnowledge() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">ILLUSTRATED FIELD KNOWLEDGE</p>
        <h1>Gold prospecting knowledge base</h1>
        <p className="lead">
          Use real images to understand form and setting, then verify the
          interpretation with field tests and representative sampling.
        </p>
        <ContentReviewPanel lang="en" topic="knowledge" />
      </div>
      <section className="section knowledge-list">
        {enGuides.map((g, i) => (
          <article className="knowledge-row" id={g.id} key={g.id}>
            <div className="knowledge-image">
              <Image
                src={`/images/${g.image}`}
                alt={g.title}
                width={960}
                height={720}
              />
              <p>
                Image: {g.credit} ·{" "}
                <a href={g.source} target="_blank" rel="noreferrer">
                  source and licence
                </a>
              </p>
            </div>
            <div className="knowledge-copy">
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <p className="eyebrow">{g.id.toUpperCase()}</p>
              <h2>{g.title}</h2>
              <p className="summary">{g.summary}</p>
              <h3>WHAT TO OBSERVE</h3>
              <ul>
                {g.signals.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <div className="verify">
                <b>Next verification step</b>
                <p>{g.verify}</p>
              </div>
              <div className="notice">{g.warning}</div>
              <GuideCitations guideId={g.id} lang="en" />
              <div className="knowledge-actions">
                <Link href="/en/atlas">Open the photo atlas</Link>
                <Link href="/en/sources">Review references</Link>
              </div>
              <RelatedGuideNav
                entries={enGuides}
                index={i}
                base="/en/knowledge"
                lang="en"
              />
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
