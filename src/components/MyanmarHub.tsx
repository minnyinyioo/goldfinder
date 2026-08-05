import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  BookOpen,
  BookOpenCheck,
  Calculator,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  ExternalLink,
  FlaskConical,
  Languages,
  Layers3,
  Mountain,
  Map,
  Scale,
  ShieldAlert,
  Wrench,
  Waves,
} from "lucide-react";
import SamplingCalculator from "./SamplingCalculator";
import MyanmarAssessment from "./MyanmarAssessment";
import "./myanmar-hub.css";
import "./myanmar-tools.css";
const terms = [
  [
    "ရွှေကျင်သိုက်",
    "Placer deposit",
    "မူလကျောက်မှ လွတ်ထွက်လာသော ရွှေကို ရေစီးကြောင်းနှင့် ဆွဲငင်အားက သဲ၊ ကျောက်စရစ်အတွင်း စုစည်းထားသည့် သိုက်။",
  ],
  [
    "မူလရွှေသိုက် / သွေးကြောရွှေ",
    "Lode gold",
    "ကျောက်အတွင်းရှိ သွေးကြော၊ ပြတ်ရွေ့၊ shear zone နှင့် hydrothermal alteration ဆိုင်ရာ မူလရွှေသိုက်။",
  ],
  [
    "ကျောက်လွှာအခြေအနေ",
    "Stratigraphy",
    "အပေါ်မှအောက်သို့ မြေ၊ သဲ၊ ကျောက်စရစ်၊ ရွှံ့နှင့် အခြေခံကျောက်တို့၏ အစီအစဉ်နှင့် ထိစပ်မှု။",
  ],
  [
    "အခြေခံကျောက်",
    "Bedrock",
    "သယ်ယူပို့ဆောင်လာသော အနည်အောက်ရှိ မူလကျောက်။ ရောက်ရှိခြင်းတစ်ခုတည်းဖြင့် ရွှေရှိကြောင်း မပြနိုင်။",
  ],
  [
    "အတုအခြေခံလွှာ",
    "False bedrock",
    "ရွှံ့ သို့မဟုတ် cemented layer က အလေးချိန်မြင့် အမှုန်များကို ယာယီတားဆီးစုစည်းနိုင်သည့် မျက်နှာပြင်။",
  ],
  [
    "အနက်ရောင်သဲ",
    "Black sand",
    "Magnetite၊ ilmenite စသည့် heavy minerals စုစည်းမှု။ ရွှေပါဝင်မှုကို သက်သေမပြ။",
  ],
  [
    "ပြတ်ရွေ့",
    "Fault",
    "ကျောက်ထုရွေ့လျားခဲ့သည့် ပြတ်တောက်မျက်နှာပြင်။ Hydrothermal fluid လမ်းကြောင်း ဖြစ်နိုင်သော်လည်း assay လိုအပ်သည်။",
  ],
  [
    "ညှပ်ပြောင်းဇုန်",
    "Shear zone",
    "ကျောက်များ တဖြည်းဖြည်း ပုံပျက်၊ ကွဲကြေသည့် ကျယ်ပြန့်ဖွဲ့စည်းပုံဇုန်။",
  ],
  [
    "ပြောင်းလဲသတ္တုဖွဲ့စည်းမှု",
    "Hydrothermal alteration",
    "ပူရည်များကြောင့် မူလကျောက်၏ mineral assemblage ပြောင်းလဲခြင်း။",
  ],
  [
    "ကိုယ်စားပြုနမူနာ",
    "Representative sample",
    "စမ်းသပ်လိုသည့် ပစ္စည်းအမျိုးအစား၊ အရွယ်အစားနှင့် နေရာကွာခြားမှုကို လုံလောက်စွာ ကိုယ်စားပြုသော နမူနာ။",
  ],
  [
    "စမ်းသပ်ဓာတ်ခွဲချက်",
    "Assay",
    "သတ်မှတ်ထားသော sample preparation နှင့် analytical method ဖြင့် ဓာတ်ခွဲခန်းတွင် တိုင်းတာသော ရလဒ်။",
  ],
  [
    "ရှာဖွေတွေ့ရှိနိုင်မှုအနိမ့်ဆုံး",
    "Detection limit",
    "နည်းလမ်းတစ်ခုက ယုံကြည်စွာ ခွဲခြားတိုင်းတာနိုင်သည့် အနိမ့်ဆုံးအဆင့်။",
  ],
  [
    "အလွတ်ထိန်းချုပ်နမူနာ",
    "Blank",
    "နမူနာပြင်ဆင်ခြင်းနှင့် ခွဲခြမ်းစိတ်ဖြာခြင်းအတွင်း contamination ရှိ/မရှိ စစ်ဆေးသော ထိန်းချုပ်နမူနာ။",
  ],
  [
    "ထပ်ယူနမူနာ",
    "Duplicate",
    "Sampling နှင့် analysis ပြန်လည်တူညီနိုင်မှုကို စစ်ဆေးရန် ထပ်ယူ/ထပ်ခွဲသော နမူနာ။",
  ],
  [
    "လက်မှတ်ရ စံနမူနာ",
    "Certified Reference Material — CRM",
    "Certificate value ရှိသော စံပစ္စည်းဖြင့် analytical accuracy ကို စစ်ဆေးခြင်း။",
  ],
  [
    "ဆွေမျိုးရာခိုင်နှုန်းကွာခြားချက်",
    "Relative Percent Difference — RPD",
    "Duplicate နှစ်ခု၏ ကွာခြားမှုကို ပျမ်းမျှတန်ဖိုးနှင့် နှိုင်းယှဉ်ဖော်ပြသည့် စံနှုန်း။",
  ],
  [
    "တစ်ကုဗမီတာလျှင် ဂရမ်",
    "g/m³",
    "Placer material ၏ in-situ volume တစ်ကုဗမီတာလျှင် ရွှေအလေးချိန်။",
  ],
  [
    "တစ်တန်လျှင် ဂရမ်",
    "g/t",
    "ကျောက် သို့မဟုတ် သတ္တုနမူနာ တစ်တန်လျှင် ရွှေအလေးချိန်။",
  ],
];
const toolLinks = [
  [
    "ဓာတ်ပုံဖြင့် ခွဲခြားရန်",
    "ရွှေ၊ အတုရွှေ၊ အနက်ရောင်သဲ၊ မြေသားနှင့် ကျောက်ကို အစစ်အမှန်ဓာတ်ပုံဖြင့် နှိုင်းယှဉ်ပါ။",
    "/my/atlas",
    Camera,
  ],
  [
    "ဘူမိဗေဒနှင့် နမူနာ အသိပညာ",
    "ရွှေဖြစ်ပေါ်ပုံ၊ ရွှေကျင်နှင့် မူလရွှေ၊ black sand၊ grade၊ QA/QC နှင့် လိမ်လည်မှုစစ်ဆေးခြင်းကို တစ်နေရာတည်းတွင် လေ့လာပါ။",
    "/my/knowledge",
    BookOpen,
  ],
  [
    "ကွင်းဆင်းကိရိယာနှင့် စမ်းသပ်နည်း",
    "Pan၊ sluice၊ sieve၊ magnet၊ GPS၊ compass၊ XRF၊ fire assay နှင့် ICP ၏ လုပ်ဆောင်နိုင်မှုနှင့် ကန့်သတ်ချက်ကို စစ်ပါ။",
    "/my/tools",
    Wrench,
  ],
  [
    "စနစ်တကျ နမူနာစီမံကိန်း",
    "Sample fence၊ point၊ layer၊ volume၊ duplicate၊ blank နှင့် CRM အရေအတွက်ကို တွက်ပြီး plan ကို သိမ်းပါ။",
    "/my/planner",
    Scale,
  ],
  [
    "မြေပြင်အမှတ်ပေးရန်",
    "ရွှေကျင်နှင့် မူလရွှေလက္ခဏာများကို စုစည်း၍ နမူနာယူရမည့် ဦးစားပေးအဆင့် သတ်မှတ်ပါ။",
    "#my-assessment",
    BookOpenCheck,
  ],
  [
    "ရွှေပါဝင်နှုန်းတွက်ရန်",
    "ရွှေကျင် g/m³ နှင့် ကျောက်ရွှေ ppm ↔ g/t ကို မြန်မာဘာသာဖြင့် တွက်ချက်ပါ။",
    "#my-calculator",
    Calculator,
  ],
  [
    "နမူနာမှတ်တမ်း",
    "Sample ID၊ GPS၊ ဓာတ်ပုံ၊ assay နှင့် chain of custody ကို မှတ်တမ်းတင်ပါ။",
    "/my/field",
    ClipboardList,
  ],
  [
    "နမူနာမြေပုံနှင့် ဆက်စပ်မှု",
    "GPS sample များကို project အလိုက်ကြည့်ပြီး အထက်ရေ–အောက်ရေ၊ assay နှင့် QA/QC ဆက်စပ်မှုကို စစ်ဆေးပါ။",
    "/my/map",
    Map,
  ],
  [
    "ဒေတာအရန်နှင့် ပြန်လည်ရယူရန်",
    "နမူနာ၊ sampling plan နှင့် coordinate privacy ကို backup တစ်ခုတည်းတွင် စီမံပါ။",
    "/my/backup",
    ClipboardCheck,
  ],
  [
    "လုံခြုံရေးနှင့် ဥပဒေ",
    "ခွင့်ပြုချက်၊ မြေယာအခွင့်အရေး၊ ပတ်ဝန်းကျင်နှင့် ဓာတုပစ္စည်းအန္တရာယ်ကို စစ်ဆေးပါ။",
    "#safety",
    ShieldAlert,
  ],
] as const;
export default function MyanmarHub() {
  return (
    <>
      <section className="my-hero">
        <div>
          <p className="eyebrow">GOLDFINDER · မြန်မာဘာသာ</p>
          <h1>
            သက်သေအထောက်အထားအခြေပြု <span>ရွှေရှာဖွေရေး လမ်းညွှန်</span>
          </h1>
          <p>
            မြေပြင်လက္ခဏာကို တိုက်ရိုက် “ရွှေသိုက်” ဟု မသတ်မှတ်ဘဲ —
            ကြည့်ရှုမှတ်တမ်းတင်ခြင်း၊ ကိုယ်စားပြုနမူနာယူခြင်း၊ သင့်လျော်သော
            ဓာတ်ခွဲစမ်းသပ်ခြင်းနှင့် QA/QC ပြန်လည်စစ်ဆေးခြင်းတို့ကို အဆင့်လိုက်
            ဆက်စပ်ပေးထားသည်။
          </p>
          <div className="my-actions">
            <a href="#placer">
              <Waves size={17} />
              ရွှေကျင်သိုက်
            </a>
            <a href="#lode">
              <Mountain size={17} />
              မူလရွှေသိုက်
            </a>
            <a href="#glossary">
              <Languages size={17} />
              ဝေါဟာရ
            </a>
          </div>
        </div>
        <figure>
          <Image
            src="/images/panning.jpg"
            alt="ချောင်းအတွင်း ရွှေကျင်ခွက်အသုံးပြုနေသော BLM Alaska ဝန်ထမ်း"
            width={960}
            height={720}
            priority
          />
          <figcaption>
            BLM Alaska · Public Domain ·{" "}
            <a
              href="https://commons.wikimedia.org/wiki/File:Gold_panning_on_Jack_Wade_Creek_(24785190007).jpg"
              target="_blank"
              rel="noreferrer"
            >
              မူရင်းနှင့် လိုင်စင်
            </a>
          </figcaption>
        </figure>
      </section>
      <section className="my-section my-tool-station">
        <p className="eyebrow">FIELD TOOL STATION</p>
        <h2>လက်တွေ့အသုံးချ ကိရိယာများ</h2>
        <p className="my-tool-intro">
          မြန်မာဘာသာရှင်းလင်းချက်ကို အခြေခံပြီး professional calculator နှင့်
          record system များသို့ တိုက်ရိုက်ဝင်နိုင်သည်။ Tool interface သည်
          English ဖြစ်သော်လည်း technical term များကို အောက်ပါ glossary နှင့်
          တွဲဖတ်နိုင်သည်။
        </p>
        <div className="my-tool-grid">
          {toolLinks.map(([title, text, href, Icon]) => (
            <Link href={href} key={title}>
              <Icon size={23} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span>ဖွင့်ရန် →</span>
            </Link>
          ))}
        </div>
        <div className="my-formulas">
          <article>
            <b>ရွှေကျင် (Placer)</b>
            <code>g/m³ = ရရှိသော ရွှေ (g) ÷ မူလနမူနာထုထည် (m³)</code>
            <p>
              10 L = 0.01 m³ ဖြစ်သည်။ စမ်းသပ်ထားသော recovery ရှိမှသာ correction
              အသုံးပြုပါ။
            </p>
          </article>
          <article>
            <b>ကျောက်ရွှေ (Lode)</b>
            <code>1 ppm Au = 1 mg/kg Au = 1 g/t Au</code>
            <p>
              Unit ပြောင်းခြင်းက assay quality ကို မတိုးစေပါ။ Method၊ detection
              limit နှင့် QA/QC ကို စစ်ဆေးပါ။
            </p>
          </article>
        </div>
      </section>
      <section className="my-section" id="my-calculator">
        <div className="my-heading">
          <Calculator />
          <div>
            <p className="eyebrow">MYANMAR INTERACTIVE GRADE TOOL</p>
            <h2>မြန်မာဘာသာ ရွှေပါဝင်နှုန်းတွက်စက်</h2>
            <p>
              ရွှေကျင်နမူနာအတွက် g/m³ နှင့် ကျောက်ရွှေ assay အတွက် ppm ↔ g/t ကို
              တိုက်ရိုက်တွက်နိုင်သည်။
            </p>
          </div>
        </div>
        <SamplingCalculator lang="my" />
      </section>
      <section className="my-section" id="my-assessment">
        <div className="my-heading">
          <BookOpenCheck />
          <div>
            <p className="eyebrow">MYANMAR FIELD ASSESSMENT</p>
            <h2>မြန်မာဘာသာ မြေပြင်အမှတ်ပေးစနစ်</h2>
            <p>
              ကြည့်ရှုချက်များကို အတူတကွသုံး၍ နောက်တစ်ဆင့်နမူနာယူရမည့်
              ဦးစားပေးကို စီစဉ်ပါ။
            </p>
          </div>
        </div>
        <MyanmarAssessment />
      </section>
      <section className="my-section my-principles">
        <p className="eyebrow">EVIDENCE FIRST</p>
        <h2>အဓိကဆုံးဖြတ်ချက် ၅ ဆင့်</h2>
        <div>
          {[
            [
              "01",
              "ဘူမိဗေဒလက္ခဏာ",
              "မှတ်တမ်းတင်သင့်သော နေရာ သို့မဟုတ် ပေါင်းစပ်လက္ခဏာ",
            ],
            [
              "02",
              "နမူနာယူသင့်သောပစ်မှတ်",
              "နှိုင်းယှဉ်ထိန်းချုပ်မှုပါသော နမူနာအစီအစဉ်",
            ],
            [
              "03",
              "ရွှေဓာတ်မူမမှန်မှု",
              "QA/QC မှန်ကန်ပြီး နောက်ခံတန်ဖိုးထက် မြင့်သော assay",
            ],
            [
              "04",
              "ဆက်လက်တည်ရှိနိုင်သော သတ္တုဖြစ်ထွန်းမှု",
              "အကျယ်၊ အလျားနှင့် အနက်တွင် ဆက်စပ်မှု",
            ],
            [
              "05",
              "Resource / Reserve",
              "Drilling၊ estimation၊ metallurgy၊ economics နှင့် ဥပဒေလိုက်နာမှု လိုအပ်",
            ],
          ].map((x) => (
            <article key={x[0]}>
              <strong>{x[0]}</strong>
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="my-section my-system" id="placer">
        <div className="my-heading">
          <Waves />
          <div>
            <p className="eyebrow">PLACER GOLD</p>
            <h2>ရွှေကျင်သိုက်ကို မည်သို့ စဉ်းစားမည်နည်း</h2>
          </div>
        </div>
        <div className="my-two">
          <article>
            <h3>နေရာနှင့် အလွှာ</h3>
            <ul>
              <li>
                မြစ်ကွေ့အတွင်းဘက်၊ ကျောက်တုံးကြီးနောက်ဘက်နှင့်
                ရေစီးနှေးသည့်နေရာကို နှိုင်းယှဉ်နမူနာယူပါ။
              </li>
              <li>
                ကျောက်စရစ်အောက်ခြေ၊ false bedrock မျက်နှာပြင်နှင့် bedrock crack
                ကို အလွှာခွဲယူပါ။
              </li>
              <li>
                Black sand သည် hydraulic sorting လက္ခဏာသာဖြစ်ပြီး ရွှေရှိကြောင်း
                မပြနိုင်ပါ။
              </li>
              <li>
                တစ်ခွက်တွင် မြင်ရသော ရွှေကို မြစ်ပိုင်းပျမ်းမျှ grade အဖြစ်
                မပြောင်းပါနှင့်။
              </li>
            </ul>
          </article>
          <article>
            <h3>မှတ်တမ်းတင်ရမည့်အချက်</h3>
            <ul>
              <li>In-situ volume၊ အကြီးဆုံးကျောက်အရွယ်နှင့် အလွှာအနက်</li>
              <li>
                ပြုပြင်ပြီးသော ပမာဏ၊ concentrate အလေးချိန်နှင့် visible-gold
                count
              </li>
              <li>Recovery test၊ tailings check နှင့် duplicate result</li>
              <li>တည်နေရာကို မျှဝေမည့်အခါ exact coordinate ကို ကာကွယ်ပါ</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="my-section my-system" id="lode">
        <div className="my-heading">
          <Mountain />
          <div>
            <p className="eyebrow">LODE GOLD</p>
            <h2>မူလရွှေသိုက်နှင့် သွေးကြောကို စိစစ်ခြင်း</h2>
          </div>
        </div>
        <div className="my-photo-row">
          <figure>
            <Image
              src="/images/quartz-vein.jpg"
              alt="Nalunaq ရွှေတွင်းရှိ hydrothermal quartz-gold vein"
              width={960}
              height={720}
            />
            <figcaption>
              James St. John · CC BY 2.0 ·{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Main_Vein_(hydrothermal_quartz-gold_vein),_outcrop_exposure_at_Nalunaq_Gold_Mine.jpg"
                target="_blank"
                rel="noreferrer"
              >
                မူရင်းနှင့် လိုင်စင်
              </a>
            </figcaption>
          </figure>
          <article>
            <h3>ပေါင်းစပ်ကြည့်ရှုပါ</h3>
            <ul>
              <li>
                Quartz vein တစ်ခုတည်း၊ သံချေးရောင်တစ်ခုတည်း သို့မဟုတ် pyrite
                တစ်ခုတည်းသည် ရွှေသိုက်မဟုတ်ပါ။
              </li>
              <li>
                Strike၊ dip၊ width၊ contact နှင့် လမ်းကြောင်းတစ်လျှောက်
                continuity ကို တိုင်းတာပါ။
              </li>
              <li>
                Fault၊ shear zone၊ breccia၊ stockwork နှင့် alteration zoning
                ကို map လုပ်ပါ။
              </li>
              <li>
                Mineralised zone ကို ထောင့်မှန်ဖြတ်၍ continuous channel sample
                ယူပြီး wall rock ပါ ထည့်ပါ။
              </li>
            </ul>
          </article>
        </div>
      </section>
      <section className="my-section" id="minerals">
        <div className="my-heading">
          <Layers3 />
          <div>
            <p className="eyebrow">MINERAL RECOGNITION</p>
            <h2>ရွှေနှင့် “အတုရွှေ” ကို ခွဲခြားခြင်း</h2>
          </div>
        </div>
        <div className="my-minerals">
          {[
            [
              "/images/gold-native.jpg",
              "သဘာဝရွှေ (Native gold)",
              "အဝါရောင်၊ ပုံမှန် crystal face မရှိ၊ ဖိလျှင် ပုံပျက်ပြီး မကြွပ်လွယ်။",
            ],
            [
              "/images/pyrite.jpg",
              "Pyrite",
              "Brassy colour၊ cubic crystal တွေ့ရနိုင်၊ ကြွပ်ပြီး dark streak ဖြစ်တတ်။",
            ],
            [
              "/images/muscovite.jpg",
              "Mica",
              "ပါးလွှာအလွှာခွဲနိုင်ပြီး ကြည့်ထောင့်ပြောင်းလျှင် တောက်ပမှု ပြောင်းသည်။",
            ],
          ].map((x) => (
            <article key={x[1]}>
              <Image src={x[0]} alt={x[1]} width={500} height={380} />
              <h3>{x[1]}</h3>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
        <p className="my-warning">
          <AlertTriangle size={19} />
          မျက်စိဖြင့်ကြည့်ခြင်းသာဖြင့် mineral identity သို့မဟုတ် gold grade ကို
          မဆုံးဖြတ်နိုင်ပါ။ Hardness၊ streak၊ magnetism၊ malleability နှင့်
          laboratory analysis ကို ပေါင်းစပ်ပါ။
        </p>
      </section>
      <section className="my-section" id="sampling">
        <div className="my-heading">
          <FlaskConical />
          <div>
            <p className="eyebrow">SAMPLING & QA/QC</p>
            <h2>နမူနာနှင့် ဓာတ်ခွဲရလဒ်ကို ယုံကြည်နိုင်စေရန်</h2>
          </div>
        </div>
        <div className="my-two">
          <article>
            <h3>ကိုယ်စားပြုနမူနာ</h3>
            <ol>
              <li>
                Geological unit သို့မဟုတ် depositional layer ကို အရင်သတ်မှတ်ပါ။
              </li>
              <li>
                Sample mass/volume နှင့် particle top size ကို မှတ်တမ်းတင်ပါ။
              </li>
              <li>
                ရွှေကြမ်းအမှုန်ကြောင့် nugget effect မြင့်လျှင် ပမာဏတိုးပြီး
                duplicate ထည့်ပါ။
              </li>
              <li>
                Rock gold ကို g/t၊ placer volume sample ကို g/m³ ဖြင့်
                သင့်လျော်စွာ ဖော်ပြပါ။
              </li>
            </ol>
          </article>
          <article>
            <h3>QA/QC ထိန်းချုပ်မှု</h3>
            <ol>
              <li>Blank — contamination စစ်ဆေးခြင်း</li>
              <li>Duplicate — sampling/analysis precision စစ်ဆေးခြင်း</li>
              <li>CRM — analytical accuracy နှင့် drift စစ်ဆေးခြင်း</li>
              <li>
                Control fail ဖြစ်လျှင် anomaly အဓိပ္ပာယ်ဖော်ခြင်းကို ရပ်ပြီး
                စုံစမ်းပါ။
              </li>
            </ol>
          </article>
        </div>
        <div className="my-tools">
          <Link href="/en/sampling">
            <Scale size={17} />
            English sampling calculator
          </Link>
          <Link href="/en/qaqc">
            <ClipboardCheck size={17} />
            English QA/QC checker
          </Link>
        </div>
      </section>
      <section className="my-section my-safety" id="safety">
        <div className="my-heading">
          <ShieldAlert />
          <div>
            <p className="eyebrow">SAFETY · LAW · ENVIRONMENT</p>
            <h2>လုံခြုံရေးနှင့် ဥပဒေဆိုင်ရာ နယ်နိမိတ်</h2>
          </div>
        </div>
        <ul>
          <li>
            မတည်ငြိမ်သော မြစ်ကမ်း၊ ပြိုကျနိုင်သော တောင်စောင်း၊ abandoned working
            သို့မဟုတ် unsupported excavation ထဲ မဝင်ပါနှင့်။
          </li>
          <li>
            Mercury၊ cyanide၊ acid digestion၊ fire assay နှင့် crushing ကို
            အရည်အချင်းရှိသူများက ထိန်းချုပ်ထားသောနေရာတွင်သာ လုပ်ဆောင်ရမည်။
          </li>
          <li>
            မြစ်ကြောင်းပြောင်းခြင်း၊ တူးဖော်ခြင်း၊ prospecting၊ exploration
            သို့မဟုတ် production မလုပ်မီ ခွင့်ပြုချက်၊ မြေ/ရေအခွင့်အရေးနှင့်
            ဒေသဆိုင်ရာစည်းမျဉ်းကို စစ်ဆေးပါ။
          </li>
          <li>
            ဥပဒေပြောင်းလဲနိုင်သည်။ ဤစာမျက်နှာသည် legal advice မဟုတ်ပါ။
            သက်ဆိုင်ရာ Union/Region/State အာဏာပိုင်နှင့် အတည်ပြုပါ။
          </li>
        </ul>
        <div className="my-sources">
          <a
            href="https://www.myanmartradeportal.gov.mm/en/legal/51"
            target="_blank"
            rel="noreferrer"
          >
            <BookOpen size={17} />
            Myanmar National Trade Portal — Mines Law <ExternalLink size={14} />
          </a>
          <a
            href="https://www.usgs.gov/science/science-explorer/minerals/Assessments-of-Mineral-Resources"
            target="_blank"
            rel="noreferrer"
          >
            <BookOpen size={17} />
            USGS Mineral Resource Assessments <ExternalLink size={14} />
          </a>
        </div>
      </section>
      <section className="my-section" id="glossary">
        <div className="my-heading">
          <Languages />
          <div>
            <p className="eyebrow">TECHNICAL GLOSSARY</p>
            <h2>မြန်မာ–အင်္ဂလိပ် ဘူမိဗေဒဝေါဟာရ</h2>
            <p>
              အဓိပ္ပာယ်လွဲမှားမှုကို လျှော့ချရန် report၊ sample label နှင့်
              laboratory submission တွင် English term ကိုပါ ထည့်သုံးရန်
              အကြံပြုသည်။
            </p>
          </div>
        </div>
        <div className="my-glossary">
          {terms.map((x) => (
            <article key={x[1]}>
              <h3>{x[0]}</h3>
              <b>{x[1]}</b>
              <p>{x[2]}</p>
            </article>
          ))}
        </div>
        <div className="my-editorial">
          <CheckCircle2 />
          <p>
            <strong>ဘာသာပြန်သုံးစွဲမှုမှတ်ချက် —</strong> ဤဗားရှင်းသည် field
            geology အသုံးပြုရန် technical bilingual terminology ကို
            ထိန်းသိမ်းထားသည်။ Permit application၊ laboratory contract၊ resource
            statement သို့မဟုတ် legal document အတွက် မြန်မာဘာသာကျွမ်းကျင်သူနှင့်
            အရည်အချင်းရှိသော geologist တို့၏ project-specific review လိုအပ်သည်။
          </p>
        </div>
      </section>
    </>
  );
}
