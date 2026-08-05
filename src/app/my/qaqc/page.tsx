import type { Metadata } from "next";
import QAQCChecker from "@/components/QAQCChecker";

export const metadata: Metadata = {
  title: "ဓာတ်ခွဲအသုတ် QA/QC စစ်ဆေးခြင်း | Goldfinder",
  description:
    "ရွှေနမူနာဓာတ်ခွဲအသုတ်၏ duplicate RPD၊ blank contamination နှင့် CRM recovery ကို မြန်မာဘာသာဖြင့် စစ်ဆေးပါ။",
  alternates: {
    canonical: "/my/qaqc",
    languages: { "zh-CN": "/qaqc", en: "/en/qaqc", my: "/my/qaqc" },
  },
};

export default function Page() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">SAMPLING · ASSAY · VERIFICATION</p>
        <h1>နမူနာနှင့် ဓာတ်ခွဲရလဒ် အရည်အသွေးထိန်းချုပ်မှု</h1>
        <p className="lead">
          Anomaly ကို အဓိပ္ပာယ်ဖော်ခြင်းထက် QA/QC ကို ဦးစွာထားပါ။ Control
          မအောင်မြင်သောအသုတ်မှ တန်ဖိုးမြင့်ရလဒ်ကို ယာယီရပ်ထားပြီး အကြောင်းရင်းကို
          စုံစမ်းရမည်။
        </p>
      </div>
      <QAQCChecker lang="my" />
      <section className="content">
        <h2>Control တစ်မျိုးစီက ဖြေဆိုပေးသည့် မေးခွန်း</h2>
        <ul>
          <li><strong>Field duplicate:</strong> သဘာဝမညီညာမှုနှင့် ကွင်းဆင်းနမူနာယူခြင်း၏ precision ကို စစ်သည်။</li>
          <li><strong>Blank:</strong> crushing၊ pulverising၊ transfer သို့မဟုတ် analysis အတွင်း carry-over contamination ရှိမရှိ စစ်သည်။</li>
          <li><strong>CRM:</strong> certificate တန်ဖိုးနှင့်နှိုင်းယှဉ်၍ analytical accuracy နှင့် drift ကို စစ်သည်။ Sample matrix နှင့် target grade ကိုက်ညီသော CRM ရွေးရမည်။</li>
        </ul>
        <div className="notice">
          Detection limit နီးသော duplicate များတွင် RPD မတည်ငြိမ်နိုင်ပြီး coarse gold ၏ nugget effect ကြောင့် ကွာဟချက်ကြီးနိုင်သည်။ Percentage threshold တစ်ခုတည်းကို material အားလုံးအတွက် မသုံးရပါ။
        </div>
        <h2>Control fail ဖြစ်လျှင် လုပ်ဆောင်ရမည့်အစီအစဉ်</h2>
        <ol>
          <li>Fail ဖြစ်သော control နှင့် အနီးရှိ routine samples ကို ခွဲထားပြီး ရလဒ်ထုတ်ပြန်ခြင်း ရပ်ပါ။</li>
          <li>Unit၊ detection limit၊ CRM certificate value၊ sample sequence နှင့် data entry ကို စစ်ပါ။</li>
          <li>Blank ၏တည်နေရာဖြင့် contamination interval၊ CRM behaviour ဖြင့် analytical drift ကို ခွဲခြားပါ။</li>
          <li>ဓာတ်ခွဲခန်းနှင့်ညှိနှိုင်း၍ re-read၊ re-assay သို့မဟုတ် coarse reject မှ re-prepare လုပ်ရန် ဆုံးဖြတ်ပါ။</li>
          <li>မူလရလဒ်၊ ထပ်မံစမ်းသပ်ရလဒ်နှင့် ဆုံးဖြတ်ချက်အားလုံးကို မဖျက်ဘဲ သိမ်းဆည်းပါ။</li>
        </ol>
        <p>
          <a className="button secondary" href="https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist" target="_blank" rel="noreferrer">
            USGS geochemical QA/QC လမ်းညွှန်
          </a>
        </p>
      </section>
    </>
  );
}
