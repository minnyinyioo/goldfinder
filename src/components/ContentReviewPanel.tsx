import {
  CalendarDays,
  ExternalLink,
  FileCheck2,
  History,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import "./content-review-panel.css";

type Lang = "zh" | "en" | "my";
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
  const my = lang === "my";
  const reviewHref = zh ? "/review" : my ? "/my/review" : "/en/review";
  const words = {
    aria: zh
      ? "内容审核与证据状态"
      : my
        ? "အကြောင်းအရာစိစစ်မှုနှင့် သက်သေအခြေအနေ"
        : "Content review and evidence status",
    status: zh
      ? "证据核查状态"
      : my
        ? "သက်သေအထောက်အထား စိစစ်မှု"
        : "Evidence review status",
    summary: zh
      ? "Goldfinder 编辑组已逐项核对所列公开资料；独立具名地质专家复核尚待完成。"
      : my
        ? "Goldfinder အယ်ဒီတာအဖွဲ့က ဖော်ပြထားသော public source များကို စစ်ဆေးထားသည်။ အမည်ဖော်ပြထားသော independent geologist review မပြီးသေးပါ။"
        : "The Goldfinder editorial team checked the listed public sources item by item; independent review by a named geologist remains pending.",
    checked: zh ? "最近核查" : my ? "နောက်ဆုံးစစ်ဆေးရက်" : "Last checked",
    version: zh ? "内容版本" : my ? "အကြောင်းအရာဗားရှင်း" : "Content version",
    owner: zh ? "编辑责任" : my ? "အယ်ဒီတာတာဝန်" : "Editorial owner",
    ownerName: zh
      ? "Goldfinder 编辑组"
      : my
        ? "Goldfinder အယ်ဒီတာအဖွဲ့"
        : "Goldfinder editorial team",
    scope: zh ? "适用范围：" : my ? "အသုံးပြုနိုင်သည့်နယ်ပယ် — " : "Scope: ",
    scopeText: zh
      ? "教育性现场筛查与取样规划；不构成矿产资源估算、投资、法律或安全意见。"
      : my
        ? "ပညာပေး ကွင်းဆင်းစိစစ်မှုနှင့် နမူနာအစီအစဉ်အတွက်သာဖြစ်ပြီး resource estimate၊ investment၊ legal သို့မဟုတ် safety advice မဟုတ်ပါ။"
        : "Educational field screening and sampling planning; not a mineral-resource estimate or investment, legal, or safety advice.",
    evidence: zh
      ? "本页核心依据"
      : my
        ? "ဤစာမျက်နှာ၏ အဓိကအကိုးအကား"
        : "Core evidence for this page",
    history: zh
      ? "查看修订记录与审核边界"
      : my
        ? "Revision history နှင့် review boundary ကြည့်ရန်"
        : "View revision history and review boundary",
    pending: zh
      ? "独立专家状态：待具名合资格地质专家进行项目级复核；本站不会虚构审核人。"
      : my
        ? "Independent expert status — project-level review လုပ်မည့် အမည်ဖော်ပြထားသော qualified geologist ကို စောင့်ဆိုင်းနေဆဲဖြစ်ပြီး reviewer အတု မဖန်တီးပါ။"
        : "Independent expert status: awaiting project-level review by a named qualified geologist; no reviewer identity is invented.",
  };
  return (
    <aside className="review-panel" aria-label={words.aria}>
      <div className="review-summary">
        <ShieldCheck aria-hidden="true" />
        <div>
          <b>{words.status}</b>
          <p>{words.summary}</p>
        </div>
      </div>
      <dl className="review-meta">
        <div>
          <dt>
            <CalendarDays aria-hidden="true" />
            {words.checked}
          </dt>
          <dd>2026-08-06</dd>
        </div>
        <div>
          <dt>
            <FileCheck2 aria-hidden="true" />
            {words.version}
          </dt>
          <dd>v3.44.0</dd>
        </div>
        <div>
          <dt>
            <UserCheck aria-hidden="true" />
            {words.owner}
          </dt>
          <dd>{words.ownerName}</dd>
        </div>
      </dl>
      <p className="review-scope">
        <b>{words.scope}</b>
        {words.scopeText}
      </p>
      <div className="review-evidence">
        <b>{words.evidence}</b>
        {evidence[topic].map(([cn, en, url]) => (
          <a href={url} target="_blank" rel="noreferrer" key={url}>
            {zh ? cn : en}
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        ))}
      </div>
      <details className="revision-history">
        <summary>
          <History size={15} aria-hidden="true" />
          {words.history}
        </summary>
        <p>
          <b>v3.36.0 · 2026-08-06</b> —{" "}
          {zh
            ? "加入逐项资料链接、编辑责任和公开审核边界。"
            : my
              ? "Statement-level source link၊ editorial owner နှင့် review boundary ထည့်ထားသည်။"
              : "Added statement-level source links, editorial ownership and a public review boundary."}
        </p>
        <p>
          <b>v3.20.0 · 2026-08-05</b> —{" "}
          {zh
            ? "建立页面级证据状态与核心依据。"
            : my
              ? "Page-level evidence status နှင့် core references စတင်ထားသည်။"
              : "Introduced page-level evidence status and core references."}
        </p>
        <p>{words.pending}</p>
        <p>
          <a href={reviewHref}>
            {zh
              ? "打开专业审阅登记册"
              : my
                ? "Professional review register ဖွင့်ရန်"
                : "Open the professional review register"}
          </a>
        </p>
      </details>
    </aside>
  );
}
