import type { Metadata } from "next";
import { enAtlas } from "@/data/english";
import AtlasExplorer, { ExplorerItem } from "../../atlas/AtlasExplorer";
import "../../atlas/atlas.css";

export const metadata: Metadata = {
  title: "ဓာတ်ပုံအစစ် သတ္တုနှင့်မြေလွှာ အကိုးအကား",
  description:
    "ရွှေ၊ ရွှေအတု၊ black sand၊ quartz vein၊ မြေဆီလွှာ၊ bedrock နှင့် ဆက်စပ်သတ္တု ၂၇ မျိုးကို ဓာတ်ပုံအစစ်ဖြင့် နှိုင်းယှဉ်ရန်။",
  alternates: {
    canonical: "/my/atlas",
    languages: { "zh-CN": "/atlas", en: "/en/atlas", my: "/my/atlas" },
  },
};

const slugs = [
  "native-gold",
  "pyrite",
  "chalcopyrite",
  "magnetite",
  "muscovite",
  "quartz-vein",
  "panning",
  "sluice",
  "laterite-red",
  "laterite-profile",
  "hematite",
  "grey-clay-profile",
  "conglomerate",
  "black-sand-field",
  "weathered-bedrock",
  "fresh-bedrock",
  "ilmenite-sand",
  "garnet",
  "zircon",
  "chromite",
  "placer-flakes",
  "coarse-pan-gold",
  "arsenopyrite",
  "stibnite",
  "scheelite",
  "galena",
  "sphalerite",
];
const names = [
  "သဘာဝရွှေ",
  "Pyrite · ရွှေအတု",
  "Chalcopyrite",
  "Magnetite",
  "Muscovite mica",
  "Quartz vein",
  "ရွှေကျင်ပန်းကန် အသုံးပြုပုံ",
  "Sluice box",
  "အနီရောင် laterite မြေ",
  "Laterite soil profile",
  "Hematite",
  "မီးခိုးရောင် clay profile",
  "Conglomerate / ရှေးမြစ်ကျောက်စရစ်",
  "Black-sand အနည်",
  "Weathered bedrock",
  "Fresh bedrock",
  "Ilmenite sand",
  "Garnet",
  "Zircon",
  "Chromite",
  "Placer gold flakes",
  "Gold pan ထဲရှိ အရွယ်ကြီးရွှေ",
  "Arsenopyrite",
  "Stibnite",
  "Scheelite",
  "Galena",
  "Sphalerite",
];
const category = (slug: string): ExplorerItem["category"] =>
  ["panning", "sluice"].includes(slug)
    ? "field"
    : [
          "laterite-red",
          "laterite-profile",
          "grey-clay-profile",
          "conglomerate",
          "weathered-bedrock",
          "fresh-bedrock",
        ].includes(slug)
      ? "soil"
      : ["native-gold", "placer-flakes", "coarse-pan-gold"].includes(slug)
        ? "gold"
        : [
              "arsenopyrite",
              "stibnite",
              "scheelite",
              "galena",
              "sphalerite",
            ].includes(slug)
          ? "indicator"
          : ["pyrite", "chalcopyrite", "muscovite"].includes(slug)
            ? "lookalike"
            : "heavy";
const observations: Record<ExplorerItem["category"], string> = {
  gold: "Brassy yellow အရောင်တည်ငြိမ်မှု၊ အနားဝိုင်း/ပြားသော grain၊ မြင့်မားသော density နှင့် ဖိလျှင်ပြားနိုင်မှုကို ကြည့်ပါ။",
  heavy:
    "Grain အရောင်၊ crystal habit၊ သံလိုက်တုံ့ပြန်မှု၊ streak၊ hardness နှင့် concentrate ထဲရှိ အချိုးကို မှတ်ပါ။",
  lookalike:
    "တောက်ပသည့်ထောင့်၊ crystal face၊ cleavage၊ brittle fracture နှင့် streak ကို ရွှေနှင့် နှိုင်းယှဉ်ပါ။",
  indicator:
    "Vein၊ alteration၊ sulphide assemblage နှင့် wall rock ဆက်စပ်မှုကို မူလနေရာတွင် မှတ်တမ်းတင်ပါ။ ဖုန်မရှူပါနှင့်။",
  soil: "မြေလွှာအရောင်တစ်ခုတည်းမဟုတ်ဘဲ contact၊ sorting၊ clast shape၊ cementation နှင့် bedrock relief ကို ကြည့်ပါ။",
  field:
    "Processed volume၊ feed size၊ water flow၊ riffle setting၊ recovery နှင့် tailings loss ကို မှတ်တမ်းတင်ပါ။",
};
const limits: Record<ExplorerItem["category"], string> = {
  gold: "ဓာတ်ပုံနှင့် အဝါရောင်တစ်ခုတည်းက natural gold ကို အတည်မပြုနိုင်ပါ။",
  heavy:
    "Heavy mineral သို့မဟုတ် black sand ရှိခြင်းက ရွှေပါကြောင်း တိုက်ရိုက်မဆိုလိုပါ။",
  lookalike: "တောက်ပသော အဝါရောင် grain ကို ရွှေဟု ချက်ချင်းမခေါ်ရပါ။",
  indicator:
    "ဆက်စပ် sulphide တစ်မျိုးရှိခြင်းက economic gold deposit ကို မသက်သေပြပါ။",
  soil: "မြေအရောင် သို့မဟုတ် bedrock တစ်ခုတည်းမှ grade နှင့် tonnage ကို မခန့်မှန်းရပါ။",
  field:
    "စက်ကိရိယာ သို့မဟုတ် rich pan တစ်ခုသည် မြစ်ပိုင်း၏ representative grade မဟုတ်ပါ။",
};

export default function MyanmarAtlas() {
  const items: ExplorerItem[] = enAtlas.map((x, i) => {
    const kind = category(slugs[i]);
    return {
      slug: slugs[i],
      name: names[i],
      image: `/images/${x[1]}`,
      alt: names[i],
      observe: observations[kind],
      notProof: limits[kind],
      author: x[4],
      license: x[5],
      source: x[6],
      category: kind,
    };
  });
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">VERIFIED PHOTO ATLAS · မြန်မာဘာသာ</p>
        <h1>ဓာတ်ပုံအစစ်ဖြင့် သတ္တု၊ မြေသားနှင့် ကျောက်ကို နှိုင်းယှဉ်ရန်</h1>
        <p className="lead">
          ဓာတ်ပုံ ၂၇ ပုံကို category အလိုက် filter လုပ်ပြီး
          အကြီးချဲ့ကြည့်နိုင်သည်။ ပုံတစ်ပုံတည်းဖြင့် sample ကို အတည်မပြုပါနှင့်။
          ပုံတိုင်းတွင် creator၊ licence နှင့် မူရင်းစာမျက်နှာ ပါရှိသည်။
        </p>
      </div>
      <section className="section">
        <div className="compare">
          <div>
            <strong>ပုံသဏ္ဌာန်ကို ဦးစွာကြည့်ရန်</strong>
            <p>Crystal habit၊ flake၊ grain၊ cleavage နှင့် fracture</p>
          </div>
          <div>
            <strong>ဂုဏ်သတ္တိစမ်းရန်</strong>
            <p>Magnetism၊ streak၊ hardness၊ density နှင့် malleability</p>
          </div>
          <div>
            <strong>နောက်ဆုံးအတည်ပြုရန်</strong>
            <p>
              Representative sampling နှင့် သင့်လျော်သော laboratory analysis
            </p>
          </div>
        </div>
        <AtlasExplorer items={items} lang="my" />
      </section>
    </>
  );
}
