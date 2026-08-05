import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowDown,
  CheckCircle2,
  Layers3,
  Mountain,
  Route,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { atlasItems } from "@/data/media";
import FieldBenchmarks from "./FieldBenchmarks";
import RiverAnatomy from "./RiverAnatomy";
import ContentReviewPanel from "./ContentReviewPanel";
import "./geology-guide.css";

type Lang = "zh" | "en";
const media = (slug: string) => atlasItems.find((item) => item.slug === slug)!;
const images = [
  media("panning"),
  media("black-sand-field"),
  media("quartz-vein"),
  media("pyrite"),
];

const copy = {
  zh: {
    eyebrow: "FIELD INTERPRETATION SYSTEM",
    title: "沙金与山金地质判断中心",
    lead: "把地形、地层、构造、蚀变和取样结果放在同一条证据链上。照片帮助学习观察，但不能代替现场测量、代表性取样或实验室检测。",
    placer: "沙金：先读水流，再找捕集层",
    placerIntro:
      "砂金由原生矿源风化释放、搬运并在河流砾石中富集。单一黑砂带或一盘可见金只能算线索。",
    river: [
      "内弯与流速下降区：做横断面对照，不能只取表面黑砂。",
      "巨石背水面与跌水下游：检查涡流沉积，同时避开淘空区。",
      "基岩裂缝、锅穴：清到裂缝底部并记录清理体积。",
      "旧河道、阶地与冲积扇：先确认砾石连续性，再布置网格样。",
    ],
    layers: [
      "表土／现代细砂：通常用于识别覆盖层，不据此估品位。",
      "砾石层：记录粒径、分选、圆度和厚度变化。",
      "黑砂或重矿物滞留层：说明水力分选，不等于含金。",
      "黏土假底／胶结层：可能形成局部捕集面，应上下各取样。",
      "风化至新鲜基岩：优先检查接触面、裂缝和凹槽。",
    ],
    lode: "山金：看构造与蚀变组合",
    lodeIntro:
      "白色石英、铁锈色或黄铁矿都不是金矿证明。更有意义的是可追踪构造、围岩蚀变、硫化物组合和跨带连续取样结果。",
    lodeSignals: [
      "测量石英脉宽度、走向、倾向与倾角，并沿走向追踪连续性。",
      "记录断层、剪切带、角砾岩和网脉；区分早期变形石英与晚期裂隙。",
      "观察硅化、绢云母化、绿泥石化、碳酸盐化及其分带。",
      "氧化褐铁帽只提示原硫化物风化；需要新鲜样和实验室分析。",
    ],
    ladder: "证据等级：不要跨级下结论",
    levels: [
      ["01", "地质迹象", "位置或组合值得记录"],
      ["02", "值得取样", "有明确目标和对照设计"],
      ["03", "金异常", "实验室结果高于背景且 QA/QC 合格"],
      ["04", "可能形成矿体", "厚度、走向和深度上具有连续性"],
      ["05", "可采资源／储量", "需钻探、资源估算、冶金、经济和合规评价"],
    ],
    workflow: "现场验证顺序",
    steps: [
      "定位并拍摄带比例尺的全景、近景",
      "绘制河段横断面或露头草图",
      "分层／垂直矿化带取代表性样",
      "加入空白样、重复样和标准样",
      "实验室检测后复核异常连续性",
    ],
    warning: "安全边界",
    warningText:
      "不得进入不稳定河岸、陡壁、废弃坑道或无支护开挖面；不得擅自改变河道。XRF、破碎、酸消解及火试金须由合格人员在受控条件下操作。",
    refs: "方法依据",
    refText:
      "判断框架参照美国地质调查局关于砂矿形成、矿床模型与矿产资源评估的公开资料。",
    atlas: "打开真实图鉴",
    sources: "查看完整资料来源",
  },
  en: {
    eyebrow: "FIELD INTERPRETATION SYSTEM",
    title: "Placer and lode gold interpretation centre",
    lead: "Connect landform, stratigraphy, structure, alteration and sampling results in one evidence chain. Photographs teach observation; they do not replace measurements, representative sampling or laboratory analysis.",
    placer: "Placer gold: read the flow, then find the trap",
    placerIntro:
      "Placer gold is released from primary sources, transported and concentrated mainly in stream gravels. A black-sand streak or visible gold in one pan is only a lead.",
    river: [
      "Inside bends and lower-energy zones: sample a cross-section, not only surface black sand.",
      "Downstream of boulders and falls: inspect eddy deposits and recognise scoured zones.",
      "Bedrock cracks and potholes: clean to the base and record the processed volume.",
      "Palaeochannels, terraces and alluvial fans: confirm gravel continuity before grid sampling.",
    ],
    layers: [
      "Topsoil / modern fine sand: map cover; do not infer grade.",
      "Gravel: record grain size, sorting, roundness and thickness changes.",
      "Black-sand or heavy-mineral lag: indicates hydraulic sorting, not gold by itself.",
      "Clay false bedrock / cemented layer: sample immediately above and below the contact.",
      "Weathered to fresh bedrock: inspect contacts, cracks and depressions.",
    ],
    lode: "Lode gold: combine structure and alteration",
    lodeIntro:
      "White quartz, rusty colour or pyrite alone does not demonstrate a gold deposit. Traceable structures, wall-rock alteration, sulphide assemblages and continuous cross-zone samples carry more weight.",
    lodeSignals: [
      "Measure vein width, strike, dip direction and dip; trace continuity along strike.",
      "Record faults, shear zones, breccia and stockwork; distinguish early deformed quartz from late fractures.",
      "Map silicification, sericite, chlorite and carbonate alteration and their zoning.",
      "A limonite gossan only indicates weathered sulphides; obtain fresh material and laboratory analyses.",
    ],
    ladder: "Evidence ladder: never skip a level",
    levels: [
      [
        "01",
        "Geological indication",
        "A location or association worth documenting",
      ],
      ["02", "Sampling target", "A defined target with controls"],
      [
        "03",
        "Gold anomaly",
        "Above-background laboratory result with valid QA/QC",
      ],
      [
        "04",
        "Possible mineralised body",
        "Continuity in thickness, strike and depth",
      ],
      [
        "05",
        "Resource / reserve",
        "Requires drilling, estimation, metallurgy, economics and compliance",
      ],
    ],
    workflow: "Field verification sequence",
    steps: [
      "Locate and photograph overview and close-up with scale",
      "Draw a channel cross-section or outcrop sketch",
      "Sample by layer or continuously across mineralisation",
      "Insert blanks, duplicates and certified reference material",
      "Review anomaly continuity after laboratory analysis",
    ],
    warning: "Safety boundary",
    warningText:
      "Do not enter unstable banks, cliffs, abandoned workings or unsupported excavations, and do not alter a watercourse without authority. XRF, crushing, acid digestion and fire assay require trained personnel and controlled facilities.",
    refs: "Method basis",
    refText:
      "The framework follows public USGS material on placer formation, mineral-deposit models and mineral-resource assessment.",
    atlas: "Open the real-photo atlas",
    sources: "Review all references",
  },
} as const;

export default function GeologyGuide({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return (
    <>
      <div className="page-head geology-head">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
        <ContentReviewPanel lang={lang} topic="geology" />
        <div className="geology-jump">
          <a href="#placer">
            <Waves size={17} />
            {c.placer}
          </a>
          <a href="#lode">
            <Mountain size={17} />
            {c.lode}
          </a>
          <a href="#evidence">
            <Layers3 size={17} />
            {c.ladder}
          </a>
        </div>
      </div>
      <section className="section geology-section" id="placer">
        <div className="geology-title">
          <Waves />
          <div>
            <p className="eyebrow">PLACER SYSTEM</p>
            <h2>{c.placer}</h2>
            <p>{c.placerIntro}</p>
          </div>
        </div>
        <div className="geology-grid">
          <figure>
            <Image
              src={images[0].image}
              alt={images[0].alt}
              width={960}
              height={720}
            />
            <figcaption>
              {images[0].author} · {images[0].license} ·{" "}
              <a href={images[0].source} target="_blank" rel="noreferrer">
                {lang === "zh" ? "原图与许可" : "source & licence"}
              </a>
            </figcaption>
          </figure>
          <div className="signal-card">
            <h3>
              <Route size={19} />
              {lang === "zh" ? "河道位置" : "Channel positions"}
            </h3>
            <ul>
              {c.river.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <figure>
            <Image
              src={images[1].image}
              alt={images[1].alt}
              width={960}
              height={720}
            />
            <figcaption>
              {images[1].author} · {images[1].license} ·{" "}
              <a href={images[1].source} target="_blank" rel="noreferrer">
                {lang === "zh" ? "原图与许可" : "source & licence"}
              </a>
            </figcaption>
          </figure>
          <div className="signal-card layer-card">
            <h3>
              <Layers3 size={19} />
              {lang === "zh"
                ? "从上到下读地层"
                : "Read the section top to bottom"}
            </h3>
            <ol>
              {c.layers.map((x, i) => (
                <li key={x}>
                  <span>{i + 1}</span>
                  <p>{x}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <RiverAnatomy lang={lang} />
      <section className="section geology-section" id="lode">
        <div className="geology-title">
          <Mountain />
          <div>
            <p className="eyebrow">LODE SYSTEM</p>
            <h2>{c.lode}</h2>
            <p>{c.lodeIntro}</p>
          </div>
        </div>
        <div className="geology-grid lode-grid">
          <figure>
            <Image
              src={images[2].image}
              alt={images[2].alt}
              width={960}
              height={720}
            />
            <figcaption>
              {images[2].author} · {images[2].license} ·{" "}
              <a href={images[2].source} target="_blank" rel="noreferrer">
                {lang === "zh" ? "原图与许可" : "source & licence"}
              </a>
            </figcaption>
          </figure>
          <div className="signal-card">
            <h3>
              <CheckCircle2 size={19} />
              {lang === "zh" ? "组合观察" : "Combined observations"}
            </h3>
            <ul>
              {c.lodeSignals.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="section evidence-section" id="evidence">
        <div className="geology-title">
          <Layers3 />
          <div>
            <p className="eyebrow">EVIDENCE LADDER</p>
            <h2>{c.ladder}</h2>
          </div>
        </div>
        <div className="evidence-ladder">
          {c.levels.map(([n, title, text], i) => (
            <article key={n}>
              <span>{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {i < c.levels.length - 1 && <ArrowDown aria-hidden="true" />}
            </article>
          ))}
        </div>
        <div className="verification-box">
          <h3>
            <ShieldCheck size={20} />
            {c.workflow}
          </h3>
          <ol>
            {c.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        </div>
        <div className="safety-box">
          <AlertTriangle />
          <div>
            <h3>{c.warning}</h3>
            <p>{c.warningText}</p>
          </div>
        </div>
        <div className="method-note">
          <div>
            <b>{c.refs}</b>
            <p>{c.refText}</p>
          </div>
          <div>
            <a
              href="https://pubs.usgs.gov/publication/b1857G"
              target="_blank"
              rel="noreferrer"
            >
              USGS: Gold in placer deposits
            </a>
            <a
              href="https://www.usgs.gov/science/science-explorer/minerals/Assessments-of-Mineral-Resources"
              target="_blank"
              rel="noreferrer"
            >
              USGS: Mineral resource assessments
            </a>
          </div>
        </div>
        <div className="geology-actions">
          <Link href={lang === "zh" ? "/atlas" : "/en/atlas"}>{c.atlas}</Link>
          <Link href={lang === "zh" ? "/sources" : "/en/sources"}>
            {c.sources}
          </Link>
        </div>
        <FieldBenchmarks lang={lang} />
      </section>
    </>
  );
}
