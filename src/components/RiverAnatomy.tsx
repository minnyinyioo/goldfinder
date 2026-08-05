"use client";
import { Download, Layers3, Map, Printer, Waves } from "lucide-react";
import "./river-anatomy.css";
type Lang = "zh" | "en";
const copy = {
  zh: {
    title: "河流剖面与古河道关系图",
    lead: "平面图告诉你样点放在哪里；剖面图告诉你应该取哪一层、取到多深，以及异常是否可能沿河槽连续。",
    long: "河流纵剖面",
    longNote:
      "由陡变缓、瀑布下游、基岩凹槽和砾石层底部可形成局部重矿物滞留。沿河向样点必须保持相同体积与相同目标层位。",
    cross: "河槽横剖面",
    crossNote:
      "不要只取内弯表面黑砂；应跨河槽比较岸边沉积、主槽、砾石底界与基岩裂缝。",
    old: "埋藏古河道剖面",
    oldNote:
      "高处圆砾层可能是旧河道，也可能是其他砾石沉积。必须确认侵蚀底界、河槽几何、层理和区域连续性。",
    labels: {
      source: "上游物源",
      drop: "跌水／能量突变",
      pool: "深潭",
      gravel: "底部砾石",
      crack: "基岩裂缝",
      inner: "内弯沉积",
      channel: "现代主槽",
      bank: "河岸",
      cover: "表土／坡积物",
      paleo: "古河道圆砾层",
      base: "侵蚀底界",
      rock: "基岩",
      target: "重点分层取样",
      control: "对照样",
    },
    print: "打印空白勘查图纸",
    sheet: "现场剖面记录图",
    fields: [
      "项目／河流",
      "日期／记录人",
      "坐标／定位精度",
      "水流方向／北向",
      "比例尺",
      "样品体积与粒级",
    ],
    instructions:
      "先画地层和接触边界，再标样点。每个样点写明编号、层位、深度、体积和 QA/QC 类型。",
    warning:
      "图中的目标位置只代表应验证的机械陷阱，不代表必然含金。不要进入不稳定河岸或无支护开挖面。",
  },
  en: {
    title: "River sections and palaeochannel relationships",
    lead: "Plan views show where points go; sections show which unit to sample, how deep, and whether an anomaly may continue along the channel.",
    long: "Stream longitudinal section",
    longNote:
      "Breaks in slope, plunge-pool exits, bedrock depressions and basal gravel can retain dense minerals locally. Along-stream points need equal support from the same target unit.",
    cross: "Channel cross-section",
    crossNote:
      "Do not take only surface black sand on the inside bend. Compare bank deposits, thalweg, basal gravel and bedrock cracks across the channel.",
    old: "Buried palaeochannel section",
    oldNote:
      "Elevated rounded gravel may be an old channel or another gravel deposit. Confirm the erosional base, channel geometry, bedding and regional continuity.",
    labels: {
      source: "Upstream source",
      drop: "Fall / energy break",
      pool: "Plunge pool",
      gravel: "Basal gravel",
      crack: "Bedrock cracks",
      inner: "Inside-bend deposit",
      channel: "Modern channel",
      bank: "Bank",
      cover: "Soil / colluvium",
      paleo: "Palaeochannel gravel",
      base: "Erosional base",
      rock: "Bedrock",
      target: "Priority interval",
      control: "Control",
    },
    print: "Print blank field sheet",
    sheet: "Field section record",
    fields: [
      "Project / stream",
      "Date / recorder",
      "Coordinates / accuracy",
      "Flow / north",
      "Scale",
      "Sample volume / fraction",
    ],
    instructions:
      "Draw units and contacts first, then mark samples. Give each point an ID, horizon, depth, volume and QA/QC type.",
    warning:
      "Target positions are mechanical traps to test, not proof of gold. Do not enter unstable banks or unsupported excavations.",
  },
} as const;
export default function RiverAnatomy({ lang }: { lang: Lang }) {
  const c = copy[lang],
    l = c.labels;
  return (
    <section className="river-anatomy" id="river-sections">
      <header>
        <div>
          <p className="eyebrow">SECTION DRAWING ATLAS</p>
          <h2>{c.title}</h2>
          <p>{c.lead}</p>
        </div>
        <Layers3 />
      </header>
      <div className="section-diagrams">
        <article>
          <h3>
            <Waves />
            {c.long}
          </h3>
          <div
            className="geo-diagram longitudinal"
            role="img"
            aria-label={c.long}
          >
            <div className="long-rock" />
            <div className="long-water" />
            <Tag cl="source" t={l.source} />
            <Tag cl="drop" t={l.drop} />
            <Tag cl="pool" t={l.pool} />
            <Tag cl="gravel" t={l.gravel} />
            <Tag cl="crack" t={l.crack} />
            <Pin cl="ls1" t="S-01" />
            <Pin cl="ls2" t="S-02" />
            <Pin cl="ls3" t="S-03" />
          </div>
          <p>{c.longNote}</p>
        </article>
        <article>
          <h3>
            <Map />
            {c.cross}
          </h3>
          <div
            className="geo-diagram cross-section"
            role="img"
            aria-label={c.cross}
          >
            <div className="cross-rock" />
            <div className="cross-gravel" />
            <div className="cross-water" />
            <Tag cl="bank" t={l.bank} />
            <Tag cl="inner" t={l.inner} />
            <Tag cl="channel" t={l.channel} />
            <Tag cl="ctarget" t={l.target} />
            <Pin cl="cs1" t="T-01" />
            <Pin cl="cs2" t="T-02" />
            <Pin cl="cs3" t="DUP" />
          </div>
          <p>{c.crossNote}</p>
        </article>
        <article className="wide">
          <h3>
            <Layers3 />
            {c.old}
          </h3>
          <div className="geo-diagram paleo" role="img" aria-label={c.old}>
            <div className="paleo-rock" />
            <div className="paleo-cover" />
            <div className="paleo-channel" />
            <div className="modern-cut" />
            <Tag cl="cover" t={l.cover} />
            <Tag cl="paleolabel" t={l.paleo} />
            <Tag cl="base" t={l.base} />
            <Tag cl="prock" t={l.rock} />
            <Tag cl="modern" t={l.channel} />
            <Pin cl="ps1" t="P-01" />
            <Pin cl="ps2" t="P-02" />
            <Pin cl="ps3" t="BLK" />
          </div>
          <p>{c.oldNote}</p>
        </article>
      </div>
      <div className="field-sheet">
        <div className="sheet-actions">
          <div>
            <p className="eyebrow">PRINTABLE FIELD TEMPLATE</p>
            <h3>{c.sheet}</h3>
          </div>
          <button type="button" onClick={() => window.print()}>
            <Printer />
            {c.print}
          </button>
        </div>
        <div className="sheet-fields">
          {c.fields.map((x) => (
            <label key={x}>
              <span>{x}</span>
              <i />
            </label>
          ))}
        </div>
        <div className="sheet-canvas">
          <span>N ↑</span>
          <p>{c.instructions}</p>
        </div>
        <div className="sheet-table">
          <b>{lang === "zh" ? "样号" : "Sample"}</b>
          <b>{lang === "zh" ? "层位／深度" : "Unit / depth"}</b>
          <b>{lang === "zh" ? "体积／重量" : "Volume / mass"}</b>
          <b>QA/QC</b>
          {Array.from({ length: 12 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
        <p className="sheet-warning">
          <Download />
          {c.warning}
        </p>
      </div>
    </section>
  );
}
function Tag({ cl, t }: { cl: string; t: string }) {
  return <span className={`geo-tag ${cl}`}>{t}</span>;
}
function Pin({ cl, t }: { cl: string; t: string }) {
  return (
    <span className={`geo-pin ${cl}`}>
      <i />
      {t}
    </span>
  );
}
