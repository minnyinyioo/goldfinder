import { AlertTriangle, Compass, Ruler, Waves } from "lucide-react";
import PlacerReferenceFigures from "./PlacerReferenceFigures";
import "./mapping-blueprints.css";
type Lang = "zh" | "en";
const t = {
  zh: {
    title: "勘查平面解剖图",
    lead: "像施工图一样读取样点：方向、比例尺、地质边界、样线、对照样和重复样必须同图表达。下图是布点模板，不是某矿区的施工设计。",
    placer: "砂金河段平面图",
    pn: "样线横穿河槽，上游、异常段与下游采用相同取样体积；不能只挑黑砂最多处。",
    lode: "山金露头平面图",
    ln: "槽样尽量垂直穿过矿脉与两侧围岩，并沿走向重复剖面，检查宽度和品位连续性。",
    flow: "水流",
    inside: "内弯沉积",
    outer: "外弯冲刷",
    boulder: "巨石背水面",
    bedrock: "基岩裂缝",
    upstream: "上游背景对照",
    downstream: "下游对照",
    thalweg: "主流槽／最深流线",
    exposure: "基岩露头",
    transect: "横断样线",
    equal: "各常规样保持相同体积与粒级",
    vein: "石英脉／矿化带",
    alter: "蚀变晕",
    wall: "围岩",
    strike: "矿脉走向",
    check: "图纸必读信息",
    items: [
      "北箭头、比例尺、坐标系统和日期",
      "水流方向或矿脉走向／倾向／倾角",
      "样号、类型、体积或有效宽度",
      "地层、接触带、断层、河岸与基岩边界",
      "空白样、重复样和标准样位置",
      "区分实测、推断与未知边界",
    ],
    warn: "示意图不能替代现场测量、土地许可、工程设计或合资格专业人员的资源评估。",
  },
  en: {
    title: "Exploration plan-view anatomy",
    lead: "Read sampling like a construction drawing: direction, scale, geological boundaries, sample lines, controls and duplicates belong on one sheet. These are templates, not site-specific designs.",
    placer: "Placer reach plan",
    pn: "Transects cross the channel; upstream, anomaly and downstream stations use equal sample support. Do not select only rich black sand.",
    lode: "Lode outcrop plan",
    ln: "Channels cross the vein and both wall rocks as nearly perpendicular as practical; repeated sections along strike test continuity.",
    flow: "Flow",
    inside: "Inside-bend deposit",
    outer: "Outer-bank scour",
    boulder: "Boulder shadow",
    bedrock: "Bedrock crack",
    upstream: "Upstream background control",
    downstream: "Downstream control",
    thalweg: "Thalweg / deepest flow path",
    exposure: "Bedrock exposure",
    transect: "Channel transect",
    equal: "Keep equal volume and size fraction for every routine sample",
    vein: "Vein / mineralised zone",
    alter: "Alteration halo",
    wall: "Wall rock",
    strike: "Vein strike",
    check: "Drawing checklist",
    items: [
      "North arrow, scale, CRS and date",
      "Flow or vein strike / dip",
      "Sample ID, type, volume or width",
      "Strata, contacts, faults, banks and bedrock",
      "Blanks, duplicates and reference materials",
      "Observed, inferred and unknown boundaries",
    ],
    warn: "Diagrams do not replace field measurement, land access, engineering design or qualified resource evaluation.",
  },
} as const;
export default function MappingBlueprints({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="blueprints">
      <header>
        <div>
          <p className="eyebrow">EXPLORATION PLAN DRAWINGS</p>
          <h2>{c.title}</h2>
          <p>{c.lead}</p>
        </div>
        <Ruler />
      </header>
      <div className="bp-grid">
        <article className="placer-plan-card">
          <h3>
            <Waves />
            {c.placer}
          </h3>
          <div
            className="plan placer detailed-placer"
            role="img"
            aria-label={c.placer}
          >
            <North />
            <div className="river" />
            <b className="flow">→ {c.flow}</b>
            <Label cl="outer" s={c.outer} />
            <Label cl="inside" s={c.inside} />
            <Label cl="boulder" s={`S-B1 · ${c.boulder}`} />
            <Label cl="bedrock" s={`S-R1 · ${c.bedrock}`} />
            <Label cl="upstream" s={`S-U1 · ${c.upstream}`} />
            <Label cl="downstream" s={`S-D1 · ${c.downstream}`} />
            <Label cl="thalweg" s={c.thalweg} />
            <Label cl="exposure" s={c.exposure} />
            <Label cl="transect-a" s={`A—A′ · ${c.transect}`} />
            <i className="rock" />
            <i className="line l1" />
            <i className="line l2" />
            <Pin cl="p1" s="S-U1" />
            <Pin cl="p2" s="S-I1" />
            <Pin cl="p3" s="S-I2" />
            <Pin cl="p4" s="S-B1" />
            <Pin cl="p5 dup" s="DUP" />
            <Pin cl="p6" s="S-D1" />
            <Scale s="0  10  20 m" />
          </div>
          <p>{c.pn}</p>
          <div
            className="placer-legend"
            aria-label={lang === "en" ? "Plan legend" : "平面图图例"}
          >
            <strong>{lang === "en" ? "PLAN LEGEND" : "平面图图例"}</strong>
            <span>
              <i className="lg-routine" />
              {lang === "en" ? "Routine equal-volume sample" : "常规等体积样"}
            </span>
            <span>
              <i className="lg-duplicate" />
              {lang === "en" ? "Field duplicate" : "现场重复样"}
            </span>
            <span>
              <i className="lg-transect" />
              {lang === "en" ? "Cross-channel transect" : "跨河槽样线"}
            </span>
            <span>
              <i className="lg-flow" />
              {lang === "en" ? "Water-flow direction" : "水流方向"}
            </span>
            <p>{c.equal}</p>
          </div>
        </article>
        <article>
          <h3>
            <Compass />
            {c.lode}
          </h3>
          <div className="plan lode" role="img" aria-label={c.lode}>
            <North />
            <i className="alter-zone" />
            <i className="vein" />
            <b className="strike">↗ {c.strike}</b>
            <Label cl="vlabel" s={c.vein} />
            <Label cl="alabel" s={c.alter} />
            <Label cl="wall" s={c.wall} />
            <Label cl="blank" s="BLK-01" />
            <i className="channel c1">
              <b>C-01</b>
            </i>
            <i className="channel c2">
              <b>C-02</b>
            </i>
            <i className="channel c3">
              <b>C-03 + DUP</b>
            </i>
            <Scale s="0  25  50 m" />
          </div>
          <p>{c.ln}</p>
        </article>
      </div>
      <PlacerReferenceFigures lang={lang} />
      <div className="bp-check">
        <div>
          <h3>{c.check}</h3>
          <ul>
            {c.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <p>
          <AlertTriangle />
          {c.warn}
        </p>
      </div>
    </section>
  );
}
function North() {
  return (
    <span className="north">
      N<b>↑</b>
    </span>
  );
}
function Scale({ s }: { s: string }) {
  return (
    <span className="bp-scale">
      <i />
      <i />
      <b>{s}</b>
    </span>
  );
}
function Label({ cl, s }: { cl: string; s: string }) {
  return <span className={`bp-label ${cl}`}>{s}</span>;
}
function Pin({ cl, s }: { cl: string; s: string }) {
  return (
    <span className={`pin ${cl}`}>
      <i />
      {s}
    </span>
  );
}
