"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Maximize2, Search, X } from "lucide-react";
import "./atlas-facts.css";
export type ExplorerItem = {
  slug: string;
  name: string;
  image: string;
  alt: string;
  observe: string;
  notProof: string;
  author: string;
  license: string;
  source: string;
  category: "gold" | "heavy" | "lookalike" | "indicator" | "soil" | "field";
};
const copy = {
  zh: {
    search: "搜索名称或观察特征",
    all: "全部",
    gold: "砂金形态",
    heavy: "重矿物",
    lookalike: "易混淆矿物",
    indicator: "矿化伴生矿物",
    soil: "土层与基岩",
    field: "现场方法",
    results: "项参考",
    empty: "没有匹配项目，请换一个关键词或分类。",
    observe: "怎么看",
    meaning: "代表什么",
    evidence: "证据用途",
    mistake: "常见误判",
    action: "下一步动作",
    no: "不能据此推断：",
    source: "查看原始图片与许可",
    close: "关闭大图",
    zoom: "放大图片",
    decision: "未知样品逐步排查",
    decisionLead: "不要从颜色直接下结论。按顺序保留照片、测试和取样记录。",
    steps: [
      ["01 记录原位", "先拍整体位置、层位与接触关系，再放比例尺拍近景。"],
      ["02 磁性分组", "磁铁明显吸引的黑粒优先考虑磁铁矿；仍需条痕与硬度测试。"],
      [
        "03 观察形态",
        "片状、移动慢且可压扁才支持自然金；脆裂或随角度闪烁应排查假金。",
      ],
      [
        "04 标准化验证",
        "记录粒级和体积，用重复样、空白样及适用实验室方法确认。",
      ],
    ],
  },
  en: {
    search: "Search names or observable features",
    all: "All",
    gold: "Placer-gold forms",
    heavy: "Heavy minerals",
    lookalike: "Look-alikes",
    indicator: "Mineralisation associates",
    soil: "Soil and bedrock",
    field: "Field methods",
    results: "references",
    empty: "No matching reference. Try another term or category.",
    observe: "How to recognise",
    meaning: "What it represents",
    evidence: "Evidence use",
    mistake: "Common confusion",
    action: "Next action",
    no: "Do not infer: ",
    source: "original file and licence",
    close: "Close enlarged image",
    zoom: "Enlarge image",
    decision: "Unknown-sample decision path",
    decisionLead:
      "Do not conclude from colour. Preserve photographic, test, and sampling evidence in order.",
    steps: [
      [
        "01 Document in place",
        "Photograph the setting, horizon and contacts before a scaled close-up.",
      ],
      [
        "02 Separate by magnetism",
        "Strongly attracted black grains suggest magnetite; still check streak and hardness.",
      ],
      [
        "03 Examine form",
        "Flattened, slow-moving and malleable grains support gold; brittle or angle-dependent sparkle needs exclusion tests.",
      ],
      [
        "04 Verify consistently",
        "Record size and volume, then use duplicates, blanks and fit-for-purpose analysis.",
      ],
    ],
  },
};
const guidance = {
  zh: {
    gold: [
      "已确认金标本的形态参照，不是未知样品鉴定结果。",
      "形态对照 · 中",
      "黄铁矿、黄铜矿、云母及金色涂层颗粒。",
      "保留原位照片，测试延展性并对已知体积样品称重。",
    ],
    heavy: [
      "重矿物分选或物源线索，可能帮助定位取样层位。",
      "环境线索 · 中",
      "把所有黑砂或高密度颗粒直接当作含金标志。",
      "磁选、放大观察并进行等体积上下游重复样。",
    ],
    lookalike: [
      "用于排除常见假金对象，不能单独确认自然金。",
      "误判排除 · 高",
      "仅凭黄色、闪光或单张照片判断黄金。",
      "依次做晶形、条痕、硬度、解理和延展性测试。",
    ],
    indicator: [
      "可作为热液或硫化物组合的地质线索，但必须结合构造、蚀变和化验结果。",
      "组合线索 · 中",
      "把单个硫化物晶体直接当作含金证据，或徒手破碎含砷／含锑矿物。",
      "原位记录矿脉与围岩关系，避免粉尘暴露，并用跨带连续样和实验室分析验证。",
    ],
    soil: [
      "地层、风化和机械陷阱的定位线索。",
      "层位线索 · 中",
      "把红土、灰黏土、砾岩或基岩顶面视为固定含金层。",
      "分层记录接触关系，布置同体积对照样和重复样。",
    ],
    field: [
      "操作方法与记录要求的现场参照。",
      "方法参照 · 中",
      "用一盘富集物或设备外观代表河段平均品位。",
      "记录处理体积、粒级、回收率与尾矿检查。",
    ],
  },
  en: {
    gold: [
      "Morphology reference from confirmed gold, not identification of an unknown sample.",
      "Morphology · Medium",
      "Pyrite, chalcopyrite, mica and gold-coloured coatings.",
      "Keep in-situ photographs, test malleability and weigh a known-volume sample.",
    ],
    heavy: [
      "A density-sorting or provenance clue that may help select a sampling horizon.",
      "Environmental clue · Medium",
      "Treating every black or dense grain as direct evidence of gold.",
      "Use magnetic separation, magnification and equal-volume repeats.",
    ],
    lookalike: [
      "Helps exclude common look-alikes; it cannot confirm native gold by itself.",
      "Exclusion value · High",
      "Calling gold from yellow colour, sparkle or one photograph.",
      "Check habit, streak, hardness, cleavage and malleability in sequence.",
    ],
    indicator: [
      "A clue to a hydrothermal or sulphide assemblage; interpret with structure, alteration and assays.",
      "Association clue · Medium",
      "Treating one sulphide crystal as gold evidence, or crushing arsenic/antimony minerals by hand.",
      "Record vein–wall-rock relations, avoid dust, and verify with cross-zone samples and laboratory analysis.",
    ],
    soil: [
      "A clue to stratigraphy, weathering and possible mechanical traps.",
      "Horizon clue · Medium",
      "Treating laterite, clay, conglomerate or bedrock as a fixed gold layer.",
      "Log contacts separately and collect equal-volume controls and duplicates.",
    ],
    field: [
      "A reference for method and recordkeeping.",
      "Method reference · Medium",
      "Using one rich pan as the average reach grade.",
      "Record volume, size fraction, recovery and tailings checks.",
    ],
  },
} as const;
export default function AtlasExplorer({
  items,
  lang,
}: {
  items: ExplorerItem[];
  lang: "zh" | "en";
}) {
  const t = copy[lang],
    [category, setCategory] = useState("all"),
    [query, setQuery] = useState(""),
    [active, setActive] = useState<ExplorerItem | null>(null),
    categories = [
      "all",
      "gold",
      "heavy",
      "lookalike",
      "indicator",
      "soil",
      "field",
    ] as const;
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (x) =>
        (category === "all" || x.category === category) &&
        (!q ||
          `${x.name} ${x.observe} ${x.notProof}`.toLowerCase().includes(q)),
    );
  }, [items, category, query]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  return (
    <>
      <div className="atlas-tools">
        <label className="atlas-search">
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search}
            aria-label={t.search}
          />
        </label>
        <div className="filter-row">
          {categories.map((x) => (
            <button
              key={x}
              className={category === x ? "is-active" : ""}
              onClick={() => setCategory(x)}
              aria-pressed={category === x}
            >
              {t[x]}
            </button>
          ))}
        </div>
        <p className="result-count">
          <strong>{filtered.length}</strong> {t.results}
        </p>
      </div>
      <div className="atlas-grid">
        {filtered.map((x) => {
          const g = guidance[lang][x.category];
          return (
            <article className="card atlas-card" id={x.slug} key={x.slug}>
              <button
                className="atlas-image"
                onClick={() => setActive(x)}
                aria-label={`${t.zoom}: ${x.name}`}
              >
                <Image src={x.image} alt={x.alt} width={960} height={720} />
                <span>
                  <Maximize2 size={14} />
                  {t.zoom}
                </span>
              </button>
              <div className="atlas-body">
                <b>{lang === "zh" ? "现场参考" : "FIELD REFERENCE"}</b>
                <h2>{x.name}</h2>
                <dl className="atlas-facts">
                  <Fact label={t.observe} value={x.observe} />
                  <Fact label={t.meaning} value={g[0]} />
                  <Fact label={t.evidence} value={g[1]} chip />
                  <Fact label={t.mistake} value={g[2]} />
                  <Fact label={t.action} value={g[3]} />
                </dl>
                <div className="notice">
                  <strong>{t.no}</strong>
                  {x.notProof}
                </div>
                <p className="atlas-meta">
                  {lang === "zh" ? "图片" : "Image"}：{x.author} · {x.license} ·{" "}
                  <a href={x.source} target="_blank" rel="noreferrer">
                    {t.source}
                    <ExternalLink size={13} />
                  </a>
                </p>
              </div>
            </article>
          );
        })}
      </div>
      {!filtered.length && <div className="atlas-empty">{t.empty}</div>}
      <section className="decision">
        <p className="eyebrow">FIELD DECISION PATH</p>
        <h2>{t.decision}</h2>
        <p className="section-intro">{t.decisionLead}</p>
        <div className="decision-grid">
          {t.steps.map((x) => (
            <article key={x[0]}>
              <strong>{x[0]}</strong>
              <p>{x[1]}</p>
            </article>
          ))}
        </div>
      </section>
      {active && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <button onClick={() => setActive(null)} aria-label={t.close}>
            <X size={22} />
          </button>
          <div>
            <Image
              src={active.image}
              alt={active.alt}
              width={1600}
              height={1200}
            />
            <p>
              <strong>{active.name}</strong>
              <span>
                {active.author} · {active.license}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
function Fact({
  label,
  value,
  chip = false,
}: {
  label: string;
  value: string;
  chip?: boolean;
}) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{chip ? <span className="evidence-chip">{value}</span> : value}</dd>
    </div>
  );
}
