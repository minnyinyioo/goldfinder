"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MappingBlueprints from "./MappingBlueprints";
import "./map-workspace.css";
type Sample = {
  id?: string;
  project?: string;
  sample?: string;
  date?: string;
  environment?: string;
  material?: string;
  lat?: string;
  lng?: string;
  accuracy?: string;
  result?: string;
  resultUnit?: string;
  visibleGold?: string;
  qcType?: string;
  notes?: string;
};
const tx = {
  zh: {
    eyebrow: "PRIVATE SAMPLE MAPPING",
    title: "地图、样点与地质连续性",
    lead: "地图不是只标出“最好结果”的展示图，而是检验上下游、层位和矿脉连续性的工作工具。精确坐标保存在当前设备，点击后才会发送给外部地图。",
    all: "全部项目",
    located: "仅有坐标",
    assayed: "仅有化验",
    points: "样点",
    open: "打开地图",
    accuracy: "定位精度",
    missing: "无坐标",
    empty: "当前筛选下没有样点。请先在现场记录中保存坐标。",
    record: "新增样点",
    privacy: "隐私原则",
    privacyText:
      "公开报告应删除、模糊或分区化精确矿点。导出完整坐标前确认土地权属、许可和共享对象。",
    how: "如何布置样点",
    placer: "河流与砂金",
    placerText:
      "沿上游—异常区—下游建立等体积样点，并在内弯、巨石背水面、黏土假底和基岩裂隙分别记录。单个富集盘不能代表河段。",
    lode: "山体与矿脉",
    lodeText:
      "横穿矿脉和两侧围岩布置连续槽样，再沿走向重复剖面。记录走向、倾角、真厚度、蚀变边界及空白对照。",
    reference: "现场参照图",
    refLead:
      "以下真实照片帮助理解位置与材料；它们不是矿点坐标，也不能证明你的样品含金。",
    river: "淘金与河流样点",
    riverText: "记录处理体积、粒级和重复样，才能比较上下游趋势。",
    channel: "古河道砾石类比",
    channelText: "砾岩外观只能作为沉积类比，必须结合底界、层理和区域几何关系。",
    vein: "矿脉露头记录",
    veinText:
      "记录接触、厚度、方向和连续性，不能把普通白色石英直接解释为含金。",
    legend: "状态图例",
    high: "有化验结果",
    field: "仅现场迹象",
    control: "QA/QC 样",
    none: "资料待补",
  },
  en: {
    eyebrow: "PRIVATE SAMPLE MAPPING",
    title: "Mapping, samples, and geological continuity",
    lead: "A map is not a display of only the best result. It tests upstream–downstream, stratigraphic, and vein continuity. Exact coordinates stay on this device and are sent to an external map only when you open a point.",
    all: "All projects",
    located: "Located only",
    assayed: "Assayed only",
    points: "points",
    open: "Open map",
    accuracy: "Accuracy",
    missing: "No coordinates",
    empty:
      "No samples match this filter. Save coordinates in the field register first.",
    record: "Add sample point",
    privacy: "Privacy principle",
    privacyText:
      "Public reports should remove, blur, or generalise exact prospect locations. Confirm land rights, permits, and recipients before exporting precise coordinates.",
    how: "How to arrange samples",
    placer: "Streams and placer gold",
    placerText:
      "Use equal-volume points upstream, through the anomaly, and downstream. Record inside bends, boulder shadows, clay false bottoms, and bedrock cracks separately. One rich pan is not a reach grade.",
    lode: "Hillsides and veins",
    lodeText:
      "Collect continuous channels across the vein and both wall rocks, then repeat sections along strike. Record strike, dip, true width, alteration boundaries, and blanks.",
    reference: "Field reference photographs",
    refLead:
      "These real photographs help explain setting and material. They are not prospect coordinates and do not demonstrate gold in your sample.",
    river: "Panning and stream points",
    riverText:
      "Processed volume, size fraction, and repeats are required to compare upstream and downstream trends.",
    channel: "Palaeochannel gravel analogue",
    channelText:
      "Conglomerate appearance is only an analogue; interpretation needs basal contacts, bedding, geometry, and regional context.",
    vein: "Vein-outcrop recording",
    veinText:
      "Record contacts, thickness, direction, and continuity. Ordinary white quartz cannot be called gold-bearing from appearance.",
    legend: "Status legend",
    high: "Laboratory result",
    field: "Field indication only",
    control: "QA/QC sample",
    none: "Incomplete record",
  },
  my: {
    eyebrow: "PRIVATE SAMPLE MAPPING",
    title: "မြေပုံ၊ နမူနာမှတ်နှင့် ဘူမိဗေဒဆက်စပ်မှု",
    lead: "မြေပုံသည် အကောင်းဆုံးရလဒ်များကိုသာ ပြသရန်မဟုတ်ပါ။ အထက်ရေ–အောက်ရေ၊ မြေလွှာနှင့် သတ္တုကြော ဆက်စပ်မှုကို စစ်ဆေးရန်ဖြစ်သည်။ တိကျသော coordinate များကို ဤစက်တွင်သာ သိမ်းပြီး sample ကို ဖွင့်သည့်အခါမှ ပြင်ပမြေပုံသို့ ပို့သည်။",
    all: "Project အားလုံး",
    located: "Coordinate ပါသော sample",
    assayed: "Assay ရလဒ်ပါသော sample",
    points: "နမူနာမှတ်",
    open: "မြေပုံဖွင့်ရန်",
    accuracy: "တည်နေရာတိကျမှု",
    missing: "Coordinate မရှိ",
    empty:
      "ဤ filter အောက်တွင် sample မရှိပါ။ Field Records တွင် GPS coordinate ကို ဦးစွာသိမ်းပါ။",
    record: "နမူနာမှတ် ထည့်ရန်",
    privacy: "တည်နေရာလုံခြုံရေး",
    privacyText:
      "အများပြည်သူသို့ ထုတ်ပြန်သော report တွင် တိကျသော ရွှေရှာနေရာကို ဖယ်ရှား၊ အကြမ်းဖျဉ်းပြောင်း သို့မဟုတ် zone အဖြစ်သာ ပြပါ။ Exact coordinate မျှဝေမီ မြေယာအခွင့်အရေး၊ permit နှင့် လက်ခံသူကို စစ်ဆေးပါ။",
    how: "နမူနာမှတ်များကို မည်သို့စီစဉ်မည်",
    placer: "မြစ်ချောင်းနှင့် ရွှေကျင်သိုက်",
    placerText:
      "အထက်ရေ၊ anomaly ဧရိယာနှင့် အောက်ရေတွင် တူညီသော ထုထည်ဖြင့် sample ယူပါ။ အတွင်းကွေ့၊ ကျောက်တုံးနောက်ဘက်၊ clay false bottom နှင့် bedrock crack ကို သီးခြားမှတ်တမ်းတင်ပါ။ Rich pan တစ်ခုသည် မြစ်ပိုင်းတစ်ခုလုံး၏ grade မဟုတ်ပါ။",
    lode: "တောင်စောင်းနှင့် သတ္တုကြော",
    lodeText:
      "သတ္တုကြောနှင့် wall rock နှစ်ဖက်ကို ဖြတ်သည့် continuous channel sample ယူပြီး strike တစ်လျှောက် section ထပ်ယူပါ။ Strike၊ dip၊ true width၊ alteration boundary နှင့် blank ကို မှတ်တမ်းတင်ပါ။",
    reference: "ကွင်းဆင်းအကိုးအကား ဓာတ်ပုံများ",
    refLead:
      "ဤဓာတ်ပုံအစစ်များသည် ပတ်ဝန်းကျင်နှင့် ပစ္စည်းကို နားလည်ရန်ဖြစ်သည်။ Prospect coordinate မဟုတ်သကဲ့သို့ သင့် sample တွင် ရွှေပါကြောင်း မသက်သေပြပါ။",
    river: "ရွှေကျင်ခြင်းနှင့် မြစ်ချောင်း sample",
    riverText:
      "အထက်ရေ–အောက်ရေ trend ကို နှိုင်းယှဉ်ရန် processed volume၊ size fraction နှင့် repeat sample လိုအပ်သည်။",
    channel: "ရှေးဟောင်းမြစ်ကြောင်း ကျောက်စရစ်နှိုင်းယှဉ်ပုံ",
    channelText:
      "Conglomerate ပုံသဏ္ဌာန်သည် analogue သာဖြစ်သည်။ Basal contact၊ bedding၊ geometry နှင့် regional context ကို ပေါင်းစပ်ရမည်။",
    vein: "သတ္တုကြော outcrop မှတ်တမ်း",
    veinText:
      "Contact၊ thickness၊ direction နှင့် continuity ကို မှတ်တမ်းတင်ပါ။ အဖြူရောင် quartz သာကြည့်၍ ရွှေပါသည်ဟု မဆုံးဖြတ်ပါနှင့်။",
    legend: "အခြေအနေအညွှန်း",
    high: "ဓာတ်ခွဲခန်းရလဒ်ရှိ",
    field: "ကွင်းဆင်းလက္ခဏာသာရှိ",
    control: "QA/QC sample",
    none: "အချက်အလက်မပြည့်စုံ",
  },
};
export default function MapWorkspace({ lang }: { lang: "zh" | "en" | "my" }) {
  const c = tx[lang],
    [records, setRecords] = useState<Sample[]>([]),
    [project, setProject] = useState("all"),
    [mode, setMode] = useState("all");
  useEffect(() => {
    try {
      const v = JSON.parse(
        localStorage.getItem("goldfinder-samples-v2") || "[]",
      );
      if (Array.isArray(v)) setRecords(v);
    } catch {}
  }, []);
  const projects = useMemo(
    () =>
      Array.from(
        new Set(records.map((x) => x.project).filter(Boolean)),
      ) as string[],
    [records],
  );
  const valid = (x: Sample) =>
    x.lat !== "" &&
    x.lng !== "" &&
    Number.isFinite(Number(x.lat)) &&
    Number.isFinite(Number(x.lng)) &&
    Math.abs(Number(x.lat)) <= 90 &&
    Math.abs(Number(x.lng)) <= 180;
  const filtered = records.filter(
    (x) =>
      (project === "all" || x.project === project) &&
      (mode !== "located" || valid(x)) &&
      (mode !== "assayed" || Boolean(x.result)),
  );
  const base = lang === "zh" ? "" : lang === "my" ? "/my" : "/en";
  return (
    <>
      <div className="page-head map-head">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
        <div className="actions">
          <Link className="button" href={`${base}/field`}>
            {c.record}
          </Link>
          <Link className="button secondary" href={`${base}/project`}>
            {lang === "zh"
              ? "项目控制台"
              : lang === "my"
                ? "Project အလုပ်နေရာ"
                : "Project control centre"}
          </Link>
        </div>
      </div>
      <section className="section map-section">
        <div className="map-controls">
          <select
            aria-label={c.all}
            value={project}
            onChange={(e) => setProject(e.target.value)}
          >
            <option value="all">{c.all}</option>
            {projects.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <div>
            {[
              ["all", c.points],
              ["located", c.located],
              ["assayed", c.assayed],
            ].map((x) => (
              <button
                key={x[0]}
                className={mode === x[0] ? "active" : ""}
                onClick={() => setMode(x[0])}
              >
                {x[1]}
              </button>
            ))}
          </div>
          <strong>
            {filtered.length} {c.points}
          </strong>
        </div>
        <div className="map-list">
          {!filtered.length && <div className="map-empty">{c.empty}</div>}
          {filtered.map((x, i) => {
            const has = valid(x),
              status =
                x.qcType && x.qcType !== "Routine"
                  ? "control"
                  : x.result
                    ? "high"
                    : x.visibleGold
                      ? "field"
                      : "none";
            return (
              <article key={x.id || i} className={`map-point ${status}`}>
                <span className="marker">{i + 1}</span>
                <div>
                  <strong>{x.sample || "—"}</strong>
                  <small>
                    {x.project || "—"} · {x.date || "—"}
                  </small>
                  <p>
                    {x.environment || "—"} · {x.material || "—"}
                  </p>
                  <p>
                    {x.result
                      ? `${x.result} ${x.resultUnit || ""}`
                      : x.visibleGold
                        ? `${x.visibleGold} visible`
                        : c.none}
                  </p>
                </div>
                <div className="point-location">
                  {has ? (
                    <>
                      <code>
                        {Number(x.lat).toFixed(5)}, {Number(x.lng).toFixed(5)}
                      </code>
                      <small>
                        {c.accuracy}: {x.accuracy || "—"} m
                      </small>
                      <a
                        href={`https://www.openstreetmap.org/?mlat=${x.lat}&mlon=${x.lng}#map=16/${x.lat}/${x.lng}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {c.open} ↗
                      </a>
                    </>
                  ) : (
                    <i>{c.missing}</i>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        <div className="map-legend">
          <strong>{c.legend}</strong>
          <span className="high">{c.high}</span>
          <span className="field">{c.field}</span>
          <span className="control">{c.control}</span>
          <span className="none">{c.none}</span>
        </div>
        <div className="notice">
          <strong>{c.privacy}：</strong>
          {c.privacyText}
        </div>
        <MappingBlueprints lang={lang} />
        <section className="mapping-method">
          <p className="eyebrow">SAMPLING GEOMETRY</p>
          <h2>{c.how}</h2>
          <div className="method-grid">
            <article>
              <span>01</span>
              <h3>{c.placer}</h3>
              <p>{c.placerText}</p>
            </article>
            <article>
              <span>02</span>
              <h3>{c.lode}</h3>
              <p>{c.lodeText}</p>
            </article>
          </div>
        </section>
        <section className="map-reference">
          <p className="eyebrow">VERIFIED PHOTO REFERENCES</p>
          <h2>{c.reference}</h2>
          <p className="section-intro">{c.refLead}</p>
          <div className="reference-grid">
            <Reference
              image="/images/panning.jpg"
              title={c.river}
              body={c.riverText}
            />
            <Reference
              image="/images/conglomerate.jpg"
              title={c.channel}
              body={c.channelText}
            />
            <Reference
              image="/images/quartz-vein.jpg"
              title={c.vein}
              body={c.veinText}
            />
          </div>
        </section>
      </section>
    </>
  );
}
function Reference({
  image,
  title,
  body,
}: {
  image: string;
  title: string;
  body: string;
}) {
  return (
    <article className="card">
      <Image src={image} alt={title} width={800} height={550} />
      <div>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </article>
  );
}
