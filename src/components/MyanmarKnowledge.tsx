"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { BookOpen, ExternalLink, Search, ShieldAlert } from "lucide-react";
import { enAtlas } from "@/data/english";
import GeologyFieldGallery from "./GeologyFieldGallery";
import "@/app/knowledge/knowledge.css";

type Category = "geology" | "identify" | "sampling" | "quality" | "safety";
type Topic = {
  id: string;
  category: Category;
  title: string;
  summary: string;
  image: string;
  signals: string[];
  verify: string;
  warning: string;
};
const topics: Topic[] = [
  {
    id: "formation",
    category: "geology",
    title: "ရွှေဖြစ်ပေါ်ပုံနှင့် ပြန်လည်စုစည်းပုံ",
    image: "quartz-vein.jpg",
    summary:
      "Hydrothermal fluid သည် fracture နှင့် shear zone များတွင် quartz၊ sulphide နှင့် gold ကို တင်ထားနိုင်သည်။ Weathering က လွတ်ထွက်လာသောရွှေကို မြစ်ချောင်းက သယ်ဆောင်ပြီး hydraulic trap တွင် ပြန်လည်စုစည်းနိုင်သည်။",
    signals: [
      "Vein၊ fault၊ alteration နှင့် wall-rock contact ကို အတူ map လုပ်ရန်",
      "Source မှ stream sediment သို့ ဆက်စပ်မှုကို sample ဖြင့်စစ်ရန်",
      "Quartz အားလုံး သို့မဟုတ် sulphide အားလုံးတွင် ရွှေမပါ",
    ],
    verify:
      "Regional geology၊ outcrop mapping၊ cross-zone sample နှင့် laboratory assay ကို ပေါင်းစပ်ပါ။",
    warning:
      "Quartz vein သို့မဟုတ် သံချေးအရောင်တစ်ခုတည်းမှ gold deposit ကို မဆုံးဖြတ်ရပါ။",
  },
  {
    id: "placer",
    category: "geology",
    title: "ရွှေကျင်သိုက်နှင့် မြစ်ချောင်း trap",
    image: "panning.jpg",
    summary:
      "Dense gold grain သည် flow energy လျော့သည့်နေရာ၊ rough bedrock၊ crack၊ pothole၊ boulder wake၊ inside bend နှင့် false bottom အပေါ်တွင် ကျန်ရစ်နိုင်သည်။",
    signals: [
      "အထက်ရေ–target–အောက်ရေတွင် တူညီထုထည် sample ယူရန်",
      "Bedrock crack၊ clay contact နှင့် gravel layer ကို သီးခြားယူရန်",
      "Flood history နှင့် grain size ကြောင့် trap pattern ပြောင်းနိုင်",
    ],
    verify:
      "တူညီသော volume နှင့် size fraction သုံး၍ repeat နှင့် duplicate sample ဖြင့် trend စစ်ပါ။",
    warning: "Rich pan တစ်ခုသည် မြစ်ပိုင်းတစ်ခုလုံး၏ g/m³ မဟုတ်ပါ။",
  },
  {
    id: "lode",
    category: "geology",
    title: "မူလရွှေသိုက်၊ vein နှင့် alteration",
    image: "quartz-vein.jpg",
    summary:
      "Lode target ကို colour မဟုတ်ဘဲ structure၊ vein geometry၊ alteration၊ sulphide assemblage နှင့် assay continuity ဖြင့် အကဲဖြတ်ရသည်။",
    signals: [
      "Strike၊ dip၊ true width နှင့် contact ကို တိုင်းရန်",
      "Vein နှင့် wall rock နှစ်ဖက်ကို continuous channel ဖြတ်ယူရန်",
      "Oxidised surface အောက်ရှိ fresh material ကို သီးခြားမှတ်ရန်",
    ],
    verify:
      "Strike တစ်လျှောက် section ထပ်ယူပြီး blank၊ duplicate နှင့် fit-for-purpose assay သုံးပါ။",
    warning:
      "ကျောက်တစ်တုံးမှ mineralised body၊ resource သို့မဟုတ် mine ကို မကြေညာရပါ။",
  },
  {
    id: "false-gold",
    category: "identify",
    title: "သဘာဝရွှေနှင့် ရွှေအတု ခွဲခြားခြင်း",
    image: "pyrite.jpg",
    summary:
      "Gold သည် အရောင်တည်ငြိမ်၊ density မြင့်ပြီး malleable ဖြစ်သည်။ Pyrite သည် crystal face နှင့် brittle fracture များရှိနိုင်ပြီး mica သည် ပြား၍ ထောင့်အလိုက်တောက်သည်။",
    signals: [
      "Crystal habit နှင့် angle-dependent sparkle ကိုကြည့်ရန်",
      "Streak၊ hardness၊ cleavage နှင့် malleability ကို အစဉ်လိုက်စစ်ရန်",
      "Pan ထဲတွင် gold သည် အလေးချိန်ကြောင့် နှေးစွာရွေ့တတ်",
    ],
    verify:
      "Known specimen နှင့်နှိုင်းယှဉ်ပြီး uncertainty ရှိလျှင် laboratory mineral identification သုံးပါ။",
    warning:
      "အဝါရောင် သို့မဟုတ် ဓာတ်ပုံတစ်ပုံတည်းသည် gold identification မဟုတ်ပါ။",
  },
  {
    id: "black-sand",
    category: "identify",
    title: "Black sand နှင့် heavy-mineral assemblage",
    image: "black-sand.jpg",
    summary:
      "Magnetite၊ ilmenite၊ garnet၊ zircon နှင့် chromite တို့သည် hydraulic concentration ကို ပြနိုင်သော်လည်း gold ကို တိုက်ရိုက်မသက်သေပြပါ။",
    signals: [
      "Magnetic နှင့် non-magnetic fraction ကို ခွဲရန်",
      "Grain size၊ layer position နှင့် concentrate ratio မှတ်ရန်",
      "Gold နှင့် heavy mineral trend တူ/မတူကို sample series ဖြင့်စစ်ရန်",
    ],
    verify:
      "တူညီထုထည် upstream/downstream repeats၊ magnification နှင့် သင့်လျော်သော mineralogical analysis သုံးပါ။",
    warning:
      "Black sand များခြင်းကို ရွှေပါဝင်နှုန်းမြင့်ခြင်းဟု မပြောင်းတွက်ရပါ။",
  },
  {
    id: "stratigraphy",
    category: "geology",
    title: "မြေဆီလွှာ၊ gravel၊ false bottom နှင့် bedrock",
    image: "laterite-profile.jpg",
    summary:
      "Laterite၊ grey clay၊ conglomerate၊ weathered bedrock နှင့် fresh bedrock သည် stratigraphic position ကို နားလည်စေသော်လည်း fixed gold layer မဟုတ်ပါ။",
    signals: [
      "Contact အမြင့်၊ thickness၊ sorting နှင့် clast roundness မှတ်ရန်",
      "Clay false bottom နှင့် true bedrock ကို မခွဲမိခြင်းရှောင်ရန်",
      "Old channel gravel ၏ geometry နှင့် continuity စစ်ရန်",
    ],
    verify:
      "Measured section ဆွဲပြီး horizon တစ်ခုချင်းကို တူညီ support ဖြင့် sample ယူပါ။",
    warning:
      "အနီ/အဝါ/မီးခိုးမြေအရောင်မှ grade သို့မဟုတ် tonnage ကို မခန့်မှန်းရပါ။",
  },
  {
    id: "representative-sampling",
    category: "sampling",
    title: "ကိုယ်စားပြုနမူနာနှင့် sample support",
    image: "sluice.jpg",
    summary:
      "Sample result သည် ယူထားသော mass၊ volume၊ width၊ particle-size range နှင့် recovery ကိုသာ ကိုယ်စားပြုသည်။ Nugget effect ကြောင့် small sample များ မတည်ငြိမ်နိုင်သည်။",
    signals: [
      "Placer အတွက် bank volume/loose volume နှင့် oversize ကို မှတ်ရန်",
      "Lode အတွက် channel width၊ orientation နှင့် recovery မှတ်ရန်",
      "Selective rich material ကို routine sample ထဲ မထည့်ရန်",
    ],
    verify:
      "Sampling protocol တစ်ခုတည်းသုံး၍ replicate၊ duplicate နှင့် spatial control တည်ဆောက်ပါ။",
    warning:
      "Grab sample သို့မဟုတ် ရွေးထားသော rich specimen ကို ပျမ်းမျှ grade အဖြစ် မသုံးရပါ။",
  },
  {
    id: "grade-continuity",
    category: "sampling",
    title: "Grade၊ area၊ volume နှင့် continuity",
    image: "conglomerate.jpg",
    summary:
      "g/m³ သို့မဟုတ် g/t ရလဒ်တစ်ခုသည် sample support အတွက်သာဖြစ်သည်။ လုပ်ငန်းတန်ဖိုးကို စဉ်းစားရန် grade continuity၊ recoverable volume၊ dilution၊ recovery၊ cost နှင့် legal access လိုသည်။",
    signals: [
      "Result unit နှင့် sample volume/mass ကို အမြဲတွဲဖတ်ရန်",
      "အကျယ်၊ အထူနှင့် spatial spacing ကို တိုင်းရန်",
      "High result ကြားရှိ low result နှင့် barren boundary ကို ထည့်သွင်းရန်",
    ],
    verify:
      "Systematic grid/transect၊ bulk test၊ density measurement နှင့် independent laboratory confirmation လုပ်ပါ။",
    warning:
      "Area × single grade ဖြင့် resource၊ reserve၊ profit သို့မဟုတ် လုပ်သင့်/မလုပ်သင့်ကို မဆုံးဖြတ်ရပါ။",
  },
  {
    id: "qaqc",
    category: "quality",
    title: "QA/QC၊ chain of custody နှင့် laboratory result",
    image: "gold-pan-coarse.jpg",
    summary:
      "Blank သည် contamination၊ duplicate သည် precision၊ certified reference material သည် analytical bias ကို စစ်သည်။ Sample ID နှင့် seal မှ lab result အထိ traceable ဖြစ်ရမည်။",
    signals: [
      "Lab၊ method၊ unit၊ detection limit နှင့် report version စစ်ရန်",
      "Field duplicate နှင့် pulp/coarse duplicate ကို မရောရန်",
      "Blank failure သို့မဟုတ် CRM failure ရှိလျှင် batch ကို review လုပ်ရန်",
    ],
    verify:
      "Original signed report၊ laboratory accreditation/scope၊ QA/QC chart နှင့် independent repeat assay ကို စစ်ပါ။",
    warning:
      "Screenshot result၊ sample ID မပါသော report သို့မဟုတ် QA/QC မရှိသော anomaly ကို အတည်မယူရပါ။",
  },
  {
    id: "fraud",
    category: "safety",
    title: "Rich sample၊ ဓာတ်ပုံ၊ assay report နှင့် mineral-right လိမ်လည်မှု",
    image: "placer-flakes.jpg",
    summary:
      "ရွေးထားသော rich sample၊ edited photo၊ အတု report၊ sample switching၊ မရှင်းလင်းသော mineral right နှင့် အမြတ်အာမခံက prospecting scam ၏ အဓိကပုံစံများဖြစ်သည်။",
    signals: [
      "မူလနေရာ၊ scale၊ date နှင့် continuous sampling မပါသောပုံ",
      "Laboratory ကို သီးခြားဆက်သွယ်အတည်မပြုနိုင်သော report",
      "ငွေပေးရန်အလျင်လိုစေသော government connection သို့မဟုတ် guaranteed return",
    ],
    verify:
      "သင့်ဘက်မှ sampling၊ sealing နှင့် submission ကို ထိန်းချုပ်ပြီး authority၊ laboratory နှင့် original file ကို သီးခြားစစ်ပါ။",
    warning:
      "Seller ပေးသော rich sample၊ screenshot သို့မဟုတ် စကားဖြင့် mineral right အပေါ် အခြေခံ၍ ငွေမပေးပါနှင့်။",
  },
];
const labels: Record<Category, string> = {
  geology: "ဘူမိဗေဒ",
  identify: "ခွဲခြားခြင်း",
  sampling: "နမူနာနှင့် grade",
  quality: "QA/QC",
  safety: "အန္တရာယ်နှင့် လိမ်လည်မှု",
};

export default function MyanmarKnowledge() {
  const [category, setCategory] = useState<"all" | Category>("all"),
    [query, setQuery] = useState("");
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topics.filter(
      (x) =>
        (category === "all" || x.category === category) &&
        (!q ||
          `${x.title} ${x.summary} ${x.signals.join(" ")}`
            .toLowerCase()
            .includes(q)),
    );
  }, [category, query]);
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">ILLUSTRATED FIELD KNOWLEDGE · မြန်မာဘာသာ</p>
        <h1>ရွှေရှာဖွေရေး ဘူမိဗေဒ၊ နမူနာနှင့် သက်သေအထောက်အထား</h1>
        <p className="lead">
          ဓာတ်ပုံအစစ်ဖြင့် setting ကို နားလည်ပြီး field measurement၊
          representative sampling၊ QA/QC နှင့် laboratory analysis ဖြင့်
          စစ်ဆေးပါ။ လက္ခဏာသည် deposit၊ grade သို့မဟုတ် mining permission
          မဟုတ်ပါ။
        </p>
      </div>
      <section className="section">
        <div className="atlas-tools">
          <label className="atlas-search">
            <Search size={19} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ခေါင်းစဉ် သို့မဟုတ် အကြောင်းအရာရှာရန်"
              aria-label="ခေါင်းစဉ် သို့မဟုတ် အကြောင်းအရာရှာရန်"
            />
          </label>
          <div className="filter-row">
            <button
              className={category === "all" ? "is-active" : ""}
              onClick={() => setCategory("all")}
            >
              အားလုံး
            </button>
            {(Object.keys(labels) as Category[]).map((x) => (
              <button
                key={x}
                className={category === x ? "is-active" : ""}
                onClick={() => setCategory(x)}
              >
                {labels[x]}
              </button>
            ))}
          </div>
          <p className="result-count">
            <strong>{shown.length}</strong> ခေါင်းစဉ်
          </p>
        </div>
      </section>
      <section className="section knowledge-list">
        {shown.map((g, i) => {
          const media = enAtlas.find((x) => x[1] === g.image)!;
          return (
            <article className="knowledge-row" id={g.id} key={g.id}>
              <div className="knowledge-image">
                <Image
                  src={`/images/${g.image}`}
                  alt={g.title}
                  width={960}
                  height={720}
                  priority={i === 0}
                />
                <p>
                  ဓာတ်ပုံ — {media[4]} · {media[5]} ·{" "}
                  <a href={media[6]} target="_blank" rel="noreferrer">
                    မူရင်းနှင့် licence <ExternalLink size={13} />
                  </a>
                </p>
              </div>
              <div className="knowledge-copy">
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <p className="eyebrow">{labels[g.category]}</p>
                <h2>{g.title}</h2>
                <p className="summary">{g.summary}</p>
                <h3>ကွင်းဆင်းတွင် စစ်ဆေးရန်</h3>
                <ul>
                  {g.signals.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <div className="verify">
                  <b>နောက်တစ်ဆင့် အတည်ပြုရန်</b>
                  <p>{g.verify}</p>
                </div>
                <div className="notice">
                  <ShieldAlert size={18} />
                  {g.warning}
                </div>
                <div className="knowledge-actions">
                  <Link href="/my/atlas">
                    <BookOpen size={16} />
                    ဓာတ်ပုံအကိုးအကားဖွင့်ရန်
                  </Link>
                  <Link href="/my/field">နမူနာမှတ်တမ်းဖွင့်ရန်</Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
      <GeologyFieldGallery lang="my" />
    </>
  );
}
