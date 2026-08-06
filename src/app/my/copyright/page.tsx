import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "မူပိုင်ခွင့်နှင့် Disclaimer | Goldfinder",
  description:
    "Goldfinder ၏ third-party ဓာတ်ပုံ၊ အချက်အလက်၊ attribution၊ open licence နှင့် professional disclaimer မူဝါဒ။",
  alternates: {
    canonical: "/my/copyright",
    languages: {
      "zh-CN": "/copyright",
      en: "/en/copyright",
      my: "/my/copyright",
    },
  },
};

const legal = [
  [
    "WIPO Lex — မြန်မာနိုင်ငံ မူပိုင်ခွင့်ဥပဒေ (Law No. 15/2019)",
    "မြန်မာနှင့် English မူရင်းဥပဒေစာသား၊ economic rights၊ moral rights၊ limitation နှင့် public-domain ဆိုင်ရာပြဋ္ဌာန်းချက်များ။",
    "https://www.wipo.int/wipolex/en/legislation/details/22939",
  ],
  [
    "WIPO — Berne Convention အကျဉ်းချုပ်",
    "National treatment၊ automatic protection နှင့် independence of protection စသည့် နိုင်ငံတကာအခြေခံမူများ။",
    "https://www.wipo.int/en/web/treaties/ip/berne/summary_berne",
  ],
  [
    "Creative Commons BY 4.0",
    "Share/adapt လုပ်နိုင်သော်လည်း creator credit၊ licence link နှင့် ပြုပြင်ထားမှုကို ဖော်ပြရသည်။",
    "https://creativecommons.org/licenses/by/4.0/deed.en",
  ],
  [
    "Creative Commons BY-SA 4.0",
    "Attribution အပြင် adapted material ကို တူညီသော သို့မဟုတ် compatible licence ဖြင့် ဖြန့်ချိရသည်။",
    "https://creativecommons.org/licenses/by-sa/4.0/deed.en",
  ],
  [
    "Wikimedia Commons reuse guide",
    "File တစ်ခုချင်းစီ၏ creator၊ licence version၊ source link နှင့် modification requirement ကို စစ်ရန်။",
    "https://commons.wikimedia.org/wiki/Commons:Reusing_content_outside_Wikimedia/en",
  ],
] as const;

export default function MyanmarCopyright() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">COPYRIGHT · ATTRIBUTION · DISCLAIMER</p>
        <h1>မူပိုင်ခွင့်နှင့် Disclaimer</h1>
        <p className="lead">
          Third-party ဓာတ်ပုံနှင့် အချက်အလက်များကို မည်သို့ရွေးချယ်၊ စုစည်း၊
          ဖော်ပြထားသည်ကို ရှင်းလင်းသည့် transparency statement ဖြစ်ပြီး
          ဥပဒေအကြံဉာဏ် မဟုတ်ပါ။
        </p>
      </div>
      <article className="content">
        <h2>၁။ အခွင့်အရေးပိုင်ဆိုင်မှု</h2>
        <p>
          Third-party ဓာတ်ပုံ၊ ပုံကြမ်း၊ report၊ paper နှင့် external material
          တို့၏ copyright နှင့် related rights သည် သက်ဆိုင်ရာ creator၊
          photographer၊ institution သို့မဟုတ် rightsholder ထံတွင်သာ ရှိသည်။ CC0
          သို့မဟုတ် public domain ဟု သတ်မှတ်ထားသည့် material ကို ထို status
          အတိုင်း အသုံးပြုပြီး provenance ကို ဖြစ်နိုင်သမျှ ထိန်းသိမ်းထားသည်။
        </p>
        <p>
          Goldfinder သည် third-party material ကို ပိုင်ဆိုင်ကြောင်း မဆိုလိုသလို
          creator၊ Wikimedia Commons၊ USGS၊ WIPO၊ WHO သို့မဟုတ် အခြားအဖွဲ့အစည်းက
          ဤ site ကို endorse သို့မဟုတ် sponsor လုပ်သည်ဟုလည်း မဆိုလိုပါ။
        </p>
        <h2>၂။ ပညာပေးစုစည်းမှု၏ နယ်နိမိတ်</h2>
        <p>
          Licence အရ ပြန်လည်အသုံးပြုနိုင်သော material ကို ရွေးချယ်၊
          အမျိုးအစားခွဲ၊ compress၊ responsive crop လုပ်ပြီး မူရင်းမဟုတ်သော
          ပညာပေးရှင်းလင်းချက် ထည့်ထားသည်။ “ပညာပေးရည်ရွယ်ချက်” သို့မဟုတ် source
          link ထည့်ထားခြင်းတစ်ခုတည်းကြောင့် ခွင့်ပြုချက်မလိုဟု မဆိုနိုင်ပါ။
          Image entry တစ်ခုချင်း၏ creator၊ licence၊ source page နှင့်
          modification requirement ကို လိုက်နာရမည်။
        </p>
        <h2>၃။ Licence အမျိုးအစားများ</h2>
        <ul>
          <li>
            <strong>CC BY:</strong> သင့်လျော်သော credit၊ source နှင့် licence
            link၊ ပြုပြင်ထားမှုရှိလျှင် ထိုအချက်ကို ဖော်ပြပါ။
          </li>
          <li>
            <strong>CC BY-SA:</strong> အထက်ပါအချက်များအပြင် adaptation ကို
            တူညီသော သို့မဟုတ် compatible licence ဖြင့် မျှဝေရသည်။
          </li>
          <li>
            <strong>CC0 / Public Domain:</strong> Copyright permission
            မလိုနိုင်သော်လည်း jurisdiction နှင့် အခြား rights ကွာခြားနိုင်သဖြင့်
            source ကို ဆက်လက်ဖော်ပြထားသည်။
          </li>
          <li>
            <strong>All rights reserved:</strong>{" "}
            အလိုအလျောက်ပြန်လည်အသုံးပြုခွင့် မရှိပါ။ Rightsholder permission
            သို့မဟုတ် သက်ဆိုင်ရာဥပဒေ exception လိုအပ်သည်။
          </li>
        </ul>
        <h2>၄။ နိုင်ငံတကာနှင့် မြန်မာအခြေအနေ</h2>
        <p>
          WIPO ၏ Berne Convention အကျဉ်းချုပ်တွင် national treatment၊ automatic
          protection နှင့် independence of protection ကို ဖော်ပြထားသည်။
          Copyright သည် territorial ဖြစ်ပြီး exception၊ moral rights၊ privacy၊
          publicity၊ trademark နှင့် traditional knowledge စည်းမျဉ်းများသည်
          နိုင်ငံအလိုက်ကွာခြားသည်။ မြန်မာနိုင်ငံအတွက် WIPO Lex တွင် Law No.
          15/2019 ၏ မြန်မာနှင့် English စာသားရှိသော်လည်း လက်ရှိအာဏာသက်ရောက်မှု၊
          notification နှင့် သီးခြားအသုံးပြုမှုကို အရည်အချင်းရှိသော
          ဒေသခံဥပဒေပညာရှင်နှင့် စစ်ဆေးရမည်။
        </p>
        <h2>၅။ Correction နှင့် takedown</h2>
        <p>
          Attribution၊ licence၊ provenance၊ crop သို့မဟုတ် အသုံးပြုမှုတွင်
          ပြဿနာရှိသည်ဟု rightsholder က ယူဆပါက project GitHub repository တွင်
          မူရင်းလင့်ခ်၊ အခွင့်အရေးအထောက်အထားနှင့် လိုချင်သည့်ဖြေရှင်းချက်ကို
          တင်ပြနိုင်သည်။ စစ်ဆေးပြီး credit ပြင်ခြင်း၊ material အစားထိုးခြင်း
          သို့မဟုတ် ဖယ်ရှားခြင်း ပြုလုပ်မည်။
        </p>
        <h2>၆။ Professional disclaimer</h2>
        <p>
          ဓာတ်ပုံတစ်ပုံသည် mineral identity၊ grade၊ deposit၊ resource၊ reserve
          သို့မဟုတ် စီးပွားရေးတန်ဖိုးကို အတည်မပြုနိုင်ပါ။ ဤ site သည် legal၊
          geological engineering၊ mining၊ safety သို့မဟုတ် investment advice
          မပေးပါ။ Local permit၊ land access နှင့် အရေးကြီးဆုံးဖြတ်ချက်များကို
          သက်ဆိုင်ရာအာဏာပိုင်နှင့် qualified professional ထံ အတည်ပြုပါ။
        </p>
        <h2>တရားဝင်မူရင်းလင့်ခ်များ</h2>
        {legal.map(([title, description, url]) => (
          <section key={url}>
            <h3>{title}</h3>
            <p>
              {description}{" "}
              <a
                className="button secondary"
                href={url}
                target="_blank"
                rel="noreferrer"
              >
                မူရင်းစာမျက်နှာဖွင့်ရန်
              </a>
            </p>
          </section>
        ))}
        <div className="notice">
          နောက်ဆုံးပြန်လည်စစ်ဆေးသည့်နေ့ — ၂၀၂၆-၀၈-၀၆။ Licence နှင့် ဥပဒေ
          ပြောင်းလဲနိုင်သဖြင့် မူရင်း file page၊ licence legal code နှင့်
          အသုံးပြုရာနေရာ၏ ဥပဒေကို ဦးစားပေးပါ။
        </div>
      </article>
    </>
  );
}
