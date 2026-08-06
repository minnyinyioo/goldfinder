import { ExternalLink, Library } from "lucide-react";

type Lang = "zh" | "en" | "my";
type Source = { title: string; href: string; supports: Record<Lang, string> };

const usgsGold: Source = {
  title: "USGS — Gold",
  href: "https://pubs.usgs.gov/gip/prospect1/goldgip.html",
  supports: {
    zh: "支持自然金性质、砂金重力富集、基岩附近捕集及黑砂矿物组成说明。",
    en: "Supports gold properties, gravity concentration, near-bedrock trapping and black-sand mineral assemblages.",
    my: "Gold property၊ gravity concentration၊ bedrock အနီး trap နှင့် black-sand mineral assemblage ရှင်းလင်းချက်ကို ထောက်ခံသည်။",
  },
};
const placerModel: Source = {
  title: "USGS Bulletin 1693 — Descriptive model of Placer Au-PGE",
  href: "https://pubs.usgs.gov/bul/b1693/html/bull6945.htm",
  supports: {
    zh: "支持砾石底部、天然格栅、破裂基岩及黏土层上方的砂金捕集位置。",
    en: "Supports placer traps at gravel bases, natural riffles, fractured bedrock and above clay layers.",
    my: "Gravel base၊ natural riffle၊ fractured bedrock နှင့် clay layer အပေါ် placer trap များကို ထောက်ခံသည်။",
  },
};
const placerBulletin: Source = {
  title: "USGS Bulletin 1857-G — Gold in placer deposits",
  href: "https://pubs.usgs.gov/publication/b1857G",
  supports: {
    zh: "支持原生金风化释放、搬运及在现代或古河流砾石中再富集的成因框架。",
    en: "Supports weathering, transport and reconcentration of lode-derived gold in modern and fossil stream gravels.",
    my: "Lode gold weathering၊ transport နှင့် modern/fossil stream gravel တွင် ပြန်လည်စုစည်းပုံကို ထောက်ခံသည်။",
  },
};
const orogenic: Source = {
  title: "USGS Data Report 1198 — Orogenic gold systems",
  href: "https://pubs.usgs.gov/publication/dr1198/full",
  supports: {
    zh: "支持构造控制的造山型金背景，以及粗金不均匀分布造成的小样品偏差。",
    en: "Supports structurally controlled orogenic-gold context and small-sample bias caused by heterogeneous coarse gold.",
    my: "Structure-controlled orogenic gold နှင့် coarse gold မညီမျှဖြန့်ကျက်မှုကြောင့် small-sample bias ကို ထောက်ခံသည်။",
  },
};
const fireAssay: Source = {
  title: "USGS Circular 599 — Gold determination using fire assay",
  href: "https://pubs.usgs.gov/circ/1968/0599/report.pdf",
  supports: {
    zh: "支持火试金作为金分离与测定流程的一部分；具体方法和检出限仍需以实验室报告为准。",
    en: "Supports fire assay as part of gold separation and determination; method-specific limits remain laboratory dependent.",
    my: "Gold separation/determination တွင် fire assay အသုံးပြုပုံကို ထောက်ခံသည်။ Method limit သည် laboratory အလိုက် စစ်ရမည်။",
  },
};
const custody: Source = {
  title: "US EPA — Field sample handling and chain of custody",
  href: "https://www.epa.gov/choose-fish-and-shellfish-wisely/field-collecting-and-handling-samples",
  supports: {
    zh: "支持预先制定取样设计、现场记录、样品标识、处理及交接链文件。",
    en: "Supports planned sampling design, field records, sample identification, handling and chain-of-custody documentation.",
    my: "Sampling design၊ field record၊ sample identification၊ handling နှင့် chain-of-custody document ကို ထောက်ခံသည်။",
  },
};

const byGuide: Record<string, Source[]> = {
  basics: [usgsGold],
  formation: [placerBulletin, orogenic],
  placer: [placerModel, placerBulletin],
  lode: [orogenic],
  atlas: [usgsGold],
  tools: [usgsGold, fireAssay],
  sampling: [orogenic, custody, fireAssay],
  "false-gold": [custody],
  "black-sand": [usgsGold],
  stratigraphy: [placerModel],
  "representative-sampling": [orogenic, custody],
  "grade-continuity": [orogenic],
  qaqc: [custody],
  fraud: [custody],
};

export default function GuideCitations({
  guideId,
  lang,
}: {
  guideId: string;
  lang: Lang;
}) {
  const sources = byGuide[guideId] || [usgsGold];
  const heading =
    lang === "zh"
      ? "本节论述依据"
      : lang === "my"
        ? "ဤအပိုင်း၏ အထောက်အထား"
        : "Evidence for this section";
  return (
    <aside className="guide-citations" aria-label={heading}>
      <h3>
        <Library size={16} />
        {heading}
      </h3>
      {sources.map((source) => (
        <a
          href={source.href}
          target="_blank"
          rel="noreferrer"
          key={source.href}
        >
          <span>
            <b>{source.title}</b>
            <small>{source.supports[lang]}</small>
          </span>
          <ExternalLink size={15} />
        </a>
      ))}
    </aside>
  );
}
