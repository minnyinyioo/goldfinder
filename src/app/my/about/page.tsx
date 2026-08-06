import type { Metadata } from "next";
import { ExternalLink, ShieldAlert, TriangleAlert } from "lucide-react";
import PermitSafetyChecklist from "@/components/PermitSafetyChecklist";

export const metadata: Metadata = {
  title: "လုံခြုံရေးနှင့် တာဝန်ယူမှု | Goldfinder",
  description:
    "ကွင်းဆင်းရွှေရှာဖွေခြင်း၏ water၊ slope၊ excavation၊ chemical၊ permit၊ environment နှင့် coordinate privacy အန္တရာယ်များ။",
  alternates: {
    canonical: "/my/about",
    languages: { "zh-CN": "/about", en: "/en/about", my: "/my/about" },
  },
};

export default function MyanmarAbout() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">SAFETY · ACCESS · LAW · ENVIRONMENT</p>
        <h1>လုံခြုံရေးနှင့် တာဝန်ယူမှု</h1>
        <p className="lead">
          ရွှေရှာဖွေခြင်းသည် ရေစီး၊ မတည်ငြိမ်သောကမ်းပါး၊ တောင်စောင်း၊ abandoned
          working၊ machinery၊ chemical နှင့် ဥပဒေဆိုင်ရာအန္တရာယ် ပါဝင်နိုင်သည်။
        </p>
      </div>
      <article className="content">
        <div className="notice">
          <ShieldAlert size={20} /> Site ထဲဝင်ခြင်း၊ တူးဖော်ခြင်း၊ နမူနာယူခြင်း
          သို့မဟုတ် material ဖယ်ရှားခြင်းမပြုမီ landholder consent နှင့်
          လိုအပ်သော government authorisation အားလုံး ရယူပါ။ Online map သို့မဟုတ်
          GPS point သည် ဝင်ရောက်ခွင့် မဟုတ်ပါ။
        </div>
        <h2>မဖြစ်မနေလိုက်နာရမည့် Field controls</h2>
        <ul>
          <li>
            Remote area တွင် တစ်ဦးတည်းမလုပ်ပါနှင့်။ Check-in plan၊
            communication၊ first aid၊ navigation၊ သောက်ရေနှင့် weather
            protection ယူပါ။
          </li>
          <li>
            ရေမြန်ရာ၊ flood rise၊ undercut bank နှင့် slippery boulder များကို
            စစ်ပြီး life jacket လိုအပ်သည့်နေရာတွင် ဝတ်ပါ။
          </li>
          <li>
            Abandoned mine၊ unsupported excavation သို့မဟုတ် oxygen/gas
            မစစ်ထားသော underground opening ထဲ မဝင်ပါနှင့်။
          </li>
          <li>
            မတည်ငြိမ်သော slope အောက် မရပ်ပါနှင့်။ Hammering လုပ်စဉ် eye
            protection သုံးပြီး အခြားသူနှင့် အကွာအဝေးထားပါ။
          </li>
          <li>
            Sensitive coordinate ကို public report၊ screenshot သို့မဟုတ် social
            media တွင် မထုတ်ပါနှင့်။
          </li>
        </ul>
        <h2>Chemical အန္တရာယ်</h2>
        <div className="notice">
          <TriangleAlert size={20} /> Mercury၊ cyanide၊ acid digestion၊ fire
          assay နှင့် ore crushing ကို အိမ်တွင် သို့မဟုတ်
          လေဝင်လေထွက်မထိန်းချုပ်ထားသောနေရာတွင် မလုပ်ပါနှင့်။ WHO က artisanal and
          small-scale gold mining တွင် mercury အသုံးပြုမှုသည်
          အထူးအန္တရာယ်ရှိကြောင်း ဖော်ပြထားသည်။
        </div>
        <p>
          <a
            className="button secondary"
            href="https://www.who.int/news-room/fact-sheets/detail/mercury-and-health"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} /> WHO mercury and health
          </a>
        </p>
        <h2>Environment နှင့် community</h2>
        <ul>
          <li>
            River channel၊ bank၊ vegetation၊ fish habitat၊ cultural heritage
            နှင့် protected area ကို မပျက်စီးစေပါနှင့်။
          </li>
          <li>
            Excavation ကို လုံခြုံစွာပြန်ဖြည့်ပြီး fuel၊ tailing၊ sediment
            သို့မဟုတ် chemical ကို ရေထဲမလွှတ်ပါနှင့်။
          </li>
          <li>
            Local community၊ customary land use နှင့် site restriction ကို
            လေးစားပါ။ Permit တစ်ခုရှိခြင်းက အခြားဥပဒေအားလုံးမှ ကင်းလွတ်စေခြင်း
            မဟုတ်ပါ။
          </li>
        </ul>
        <h2>Interpretation နယ်နိမိတ်</h2>
        <p>
          Mineral photo၊ visible gold၊ detector response၊ XRF သို့မဟုတ် field
          score သည် deposit၊ grade continuity၊ resource၊ reserve သို့မဟုတ်
          economic viability ကို မသက်သေပြနိုင်ပါ။ Representative sampling၊
          QA/QC၊ accredited laboratory နှင့် qualified professional review
          လိုအပ်သည်။ Emergency ဖြစ်ပါက website ကို မအားကိုးဘဲ ဒေသခံ emergency
          service နှင့် authority ကို ဆက်သွယ်ပါ။
        </p>
      </article>
      <PermitSafetyChecklist lang="my" />
    </>
  );
}
