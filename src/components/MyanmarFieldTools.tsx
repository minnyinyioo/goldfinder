import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  Compass,
  Filter,
  FlaskConical,
  Focus,
  Gauge,
  Grid3X3,
  Hammer,
  Magnet,
  MapPin,
  Microscope,
  RadioTower,
  ScanSearch,
  Shovel,
  Waves,
} from "lucide-react";
import "./field-tools-guide.css";
type Tool = {
  name: string;
  icon: LucideIcon;
  can: string;
  cannot: string;
  steps: string;
  error: string;
  record: string;
};
const tools: Tool[] = [
  {
    name: "ရွှေကျင်ပန်းကန်",
    icon: Waves,
    can: "Density ကွာခြားမှုဖြင့် sand/gravel မှ heavy-mineral concentrate ကို တဖြည်းဖြည်းခွဲပြီး reconnaissance နှင့် tailings check လုပ်နိုင်သည်။",
    cannot:
      "Pan တစ်ခုသည် မြစ်ပိုင်းပျမ်းမျှ grade မဟုတ်သကဲ့သို့ fine gold အားလုံး recovery ရသည်ဟု မဆိုနိုင်ပါ။",
    steps:
      "မူလ feed volume တိုင်းရန် → clay ကို အပြည့်ဖြေဖျက်ရန် → light mineral ကို ဖြည်းဖြည်းဖယ်ရန် → concentrate အားလုံးသိမ်းရန်။",
    error:
      "Feed များလွန်းခြင်း၊ လှုပ်ရှားမှုကြမ်းခြင်း၊ clay ball မဖြေခြင်းနှင့် အကောင်းဆုံး pan ကိုသာသိမ်းခြင်း။",
    record:
      "Volume၊ size fraction၊ pan count၊ concentrate mass၊ visible-gold count နှင့် operator။",
  },
  {
    name: "Sluice၊ matting နှင့် riffle",
    icon: Filter,
    can: "Material ကို ဆက်တိုက်လုပ်ဆောင်ပြီး low-velocity pocket တွင် density မြင့် grain ကို ထိန်းနိုင်သည်။",
    cannot:
      "Sluice ရှိခြင်းက recovery သိပြီးဖြစ်သည်ဟု မဆိုလိုပါ။ Coarse နှင့် very fine gold အတွက် setting မတူနိုင်သည်။",
    steps:
      "Known feed ဖြင့် slope/flow calibrate → ညီညာစွာ feed → batch အလိုက် cleanup → tailings စစ်ရန်။",
    error:
      "Slope မတ်လွန်းခြင်း၊ ရေမတည်ငြိမ်ခြင်း၊ clay ball နှင့် mat overload ဖြစ်သော်လည်း ဆက်လည်ခြင်း။",
    record:
      "Width၊ slope၊ flow၊ feed rate၊ run time၊ cleanup batch နှင့် tailings result။",
  },
  {
    name: "စစ်ကာ / sieve",
    icon: Grid3X3,
    can: "Maximum particle size ကို စံပြု၍ fraction များခွဲကာ sample များကို နှိုင်းယှဉ်နိုင်စေသည်။",
    cannot:
      "Sieving သည် gold ကို identify မလုပ်နိုင်ဘဲ cobble ပေါ်က fines ကို မဆေးလျှင် ဆုံးရှုံးနိုင်သည်။",
    steps:
      "Aperture မှတ် → wet-sieve → oversize မျက်နှာပြင်ဆေး → fraction တစ်ခုချင်းသိမ်း/ချိန်။",
    error:
      "Sample တစ်ခုစီ aperture မတူဘဲ တိုက်ရိုက်နှိုင်းခြင်း သို့မဟုတ် oversize ကို မစစ်ဘဲပစ်ခြင်း။",
    record: "Aperture၊ wet/dry method၊ fraction mass/volume နှင့် loss။",
  },
  {
    name: "သံလိုက်",
    icon: Magnet,
    can: "Strongly magnetic grain ကို ခွဲကာ magnetite-rich concentrate ကို characterise လုပ်နိုင်သည်။",
    cannot:
      "Gold ကို သာမန် magnet မဆွဲပါ။ Non-magnetic ဖြစ်ခြင်းက gold ဖြစ်ကြောင်းမသက်သေပြပါ။",
    steps:
      "Magnet ကို plastic ဖြင့်ဖုံး → dry concentrate သို့ အဆင့်လိုက်နီး → magnetic/non-magnetic နှစ်ပိုင်းလုံးသိမ်း။",
    error:
      "Wet concentrate ကို တိုက်ရိုက်ထိခြင်းနှင့် black sand အားလုံးကို magnetite ဟုယူခြင်း။",
    record:
      "Magnet type၊ distance၊ pass count၊ magnetic proportion နှင့် photo။",
  },
  {
    name: "လက်ကိုင်မှန်ဘီလူးနှင့် microscope",
    icon: Microscope,
    can: "Crystal habit၊ cleavage၊ flake၊ striation နှင့် abrasion ကို ကြည့်နိုင်သည်။",
    cannot:
      "ချဲ့ကြည့်သောအပြင်ပန်းက elemental concentration သို့မဟုတ် grade ကို မပေးနိုင်ပါ။",
    steps:
      "Sample သန့်စင် → scale နှင့် တည်ငြိမ်အလင်းသုံး → ထောင့်အမျိုးမျိုးကြည့် → မပြင်ထားသောပုံသိမ်း။",
    error:
      "အလင်းအရောင်တစ်မျိုးကိုသာ ယုံခြင်း၊ scale မပါခြင်းနှင့် တောက်ပ grain ကိုသာရွေးခြင်း။",
    record:
      "Magnification၊ lighting၊ grain size၊ form၊ image ID နှင့် provisional interpretation။",
  },
  {
    name: "ဘူမိဗေဒတူ",
    icon: Hammer,
    can: "Fresh rock surface ဖော်ပြီး weathering၊ structure နှင့် mineral ကို စစ်နိုင်သည်။",
    cannot: "Hammer response သို့မဟုတ် fresh break က gold ကို မသက်သေပြပါ။",
    steps:
      "မျက်မှန်တပ် → fly-rock direction စစ် → တည်ငြိမ် outcrop မှ sample သေးယူ → in-situ photo သိမ်း။",
    error:
      "မတည်ငြိမ် slope အောက်တွင်ထုခြင်း၊ protected outcrop ဖျက်ခြင်းနှင့် permission မရှိခြင်း။",
    record:
      "Location၊ face orientation၊ weathering၊ sample ID နှင့် safety condition။",
  },
  {
    name: "ဘူမိဗေဒ compass",
    icon: Compass,
    can: "Vein၊ fault၊ bedding နှင့် joint ၏ strike/dip ကို တိုင်းနိုင်သည်။",
    cannot:
      "Reading တစ်ခုက curved သို့မဟုတ် irregular structure တစ်ခုလုံးကို မကိုယ်စားပြုပါ။",
    steps:
      "Magnetic object ရှောင် → declination သတ်မှတ် → planar surface တွင် repeat → notation convention မှတ်။",
    error:
      "Phone/hammer နီးခြင်း၊ true north နှင့် magnetic north ရောခြင်း၊ format မဖော်ပြခြင်း။",
    record:
      "North reference၊ declination၊ strike၊ dip direction၊ dip၊ feature type နှင့် repeats။",
  },
  {
    name: "GNSS / GPS",
    icon: MapPin,
    can: "Sample position၊ track၊ time နှင့် device-estimated accuracy ကို သိမ်းနိုင်သည်။",
    cannot:
      "Decimal များခြင်းသည် accuracy မြင့်ခြင်းမဟုတ်ပါ။ Canyon နှင့် canopy တွင် error ကြီးနိုင်သည်။",
    steps:
      "Fix တည်ငြိမ်အောင်စောင့် → CRS မှတ် → reading ထပ်ယူ → ပြန်ရှာနိုင်သော location description ထည့်။",
    error:
      "WGS84/local grid ရောခြင်း၊ latitude/longitude ပြောင်းခြင်းနှင့် sensitive prospect ကို public လုပ်ခြင်း။",
    record:
      "Coordinate၊ CRS၊ accuracy၊ device၊ time နှင့် generalised ဖြစ်/မဖြစ်။",
  },
  {
    name: "Metal detector",
    icon: RadioTower,
    can: "Shallow conductive target၊ larger nugget နှင့် metal contamination ကို တုံ့ပြန်နိုင်သည်။",
    cannot:
      "Signal သည် gold identification မဟုတ်ဘဲ fine placer gold သည် practical detection အောက်တွင်ရှိတတ်သည်။",
    steps:
      "Local ground/known target စမ်း → grid scan → direction နှစ်ခု cross-check → digging permission စစ်။",
    error:
      "Iron litter နှင့် mineralised ground မတွက်ခြင်း၊ strong signal ကိုသာ report လုပ်ခြင်း။",
    record:
      "Model၊ coil၊ mode၊ sensitivity၊ ground balance၊ depth နှင့် repeat response။",
  },
  {
    name: "Specific-gravity တိုင်းတာခြင်း",
    icon: Gauge,
    can: "Competent non-porous specimen ကို air/water weight ကွာခြားမှုဖြင့် density ခန့်မှန်းနိုင်သည်။",
    cannot:
      "Porosity၊ crack၊ bubble နှင့် mixed mineral ကြောင့် error ကြီးနိုင်သည်။",
    steps:
      "Balance calibrate → dry weight → bubble ဖယ်ပြီး submerged weight → repeat နှင့် water temperature မှတ်။",
    error:
      "Water absorption၊ suspension buoyancy မပြင်ခြင်းနှင့် mixed rock ကို single mineral density ဟုယူခြင်း။",
    record:
      "Weight နှစ်ခု၊ temperature၊ correction၊ repeat difference နှင့် formula။",
  },
  {
    name: "လက်ကိုင် XRF",
    icon: ScanSearch,
    can: "Element များစွာကို screening လုပ်ပြီး lithology၊ alteration နှင့် contamination assessment ကို ကူညီနိုင်သည်။",
    cannot:
      "ပုံမှန် field condition တွင် low-level gold ကို ယုံကြည်ရအောင်တိုင်းရန် မသင့်တော်ပါ။ Representative sampling ကို မအစားထိုးပါ။",
    steps:
      "Suitable calibration → flat homogeneous sample → blank/reference တိုင်း → spectrum/raw result အားလုံးသိမ်း။",
    error:
      "Wet heterogeneous rock ကို တိုက်ရိုက်တိုင်းခြင်း၊ matrix effect/detection limit မတွက်ခြင်း။",
    record:
      "Model၊ mode၊ time၊ calibration၊ reference material၊ detection limit၊ preparation နှင့် raw file။",
  },
  {
    name: "Fire assay",
    icon: FlaskConical,
    can: "Fusion ဖြင့် precious metal ကို concentrate လုပ်ပြီး quantitative gold analysis အတွက် အသုံးများသည်။",
    cannot:
      "Result သည် submitted test portion ကိုသာကိုယ်စားပြုပြီး coarse gold ကြောင့် representativity error ရှိနိုင်သည်။",
    steps:
      "Qualified lab ရွေး → test mass/finish သတ်မှတ် → blank၊ duplicate၊ CRM ထည့် → anomaly ကို repeat။",
    error:
      "Coarse-gold sample အတွက် test portion သေးလွန်းခြင်း၊ unit မစစ်ခြင်းနှင့် anomaly မပြန်စစ်ခြင်း။",
    record:
      "Laboratory၊ method code၊ test mass၊ detection limit၊ QA/QC batch နှင့် certificate။",
  },
  {
    name: "ICP-MS / ICP-OES",
    icon: Focus,
    can: "Appropriate digestion ပြီးနောက် multi-element composition ကို တိုင်း၍ geochemical interpretation လုပ်နိုင်သည်။",
    cannot:
      "Incomplete digestion သည် total concentration မဟုတ်ပါ။ Gold suitability သည် preparation၊ mass နှင့် limit ပေါ်မူတည်သည်။",
    steps:
      "Target element/total-vs-leachable သတ်မှတ် → digestion ရွေး → QA/QC run → over-range result ပြန်တိုင်း။",
    error:
      "Digestion method မဖတ်ခြင်း၊ below detection ကို zero ဟုယူခြင်းနှင့် ppm/ppb/% ရောခြင်း။",
    record:
      "Digestion၊ instrument method၊ unit၊ limit၊ dilution၊ over-range handling နှင့် QA/QC။",
  },
  {
    name: "Sample bag၊ label နှင့် seal",
    icon: Shovel,
    can: "Sample identity၊ integrity နှင့် traceable chain of custody ကို ထိန်းနိုင်သည်။",
    cannot:
      "Label က unrepresentative sampling သို့မဟုတ် contamination ကို မပြင်နိုင်ပါ။",
    steps:
      "Unique ID → အတွင်း/အပြင် label → seal/sign → transfer တိုင်း time/person မှတ်။",
    error: "ရေစိုပျက် ink၊ duplicate ID နှင့် bag/register မကိုက်ခြင်း။",
    record:
      "Project၊ ID၊ type၊ date၊ collector၊ seal၊ recipient နှင့် exception။",
  },
];
export default function MyanmarFieldTools() {
  return (
    <>
      <div className="page-head tools-head">
        <p className="eyebrow">FIELD TOOLS · LIMITS · RECORDING · မြန်မာဘာသာ</p>
        <h1>ကွင်းဆင်းကိရိယာနှင့် ဓာတ်ခွဲနည်းလမ်း</h1>
        <p className="lead">
          ကိရိယာတစ်ခုသည် ဒီဇိုင်းထားသောမေးခွန်းကိုသာ ဖြေနိုင်သည်။ Model၊
          setting၊ calibration၊ detection limit နှင့် raw output ကို
          မှတ်တမ်းတင်ပြီး signal ကို gold conclusion အဖြစ်
          တိုက်ရိုက်မပြောင်းပါနှင့်။
        </p>
      </div>
      <section className="section">
        <div className="tool-photo-grid">
          <figure>
            <Image
              src="/images/panning.jpg"
              alt="မြစ်ချောင်းတွင် ရွှေကျင်ပန်းကန်အသုံးပြုခြင်း"
              width={900}
              height={620}
            />
            <figcaption>BLM Alaska · Public Domain</figcaption>
          </figure>
          <figure>
            <Image
              src="/images/sluice.jpg"
              alt="သမိုင်းဝင် sluice operation"
              width={900}
              height={620}
            />
            <figcaption>
              University of Washington Libraries · Public Domain
            </figcaption>
          </figure>
        </div>
        <div className="tool-grid">
          {tools.map((x, i) => (
            <article className="card tool-card" key={x.name}>
              <div className="tool-title">
                <x.icon size={24} aria-hidden="true" />
                <span>{String(i + 1).padStart(2, "0")}</span>
                <h2>{x.name}</h2>
              </div>
              <dl>
                <div>
                  <dt>လုပ်နိုင်သည့်အရာ</dt>
                  <dd>{x.can}</dd>
                </div>
                <div>
                  <dt>မဆုံးဖြတ်နိုင်သည့်အရာ</dt>
                  <dd>{x.cannot}</dd>
                </div>
                <div>
                  <dt>လုပ်ငန်းအစဉ်</dt>
                  <dd>{x.steps}</dd>
                </div>
                <div>
                  <dt>အများဆုံးအမှား</dt>
                  <dd>{x.error}</dd>
                </div>
                <div>
                  <dt>မဖြစ်မနေမှတ်တမ်း</dt>
                  <dd>{x.record}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
        <div className="notice">
          လုံခြုံရေးနှင့် permission ကို ဦးစားပေးပါ။ မတည်ငြိမ် slope၊ flood
          condition သို့မဟုတ် land access မရှိသောနေရာတွင် မလုပ်ပါနှင့်။ Chemical
          analysis၊ XRF နှင့် fire assay ကို trained personnel သို့မဟုတ်
          qualified laboratory ကသာ လုပ်ရမည်။
        </div>
      </section>
    </>
  );
}
