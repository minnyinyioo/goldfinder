import SamplingCalculator from "@/components/SamplingCalculator";
import ContentReviewPanel from "@/components/ContentReviewPanel";
const soils = [
  [
    "均一细砂/粉砂",
    "优先量取原位几何体积或校准容器；跨同一沉积单元做组合样。",
    "小样可用于找异常，但粗粒金可能完全漏掉；不要把精矿重量当原土体积。",
  ],
  [
    "砂砾石",
    "记录最大粒径与筛上物；样品必须代表完整粒级。挖松体积应换算原位体积。",
    "BLM 指出普通砾石挖松膨胀可平均约 14%，现场实际值应由对比测量确定。",
  ],
  [
    "巨砾/卵石层",
    "使用试坑或沟槽取得足够体积，并记录剔除巨石的尺寸和占比。",
    "几盘样品通常不能代表含巨砾层；不能只挑细料或黑砂。",
  ],
  [
    "黏土假底/基岩接触",
    "把接触面上方薄层、黏土表面和裂缝材料分开编号，记录面积与厚度。",
    "选择性清理裂缝样只能说明陷阱是否有金，不能代表整层平均品位。",
  ],
  [
    "黑砂精矿",
    "必须追溯产生该精矿的原始砂砾体积；称量精矿可用于回收流程记录。",
    "黑砂比例与黄金品位没有固定换算关系。",
  ],
  [
    "红土/残积土",
    "按土层、坡位和网格做等间距样；质量品位可用 mg/kg，体积品位需要实测容重。",
    "土色不能决定取样量或含金量，局部残积粗金仍会造成块金效应。",
  ],
];
export default function Sampling() {
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">PLACER SAMPLING · CALCULATION · QA/QC</p>
        <h1>取样公式与品位工具</h1>
        <p className="lead">
          把“取了多少土、回收多少金”转换为可比较的样品结果，同时保留体积状态、含水率、土体密度、回收率和重复样差异。
        </p>
        <ContentReviewPanel topic="sampling" />
      </div>
      <SamplingCalculator />
      <section className="content">
        <h2>没有一个适用于所有砂矿的固定取样量</h2>
        <p>
          取样量取决于最大粒径、金粒大小、品位变化、取样目的和允许误差。BLM
          指南强调较大、较密的样品通常更可靠；USGS
          说明粗粒自然金会产生明显的“块金效应”，小样可能碰巧含一粒金而极高，也可能完全漏掉。
        </p>
        <div className="notice">
          <strong>实用顺序：</strong>先用校准容器做定向样 →
          在同一位置增加累计体积 → 分批记录每一增量回收金 →
          当累计品位仍大幅波动时继续增大样品并增加重复样。侦察淘金盘只能筛选位置，不能直接成为资源品位。
        </div>
        <h2>根据实际土质设计</h2>
        {soils.map((x) => (
          <section className="card" key={x[0]} style={{ marginBottom: 12 }}>
            <h3>{x[0]}</h3>
            <p>
              <strong>怎么取：</strong>
              {x[1]}
            </p>
            <p>
              <strong>不能漏：</strong>
              {x[2]}
            </p>
          </section>
        ))}
        <h2>公式解释</h2>
        <ul>
          <li>
            <strong>原位体积：</strong>未挖动地层的体积，是报告 `g/m³ bank`
            的基准。
          </li>
          <li>
            <strong>挖松体积：</strong>
            挖出后孔隙增加的体积；不能直接当成原位体积。
          </li>
          <li>
            <strong>回收率修正：</strong>
            只有通过尾矿检查或已知加标试验得到可辩护回收率时才使用；否则同时报告“实际回收品位”。
          </li>
          <li>
            <strong>含水率：</strong>
            工具采用水重/干土重的重量含水率定义，不能混用湿基百分数。
          </li>
          <li>
            <strong>重复样 RPD：</strong>用于显示两个结果相对差异；粗金样中高
            RPD 不应被简单平均后忽略。
          </li>
        </ul>
        <h2>权威依据</h2>
        <p>
          <a
            className="button secondary"
            href="https://www.blm.gov/sites/default/files/docs/2026-04/PMRN_101_Guidebook_BLM_AK.pdf"
            target="_blank"
            rel="noreferrer"
          >
            BLM Alaska Placer Mining 101（2026）
          </a>
        </p>
        <p>
          <a
            className="button secondary"
            href="https://pubs.usgs.gov/gip/prospect1/goldgip.html"
            target="_blank"
            rel="noreferrer"
          >
            USGS Gold：g/m³ 与砂金品位
          </a>
        </p>
        <p>
          <a
            className="button secondary"
            href="https://pubs.usgs.gov/of/2008/1132/pdf/Pebble_OFR_2008-1132.pdf"
            target="_blank"
            rel="noreferrer"
          >
            USGS：块金效应与较大分析样
          </a>
        </p>
        <p>
          <a
            className="button secondary"
            href="https://www.usgs.gov/publications/quality-assurance-and-quality-control-geochemical-data-a-primer-research-scientist"
            target="_blank"
            rel="noreferrer"
          >
            USGS 地球化学 QA/QC 指南
          </a>
        </p>
      </section>
    </>
  );
}
