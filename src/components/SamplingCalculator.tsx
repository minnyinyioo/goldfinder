"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, FlaskConical, Mountain, Waves } from "lucide-react";
import { calculatePlacerGrade, ppmToGramsPerTonne, screeningBand } from "@/lib/sampling-math";
import "./sampling-calculator.css";
import "./grade-tools.css";
const copy = {
  zh: {
    placer: "砂金 g/m³",
    lode: "山金 ppm ↔ g/t",
    title: "砂金体积品位计算器",
    intro:
      "使用实测样品体积与回收金重量计算。优先直接测量原位尺寸；若只能称重，必须输入现场实测干容重。",
    volume: "样品体积（L）",
    state: "体积状态",
    bank: "原位 / bank volume",
    loose: "挖松 / loose volume",
    swell: "挖松膨胀率（%）",
    gold: "实际回收金重量（mg）",
    recovery: "估计回收率（%）",
    wet: "样品湿重（kg，可选）",
    moisture: "含水率：水重/干土重（%，可选）",
    density: "现场实测干容重（kg/m³，可选）",
    dupA: "重复样 A（g/m³，可选）",
    dupB: "重复样 B（g/m³，可选）",
    results: "计算结果",
    bankV: "折算原位体积",
    raw: "未修正回收品位",
    corrected: "回收率修正品位",
    dryMass: "估计干土质量",
    massGrade: "质量品位",
    rpd: "重复样相对百分差 RPD",
    invalid: "请输入有效的体积、回收金重量和回收率。",
    band: "内部筛查区间",
    bands: ["低", "弱异常", "较强线索", "强异常"],
    bandNote:
      "区间仅用于本站内部排序（≤0.1、≤0.3、≤1、>1 g/m³），不是国际通用品位、经济边界或采矿结论。",
    warning:
      "这是单个样品结果，不是矿床平均品位、资源量、储量或经济结论。粗金会造成极大的小样波动。",
    lodeTitle: "山金化验换算器",
    lodeIntro:
      "实验室 Au ppm 在质量基准上数值等于 g/t。先核对样品编号、单位、分析方法、检出限和 QA/QC。",
    ppm: "实验室 Au 结果（ppm）",
    equivalent: "等值质量品位",
    rule: "1 ppm Au = 1 mg/kg Au = 1 g/t Au",
    lodNote:
      "换算只改变单位，不提高数据质量。单个异常结果不能证明矿体连续性或可采性。",
    record: "写入样品档案",
    workspace: "返回样品工作台",
    clear: "清空全部",
    defaults: "恢复示例值",
  },
  en: {
    placer: "Placer g/m³",
    lode: "Lode ppm ↔ g/t",
    title: "Placer volume-grade calculator",
    intro:
      "Calculate sample grade from measured volume and recovered gold mass. Measure in-situ dimensions wherever possible; mass-derived volume requires a site-measured dry bulk density.",
    volume: "Sample volume (L)",
    state: "Volume condition",
    bank: "In situ / bank volume",
    loose: "Excavated / loose volume",
    swell: "Bulking or swell (%)",
    gold: "Gold actually recovered (mg)",
    recovery: "Estimated recovery (%)",
    wet: "Wet sample mass (kg, optional)",
    moisture: "Moisture: water mass / dry-solids mass (%, optional)",
    density: "Site-measured dry bulk density (kg/m³, optional)",
    dupA: "Duplicate A (g/m³, optional)",
    dupB: "Duplicate B (g/m³, optional)",
    results: "Calculated results",
    bankV: "Equivalent bank volume",
    raw: "Uncorrected recovered grade",
    corrected: "Recovery-corrected grade",
    dryMass: "Estimated dry sample mass",
    massGrade: "Mass grade",
    rpd: "Duplicate relative percent difference",
    invalid: "Enter valid volume, recovered gold mass, and recovery.",
    band: "Internal screening band",
    bands: ["Low", "Weak anomaly", "Stronger indication", "Strong anomaly"],
    bandNote:
      "Bands are internal prioritisation only (≤0.1, ≤0.3, ≤1, >1 g/m³), not universal cut-offs, economic thresholds, or mining conclusions.",
    warning:
      "This is one sample result—not a deposit mean, resource, reserve, or economic conclusion. Coarse gold can create extreme small-sample variability.",
    lodeTitle: "Lode assay converter",
    lodeIntro:
      "On a mass basis, an Au result in ppm is numerically equal to g/t. Check sample identity, units, method, detection limit, and QA/QC first.",
    ppm: "Laboratory Au result (ppm)",
    equivalent: "Equivalent mass grade",
    rule: "1 ppm Au = 1 mg/kg Au = 1 g/t Au",
    lodNote:
      "Unit conversion does not improve data quality. One anomaly cannot establish continuity or mineability.",
    record: "Add to sample register",
    workspace: "Back to sample workspace",
    clear: "Clear all",
    defaults: "Restore examples",
  },
  my: {
    placer: "ရွှေကျင် g/m³",
    lode: "ကျောက်ရွှေ ppm ↔ g/t",
    title: "ရွှေကျင် ထုထည်အလိုက် grade တွက်စက်",
    intro:
      "တိုင်းတာထားသော နမူနာထုထည်နှင့် အမှန်တကယ် ပြန်လည်ရရှိသော ရွှေအလေးချိန်ကို အသုံးပြုပါ။ ဖြစ်နိုင်လျှင် မတူးဖော်မီ in-situ volume ကို တိုက်ရိုက်တိုင်းတာပါ။",
    volume: "နမူနာထုထည် (L)",
    state: "ထုထည်အခြေအနေ",
    bank: "မတူးဖော်မီ / bank volume",
    loose: "တူးဖော်ပြီး / loose volume",
    swell: "တူးဖော်ပြီး ဖောင်းပွမှု (%)",
    gold: "ပြန်လည်ရရှိသော ရွှေအလေးချိန် (mg)",
    recovery: "ခန့်မှန်း recovery (%)",
    wet: "စိုစွတ်နမူနာအလေးချိန် (kg၊ မဖြစ်မနေမဟုတ်)",
    moisture: "ရေ/ခြောက်မြေ အလေးချိန်အချိုး (%၊ မဖြစ်မနေမဟုတ်)",
    density: "ကွင်းဆင်းတိုင်းတာသော dry bulk density (kg/m³၊ မဖြစ်မနေမဟုတ်)",
    dupA: "Duplicate A (g/m³၊ မဖြစ်မနေမဟုတ်)",
    dupB: "Duplicate B (g/m³၊ မဖြစ်မနေမဟုတ်)",
    results: "တွက်ချက်ရလဒ်",
    bankV: "ပြန်တွက်ထားသော bank volume",
    raw: "Recovery မပြင်ဆင်မီ grade",
    corrected: "Recovery ပြင်ဆင်ပြီး grade",
    dryMass: "ခန့်မှန်း ခြောက်မြေအလေးချိန်",
    massGrade: "အလေးချိန်အလိုက် grade",
    rpd: "Duplicate relative percent difference (RPD)",
    invalid: "မှန်ကန်သော ထုထည်၊ ရွှေအလေးချိန်နှင့် recovery ကို ထည့်ပါ။",
    band: "အတွင်းပိုင်း စိစစ်အဆင့်",
    bands: [
      "နိမ့်",
      "အားနည်းသော anomaly",
      "ပိုမိုကောင်းသော လက္ခဏာ",
      "ပြင်းထန်သော anomaly",
    ],
    bandNote:
      "ဤအဆင့်များ (≤0.1၊ ≤0.3၊ ≤1၊ >1 g/m³) သည် နမူနာဦးစားပေးစီစဉ်ရန်သာ ဖြစ်သည်။ အပြည်ပြည်ဆိုင်ရာ cut-off၊ စီးပွားရေးအဆင့် သို့မဟုတ် သတ္တုတူးဖော်ရေးဆုံးဖြတ်ချက် မဟုတ်ပါ။",
    warning:
      "ဤရလဒ်သည် နမူနာတစ်ခု၏ ရလဒ်သာ ဖြစ်ပြီး သိုက်ပျမ်းမျှ grade၊ resource၊ reserve သို့မဟုတ် စီးပွားရေးအဖြေ မဟုတ်ပါ။ ရွှေကြမ်းအမှုန်ကြောင့် နမူနာငယ်တွင် အလွန်ကွာခြားနိုင်သည်။",
    lodeTitle: "ကျောက်ရွှေ assay unit ပြောင်းစက်",
    lodeIntro:
      "အလေးချိန်အခြေခံ Au assay တွင် ppm တန်ဖိုးသည် g/t နှင့် ဂဏန်းတူသည်။ Sample ID၊ unit၊ method၊ detection limit နှင့် QA/QC ကို ဦးစွာစစ်ဆေးပါ။",
    ppm: "ဓာတ်ခွဲခန်း Au ရလဒ် (ppm)",
    equivalent: "တူညီသော အလေးချိန် grade",
    rule: "1 ppm Au = 1 mg/kg Au = 1 g/t Au",
    lodNote:
      "Unit ပြောင်းခြင်းက data quality ကို မတိုးစေပါ။ Anomaly တစ်ခုတည်းဖြင့် mineralised body ဆက်လက်တည်ရှိမှု သို့မဟုတ် တူးဖော်နိုင်မှုကို မသက်သေပြနိုင်ပါ။",
    record: "နမူနာမှတ်တမ်းသို့ ထည့်ရန်",
    workspace: "နမူနာလုပ်ငန်းခွင်သို့",
    clear: "အားလုံးရှင်းရန်",
    defaults: "နမူနာတန်ဖိုးများ ပြန်ထည့်ရန်",
  },
};
export default function SamplingCalculator({
  lang = "zh",
}: {
  lang?: "zh" | "en" | "my";
}) {
  const c = copy[lang],
    [mode, setMode] = useState<"placer" | "lode">("placer"),
    [v, setV] = useState(20),
    [condition, setCondition] = useState<"bank" | "loose">("bank"),
    [swell, setSwell] = useState(14),
    [gold, setGold] = useState(50),
    [recovery, setRecovery] = useState(90),
    [wet, setWet] = useState(40),
    [moisture, setMoisture] = useState(10),
    [density, setDensity] = useState(1800),
    [a, setA] = useState(0),
    [b, setB] = useState(0),
    [ppm, setPpm] = useState(1);
  const r = useMemo(() => {
    return calculatePlacerGrade({ volumeLitres: v, condition, swellPercent: swell, recoveredGoldMg: gold, recoveryPercent: recovery, wetMassKg: wet, moisturePercent: moisture, dryBulkDensity: density, duplicateA: a, duplicateB: b });
  }, [v, condition, swell, gold, recovery, wet, moisture, density, a, b]);
  const input = (label: string, value: number, set: (x: number) => void) => (
      <label>
        {label}
        <input
          type="number"
          min="0"
          step="any"
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) =>
            set(e.target.value === "" ? Number.NaN : Number(e.target.value))
          }
        />
      </label>
    ),
    base = lang === "zh" ? "" : "/en";
  const band = r ? c.bands[screeningBand(r.correctedGradeGm3)] : "";
  function clearAll() {
    [
      setV,
      setSwell,
      setGold,
      setRecovery,
      setWet,
      setMoisture,
      setDensity,
      setA,
      setB,
      setPpm,
    ].forEach((set) => set(Number.NaN));
  }
  function restoreDefaults() {
    setV(20);
    setCondition("bank");
    setSwell(14);
    setGold(50);
    setRecovery(90);
    setWet(40);
    setMoisture(10);
    setDensity(1800);
    setA(0);
    setB(0);
    setPpm(1);
  }
  return (
    <section className="calculator">
      <div className="grade-tabs">
        <button
          className={mode === "placer" ? "active" : ""}
          onClick={() => setMode("placer")}
        >
          <Waves size={18} />
          {c.placer}
        </button>
        <button
          className={mode === "lode" ? "active" : ""}
          onClick={() => setMode("lode")}
        >
          <Mountain size={18} />
          {c.lode}
        </button>
      </div>
      <div
        className="tool-reset-actions"
        aria-label={
          lang === "zh"
            ? "计算器数据操作"
            : lang === "my"
              ? "တွက်စက် ဒေတာလုပ်ဆောင်ချက်များ"
              : "Calculator data actions"
        }
      >
        <button type="button" onClick={clearAll}>
          {c.clear}
        </button>
        <button type="button" onClick={restoreDefaults}>
          {c.defaults}
        </button>
      </div>
      {mode === "placer" ? (
        <>
          <div className="calc-head">
            <p className="eyebrow">PLACER SAMPLING TOOL</p>
            <h2>{c.title}</h2>
            <p>{c.intro}</p>
          </div>
          <div className="calc-grid">
            <div className="calc-inputs">
              {input(c.volume, v, setV)}
              <label>
                {c.state}
                <select
                  value={condition}
                  onChange={(e) =>
                    setCondition(e.target.value as "bank" | "loose")
                  }
                >
                  <option value="bank">{c.bank}</option>
                  <option value="loose">{c.loose}</option>
                </select>
              </label>
              {condition === "loose" && input(c.swell, swell, setSwell)}
              {input(c.gold, gold, setGold)}
              {input(c.recovery, recovery, setRecovery)}
              {input(c.wet, wet, setWet)}
              {input(c.moisture, moisture, setMoisture)}
              {input(c.density, density, setDensity)}
              {input(c.dupA, a, setA)}
              {input(c.dupB, b, setB)}
            </div>
            <div className="calc-results" aria-live="polite">
              <h3>{c.results}</h3>
              {!r ? (
                <p>{c.invalid}</p>
              ) : (
                <>
                  <Result label={c.bankV} value={`${r.bankVolumeM3.toFixed(4)} m³`} />
                  <Result label={c.raw} value={`${r.rawGradeGm3.toFixed(3)} g/m³`} />
                  <Result
                    label={c.corrected}
                    value={`${r.correctedGradeGm3.toFixed(3)} g/m³`}
                  />
                  <Result label={c.band} value={band} />
                  {r.dryMassKg > 0 && (
                    <>
                      <Result
                        label={c.dryMass}
                        value={`${r.dryMassKg.toFixed(2)} kg`}
                      />
                      <Result
                        label={c.massGrade}
                        value={`${r.massGradeMgkg.toFixed(3)} mg/kg`}
                      />
                      <Result
                        label="Measured dry bulk density"
                        value={`${r.derivedDensityKgm3.toFixed(0)} kg/m³`}
                      />
                      <Result
                        label="Volume from mass ÷ entered density"
                        value={`${r.derivedVolumeM3.toFixed(4)} m³`}
                      />
                    </>
                  )}
                  {r.rpdPercent > 0 && (
                    <Result label={c.rpd} value={`${r.rpdPercent.toFixed(1)}%`} />
                  )}
                  <p className="band-note">{c.bandNote}</p>
                  <div className="calc-formula">
                    <code>
                      Grade (g/m³) = recovered gold (g) ÷ bank volume (m³) ÷
                      recovery fraction
                    </code>
                    <code>
                      Bank volume = loose volume ÷ (1 + swell fraction)
                    </code>
                    <code>RPD = |A − B| ÷ ((A + B) / 2) × 100%</code>
                  </div>
                </>
              )}
              <div className="notice">{c.warning}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="calc-head">
            <p className="eyebrow">LODE ASSAY TOOL</p>
            <h2>{c.lodeTitle}</h2>
            <p>{c.lodeIntro}</p>
          </div>
          <div className="lode-converter">
            <div>
              {input(c.ppm, ppm, setPpm)}
              <p>{c.rule}</p>
            </div>
            <div className="lode-result" aria-live="polite">
              <FlaskConical size={25} />
              <span>{c.equivalent}</span>
              <strong>
                {ppmToGramsPerTonne(ppm)?.toLocaleString() ?? "—"}{" "}
                g/t Au
              </strong>
              <small>
                {ppmToGramsPerTonne(ppm)?.toLocaleString() ?? "—"}{" "}
                mg/kg Au
              </small>
            </div>
          </div>
          <div className="notice">{c.lodNote}</div>
        </>
      )}
      <div className="grade-actions">
        <Link className="button" href={`${base}/field`}>
          {c.record}
          <ArrowRight size={17} />
        </Link>
        <Link className="button secondary" href={`${base}/project`}>
          {c.workspace}
        </Link>
      </div>
    </section>
  );
}
function Result({ label, value }: { label: string; value: string }) {
  return (
    <div className="result">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
