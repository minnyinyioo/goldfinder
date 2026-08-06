import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  Calculator,
  Camera,
  ChevronDown,
  ClipboardList,
  MapPinned,
} from "lucide-react";
import "./home-support.css";

type Lang = "zh" | "en" | "my";
const content = {
  zh: {
    guideTitle: "第一次使用 Goldfinder",
    guideLead: "按证据链使用工具，不要从照片直接跳到品位或经济判断。",
    steps: [
      [
        Camera,
        "先看图对照",
        "用真实照片排除黄铁矿、云母、普通石英和非特异性土色。",
        "/atlas",
      ],
      [
        BookOpenCheck,
        "再做现场评分",
        "选择砂金或山金，记录实际观察和仍然缺失的证据。",
        "/assess",
      ],
      [
        ClipboardList,
        "固定取样并建档",
        "记录位置、层位、体积、样品编号、照片和交接链。",
        "/field",
      ],
      [
        Calculator,
        "最后计算和复核",
        "输入实测金重或化验结果，检查重复样与 QA/QC。",
        "/sampling",
      ],
    ],
    qTitle: "常见问题 Q&A",
    questions: [
      [
        "看到金黄色颗粒，能确定是黄金吗？",
        "不能。先检查晶形、条痕、硬度、磁性和延展性；重要样品需要合适的实验室分析。",
      ],
      [
        "黑砂越多，黄金就越多吗？",
        "不一定。黑砂说明重矿物发生过水动力分选，但不能证明黄金存在，更不能换算品位。",
      ],
      [
        "一盘淘出金，可以代表整个河段吗？",
        "不能。单点结果只代表该样品，需要固定体积、上下游对照、不同深度重复和质量控制。",
      ],
      [
        "ppm 和 g/t 为什么数值相同？",
        "质量基准下 1 ppm 等于 1 mg/kg，也等于 1 g/t；换算单位不会提高检测质量。",
      ],
      [
        "网站评分高，是否表示值得开采？",
        "不是。评分只决定后续取样优先级，不是资源量、储量、盈利能力或许可结论。",
      ],
      [
        "现场记录会上传到服务器吗？",
        "样品、坐标和照片默认保存在当前浏览器。请定期导出 JSON 数据备份和照片 ZIP。",
      ],
    ],
    more: "打开完整知识与方法",
  },
  en: {
    guideTitle: "First-time guide to Goldfinder",
    guideLead:
      "Follow the evidence chain; never jump directly from a photograph to grade or economics.",
    steps: [
      [
        Camera,
        "Compare first",
        "Use real photographs to exclude pyrite, mica, ordinary quartz and non-specific soil colours.",
        "/en/atlas",
      ],
      [
        BookOpenCheck,
        "Then assess the site",
        "Choose placer or lode and record observed evidence and missing controls.",
        "/en/assess",
      ],
      [
        ClipboardList,
        "Fix sample support and record it",
        "Keep location, horizon, volume, sample ID, photographs and custody.",
        "/en/field",
      ],
      [
        Calculator,
        "Calculate and review last",
        "Enter measured gold mass or assays and check duplicates and QA/QC.",
        "/en/sampling",
      ],
    ],
    qTitle: "Frequently asked questions",
    questions: [
      [
        "Does a yellow metallic grain prove gold?",
        "No. Check crystal form, streak, hardness, magnetism and malleability; important samples require fit-for-purpose analysis.",
      ],
      [
        "Does more black sand mean more gold?",
        "Not necessarily. Black sand records heavy-mineral sorting but cannot prove gold or be converted to grade.",
      ],
      [
        "Can one gold-bearing pan represent a stream reach?",
        "No. It represents only that sample. Use fixed volume, upstream/downstream controls, depth repeats and quality control.",
      ],
      [
        "Why are ppm and g/t numerically equal?",
        "On a mass basis, 1 ppm equals 1 mg/kg and 1 g/t. Unit conversion does not improve analytical quality.",
      ],
      [
        "Does a high site score mean the ground is mineable?",
        "No. The score prioritises follow-up sampling; it is not a resource, reserve, profitability or permitting conclusion.",
      ],
      [
        "Are field records uploaded to a server?",
        "Samples, coordinates and photographs remain in this browser by default. Export JSON and photo ZIP backups regularly.",
      ],
    ],
    more: "Open all knowledge and methods",
  },
  my: {
    guideTitle: "Goldfinder စတင်အသုံးပြုနည်း",
    guideLead:
      "ဓာတ်ပုံမှ grade သို့မဟုတ် စီးပွားရေးအဖြေကို တန်းမသွားဘဲ evidence chain အတိုင်းသုံးပါ။",
    steps: [
      [
        Camera,
        "ဓာတ်ပုံဖြင့် ဦးစွာနှိုင်းယှဉ်ရန်",
        "Pyrite၊ mica၊ ordinary quartz နှင့် non-specific soil colour ကို ဖယ်ရှားစစ်ဆေးပါ။",
        "/my/atlas",
      ],
      [
        BookOpenCheck,
        "Field assessment လုပ်ရန်",
        "Placer သို့မဟုတ် lode ရွေးပြီး တွေ့ရှိချက်နှင့် လိုအပ်သော control ကို မှတ်ပါ။",
        "/my#my-assessment",
      ],
      [
        ClipboardList,
        "Sample support သတ်မှတ်ပြီး မှတ်တမ်းတင်ရန်",
        "Location၊ layer၊ volume၊ sample ID၊ photo နှင့် custody ကို သိမ်းပါ။",
        "/my/field",
      ],
      [
        Calculator,
        "နောက်ဆုံး တွက်ချက်ပြီး review လုပ်ရန်",
        "Gold mass သို့မဟုတ် assay result ထည့်ပြီး duplicate နှင့် QA/QC စစ်ပါ။",
        "/my/tools",
      ],
    ],
    qTitle: "မေးလေ့ရှိသော Q&A",
    questions: [
      [
        "အဝါရောင် metallic grain ကို gold ဟု သတ်မှတ်နိုင်ပါသလား။",
        "မရပါ။ Crystal form၊ streak၊ hardness၊ magnetism နှင့် malleability စစ်ပြီး အရေးကြီး sample ကို သင့်လျော်သော laboratory analysis လုပ်ပါ။",
      ],
      [
        "Black sand များလျှင် gold များပါသလား။",
        "မသေချာပါ။ Heavy-mineral sorting ကိုပြသော်လည်း gold ရှိကြောင်း သို့မဟုတ် grade ကို မပြနိုင်ပါ။",
      ],
      [
        "Gold ပါသော pan တစ်ခုက stream reach အားလုံးကို ကိုယ်စားပြုပါသလား။",
        "မပြုပါ။ Fixed volume၊ upstream/downstream control၊ depth repeat နှင့် QC လိုသည်။",
      ],
      [
        "ppm နှင့် g/t ဘာကြောင့် ဂဏန်းတူသလဲ။",
        "Mass basis တွင် 1 ppm = 1 mg/kg = 1 g/t ဖြစ်သည်။ Unit ပြောင်းခြင်းက analytical quality မတိုးစေပါ။",
      ],
      [
        "Site score မြင့်လျှင် တူးဖော်သင့်ပြီလား။",
        "မဟုတ်ပါ။ Score သည် follow-up sampling priority သာဖြစ်ပြီး resource၊ reserve၊ profit သို့မဟုတ် permit conclusion မဟုတ်ပါ။",
      ],
      [
        "Field record များ server သို့ upload ဖြစ်ပါသလား။",
        "Sample၊ coordinate နှင့် photo ကို default အားဖြင့် ဤ browser တွင်သာ သိမ်းသည်။ JSON နှင့် photo ZIP backup ပုံမှန်ထုတ်ပါ။",
      ],
    ],
    more: "Knowledge နှင့် method အားလုံးဖွင့်ရန်",
  },
} as const;

export default function HomeSupport({ lang }: { lang: Lang }) {
  const c = content[lang],
    knowledge = lang === "zh" ? "/knowledge" : `/${lang}/knowledge`;
  return (
    <>
      <section className="section usage-guide" id="usage-guide">
        <p className="eyebrow">USAGE GUIDE</p>
        <h2>{c.guideTitle}</h2>
        <p className="section-intro">{c.guideLead}</p>
        <div className="usage-grid">
          {c.steps.map(([Icon, title, text, href], i) => (
            <Link href={href} key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <Icon size={21} />
              <h3>{title}</h3>
              <p>{text}</p>
              <ArrowRight size={17} />
            </Link>
          ))}
        </div>
      </section>
      <section className="section home-faq" id="qa">
        <p className="eyebrow">QUESTIONS & ANSWERS</p>
        <h2>{c.qTitle}</h2>
        <div className="faq-grid">
          {c.questions.map(([q, a]) => (
            <details key={q}>
              <summary>
                {q}
                <ChevronDown size={18} />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <Link className="faq-more" href={knowledge}>
          <MapPinned size={17} />
          {c.more}
          <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
