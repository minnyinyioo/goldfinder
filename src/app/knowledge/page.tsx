import Image from "next/image";
import Link from "next/link";
import { guides } from "@/data/knowledge";
import { placer } from "@/data/placer";
import { lode } from "@/data/lode";
import { atlas } from "@/data/atlas";
import { tools } from "@/data/tools";
import { sampling } from "@/data/sampling";
import { atlasItems } from "@/data/media";
import ContentReviewPanel from "@/components/ContentReviewPanel";
import RelatedGuideNav from "@/components/RelatedGuideNav";
import "./knowledge.css";
const visual: Record<string, string> = {
  basics: "native-gold",
  formation: "quartz-vein",
  "false-gold": "coarse-pan-gold",
  placer: "panning",
  lode: "quartz-vein",
  atlas: "pyrite",
  tools: "sluice",
  sampling: "panning",
};
export default function Knowledge() {
  const all = [...guides, ...placer, ...lode, ...atlas, ...tools, ...sampling];
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">ILLUSTRATED FIELD KNOWLEDGE</p>
        <h1>图解探金知识库</h1>
        <p className="lead">
          先借真实图片理解形态和环境，再用现场测试与规范取样验证。点击图片来源可核对作者和许可。
        </p>
        <ContentReviewPanel topic="knowledge" />
      </div>
      <section className="section knowledge-list">
        {all.map((g, i) => {
          const media = atlasItems.find((x) => x.slug === visual[g.id])!;
          return (
            <article className="knowledge-row" id={g.id} key={g.id}>
              <div className="knowledge-image">
                <Image
                  src={media.image}
                  alt={media.alt}
                  width={960}
                  height={720}
                />
                <p>
                  图：{media.author} · {media.license} ·{" "}
                  <a href={media.source} target="_blank" rel="noreferrer">
                    原图与许可
                  </a>
                </p>
              </div>
              <div className="knowledge-copy">
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{g.id.toUpperCase()}</p>
                <h2>{g.title}</h2>
                <p className="summary">{g.summary}</p>
                <h3>从图中学习观察</h3>
                <ul>
                  {g.signals.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="verify">
                  <b>下一步验证</b>
                  <p>{g.verify}</p>
                </div>
                <div className="notice">{g.warning}</div>
                <div className="knowledge-actions">
                  <Link href={`/atlas#${media.slug}`}>打开对应图鉴</Link>
                  <Link href="/sources">核对资料来源</Link>
                </div>
                <RelatedGuideNav
                  entries={all}
                  index={i}
                  base="/knowledge"
                  lang="zh"
                />
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
