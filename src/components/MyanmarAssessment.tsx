"use client";
import { useMemo, useState } from "react";
import { AlertTriangle, Mountain, Waves } from "lucide-react";
import "./myanmar-assessment.css";

type Mode = "placer" | "lode";
type Choice = { label: string; value: number };
type Question = { key: string; label: string; choices: Choice[] };
const placer: Question[] = [
  {
    key: "cracks",
    label: "Bedrock အက်ကြောင်း",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "နည်း", value: 10 },
      { label: "များ", value: 20 },
    ],
  },
  {
    key: "blackSand",
    label: "အနက်ရောင်သဲ",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "နည်း", value: 6 },
      { label: "များ", value: 12 },
    ],
  },
  {
    key: "gravel",
    label: "လုံးဝန်းကျောက်စရစ်လွှာ",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 12 },
    ],
  },
  {
    key: "bend",
    label: "မြစ်ကွေ့အတွင်းဘက်",
    choices: [
      { label: "မဟုတ်", value: 0 },
      { label: "ဟုတ်", value: 10 },
    ],
  },
  {
    key: "boulder",
    label: "ကျောက်တုံးကြီးနောက်ဘက်",
    choices: [
      { label: "မဟုတ်", value: 0 },
      { label: "ဟုတ်", value: 10 },
    ],
  },
  {
    key: "quartz",
    label: "အထက်ပိုင်း Quartz vein",
    choices: [
      { label: "မသိ", value: 0 },
      { label: "ရှိ", value: 8 },
    ],
  },
  {
    key: "gold",
    label: "စံ 10 L pan တွင် မြင်ရသောရွှေ",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "1–2 အမှုန်", value: 15 },
      { label: "3+ အမှုန်", value: 28 },
    ],
  },
];
const lode: Question[] = [
  {
    key: "vein",
    label: "Quartz vein",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 15 },
    ],
  },
  {
    key: "fracture",
    label: "Fault / breccia zone",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 20 },
    ],
  },
  {
    key: "oxide",
    label: "သံချေးရောင် oxidation",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "နည်း", value: 8 },
      { label: "များ", value: 15 },
    ],
  },
  {
    key: "sulfide",
    label: "Sulphide minerals",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 15 },
    ],
  },
  {
    key: "alteration",
    label: "Altered rock",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 15 },
    ],
  },
  {
    key: "creek",
    label: "အောက်ပိုင်းချောင်းတွင် ရွှေတွေ့",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 10 },
    ],
  },
  {
    key: "workings",
    label: "ဟောင်းတူးဖော်ရာ လက္ခဏာ",
    choices: [
      { label: "မရှိ", value: 0 },
      { label: "ရှိ", value: 10 },
    ],
  },
];
const examples: Record<Mode, Record<string, number>> = {
  placer: {
    cracks: 10,
    blackSand: 6,
    gravel: 12,
    bend: 10,
    boulder: 0,
    quartz: 8,
    gold: 15,
  },
  lode: {
    vein: 15,
    fracture: 20,
    oxide: 8,
    sulfide: 0,
    alteration: 15,
    creek: 0,
    workings: 0,
  },
};

export default function MyanmarAssessment() {
  const [mode, setMode] = useState<Mode>("placer");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [volume, setVolume] = useState(20);
  const [goldMg, setGoldMg] = useState(50);
  const [ppm, setPpm] = useState(1);
  const questions = mode === "placer" ? placer : lode;
  const score = useMemo(
    () => questions.reduce((sum, q) => sum + (answers[q.key] ?? 0), 0),
    [answers, questions],
  );
  const missing = questions.filter((q) => answers[q.key] === undefined);
  const grade =
    mode === "placer" && volume > 0 && goldMg >= 0 ? goldMg / volume : null;
  const result =
    mode === "placer"
      ? score <= 30
        ? [
            "ဦးစားပေးအဆင့် နိမ့်",
            "တူညီသောထုထည်ဖြင့် control နှင့် repeat sample ယူပါ။",
          ]
        : score <= 50
          ? [
              "ထပ်မံစိစစ်သင့်",
              "အထက်၊ အောက်နှင့် ဘေးတိုက် တူညီသောထုထည်နမူနာယူပါ။",
            ]
          : score <= 70
            ? [
                "စနစ်တကျနမူနာယူသင့်",
                "ဆက်တိုက် sample line နှင့် recovery record တည်ဆောက်ပါ။",
              ]
            : [
                "ဦးစားပေးနမူနာပစ်မှတ်",
                "Sample spacing လျှော့ပြီး duplicate နှင့် laboratory assay ထည့်ပါ။",
              ]
      : score <= 30
        ? ["ပုံမှန်တောင်တန်း", "အခြေခံဘူမိဗေဒမှတ်တမ်းကို ဦးစွာဖြည့်ပါ။"]
        : score <= 50
          ? [
              "အားနည်းသော mineralisation လက္ခဏာ",
              "Structure လမ်းကြောင်းတစ်လျှောက် representative sample ယူပါ။",
            ]
          : score <= 70
            ? [
                "စနစ်တကျနမူနာယူသင့်",
                "Continuous channel sample နှင့် QA/QC ထည့်ပါ။",
              ]
            : [
                "ဦးစားပေးစိစစ်ဇုန်",
                "Geological mapping နှင့် laboratory verification ကို တိုးချဲ့ပါ။",
              ];
  function switchMode(next: Mode) {
    setMode(next);
    setAnswers({});
  }
  function clearAll() {
    setAnswers({});
    setVolume(Number.NaN);
    setGoldMg(Number.NaN);
    setPpm(Number.NaN);
  }
  function restore() {
    setAnswers(examples[mode]);
    setVolume(20);
    setGoldMg(50);
    setPpm(1);
  }
  return (
    <section
      className="my-assessment"
      aria-label="မြန်မာဘာသာ ရွှေရှာဖွေရေး မြေပြင်အမှတ်ပေးစနစ်"
    >
      <div className="my-assessment-tabs">
        <button
          type="button"
          className={mode === "placer" ? "active" : ""}
          onClick={() => switchMode("placer")}
        >
          <Waves size={18} />
          ရွှေကျင်လက္ခဏာ
        </button>
        <button
          type="button"
          className={mode === "lode" ? "active" : ""}
          onClick={() => switchMode("lode")}
        >
          <Mountain size={18} />
          မူလရွှေလက္ခဏာ
        </button>
      </div>
      <div
        className="tool-reset-actions"
        aria-label="မြေပြင်အမှတ်ပေး ဒေတာလုပ်ဆောင်ချက်များ"
      >
        <button type="button" onClick={clearAll}>
          အမှတ်ပေးချက်ရှင်းရန်
        </button>
        <button type="button" onClick={restore}>
          အမှတ်ပေးနမူနာ ပြန်ထည့်ရန်
        </button>
      </div>
      <div className="my-assessment-layout">
        <div className="my-assessment-form">
          {questions.map((q) => (
            <fieldset key={q.key}>
              <legend>{q.label}</legend>
              <div>
                {q.choices.map((choice) => (
                  <button
                    type="button"
                    key={choice.label}
                    className={
                      answers[q.key] === choice.value ? "selected" : ""
                    }
                    aria-pressed={answers[q.key] === choice.value}
                    onClick={() =>
                      setAnswers((current) => ({
                        ...current,
                        [q.key]: choice.value,
                      }))
                    }
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="my-assessment-measure">
            {mode === "placer" ? (
              <>
                <label>
                  နမူနာထုထည် (L)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={Number.isFinite(volume) ? volume : ""}
                    onChange={(e) =>
                      setVolume(
                        e.target.value === ""
                          ? Number.NaN
                          : Number(e.target.value),
                      )
                    }
                  />
                </label>
                <label>
                  ပြန်ရသောရွှေ (mg)
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={Number.isFinite(goldMg) ? goldMg : ""}
                    onChange={(e) =>
                      setGoldMg(
                        e.target.value === ""
                          ? Number.NaN
                          : Number(e.target.value),
                      )
                    }
                  />
                </label>
              </>
            ) : (
              <label>
                Laboratory Au (ppm)
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={Number.isFinite(ppm) ? ppm : ""}
                  onChange={(e) =>
                    setPpm(
                      e.target.value === ""
                        ? Number.NaN
                        : Number(e.target.value),
                    )
                  }
                />
              </label>
            )}
          </div>
        </div>
        <aside className="my-assessment-result" aria-live="polite">
          <div className="my-score">
            <strong>{score}</strong>
            <span>/ 100</span>
          </div>
          <div className="my-score-track">
            <i style={{ width: `${Math.min(score, 100)}%` }} />
          </div>
          <p>FIELD-EVIDENCE SCORE</p>
          <h3>{result[0]}</h3>
          <p>{result[1]}</p>
          <dl>
            <div>
              <dt>တိုင်းတာရလဒ်</dt>
              <dd>
                {mode === "placer"
                  ? grade === null
                    ? "—"
                    : `${grade.toFixed(3)} g/m³`
                  : Number.isFinite(ppm)
                    ? `${Math.max(0, ppm)} ppm = ${Math.max(0, ppm)} g/t Au`
                    : "—"}
              </dd>
            </div>
            <div>
              <dt>မဖြည့်ရသေးသောအချက်</dt>
              <dd>{missing.length}</dd>
            </div>
          </dl>
          <div className="my-assessment-warning">
            <AlertTriangle size={18} />
            <span>
              ဤ heuristic score သည် နမူနာပစ်မှတ်စီရန်သာ ဖြစ်သည်။
              ရွှေရှိနိုင်ခြေ၊ grade၊ resource၊ reserve သို့မဟုတ် permit
              မဟုတ်ပါ။
            </span>
          </div>
        </aside>
      </div>
    </section>
  );
}
