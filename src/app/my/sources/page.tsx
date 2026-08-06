import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "အချက်အလက်နှင့် ဓာတ်ပုံအရင်းအမြစ် | Goldfinder",
  description:
    "Goldfinder မြန်မာဘာသာ၏ geology၊ sampling၊ QA/QC၊ safety နှင့် image licensing မူရင်းအရင်းအမြစ်များ။",
  alternates: {
    canonical: "/my/sources",
    languages: { "zh-CN": "/sources", en: "/en/sources", my: "/my/sources" },
  },
};

const sources = [
  [
    "USGS — Gold",
    "ရွှေ၏ physical properties၊ lode/placer formation နှင့် gravity concentration။",
    "https://pubs.usgs.gov/gip/prospect1/goldgip.html",
  ],
  [
    "USGS — Prospecting for Gold in the United States",
    "Placer environment၊ panning၊ land access နှင့် prospecting limitation။",
    "https://pubs.usgs.gov/gip/prospect2/prospectgip.html",
  ],
  [
    "USGS Bulletin 1857-G",
    "Placer gold formation၊ transport၊ preservation နှင့် reconcentration။",
    "https://pubs.usgs.gov/publication/b1857G",
  ],
  [
    "USGS — Geochemical data QA/QC primer",
    "Planning၊ contamination၊ duplicates၊ CRM နှင့် data interpretation။",
    "https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist",
  ],
  [
    "USGS Circular 1138",
    "Geochemical sample chain of custody နှင့် evidence handling။",
    "https://pubs.usgs.gov/circ/1997/c1138/c1138.htm",
  ],
  [
    "Geoscience Australia AIMR 2025",
    "Mineral-resource context နှင့် gold mineralisation အကိုးအကား။",
    "https://www.ga.gov.au/aimr2025",
  ],
  [
    "WHO — Mercury and health",
    "Artisanal and small-scale gold mining တွင် mercury exposure နှင့် ကျန်းမာရေးအန္တရာယ်။",
    "https://www.who.int/news-room/fact-sheets/detail/mercury-and-health",
  ],
  [
    "WIPO Lex — Myanmar Copyright Law",
    "Law No. 15/2019 ၏ မြန်မာနှင့် English မူရင်းစာသား။",
    "https://www.wipo.int/wipolex/en/legislation/details/22939",
  ],
  [
    "WIPO — Berne Convention summary",
    "National treatment၊ automatic protection နှင့် independence of protection။",
    "https://www.wipo.int/en/web/treaties/ip/berne/summary_berne",
  ],
  [
    "Wikimedia Commons",
    "ဓာတ်ပုံတစ်ပုံချင်း၏ creator၊ original file နှင့် licence record။",
    "https://commons.wikimedia.org/",
  ],
] as const;

export default function MyanmarSources() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">REFERENCES · IMAGE CREDITS · LICENCES</p>
        <h1>အချက်အလက်နှင့် ဓာတ်ပုံအရင်းအမြစ်</h1>
        <p className="lead">
          Geological survey၊ government publication၊ international public-health
          guidance နှင့် provenance စစ်နိုင်သော open-licence media ကို
          ဦးစားပေးထားသည်။
        </p>
      </div>
      <article className="content">
        {sources.map(([title, description, url], index) => (
          <section key={url}>
            <h2>
              {index + 1}. {title}
            </h2>
            <p>{description}</p>
            <a
              className="button secondary"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              မူရင်းအရင်းအမြစ်ဖွင့်ရန်
            </a>
          </section>
        ))}
        <div className="notice">
          အချက်အလက် source နှင့် image licence ကို သီးခြားမှတ်တမ်းတင်ထားသည်။
          External source ပြောင်းလဲနိုင်သဖြင့် legal၊ licence၊ resource နှင့်
          safety ဆုံးဖြတ်ချက်ကို local authority နှင့် qualified professional ထံ
          ထပ်မံအတည်ပြုပါ။
        </div>
      </article>
    </>
  );
}
