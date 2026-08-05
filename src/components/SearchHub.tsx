"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  BookOpen,
  Camera,
  ClipboardCheck,
  FileText,
  Map,
  Mountain,
  Search,
  TestTubes,
  Wrench,
  X,
} from "lucide-react";
import { atlasItems } from "@/data/media";
import { enAtlas } from "@/data/english";
import "./search-hub.css";
type Lang = "zh" | "en";
type Item = {
  title: string;
  summary: string;
  keywords: string;
  href: string;
  category: string;
  image?: string;
};
const pages = {
  zh: [
    ["现场判断与自动报告","合并评估砂金与山金线索，生成评分、待补项目、下一步动作及可打印报告。","现场评分 判断报告 砂金 山金 优先级 打印 PDF 样品草稿","/assess","geology"],
    [
      "地质判断中心",
      "沙金河道、地层层位、山金构造蚀变和五级证据链。",
      "沙金 山金 河道 内弯 基岩 裂缝 石英脉 剪切带 蚀变",
      "/geology",
      "geology",
    ],
    [
      "取样公式与品位工具",
      "同页计算砂金 g/m³、回收率、原位体积、重复样 RPD，以及山金 ppm ↔ g/t。",
      "取样量 公式 品位 砂金 山金 体积 g/m3 ppm g/t 回收率 粗金",
      "/sampling",
      "sampling",
    ],
    [
      "化验 QA/QC",
      "检查空白样污染、重复样差异、CRM 回收率和控制样插入比例。",
      "化验 质控 空白样 重复样 标准样 CRM RPD 污染",
      "/qaqc",
      "sampling",
    ],
    [
      "取样规划",
      "规划样线间距、分层样、样品体积及 QA/QC 工作量。",
      "网格 样线 沟槽 分层 体积 工作量",
      "/planner",
      "sampling",
    ],
    [
      "工具与技术",
      "淘金盘、溜槽、筛网、磁铁、GPS、XRF、火试金和 ICP。",
      "工具 淘金盘 溜槽 磁铁 罗盘 GPS XRF 火试金 ICP",
      "/tools",
      "tools",
    ],
    ["样品工作台","集中进入样品档案、地图、现场报告、数据备份、取样规划和 QA/QC。","项目控制台 样品工作台 地图 报告 备份 规划 数据","/project","records"],
    [
      "样品记录",
      "保存地层、土质、坐标、体积、可见金、化验与交接链。",
      "现场记录 样品编号 坐标 交接链 检出限",
      "/field",
      "records",
    ],
    [
      "样点地图",
      "筛选样点、查看异常等级、河流上下游与矿脉样点。",
      "地图 GPS 坐标 河流 上游 下游 样点 隐私",
      "/map",
      "records",
    ],
    [
      "现场报告",
      "生成河段、山体矿脉和样品送检报告。",
      "报告 PDF 河段 矿脉 送检清单",
      "/reports",
      "records",
    ],
    [
      "数据备份与隐私",
      "导出、合并恢复、坐标约化和清理本机项目数据。",
      "备份 恢复 隐私 坐标 JSON 数据",
      "/backup",
      "records",
    ],
    ["防骗与证据核验","识别富样、编辑照片、截图式化验单、虚假矿权与高回报承诺。","防骗 假金 富样 假报告 化验单 矿权 骗局 调包","/knowledge#false-gold","knowledge"],
    [
      "资料来源",
      "核对 USGS、Geoscience Australia、图片作者和许可。",
      "参考 来源 版权 作者 许可 USGS",
      "/sources",
      "knowledge",
    ],
  ],
  en: [
    ["Field assessment and report","Score placer or lode evidence and generate missing controls, next actions, and a printable report.","field score assessment placer lode priority report print PDF sample draft","/en/assess","geology"],
    [
      "Geology interpretation",
      "Placer settings, stratigraphic traps, lode structure, alteration and the evidence ladder.",
      "placer lode channel bedrock quartz shear alteration",
      "/en/geology",
      "geology",
    ],
    [
      "Sampling formulae",
      "Calculate placer g/m³, recovery, bank volume and RPD, plus lode ppm ↔ g/t.",
      "sampling placer lode volume grade recovery density nugget effect ppm g/t",
      "/en/sampling",
      "sampling",
    ],
    [
      "Assay QA/QC",
      "Screen blanks, duplicates, CRM recovery and control insertion rates.",
      "assay quality blank duplicate CRM RPD contamination",
      "/en/qaqc",
      "sampling",
    ],
    [
      "Sampling design",
      "Plan fences, intervals, sample support and QA/QC workload.",
      "grid traverse channel sample volume workload",
      "/en/planner",
      "sampling",
    ],
    [
      "Tools and techniques",
      "Gold pans, sluices, magnets, GPS, XRF, fire assay and ICP methods.",
      "tools pan sluice magnet compass GPS XRF fire assay ICP",
      "/en/tools",
      "tools",
    ],
    ["Sample workspace","Open the sample register, mapping, reports, backups, sampling design and QA/QC from one workspace.","project sample workspace map report backup design quality data","/en/project","records"],
    [
      "Sample register",
      "Store geology, material, coordinates, support, assays and chain of custody.",
      "field record sample ID coordinate custody detection limit",
      "/en/field",
      "records",
    ],
    [
      "Sample mapping",
      "Filter points and review placer traverses, lode samples and privacy controls.",
      "map GPS coordinate upstream downstream sample privacy",
      "/en/map",
      "records",
    ],
    [
      "Field reports",
      "Prepare stream-reach, lode and laboratory submission reports.",
      "report PDF stream lode laboratory submission",
      "/en/reports",
      "records",
    ],
    [
      "Data backup and privacy",
      "Export, merge, restore and coordinate-filter device project data.",
      "backup restore privacy coordinate JSON data",
      "/en/backup",
      "records",
    ],
    ["Fraud and evidence verification","Screen selected rich samples, edited photographs, assay screenshots, false mineral rights and return promises.","fraud scam rich sample fake assay report mineral rights switched sample","/en/knowledge#false-gold","knowledge"],
    [
      "References",
      "Review USGS, Geoscience Australia, image credits and licences.",
      "reference source copyright author licence USGS",
      "/en/sources",
      "knowledge",
    ],
  ],
} as const;
const text = {
  zh: {
    title: "搜索 Goldfinder",
    lead: "搜索真实图鉴、地质判断、取样方法、现场工具和项目功能。输入矿物名称、环境、公式或工作任务。",
    placeholder: "例如：黑砂、黏土假底、RPD、石英脉…",
    all: "全部",
    knowledge: "知识与来源",
    atlas: "真实图鉴",
    geology: "地质判断",
    sampling: "取样与化验",
    tools: "工具技术",
    records: "记录与数据",
    found: "项结果",
    empty: "没有匹配结果。尝试较短关键词或切换到“全部”。",
    clear: "清除搜索",
    open: "打开页面",
    hint: "快速建议",
  },
  en: {
    title: "Search Goldfinder",
    lead: "Search the real-photo atlas, geology interpretation, sampling methods, field tools and project features.",
    placeholder: "Try: black sand, false bedrock, RPD, quartz vein…",
    all: "All",
    knowledge: "Knowledge & sources",
    atlas: "Photo atlas",
    geology: "Geology",
    sampling: "Sampling & assay",
    tools: "Tools",
    records: "Records & data",
    found: "results",
    empty: "No matching results. Try a shorter term or select All.",
    clear: "Clear search",
    open: "Open page",
    hint: "Quick suggestions",
  },
} as const;
const icons = {
  knowledge: BookOpen,
  atlas: Camera,
  geology: Mountain,
  sampling: TestTubes,
  tools: Wrench,
  records: Archive,
};
export default function SearchHub({ lang }: { lang: Lang }) {
  const c = text[lang],
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
        event.preventDefault();
        input.current?.focus();
      }
      if (event.key === "Escape") {
        setQuery("");
        input.current?.blur();
      }
    };
    window.addEventListener("keydown", shortcut);
    return () => window.removeEventListener("keydown", shortcut);
  }, []);
  const items = useMemo<Item[]>(() => {
    const fixed = pages[lang].map((x) => ({
      title: x[0],
      summary: x[1],
      keywords: x[2],
      href: x[3],
      category: x[4],
    }));
    const photos =
      lang === "zh"
        ? atlasItems.map((x) => ({
            title: x.name,
            summary: x.observe,
            keywords: `${x.alt} ${x.notProof}`,
            href: `/atlas#${x.slug}`,
            category: "atlas",
            image: x.image,
          }))
        : enAtlas.map((x, i) => ({
            title: x[0],
            summary: x[2],
            keywords: `${x[3]} ${x[4]}`,
            href: `/en/atlas#item-${i + 1}`,
            category: "atlas",
            image: `/images/${x[1]}`,
          }));
    return [...fixed, ...photos];
  }, [lang]);
  const result = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return items.filter(
      (x) =>
        (category === "all" || x.category === category) &&
        (!q ||
          `${x.title} ${x.summary} ${x.keywords}`
            .toLocaleLowerCase()
            .includes(q)),
    );
  }, [items, query, category]);
  const cats = [
    "all",
    "knowledge",
    "atlas",
    "geology",
    "sampling",
    "tools",
    "records",
  ] as const;
  return (
    <section className="search-hub">
      <header>
        <p className="eyebrow">KNOWLEDGE DISCOVERY</p>
        <h1>
          <Search size={34} />
          {c.title}
        </h1>
        <p>{c.lead}</p>
      </header>
      <div className="search-box">
        <Search aria-hidden="true" />
        <input
          ref={input}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={c.placeholder}
          aria-label={c.title}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
            aria-label={c.clear}
          >
            <X size={18} />
          </button>
        )}
      </div>
      <div
        className="search-cats"
        aria-label={lang === "zh" ? "搜索分类" : "Search categories"}
      >
        {cats.map((x) => {
          const Icon = x === "all" ? Search : icons[x];
          return (
            <button
              key={x}
              className={category === x ? "active" : ""}
              onClick={() => setCategory(x)}
            >
              <Icon size={16} />
              {c[x]}
            </button>
          );
        })}
      </div>
      {!query && category === "all" && (
        <div className="search-suggestions">
          <b>{c.hint}</b>
          {(lang === "zh"
            ? ["砂金", "黄铁矿", "黏土假底", "取样体积", "空白样", "XRF"]
            : [
                "placer gold",
                "pyrite",
                "false bedrock",
                "sample volume",
                "blank",
                "XRF",
              ]
          ).map((x) => (
            <button key={x} onClick={() => setQuery(x)}>
              {x}
            </button>
          ))}
        </div>
      )}
      <div className="search-count">
        <strong>{result.length}</strong> {c.found}
      </div>
      {result.length === 0 ? (
        <div className="search-empty">
          <Search size={30} />
          <p>{c.empty}</p>
        </div>
      ) : (
        <div className="search-results">
          {result.map((x) => {
            const Icon = icons[x.category as keyof typeof icons] || FileText;
            return (
              <Link
                href={x.href}
                key={`${x.category}-${x.href}-${x.title}`}
                className="search-result"
              >
                {x.image ? (
                  <Image src={x.image} alt="" width={180} height={130} />
                ) : (
                  <div className="result-icon">
                    <Icon size={24} />
                  </div>
                )}
                <div>
                  <span>{c[x.category as keyof typeof c]}</span>
                  <h2>{x.title}</h2>
                  <p>{x.summary}</p>
                  <b>{c.open} →</b>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
