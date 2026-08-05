import {
  CalendarDays,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import "./content-review-panel.css";

type Lang = "zh" | "en";
type Topic =
  "knowledge" | "atlas" | "geology" | "tools" | "sampling" | "assessment";
const evidence = {
  knowledge: [
    [
      "USGS：黄金性质、成因与砂矿",
      "USGS: gold properties, origin and placers",
      "https://pubs.usgs.gov/gip/prospect1/goldgip.html",
    ],
    [
      "USGS：自然金赋存与成分",
      "USGS: occurrence and composition of native gold",
      "https://www.usgs.gov/publications/gold-minerals-and-composition-native-gold",
    ],
  ],
  atlas: [
    [
      "USGS：矿物识别应结合物理性质",
      "USGS: mineral identification by physical properties",
      "https://pubs.usgs.gov/gip/prospect1/goldgip.html",
    ],
    [
      "逐图作者、原图与开放许可",
      "Per-image creator, original file and open licence",
      "https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/en",
    ],
  ],
  geology: [
    [
      "USGS：砂金搬运、捕集与再富集",
      "USGS: placer transport, trapping and reconcentration",
      "https://pubs.usgs.gov/publication/b1857G",
    ],
    [
      "USGS：矿产资源评估方法",
      "USGS: mineral-resource assessment methods",
      "https://www.usgs.gov/science/science-explorer/minerals/Assessments-of-Mineral-Resources",
    ],
  ],
  tools: [
    [
      "USGS：淘洗与砂矿勘查边界",
      "USGS: panning and placer-prospecting limits",
      "https://pubs.usgs.gov/gip/prospect2/prospectgip.html",
    ],
    [
      "USGS：地球化学数据 QA/QC",
      "USGS: geochemical-data QA/QC",
      "https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist",
    ],
  ],
  sampling: [
    [
      "USGS：粗金块金效应与分析样量",
      "USGS: coarse-gold nugget effect and analytical support",
      "https://pubs.usgs.gov/of/2008/1132/pdf/Pebble_OFR_2008-1132.pdf",
    ],
    [
      "USGS：空白、重复样与数据核查",
      "USGS: blanks, duplicates and data review",
      "https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist",
    ],
  ],
  assessment: [
    [
      "USGS：异常只用于确定后续工作",
      "USGS: anomalies guide follow-up work",
      "https://www.usgs.gov/science/science-explorer/minerals/Assessments-of-Mineral-Resources",
    ],
    [
      "CRIRSCO：资源／储量公开报告框架",
      "CRIRSCO: resources and reserves reporting framework",
      "https://crirsco.com/documentation/international-reporting-template/",
    ],
  ],
} satisfies Record<Topic, readonly (readonly [string, string, string])[]>;

export default function ContentReviewPanel({
  lang = "zh",
  topic,
}: {
  lang?: Lang;
  topic: Topic;
}) {
  const zh = lang === "zh";
  return (
    <aside
      className="review-panel"
      aria-label={
        zh ? "内容审核与证据状态" : "Content review and evidence status"
      }
    >
      <div className="review-summary">
        <ShieldCheck aria-hidden="true" />
        <div>
          <b>{zh ? "证据核查状态" : "Evidence review status"}</b>
          <p>
            {zh
              ? "项目编辑组已核对公开权威资料；独立具名地质专家复核：待完成。"
              : "Public authoritative sources checked by the project editorial team; independent named geologist review: pending."}
          </p>
        </div>
      </div>
      <dl className="review-meta">
        <div>
          <dt>
            <CalendarDays aria-hidden="true" />
            {zh ? "最近核查" : "Last checked"}
          </dt>
          <dd>2026-08-05</dd>
        </div>
        <div>
          <dt>
            <FileCheck2 aria-hidden="true" />
            {zh ? "内容版本" : "Content version"}
          </dt>
          <dd>v3.20.0</dd>
        </div>
      </dl>
      <p className="review-scope">
        <b>{zh ? "适用范围：" : "Scope: "}</b>
        {zh
          ? "教育性现场筛查与取样规划；不构成矿产资源估算、投资、法律或安全意见。"
          : "Educational field screening and sampling planning; not a mineral-resource estimate or investment, legal, or safety advice."}
      </p>
      <div className="review-evidence">
        <b>{zh ? "本页核心依据" : "Core evidence for this page"}</b>
        {evidence[topic].map(([cn, en, url]) => (
          <a href={url} target="_blank" rel="noreferrer" key={url}>
            {zh ? cn : en}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
    </aside>
  );
}
