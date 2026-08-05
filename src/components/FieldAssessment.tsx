"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Check, Clipboard, FolderInput, Mountain, Printer, RotateCcw, TestTubes, Waves } from "lucide-react";
import "./field-assessment.css";
import "./assessment-report.css";
type Choice = { label: string; value: number };
type Question = { key: string; label: string; choices: Choice[] };
const placer: Question[] = [
  {
    key: "cracks",
    label: "基岩裂缝",
    choices: [
      { label: "无", value: 0 },
      { label: "少", value: 10 },
      { label: "多", value: 20 },
    ],
  },
  {
    key: "blackSand",
    label: "黑砂",
    choices: [
      { label: "无", value: 0 },
      { label: "少", value: 6 },
      { label: "多", value: 12 },
    ],
  },
  {
    key: "gravel",
    label: "圆砾石层",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 12 },
    ],
  },
  {
    key: "bend",
    label: "河流内弯",
    choices: [
      { label: "否", value: 0 },
      { label: "是", value: 10 },
    ],
  },
  {
    key: "boulder",
    label: "巨石背水面",
    choices: [
      { label: "否", value: 0 },
      { label: "是", value: 10 },
    ],
  },
  {
    key: "quartz",
    label: "上游石英脉",
    choices: [
      { label: "不清楚", value: 0 },
      { label: "有", value: 8 },
    ],
  },
  {
    key: "gold",
    label: "标准化 10 L 淘洗见金",
    choices: [
      { label: "无", value: 0 },
      { label: "1–2 粒", value: 15 },
      { label: "3 粒以上", value: 28 },
    ],
  },
];
const lode: Question[] = [
  {
    key: "vein",
    label: "石英脉",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 15 },
    ],
  },
  {
    key: "fracture",
    label: "断裂或破碎带",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 20 },
    ],
  },
  {
    key: "oxide",
    label: "铁锈色氧化",
    choices: [
      { label: "无", value: 0 },
      { label: "少", value: 8 },
      { label: "多", value: 15 },
    ],
  },
  {
    key: "sulfide",
    label: "硫化物",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 15 },
    ],
  },
  {
    key: "alteration",
    label: "蚀变岩",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 15 },
    ],
  },
  {
    key: "creek",
    label: "下方溪沟见金",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 10 },
    ],
  },
  {
    key: "workings",
    label: "旧采坑或采掘迹象",
    choices: [
      { label: "无", value: 0 },
      { label: "有", value: 10 },
    ],
  },
];
const enLabels: Record<string, string> = {
  基岩裂缝: "Bedrock cracks",
  黑砂: "Black sand",
  圆砾石层: "Rounded gravel layer",
  河流内弯: "Inside bend",
  巨石背水面: "Behind boulders",
  上游石英脉: "Upstream quartz veins",
  "标准化 10 L 淘洗见金": "Visible gold in a standardised 10 L pan",
  石英脉: "Quartz vein",
  断裂或破碎带: "Fault or breccia zone",
  铁锈色氧化: "Iron-oxide staining",
  硫化物: "Sulphides",
  蚀变岩: "Altered rock",
  下方溪沟见金: "Visible gold in creek below",
  旧采坑或采掘迹象: "Old workings",
};
const enChoice: Record<string, string> = {
  无: "None",
  少: "Some",
  多: "Abundant",
  有: "Yes",
  否: "No",
  是: "Yes",
  不清楚: "Unknown",
  "1–2 粒": "1–2 particles",
  "3 粒以上": "3+ particles",
};
export default function FieldAssessment({ lang = "zh" }: { lang?: "zh" | "en" }) {
  const [mode, setMode] = useState<"placer" | "lode">("placer"),
    [answers, setAnswers] = useState<Record<string, number>>({}),
    [location, setLocation] = useState(""),
    [sampleId, setSampleId] = useState(""),
    [volume, setVolume] = useState(0),
    [goldG, setGoldG] = useState(0),
    [ppm, setPpm] = useState(0),
    [copied, setCopied] = useState(false);
  const questions = mode === "placer" ? placer : lode,
    score = useMemo(() => questions.reduce((n, q) => n + (answers[q.key] || 0), 0), [answers, questions]),
    answered = questions.filter((q) => answers[q.key] !== undefined),
    missing = questions.filter((q) => answers[q.key] === undefined),
    grade = mode === "placer" && volume > 0 ? goldG / (volume / 1000) : null;
  const zhResult = mode === "placer" ? (score <= 30 ? ["低优先级", "先完成对照样与标准化复采"] : score <= 50 ? ["建议扩大验证取样", "在上下游或横向布置同体积复样"] : score <= 70 ? ["有系统取样价值", "建立连续样线并记录回收率"] : ["重点采样目标", "加密样点、设置重复样并送检"]) : score <= 30 ? ["普通山体", "没有足够组合迹象，先做基础地质记录"] : score <= 50 ? ["弱矿化迹象", "沿构造方向布置代表性样品"] : score <= 70 ? ["值得系统取样", "开展连续槽样并加入 QA/QC"] : ["重点矿化调查带", "加密地质测量和实验室验证"],
    enResult = mode === "placer" ? (score <= 30 ? ["Low priority", "Add controls and repeat with a standardised volume"] : score <= 50 ? ["Expand verification sampling", "Repeat equal-volume samples upstream, downstream or laterally"] : score <= 70 ? ["Systematic sampling warranted", "Build a continuous sample line and record recovery"] : ["Priority sampling target", "Increase sample density, duplicates and laboratory checks"]) : score <= 30 ? ["Ordinary terrain", "Record baseline geology before further work"] : score <= 50 ? ["Weak mineralisation indicators", "Collect representative samples along the structure"] : score <= 70 ? ["Systematic sampling warranted", "Use continuous channel samples with QA/QC"] : ["Priority investigation zone", "Increase geological mapping and laboratory verification"],
    result = lang === "en" ? enResult : zhResult;
  const label = (q: Question) => (lang === "en" ? enLabels[q.label] : q.label),
    choice = (q: Question) => {
      const found = q.choices.find((c) => c.value === answers[q.key]);
      return found ? (lang === "en" ? enChoice[found.label] : found.label) : "—";
    };
  const reportText = ["GOLDFINDER", `${lang === "en" ? "Location" : "地点"}: ${location || "—"}`, `${lang === "en" ? "Sample ID" : "样品编号"}: ${sampleId || "—"}`, `${lang === "en" ? "Type" : "类型"}: ${mode === "placer" ? (lang === "en" ? "Placer" : "砂金") : lang === "en" ? "Lode" : "山金"}`, `${lang === "en" ? "Field score" : "现场评分"}: ${score}/100`, `${lang === "en" ? "Interpretation" : "判断"}: ${result[0]}`, mode === "placer" ? `${lang === "en" ? "Sample result" : "样品结果"}: ${volume > 0 ? `${volume} L · ${goldG} g · ${grade?.toFixed(3)} g/m³ (${lang === "en" ? "unadjusted" : "未修正"})` : "—"}` : `${lang === "en" ? "Laboratory result" : "实验室结果"}: ${ppm > 0 ? `${ppm} ppm = ${ppm} g/t Au` : "—"}`, `${lang === "en" ? "Next action" : "下一步"}: ${result[1]}`, `${lang === "en" ? "Missing observations" : "待补观察"}: ${missing.map(label).join(", ") || "—"}`, lang === "en" ? "Warning: A field score or single sample is not grade continuity, a resource, a reserve, or mining permission." : "风险提示：现场评分或单个样品不能代表品位连续性、资源量、储量或采矿许可。"].join("\n");
  async function copyReport() {
    await navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  function saveDraft() {
    const draft = {
      sample: sampleId,
      sampleType: mode === "placer" ? "Volume" : "Rock chip",
      date: new Date().toISOString().slice(0, 10),
      environment: mode === "placer" ? "Stream" : "Outcrop",
      material: mode === "placer" ? "Sand and gravel" : "Weathered rock",
      volumeL: volume > 0 ? String(volume) : "",
      volumeState: "Bank",
      recoveredMg: mode === "placer" && goldG > 0 ? String(goldG * 1000) : "",
      result: mode === "placer" && grade !== null ? grade.toFixed(3) : ppm > 0 ? String(ppm) : "",
      resultUnit: mode === "placer" ? "g/m³" : "g/t",
      notes: `${location ? `${lang === "en" ? "Location" : "地点"}: ${location}. ` : ""}${lang === "en" ? "Field assessment" : "现场判断"}: ${score}/100 · ${result[0]}. ${lang === "en" ? "Next action" : "下一步"}: ${result[1]}.`,
    };
    localStorage.setItem("goldfinder-assessment-draft", JSON.stringify(draft));
    window.location.href = lang === "en" ? "/en/field" : "/field";
  }
  function changeMode(next: "placer" | "lode") {
    setMode(next);
    setAnswers({});
  }
  return (
    <section className="assessment">
      <div className="assessment-tabs">
        <button className={mode === "placer" ? "active" : ""} onClick={() => changeMode("placer")}>
          <Waves size={18} />
          {lang === "en" ? "Placer clues" : "砂金线索"}
        </button>
        <button className={mode === "lode" ? "active" : ""} onClick={() => changeMode("lode")}>
          <Mountain size={18} />
          {lang === "en" ? "Lode clues" : "山金线索"}
        </button>
      </div>
      <div className="assessment-meta">
        <label>
          {lang === "en" ? "Location / description" : "地点／位置描述"}
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder={lang === "en" ? "Inside bend, bedrock crack…" : "河流内弯、基岩裂缝……"} />
        </label>
        <label>
          {lang === "en" ? "Sample ID" : "样品编号"}
          <input value={sampleId} onChange={(e) => setSampleId(e.target.value)} placeholder={mode === "placer" ? "S001" : "R001"} />
        </label>
        {mode === "placer" ? (
          <>
            <label>
              {lang === "en" ? "Sample volume (L)" : "采样体积（L）"}
              <input type="number" min="0" value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
            </label>
            <label>
              {lang === "en" ? "Recovered gold (g)" : "回收金重（g）"}
              <input type="number" min="0" step="any" value={goldG} onChange={(e) => setGoldG(Number(e.target.value))} />
            </label>
          </>
        ) : (
          <label>
            {lang === "en" ? "Laboratory Au (ppm)" : "实验室 Au（ppm）"}
            <input type="number" min="0" step="any" value={ppm} onChange={(e) => setPpm(Number(e.target.value))} />
          </label>
        )}
      </div>
      <div className="assessment-layout">
        <div className="assessment-form">
          {questions.map((q) => (
            <fieldset key={q.key}>
              <legend>{label(q)}</legend>
              <div className="choice-row">
                {q.choices.map((c) => (
                  <button key={c.label} className={answers[q.key] === c.value ? "selected" : ""} onClick={() => setAnswers((a) => ({ ...a, [q.key]: c.value }))}>
                    {lang === "en" ? enChoice[c.label] : c.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
        </div>
        <aside className="assessment-result">
          <div className="score">
            <strong>{score}</strong>
            <span>/ 100</span>
          </div>
          <div className="score-track">
            <i style={{ width: `${score}%` }} />
          </div>
          <p className="score-label">{lang === "en" ? "FIELD-EVIDENCE SCORE" : "现场线索评分"}</p>
          <h2>{result[0]}</h2>
          <p>{result[1]}</p>
          <div className="assessment-warning">
            <AlertTriangle size={18} />
            <span>{lang === "en" ? "This heuristic ranks sampling targets. It is not gold probability, grade, a resource estimate, or mining permission." : "本评分只用于排序取样目标，不代表含金概率、品位、资源量或采矿许可。"}</span>
          </div>
          <div className="assessment-actions">
            <Link className="button" href={lang === "en" ? "/en/sampling" : "/sampling"}>
              <TestTubes size={17} />
              {lang === "en" ? "Calculate grade" : "详细计算品位"}
            </Link>
            <Link className="button secondary" href={lang === "en" ? "/en/field" : "/field"}>
              {lang === "en" ? "Create sample record" : "建立样品档案"}
              <ArrowRight size={17} />
            </Link>
          </div>
          <button className="reset" onClick={() => setAnswers({})}>
            <RotateCcw size={15} />
            {lang === "en" ? "Reset" : "重置"}
          </button>
        </aside>
      </div>
      <article className="assessment-report">
        <header>
          <div>
            <p>GOLDFINDER · FIELD ASSESSMENT REPORT</p>
            <h2>{location || result[0]}</h2>
          </div>
          <strong>
            {score}
            <small>/100</small>
          </strong>
        </header>
        <div className="report-meta">
          <span>
            {lang === "en" ? "Sample" : "样品"}
            <b>{sampleId || "—"}</b>
          </span>
          <span>
            {lang === "en" ? "Type" : "类型"}
            <b>{mode === "placer" ? (lang === "en" ? "Placer" : "砂金") : lang === "en" ? "Lode" : "山金"}</b>
          </span>
          <span>
            {lang === "en" ? "Result" : "判断"}
            <b>{result[0]}</b>
          </span>
          <span>
            {lang === "en" ? "Measured result" : "测量结果"}
            <b>{mode === "placer" ? (grade !== null ? `${grade.toFixed(3)} g/m³` : "—") : ppm > 0 ? `${ppm} g/t Au` : "—"}</b>
          </span>
        </div>
        <section>
          <h3>{lang === "en" ? "Recorded evidence" : "已记录证据"}</h3>
          <ul>
            {answered.length ? (
              answered.map((q) => (
                <li key={q.key}>
                  <b>{label(q)}</b>
                  <span>{choice(q)}</span>
                </li>
              ))
            ) : (
              <li>{lang === "en" ? "No observations selected" : "尚未选择观察项"}</li>
            )}
          </ul>
        </section>
        <section>
          <h3>{lang === "en" ? "Missing controls" : "待补项目"}</h3>
          <p>{missing.map(label).join(lang === "en" ? ", " : "、") || "—"}</p>
        </section>
        <footer>
          <b>{lang === "en" ? "Next action" : "下一步"}：</b>
          {result[1]}
          <small>{lang === "en" ? "This report is a targeting aid, not a resource, reserve, economic, or permit conclusion." : "本报告仅用于安排验证工作，不构成资源量、储量、经济价值或许可结论。"}</small>
        </footer>
        <div className="report-actions">
          <button onClick={saveDraft}>
            <FolderInput size={17} />
            {lang === "en" ? "Send to sample register" : "带入样品档案"}
          </button>
          <button onClick={copyReport}>
            {copied ? <Check size={17} /> : <Clipboard size={17} />} {copied ? (lang === "en" ? "Copied" : "已复制") : lang === "en" ? "Copy report" : "复制报告"}
          </button>
          <button onClick={() => window.print()}>
            <Printer size={17} />
            {lang === "en" ? "Print / PDF" : "打印／保存 PDF"}
          </button>
        </div>
      </article>
    </section>
  );
}
