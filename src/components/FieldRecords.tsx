"use client";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./field-records.css";
type Sample = {
  id: string;
  project: string;
  sample: string;
  sampleType: string;
  qcType: string;
  parentSample: string;
  date: string;
  environment: string;
  material: string;
  lat: string;
  lng: string;
  accuracy: string;
  depthFrom: string;
  depthTo: string;
  volumeL: string;
  volumeState: string;
  wetMass: string;
  moisture: string;
  topSize: string;
  blackSand: string;
  visibleGold: string;
  recoveredMg: string;
  recovery: string;
  lab: string;
  method: string;
  detectionLimit: string;
  result: string;
  resultUnit: string;
  collectedBy: string;
  handedTo: string;
  handoverAt: string;
  seal: string;
  notes: string;
};
const blank: Sample = {
  id: "",
  project: "",
  sample: "",
  sampleType: "Volume",
  qcType: "Routine",
  parentSample: "",
  date: "",
  environment: "Stream",
  material: "Sand and gravel",
  lat: "",
  lng: "",
  accuracy: "",
  depthFrom: "",
  depthTo: "",
  volumeL: "",
  volumeState: "Bank",
  wetMass: "",
  moisture: "",
  topSize: "",
  blackSand: "",
  visibleGold: "",
  recoveredMg: "",
  recovery: "",
  lab: "",
  method: "Fire assay",
  detectionLimit: "",
  result: "",
  resultUnit: "g/m³",
  collectedBy: "",
  handedTo: "",
  handoverAt: "",
  seal: "",
  notes: "",
};
const zh = {
    draft:
      "已从现场判断报告带入草稿，请检查并补充项目名称、GPS 和交接链后再保存。",
    eyebrow: "DEVICE-LOCAL SAMPLE REGISTER",
    title: "完整取样记录",
    lead: "记录保存在当前浏览器。默认导出会隐藏精确坐标；请定期备份 JSON，并根据所在地隐私和矿业规定保管数据。",
    new: "新建样品",
    identity: "项目与样品",
    field: "位置、土质与取样支持",
    gold: "现场回收与实验室结果",
    custody: "交接链",
    save: "保存样品",
    records: "样品记录",
    empty: "尚未保存样品。",
    exportJson: "备份 JSON",
    exportCsv: "导出 CSV",
    import: "导入 JSON",
    coords: "导出精确坐标",
    print: "打印样品标签",
    delete: "删除",
    clear: "清空全部",
    confirm: "确定删除所有本机取样记录？",
    invalid: "备份文件格式无效，未导入。",
    imported: "条记录已导入。",
    local: "仅本机保存",
    labels: {
      project: "项目名称",
      sample: "样品编号",
      sampleType: "取样类型",
      qcType: "QA/QC 类型",
      parentSample: "关联原样编号",
      date: "日期",
      environment: "环境",
      material: "实际土质/材料",
      lat: "纬度",
      lng: "经度",
      accuracy: "定位精度（m）",
      depthFrom: "起始深度（m）",
      depthTo: "结束深度（m）",
      volumeL: "样品体积（L）",
      volumeState: "体积状态",
      wetMass: "湿重（kg）",
      moisture: "重量含水率（%）",
      topSize: "最大粒径（mm）",
      blackSand: "黑砂比例/描述",
      visibleGold: "可见金数量",
      recoveredMg: "回收金重（mg）",
      recovery: "估计回收率（%）",
      lab: "实验室",
      method: "分析方法",
      detectionLimit: "检出限",
      result: "实验室结果",
      resultUnit: "结果单位",
      collectedBy: "采样人",
      handedTo: "接收人/实验室",
      handoverAt: "交接日期时间",
      seal: "封条/运单号",
      notes: "地层、污染控制与风险备注",
    },
  },
  en = {
    draft:
      "A draft was imported from Field Assessment. Review it and add project name, GPS and custody before saving.",
    eyebrow: "DEVICE-LOCAL SAMPLE REGISTER",
    title: "Complete sampling records",
    lead: "Records remain in this browser. Exact coordinates are excluded from exports by default. Back up JSON regularly and protect data under applicable privacy and mining requirements.",
    new: "New sample",
    identity: "Project and sample identity",
    field: "Location, material, and sample support",
    gold: "Field recovery and laboratory result",
    custody: "Chain of custody",
    save: "Save sample",
    records: "Sample register",
    empty: "No samples saved yet.",
    exportJson: "Back up JSON",
    exportCsv: "Export CSV",
    import: "Import JSON",
    coords: "Include exact coordinates",
    print: "Print sample labels",
    delete: "Delete",
    clear: "Delete all",
    confirm: "Delete all sampling records stored in this browser?",
    invalid: "Invalid backup file. Nothing was imported.",
    imported: "records imported.",
    local: "Stored on this device only",
    labels: {
      project: "Project name",
      sample: "Sample ID",
      sampleType: "Sample type",
      qcType: "QA/QC type",
      parentSample: "Linked parent sample",
      date: "Date",
      environment: "Environment",
      material: "Actual soil/material",
      lat: "Latitude",
      lng: "Longitude",
      accuracy: "Position accuracy (m)",
      depthFrom: "Depth from (m)",
      depthTo: "Depth to (m)",
      volumeL: "Sample volume (L)",
      volumeState: "Volume condition",
      wetMass: "Wet mass (kg)",
      moisture: "Gravimetric moisture (%)",
      topSize: "Top particle size (mm)",
      blackSand: "Black-sand proportion/description",
      visibleGold: "Visible-gold count",
      recoveredMg: "Recovered gold (mg)",
      recovery: "Estimated recovery (%)",
      lab: "Laboratory",
      method: "Analytical method",
      detectionLimit: "Detection limit",
      result: "Laboratory result",
      resultUnit: "Result unit",
      collectedBy: "Collected by",
      handedTo: "Received by / laboratory",
      handoverAt: "Handover date and time",
      seal: "Seal / consignment number",
      notes: "Stratigraphy, contamination controls, and hazards",
    },
  },
  my = {
    draft:
      "Field Assessment မှ draft ထည့်ထားသည်။ Project name၊ GPS နှင့် chain of custody ကို စစ်ဆေးဖြည့်စွက်ပြီးမှ သိမ်းပါ။",
    eyebrow: "DEVICE-LOCAL SAMPLE REGISTER",
    title: "ပြည့်စုံသော နမူနာမှတ်တမ်း",
    lead: "မှတ်တမ်းများကို ဤ browser နှင့် စက်ပေါ်တွင်သာ သိမ်းထားသည်။ Export တွင် exact coordinate ကို မူလအခြေအနေဖြင့် ဖယ်ထားသည်။ JSON backup ကို ပုံမှန်သိမ်းပြီး privacy နှင့် mining requirement များအတိုင်း ကာကွယ်ပါ။",
    new: "နမူနာအသစ်",
    identity: "Project နှင့် နမူနာအမှတ်အသား",
    field: "တည်နေရာ၊ ပစ္စည်းနှင့် နမူနာအတိုင်းအတာ",
    gold: "ကွင်းဆင်း recovery နှင့် ဓာတ်ခွဲရလဒ်",
    custody: "Chain of custody / လွှဲပြောင်းမှတ်တမ်း",
    save: "နမူနာကို သိမ်းရန်",
    records: "နမူနာစာရင်း",
    empty: "နမူနာမှတ်တမ်း မရှိသေးပါ။",
    exportJson: "JSON backup ထုတ်ရန်",
    exportCsv: "CSV ထုတ်ရန်",
    import: "JSON ပြန်သွင်းရန်",
    coords: "Exact coordinate ထည့်ရန်",
    print: "နမူနာ label ပုံနှိပ်ရန်",
    delete: "ဖျက်ရန်",
    clear: "အားလုံးဖျက်ရန်",
    confirm: "ဤစက်တွင်သိမ်းထားသော နမူနာမှတ်တမ်းအားလုံးကို ဖျက်မည်လား။",
    invalid: "Backup file format မမှန်ပါ။ မည်သည့်မှတ်တမ်းမျှ မသွင်းရသေးပါ။",
    imported: "မှတ်တမ်း ထည့်သွင်းပြီး။",
    local: "ဤစက်တွင်သာ သိမ်းထားသည်",
    labels: {
      project: "Project အမည်",
      sample: "Sample ID",
      sampleType: "နမူနာအမျိုးအစား",
      qcType: "QA/QC အမျိုးအစား",
      parentSample: "ဆက်စပ်မူလနမူနာ",
      date: "ရက်စွဲ",
      environment: "ပတ်ဝန်းကျင်အမျိုးအစား",
      material: "အမှန်တကယ် မြေ/ပစ္စည်း",
      lat: "Latitude",
      lng: "Longitude",
      accuracy: "တည်နေရာတိကျမှု (m)",
      depthFrom: "စတင်အနက် (m)",
      depthTo: "အဆုံးအနက် (m)",
      volumeL: "နမူနာထုထည် (L)",
      volumeState: "ထုထည်အခြေအနေ",
      wetMass: "စိုစွတ်အလေးချိန် (kg)",
      moisture: "Gravimetric moisture (%)",
      topSize: "အကြီးဆုံးအမှုန်အရွယ် (mm)",
      blackSand: "အနက်ရောင်သဲ အချိုး/ဖော်ပြချက်",
      visibleGold: "မြင်ရသောရွှေအမှုန်အရေအတွက်",
      recoveredMg: "ပြန်ရသောရွှေ (mg)",
      recovery: "ခန့်မှန်း recovery (%)",
      lab: "ဓာတ်ခွဲခန်း",
      method: "Analytical method",
      detectionLimit: "Detection limit",
      result: "ဓာတ်ခွဲရလဒ်",
      resultUnit: "ရလဒ် unit",
      collectedBy: "နမူနာယူသူ",
      handedTo: "လက်ခံသူ / ဓာတ်ခွဲခန်း",
      handoverAt: "လွှဲပြောင်းရက်စွဲနှင့်အချိန်",
      seal: "Seal / consignment number",
      notes: "Stratigraphy၊ contamination control နှင့် အန္တရာယ်မှတ်ချက်",
    },
  };
const fieldGroups: {
  title: "identity" | "field" | "gold" | "custody";
  keys: (keyof Sample)[];
}[] = [
  {
    title: "identity",
    keys: ["project", "sample", "sampleType", "qcType", "parentSample", "date"],
  },
  {
    title: "field",
    keys: [
      "environment",
      "material",
      "lat",
      "lng",
      "accuracy",
      "depthFrom",
      "depthTo",
      "volumeL",
      "volumeState",
      "wetMass",
      "moisture",
      "topSize",
      "blackSand",
    ],
  },
  {
    title: "gold",
    keys: [
      "visibleGold",
      "recoveredMg",
      "recovery",
      "lab",
      "method",
      "detectionLimit",
      "result",
      "resultUnit",
    ],
  },
  {
    title: "custody",
    keys: ["collectedBy", "handedTo", "handoverAt", "seal", "notes"],
  },
];
const selects: Partial<Record<keyof Sample, string[]>> = {
  sampleType: [
    "Volume",
    "Channel",
    "Grab",
    "Heavy-mineral concentrate",
    "Rock chip",
  ],
  qcType: [
    "Routine",
    "Field duplicate",
    "Blank",
    "Certified reference material",
  ],
  environment: ["Stream", "Terrace", "Alluvial fan", "Hillslope", "Outcrop"],
  material: [
    "Fine sand / silt",
    "Sand and gravel",
    "Cobble-rich gravel",
    "Clay false bottom",
    "Bedrock trap",
    "Black-sand concentrate",
    "Residual soil",
    "Weathered rock",
  ],
  volumeState: ["Bank", "Loose"],
  method: [
    "Fire assay",
    "Screen fire assay",
    "Gravity / free-gold test",
    "ICP-MS",
    "ICP-OES",
    "Portable XRF screening",
    "Other",
  ],
  resultUnit: ["g/m³", "g/t", "mg/kg", "ppb"],
};
export default function FieldRecords({
  lang = "zh",
}: {
  lang?: "zh" | "en" | "my";
}) {
  const c = lang === "zh" ? zh : lang === "my" ? my : en;
  const [form, setForm] = useState<Sample>(blank);
  const [records, setRecords] = useState<Sample[]>([]);
  const [includeCoords, setIncludeCoords] = useState(false);
  const [draftLoaded, setDraftLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const current = JSON.parse(
        localStorage.getItem("goldfinder-samples-v2") || "[]",
      );
      if (Array.isArray(current)) setRecords(current);
      const raw = localStorage.getItem("goldfinder-assessment-draft");
      if (raw) {
        const draft = JSON.parse(raw);
        if (draft && typeof draft === "object") {
          setForm({ ...blank, ...draft, id: "" });
          setDraftLoaded(true);
        }
        localStorage.removeItem("goldfinder-assessment-draft");
      }
    } catch {}
  }, []);
  function persist(next: Sample[]) {
    setRecords(next);
    localStorage.setItem("goldfinder-samples-v2", JSON.stringify(next));
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    persist([{ ...form, id: crypto.randomUUID() }, ...records]);
    setForm(blank);
  }
  const headers = useMemo(
    () =>
      (Object.keys(blank) as (keyof Sample)[]).filter(
        (k) =>
          k !== "id" &&
          (includeCoords || !["lat", "lng", "accuracy"].includes(k)),
      ),
    [includeCoords],
  );
  function safeRows() {
    return records.map((r) =>
      Object.fromEntries(headers.map((k) => [k, r[k]])),
    );
  }
  function download(name: string, type: string, data: string) {
    const url = URL.createObjectURL(new Blob([data], { type }));
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  }
  function json() {
    download(
      "goldfinder-samples.json",
      "application/json",
      JSON.stringify(
        {
          schema: "goldfinder.samples",
          version: 2,
          exportedAt: new Date().toISOString(),
          coordinatesIncluded: includeCoords,
          records: safeRows(),
        },
        null,
        2,
      ),
    );
  }
  function csv() {
    const esc = (x: string) => `"${String(x).replaceAll('"', '""')}"`;
    download(
      "goldfinder-samples.csv",
      "text/csv;charset=utf-8",
      "\uFEFF" +
        headers.map(esc).join(",") +
        "\r\n" +
        safeRows()
          .map((r) => headers.map((k) => esc(String(r[k] || ""))).join(","))
          .join("\r\n"),
    );
  }
  async function load(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (d.schema !== "goldfinder.samples" || !Array.isArray(d.records))
        throw new Error();
      const imported = d.records.map((x: Partial<Sample>) => ({
        ...blank,
        ...x,
        id: crypto.randomUUID(),
      }));
      persist([...imported, ...records]);
      alert(`${imported.length} ${c.imported}`);
    } catch {
      alert(c.invalid);
    } finally {
      e.target.value = "";
    }
  }
  function remove(id: string) {
    persist(records.filter((r) => r.id !== id));
  }
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p className="lead">{c.lead}</p>
      </div>
      <div className="section records-layout">
        <form className="sample-form" onSubmit={submit}>
          <h2>{c.new}</h2>
          {draftLoaded && <div className="notice draft-notice">{c.draft}</div>}
          {fieldGroups.map((g) => (
            <fieldset key={g.title}>
              <legend>{c[g.title]}</legend>
              <div className="form-grid">
                {g.keys.map((k) => (
                  <label className={k === "notes" ? "wide" : ""} key={k}>
                    {c.labels[k as keyof typeof c.labels]}
                    {selects[k] ? (
                      <select
                        value={form[k]}
                        onChange={(e) =>
                          setForm({ ...form, [k]: e.target.value })
                        }
                      >
                        {selects[k]!.map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    ) : k === "notes" ? (
                      <textarea
                        value={form[k]}
                        onChange={(e) =>
                          setForm({ ...form, [k]: e.target.value })
                        }
                      />
                    ) : (
                      <input
                        type={
                          k === "date"
                            ? "date"
                            : k === "handoverAt"
                              ? "datetime-local"
                              : "text"
                        }
                        required={k === "project" || k === "sample"}
                        value={form[k]}
                        onChange={(e) =>
                          setForm({ ...form, [k]: e.target.value })
                        }
                      />
                    )}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <button className="button">{c.save}</button>
          <small>{c.local}</small>
        </form>
        <section className="register">
          <div className="register-head">
            <div>
              <p className="eyebrow">SAMPLE DATABASE</p>
              <h2>
                {c.records} · {records.length}
              </h2>
            </div>
            <div className="record-actions">
              <label className="coord-toggle">
                <input
                  type="checkbox"
                  checked={includeCoords}
                  onChange={(e) => setIncludeCoords(e.target.checked)}
                />
                {c.coords}
              </label>
              <button onClick={json}>{c.exportJson}</button>
              <button onClick={csv}>{c.exportCsv}</button>
              <button onClick={() => fileRef.current?.click()}>
                {c.import}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json"
                onChange={load}
                hidden
              />
              <button onClick={() => window.print()}>{c.print}</button>
            </div>
          </div>
          {records.length === 0 && (
            <div className="card">
              <p>{c.empty}</p>
            </div>
          )}
          <div className="record-list">
            {records.map((r) => (
              <article className="sample-card" key={r.id}>
                <div className="sample-label">
                  <div>
                    <b>{r.sample}</b>
                    <span>{r.project}</span>
                  </div>
                  <strong>{r.qcType}</strong>
                  <p>
                    {r.sampleType} · {r.material}
                  </p>
                  <p>
                    {r.date} · {r.depthFrom || "—"}–{r.depthTo || "—"} m ·{" "}
                    {r.volumeL || "—"} L {r.volumeState}
                  </p>
                  <p>{r.result ? `${r.result} ${r.resultUnit}` : c.local}</p>
                </div>
                <div className="sample-detail">
                  <p>
                    {r.environment} · {r.blackSand || "—"}
                  </p>
                  <p>
                    {r.lab || "—"} · {r.method} · DL {r.detectionLimit || "—"}
                  </p>
                  <p>
                    {r.collectedBy || "—"} → {r.handedTo || "—"} ·{" "}
                    {r.seal || "—"}
                  </p>
                  <p>{r.notes}</p>
                  <button onClick={() => remove(r.id)}>{c.delete}</button>
                </div>
              </article>
            ))}
          </div>
          {records.length > 0 && (
            <button
              className="danger"
              onClick={() => {
                if (confirm(c.confirm)) persist([]);
              }}
            >
              {c.clear}
            </button>
          )}
        </section>
      </div>
    </>
  );
}
