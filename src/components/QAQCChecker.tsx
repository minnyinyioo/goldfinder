"use client";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  FlaskConical,
  ShieldQuestion,
} from "lucide-react";
import "./qaqc-checker.css";
type Lang = "zh" | "en";
type State = "pass" | "review" | "missing";
const t = {
  zh: {
    title: "化验批次质量检查器",
    lead: "在解释金异常前，检查控制样比例、空白污染、重复样差异和标准样回收率。所有阈值都应按项目、材料及检测方法调整。",
    batch: "批次数量",
    routine: "普通样",
    dup: "现场重复样",
    blank: "空白样",
    crm: "标准样 CRM",
    target: "每类控制样目标比例（%）",
    result: "控制样结果",
    a: "重复样 A",
    b: "重复样 B",
    rpd: "RPD 复核阈值（%）",
    blankResult: "空白样结果",
    dl: "方法检出限",
    multiple: "空白复核倍数（×检出限）",
    cert: "CRM 证书值",
    measured: "CRM 实测值",
    crmLimit: "CRM 允许偏差（±%）",
    summary: "批次筛查结果",
    pass: "通过",
    review: "需要复核",
    missing: "数据不足",
    note: "默认值仅用于初步筛查，不是通用实验室验收标准。控制样失败时，应暂停解释该批次异常，核对样序、制样污染、分析漂移、单位和证书值，再决定重测或重新制样。",
    clear: "清空全部",
    defaults: "恢复示例值",
  },
  en: {
    title: "Assay batch quality checker",
    lead: "Before interpreting a gold anomaly, check control insertion, blank contamination, duplicate precision and CRM recovery. Adjust every threshold to the project, material and analytical method.",
    batch: "Batch counts",
    routine: "Routine samples",
    dup: "Field duplicates",
    blank: "Blanks",
    crm: "Certified reference materials",
    target: "Target rate for each control type (%)",
    result: "Control results",
    a: "Duplicate A",
    b: "Duplicate B",
    rpd: "RPD review threshold (%)",
    blankResult: "Blank result",
    dl: "Method detection limit",
    multiple: "Blank review multiple (× DL)",
    cert: "CRM certified value",
    measured: "CRM measured value",
    crmLimit: "CRM allowed deviation (±%)",
    summary: "Batch screening result",
    pass: "Pass",
    review: "Review required",
    missing: "Insufficient data",
    note: "Defaults are preliminary screening values, not universal laboratory acceptance criteria. When a control fails, pause interpretation and review sequence, preparation contamination, drift, units and certificate values before re-assay or re-preparation.",
    clear: "Clear all",
    defaults: "Restore examples",
  },
} as const;
export default function QAQCChecker({ lang = "zh" }: { lang?: Lang }) {
  const c = t[lang];
  const [routine, setRoutine] = useState(80),
    [dups, setDups] = useState(8),
    [blanks, setBlanks] = useState(4),
    [crms, setCrms] = useState(4),
    [target, setTarget] = useState(5),
    [a, setA] = useState(1.12),
    [b, setB] = useState(1.35),
    [rpdLimit, setRpdLimit] = useState(30),
    [blank, setBlank] = useState(0.008),
    [dl, setDl] = useState(0.005),
    [multiple, setMultiple] = useState(5),
    [cert, setCert] = useState(1),
    [measured, setMeasured] = useState(0.94),
    [crmLimit, setCrmLimit] = useState(10);
  const r = useMemo(() => {
    const safe = (value: number) => (Number.isFinite(value) ? value : 0),
      total = safe(routine) + safe(dups) + safe(blanks) + safe(crms),
      pct = (n: number) =>
        total && Number.isFinite(n) ? (n / total) * 100 : 0,
      rpd = a > 0 && b > 0 ? (Math.abs(a - b) / ((a + b) / 2)) * 100 : null,
      recovery = cert > 0 ? (measured / cert) * 100 : null,
      state = (ok: boolean | null): State =>
        ok === null ? "missing" : ok ? "pass" : "review";
    return {
      total,
      pct,
      rpd,
      recovery,
      ratio: (n: number) =>
        state(total && Number.isFinite(target) ? pct(n) >= target : null),
      dupState: state(
        rpd === null || !Number.isFinite(rpdLimit) ? null : rpd <= rpdLimit,
      ),
      blankState: state(
        Number.isFinite(blank) &&
          Number.isFinite(dl) &&
          Number.isFinite(multiple) &&
          dl > 0
          ? blank <= dl * multiple
          : null,
      ),
      crmState: state(
        recovery === null || !Number.isFinite(crmLimit)
          ? null
          : Math.abs(recovery - 100) <= crmLimit,
      ),
    };
  }, [
    routine,
    dups,
    blanks,
    crms,
    target,
    a,
    b,
    rpdLimit,
    blank,
    dl,
    multiple,
    cert,
    measured,
    crmLimit,
  ]);
  const input = (
    label: string,
    value: number,
    set: (n: number) => void,
    step = "1",
  ) => (
    <label>
      {label}
      <input
        type="number"
        min="0"
        step={step}
        value={Number.isFinite(value) ? value : ""}
        onChange={(e) =>
          set(e.target.value === "" ? Number.NaN : Number(e.target.value))
        }
      />
    </label>
  );
  const Status = ({ state }: { state: State }) => {
    const Icon =
      state === "pass"
        ? CheckCircle2
        : state === "review"
          ? AlertTriangle
          : ShieldQuestion;
    return (
      <span className={`qaqc-status ${state}`}>
        <Icon size={15} />
        {c[state]}
      </span>
    );
  };
  const Row = ({
    label,
    value,
    state,
  }: {
    label: string;
    value: string;
    state: State;
  }) => (
    <div className="qaqc-row">
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
      <Status state={state} />
    </div>
  );
  const setters = [
    setRoutine,
    setDups,
    setBlanks,
    setCrms,
    setTarget,
    setA,
    setB,
    setRpdLimit,
    setBlank,
    setDl,
    setMultiple,
    setCert,
    setMeasured,
    setCrmLimit,
  ];
  function clearAll() {
    setters.forEach((set) => set(Number.NaN));
  }
  function restoreDefaults() {
    [80, 8, 4, 4, 5, 1.12, 1.35, 30, 0.008, 0.005, 5, 1, 0.94, 10].forEach(
      (value, index) => setters[index](value),
    );
  }
  return (
    <section className="qaqc">
      <header>
        <p className="eyebrow">ASSAY BATCH QA/QC</p>
        <h2>
          <ClipboardCheck size={28} />
          {c.title}
        </h2>
        <p>{c.lead}</p>
      </header>
      <div
        className="tool-reset-actions"
        aria-label={
          lang === "zh" ? "质量检查器数据操作" : "Quality checker data actions"
        }
      >
        <button type="button" onClick={clearAll}>
          {c.clear}
        </button>
        <button type="button" onClick={restoreDefaults}>
          {c.defaults}
        </button>
      </div>
      <div className="qaqc-layout">
        <div className="qaqc-inputs">
          <fieldset>
            <legend>{c.batch}</legend>
            {input(c.routine, routine, setRoutine)}
            {input(c.dup, dups, setDups)}
            {input(c.blank, blanks, setBlanks)}
            {input(c.crm, crms, setCrms)}
            {input(c.target, target, setTarget, "0.1")}
          </fieldset>
          <fieldset>
            <legend>{c.result}</legend>
            {input(c.a, a, setA, "0.001")}
            {input(c.b, b, setB, "0.001")}
            {input(c.rpd, rpdLimit, setRpdLimit, "0.1")}
            {input(c.blankResult, blank, setBlank, "0.001")}
            {input(c.dl, dl, setDl, "0.001")}
            {input(c.multiple, multiple, setMultiple, "0.1")}
            {input(c.cert, cert, setCert, "0.001")}
            {input(c.measured, measured, setMeasured, "0.001")}
            {input(c.crmLimit, crmLimit, setCrmLimit, "0.1")}
          </fieldset>
        </div>
        <div className="qaqc-results" aria-live="polite">
          <h3>
            <FlaskConical size={20} />
            {c.summary}
          </h3>
          <div className="qaqc-total">
            <span>{lang === "zh" ? "批次总数" : "Total batch items"}</span>
            <strong>{r.total}</strong>
          </div>
          <Row
            label={lang === "zh" ? "重复样插入率" : "Duplicate insertion"}
            value={`${r.pct(dups).toFixed(1)}%`}
            state={r.ratio(dups)}
          />
          <Row
            label={lang === "zh" ? "空白样插入率" : "Blank insertion"}
            value={`${r.pct(blanks).toFixed(1)}%`}
            state={r.ratio(blanks)}
          />
          <Row
            label={lang === "zh" ? "CRM 插入率" : "CRM insertion"}
            value={`${r.pct(crms).toFixed(1)}%`}
            state={r.ratio(crms)}
          />
          <Row
            label={lang === "zh" ? "重复样 RPD" : "Duplicate RPD"}
            value={r.rpd === null ? "—" : `${r.rpd.toFixed(1)}%`}
            state={r.dupState}
          />
          <Row
            label={
              lang === "zh" ? "空白污染筛查" : "Blank contamination screen"
            }
            value={
              Number.isFinite(blank) &&
              Number.isFinite(dl) &&
              Number.isFinite(multiple)
                ? `${blank.toFixed(3)} / ≤ ${(dl * multiple).toFixed(3)}`
                : "—"
            }
            state={r.blankState}
          />
          <Row
            label={lang === "zh" ? "CRM 回收率" : "CRM recovery"}
            value={r.recovery === null ? "—" : `${r.recovery.toFixed(1)}%`}
            state={r.crmState}
          />
          <div className="qaqc-formulas">
            <code>RPD = |A − B| ÷ ((A + B) / 2) × 100%</code>
            <code>
              {lang === "zh"
                ? "CRM 回收率 = 实测值 ÷ 证书值 × 100%"
                : "CRM recovery = measured ÷ certified × 100%"}
            </code>
          </div>
          <div className="qaqc-note">
            <AlertTriangle size={19} />
            <p>{c.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
