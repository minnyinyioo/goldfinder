import Image from "next/image";
import { ExternalLink, Eye, FlaskConical, ShieldAlert } from "lucide-react";
import "./geology-field-gallery.css";
import "./field-evidence-link.css";

type Lang = "zh" | "en" | "my";
const sources = {
  fan: { image: "/images/field-alluvial-fan.jpg", author: "Joseph H. Hartman", license: "CC0", source: "https://commons.wikimedia.org/wiki/File:Alluvial_fan_(GeoDIL_number_-_1366).jpg", evidence: "https://www.usgs.gov/news/science-snippet/earthword-alluvial-fan" },
  terrace: { image: "/images/field-river-terrace.jpg", author: "Bob Forrest", license: "CC BY-SA 2.0", source: "https://commons.wikimedia.org/wiki/File:River_Terrace_-_geograph.org.uk_-_344078.jpg", evidence: "https://www.usgs.gov/publications/river-terrace-evidence-tectonic-processes-eastern-north-american-plate-interior-south" },
  shear: { image: "/images/field-shear-zone.jpg", author: "GSHD2023", license: "CC BY 4.0", source: "https://commons.wikimedia.org/wiki/File:Mylonitic_shear_zone_B%C3%B6llsteiner_Odenwald.jpg", evidence: "https://www.usgs.gov/publications/syn-deformational-features-carlin-type-au-deposits" },
  alteration: { image: "/images/field-hydrothermal-alteration.jpg", author: "James St. John", license: "CC BY 2.0", source: "https://commons.wikimedia.org/wiki/File:Argillic_zone_alteration_%26_hydrothermal_veins_(Orphan_Boy_Mine,_Butte,_Montana,_USA)_1.jpg", evidence: "https://www.usgs.gov/publications/magmatic-vapor-expansion-and-formation-high-sulfidation-gold-deposits-structural" },
} as const;
const copy = {
  zh: { eyebrow: "REAL-FIELD REFERENCE", title: "四种关键地貌与构造实拍参照", lead: "先辨认几何形态与空间连续性，再设计对照取样。照片只用于学习特征，不能替代现场比例尺、地层记录与检测。", labels: ["怎么看", "不能证明", "下一步"] as const, source: "原图与许可", evidence: "地质依据 · USGS", cards: [
    ["fan", "冲积扇", "山口外呈扇形展开，水道分叉迁移，砾石通常由扇顶向外变细。", "冲积扇本身不代表含金；不同水道、洪水期次可完全不同。", "沿扇顶—中扇—扇缘布置等体积样，并记录砾石层连续性。"],
    ["terrace", "河流阶地／古河道地形", "现河床上方出现近水平平台或阶状坡折，边缘可能露出圆砾石层。", "平坦台地或一层圆砾石不能单独证明古河道，更不能证明有经济品位。", "做垂直剖面确认砾石基底与厚度，再沿可能古流向布置对照线。"],
    ["shear", "剪切带", "寻找被拉长、压扁或错移的构造面、糜棱状条带及平行石英脉。", "变形带只是流体通道条件之一；没有检测不能称为含金矿化带。", "测走向、倾向、宽度并跨带连续槽样，同时采两侧未变形围岩对照。"],
    ["alteration", "热液蚀变与脉体", "观察脉体两侧颜色、硬度和矿物组成的系统变化，而非只看铁锈色。", "黏土化、硅化或褐铁染色可由多种流体形成，不能凭颜色判金。", "从新鲜围岩跨越蚀变带到另一侧连续取样，并用适合的实验室方法检测。"],
  ] },
  en: { eyebrow: "REAL-FIELD REFERENCE", title: "Four key landform and structural references", lead: "Recognise geometry and continuity before designing control samples. A photograph teaches features; it does not replace scale, logged sections or assays.", labels: ["Observe", "Does not prove", "Next action"] as const, source: "source & licence", evidence: "geological basis · USGS", cards: [
    ["fan", "Alluvial fan", "A fan-shaped body spreads beyond a mountain front; channels migrate and gravel commonly fines away from the apex.", "An alluvial fan does not imply gold. Separate channels and flood episodes may have different sediment sources.", "Run equal-volume samples from apex through mid-fan to toe and log gravel continuity."],
    ["terrace", "River terrace / palaeochannel terrain", "Look for a near-level bench above the active channel, a slope break and, where exposed, rounded gravel.", "A flat bench or one gravel exposure alone does not establish a palaeochannel or economic grade.", "Log a vertical section to establish gravel base and thickness, then sample along the inferred palaeoflow."],
    ["shear", "Shear zone", "Look for stretched, flattened or offset fabrics, mylonitic bands and veins aligned with deformation.", "Deformation only provides a possible fluid pathway; it is not evidence of gold without analysis.", "Measure strike, dip and width; channel-sample continuously across the zone with wall-rock controls."],
    ["alteration", "Hydrothermal alteration and veins", "Map systematic changes in colour, hardness and minerals on both sides of veins, not rusty colour alone.", "Argillic alteration, silicification or iron staining can form in many systems and does not identify gold.", "Sample continuously from fresh wall rock through alteration to the opposite side and assay appropriately."],
  ] },
  my: { eyebrow: "REAL-FIELD REFERENCE · ကွင်းဆင်းဓာတ်ပုံအစစ်", title: "အရေးကြီး မြေသဏ္ဌာန်နှင့် ဖွဲ့စည်းပုံ လေးမျိုး", lead: "ထိန်းချုပ်နမူနာ မစီမံမီ ပုံသဏ္ဌာန်နှင့် ဆက်လက်တည်ရှိမှုကို စစ်ပါ။ ဓာတ်ပုံသည် လက္ခဏာသင်ယူရန်သာဖြစ်ပြီး field scale၊ section log နှင့် assay ကို အစားမထိုးပါ။", labels: ["ကြည့်ရှုရန်", "သက်သေမပြုနိုင်သည့်အရာ", "နောက်တစ်ဆင့်"] as const, source: "မူရင်းနှင့် licence", evidence: "ဘူမိဗေဒအကိုးအကား · USGS", cards: [
    ["fan", "Alluvial fan · မြစ်သယ်အနည်ပန်ကာ", "တောင်ခြေဝတွင် ပန်ကာပုံဖြန့်ပြီး ချောင်းလမ်းကြောင်းများ ပြောင်းရွှေ့တတ်ကာ ပန်ကာထိပ်မှ အပြင်ဘက်သို့ ကျောက်စရစ် သေးသွားတတ်သည်။", "Alluvial fan ရှိခြင်းတစ်ခုတည်းက ရွှေပါဝင်မှုကို မသက်သေပြပါ။", "ပန်ကာထိပ်၊ အလယ်နှင့် အစွန်းတွင် တူညီထုထည်နမူနာယူပြီး gravel continuity ကို မှတ်တမ်းတင်ပါ။"],
    ["terrace", "River terrace · မြစ်ကမ်းအဆင့်မြင့်ပြင်", "လက်ရှိမြစ်ကြမ်းအထက်ရှိ ပြန့်ညီသောအဆင့်၊ slope break နှင့် ထွက်ပေါ်နေသော လုံးဝိုင်းကျောက်စရစ်ကို ရှာပါ။", "ပြန့်ညီသောမြေ သို့မဟုတ် gravel exposure တစ်ခုတည်းက palaeochannel နှင့် grade ကို မသက်သေပြပါ။", "ဒေါင်လိုက် section ဖြင့် gravel base နှင့် thickness ကို အတည်ပြုပြီး ခန့်မှန်းရှေးမြစ်စီးကြောင်းတစ်လျှောက် နမူနာယူပါ။"],
    ["shear", "Shear zone · ဖြတ်ညှပ်ပုံပျက်ဇုန်", "ဆွဲရှည်၊ ဖိပြား၊ ရွေ့လျားထားသော fabric၊ mylonitic band နှင့် deformation အတိုင်းရှိသော vein ကို ကြည့်ပါ။", "Deformation သည် fluid pathway ဖြစ်နိုင်ခြေသာပြပြီး assay မရှိဘဲ gold mineralisation ဟု မဆိုနိုင်ပါ။", "Strike၊ dip၊ width တိုင်းပြီး zone ကို ဖြတ်၍ continuous channel sample နှင့် wall-rock control ယူပါ။"],
    ["alteration", "Hydrothermal alteration · ရေပူရည်ပြောင်းလဲမှု", "Vein နှစ်ဖက်ရှိ အရောင်၊ hardness နှင့် mineral ပြောင်းလဲမှုကို စနစ်တကျ map လုပ်ပါ။", "Argillic alteration၊ silicification သို့မဟုတ် iron staining တစ်ခုတည်းက ရွှေကို မသက်သေပြပါ။", "Fresh wall rock မှ alteration zone ကို ဖြတ်၍ အခြားဘက်အထိ continuous sample ယူပြီး သင့်လျော်သော assay လုပ်ပါ။"],
  ] },
} as const;

export default function GeologyFieldGallery({ lang }: { lang: Lang }) {
  const c = copy[lang];
  return <section className="section geology-field-gallery" id="field-references">
    <div className="geology-title"><Eye /><div><p className="eyebrow">{c.eyebrow}</p><h2>{c.title}</h2><p>{c.lead}</p></div></div>
    <div className="field-reference-grid">{c.cards.map(([key, title, observe, limitation, action]) => { const item = sources[key]; return <article className="field-reference-card" key={key}>
      <figure><Image src={item.image} alt={title} width={960} height={720} /><figcaption>{item.author} · {item.license} · <a href={item.source} target="_blank" rel="noreferrer">{c.source} <ExternalLink size={12} /></a></figcaption></figure>
      <div className="field-reference-copy"><h3>{title}</h3><dl><div><dt><Eye size={16} />{c.labels[0]}</dt><dd>{observe}</dd></div><div><dt><ShieldAlert size={16} />{c.labels[1]}</dt><dd>{limitation}</dd></div><div><dt><FlaskConical size={16} />{c.labels[2]}</dt><dd>{action}</dd></div></dl><a className="field-evidence-link" href={item.evidence} target="_blank" rel="noreferrer">{c.evidence}<ExternalLink size={13} /></a></div>
    </article>; })}</div>
  </section>;
}
