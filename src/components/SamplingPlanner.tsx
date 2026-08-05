"use client";
import { useMemo, useState } from "react";
import "./sampling-planner.css";
const text = {
  zh: {
    eyebrow: "SAMPLING DESIGN TOOL",
    title: "取样规划与工作量",
    lead: "把目标范围转换为规则样线、分层样和 QA/QC 数量。间距和样品体积必须由地质变化、粒径和先导试验决定。",
    objective: "工作目标",
    material: "主要土质/材料",
    length: "沿矿化或河段长度（m）",
    spacing: "样线/栅栏间距（m）",
    points: "每条样线主样点数",
    layers: "每点垂向分层数",
    volume: "每个主样体积（L）",
    dup: "现场重复样（%）",
    blank: "空白样（%）",
    crm: "标准样 CRM（%）",
    result: "计划工作量",
    fences: "样线数量",
    primary: "主样数量",
    duplicates: "重复样",
    blanks: "空白样",
    standards: "标准样",
    bags: "总样袋/记录",
    total: "主样总处理体积",
    save: "保存计划到本机",
    export: "导出计划 JSON",
    clear: "清空全部",
    defaults: "恢复示例值",
    warning:
      "这些数字是布置与工作量计算，不是统计充分性证明。应先做定向样和累计体积试验，再由合资格人员根据品位方差、粗金粒径、地质连续性和目标精度调整。",
  },
  en: {
    eyebrow: "SAMPLING DESIGN TOOL",
    title: "Sampling layout and workload",
    lead: "Convert a target area into systematic fences, vertical intervals, and QA/QC counts. Spacing and sample support must follow geological variability, particle size, and pilot work.",
    objective: "Study objective",
    material: "Principal soil/material",
    length: "Length along target or stream reach (m)",
    spacing: "Fence / traverse spacing (m)",
    points: "Primary points per fence",
    layers: "Vertical intervals per point",
    volume: "Volume per primary sample (L)",
    dup: "Field duplicates (%)",
    blank: "Blanks (%)",
    crm: "Certified reference materials (%)",
    result: "Planned workload",
    fences: "Number of fences",
    primary: "Primary samples",
    duplicates: "Field duplicates",
    blanks: "Blanks",
    standards: "Reference materials",
    bags: "Total bags / records",
    total: "Total primary volume",
    save: "Save plan on this device",
    export: "Export plan JSON",
    clear: "Clear all",
    defaults: "Restore examples",
    warning:
      "These are layout and workload calculations, not proof of statistical sufficiency. Use orientation and progressive-volume tests, then have a qualified person adjust the design for grade variance, coarse-gold size, geological continuity, and target precision.",
  },
  my: {
    eyebrow: "SAMPLING DESIGN TOOL · မြန်မာဘာသာ",
    title: "နမူနာစီမံကိန်းနှင့် လုပ်ငန်းပမာဏ",
    lead: "Target ဧရိယာကို systematic fence၊ vertical interval နှင့် QA/QC အရေအတွက်အဖြစ် ပြောင်းတွက်ပါ။ Spacing နှင့် sample support ကို ဘူမိဗေဒပြောင်းလဲမှု၊ particle size နှင့် pilot test ဖြင့် သတ်မှတ်ရမည်။",
    objective: "လေ့လာမှုရည်ရွယ်ချက်",
    material: "အဓိက မြေ/ပစ္စည်း",
    length: "Target သို့မဟုတ် မြစ်ပိုင်းအရှည် (m)",
    spacing: "Fence / traverse အကွာအဝေး (m)",
    points: "Fence တစ်ခုလျှင် primary point",
    layers: "Point တစ်ခုလျှင် vertical interval",
    volume: "Primary sample တစ်ခု၏ volume (L)",
    dup: "ကွင်းဆင်း duplicate (%)",
    blank: "Blank sample (%)",
    crm: "Certified reference material (%)",
    result: "စီစဉ်ထားသော လုပ်ငန်းပမာဏ",
    fences: "Fence အရေအတွက်",
    primary: "Primary sample",
    duplicates: "ကွင်းဆင်း duplicate",
    blanks: "Blank sample",
    standards: "Reference material",
    bags: "Sample bag / record စုစုပေါင်း",
    total: "Primary volume စုစုပေါင်း",
    save: "ဤစက်တွင် plan သိမ်းရန်",
    export: "Plan JSON ထုတ်ရန်",
    clear: "အားလုံးရှင်းရန်",
    defaults: "ဥပမာတန်ဖိုး ပြန်ထားရန်",
    warning:
      "ဤကိန်းဂဏန်းများသည် layout နှင့် workload တွက်ချက်ခြင်းသာဖြစ်ပြီး statistical sufficiency သက်သေမဟုတ်ပါ။ Orientation sample နှင့် progressive-volume test အရင်လုပ်ပြီး grade variance၊ coarse-gold size၊ geological continuity နှင့် target precision အပေါ် မူတည်၍ အရည်အချင်းရှိသူက design ကို ပြင်ဆင်ရမည်။",
  },
};
const guidance: Record<string, { zh: string; en: string; my: string }> = {
  "Fine sand / silt": {
    zh: "在同一沉积单元内做等体积组合样，避免只取表面黑砂条带。",
    en: "Use equal-support composites within one depositional unit; do not sample only visible black-sand streaks.",
    my: "Depositional unit တစ်ခုအတွင်း တူညီသော support composite သုံးပြီး မြင်ရသော black-sand streak ကိုသာ မယူပါနှင့်။",
  },
  "Sand and gravel": {
    zh: "记录最大粒径和筛上物，区分原位与挖松体积。",
    en: "Record top size and oversize; distinguish bank from loose volume.",
    my: "Maximum particle size နှင့် oversize ကို မှတ်ပြီး bank volume နှင့် loose volume ကို ခွဲပါ။",
  },
  "Cobble-rich gravel": {
    zh: "小淘金盘通常不具代表性，应以试坑/沟槽覆盖完整粒级。",
    en: "Small pans are rarely representative; use pits or trenches that include the full size distribution.",
    my: "Pan သေးသည် ကိုယ်စားပြုမှုနည်းတတ်သည်။ Particle-size distribution အပြည့်ပါသော pit သို့မဟုတ် trench သုံးပါ။",
  },
  "Clay false bottom": {
    zh: "接触面上方、黏土表面和裂缝材料分层编号，不要混成一个样。",
    en: "Number the overlying interval, clay surface, and crack material separately.",
    my: "အပေါ် interval၊ clay surface နှင့် crack material ကို sample ID သီးခြားပေးပါ။",
  },
  "Residual soil": {
    zh: "按坡位和土层布网，使用质量品位时保留实测干容重。",
    en: "Stratify the grid by slope position and soil horizon; retain measured dry bulk density.",
    my: "Slope position နှင့် soil horizon အလိုက် grid ကို ခွဲပြီး တိုင်းထားသော dry bulk density ကို သိမ်းပါ။",
  },
};
export default function SamplingPlanner({
  lang = "zh",
}: {
  lang?: "zh" | "en" | "my";
}) {
  const c = text[lang];
  const [objective, setObjective] = useState("Reconnaissance");
  const [material, setMaterial] = useState("Sand and gravel");
  const [length, setLength] = useState(200);
  const [spacing, setSpacing] = useState(25);
  const [points, setPoints] = useState(5);
  const [layers, setLayers] = useState(2);
  const [volume, setVolume] = useState(50);
  const [dup, setDup] = useState(10);
  const [blank, setBlank] = useState(5);
  const [crm, setCrm] = useState(5);
  const r = useMemo(() => {
    const safe = (value: number, fallback = 0) =>
      Number.isFinite(value) ? value : fallback;
    const fences = Math.max(
      1,
      Math.floor(safe(length) / Math.max(1, safe(spacing, 1))) + 1,
    );
    const primary =
      fences * Math.max(1, safe(points, 1)) * Math.max(1, safe(layers, 1));
    const duplicates = Math.ceil((primary * Math.max(0, safe(dup))) / 100);
    const blanks = Math.ceil((primary * Math.max(0, safe(blank))) / 100);
    const standards = Math.ceil((primary * Math.max(0, safe(crm))) / 100);
    return {
      fences,
      primary,
      duplicates,
      blanks,
      standards,
      bags: primary + duplicates + blanks + standards,
      total: (primary * Math.max(0, safe(volume))) / 1000,
    };
  }, [length, spacing, points, layers, volume, dup, blank, crm]);
  const plan = {
    objective,
    material,
    length,
    spacing,
    points,
    layers,
    volume,
    dup,
    blank,
    crm,
    ...r,
  };
  function save() {
    localStorage.setItem(
      "goldfinder-sampling-plan",
      JSON.stringify({ ...plan, savedAt: new Date().toISOString() }),
    );
    alert(
      lang === "zh"
        ? "计划已保存在本机。"
        : lang === "my"
          ? "Plan ကို ဤစက်တွင် သိမ်းပြီးပါပြီ။"
          : "Plan saved on this device.",
    );
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob(
        [
          JSON.stringify(
            { ...plan, createdAt: new Date().toISOString() },
            null,
            2,
          ),
        ],
        { type: "application/json" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "goldfinder-sampling-plan.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  const num = (label: string, val: number, set: (v: number) => void) => (
    <label>
      {label}
      <input
        type="number"
        min="0"
        value={Number.isFinite(val) ? val : ""}
        onChange={(e) =>
          set(e.target.value === "" ? Number.NaN : Number(e.target.value))
        }
      />
    </label>
  );
  const setters = [
    setLength,
    setSpacing,
    setPoints,
    setLayers,
    setVolume,
    setDup,
    setBlank,
    setCrm,
  ];
  function clearAll() {
    setters.forEach((set) => set(Number.NaN));
  }
  function restoreDefaults() {
    setObjective("Reconnaissance");
    setMaterial("Sand and gravel");
    [200, 25, 5, 2, 50, 10, 5, 5].forEach((value, index) =>
      setters[index](value),
    );
  }
  return (
    <section className="planner">
      <div className="planner-head">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.title}</h2>
        <p>{c.lead}</p>
      </div>
      <div
        className="tool-reset-actions"
        aria-label={
          lang === "zh"
            ? "取样规划器数据操作"
            : lang === "my"
              ? "နမူနာစီမံကိန်း ဒေတာလုပ်ဆောင်ချက်"
              : "Sampling planner data actions"
        }
      >
        <button type="button" onClick={clearAll}>
          {c.clear}
        </button>
        <button type="button" onClick={restoreDefaults}>
          {c.defaults}
        </button>
      </div>
      <div className="planner-grid">
        <div className="planner-inputs">
          <label>
            {c.objective}
            <select
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
            >
              <option>Reconnaissance</option>
              <option>Delineation</option>
              <option>Grade control</option>
            </select>
          </label>
          <label>
            {c.material}
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              {Object.keys(guidance).map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          {num(c.length, length, setLength)}
          {num(c.spacing, spacing, setSpacing)}
          {num(c.points, points, setPoints)}
          {num(c.layers, layers, setLayers)}
          {num(c.volume, volume, setVolume)}
          {num(c.dup, dup, setDup)}
          {num(c.blank, blank, setBlank)}
          {num(c.crm, crm, setCrm)}
        </div>
        <div className="planner-results">
          <h3>{c.result}</h3>
          {(
            [
              [c.fences, r.fences],
              [c.primary, r.primary],
              [c.duplicates, r.duplicates],
              [c.blanks, r.blanks],
              [c.standards, r.standards],
              [c.bags, r.bags],
              [c.total, `${r.total.toFixed(2)} m³`],
            ] as [string, string | number][]
          ).map(([a, b]) => (
            <div className="plan-result" key={a}>
              <span>{a}</span>
              <strong>{b}</strong>
            </div>
          ))}
          <div className="material-note">
            <b>{material}</b>
            <p>{guidance[material][lang]}</p>
          </div>
          <div className="actions">
            <button className="button" onClick={save}>
              {c.save}
            </button>
            <button className="button secondary" onClick={download}>
              {c.export}
            </button>
          </div>
          <div className="notice">{c.warning}</div>
        </div>
      </div>
    </section>
  );
}
