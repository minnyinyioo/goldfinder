import Image from "next/image";
import { AlertTriangle, BookOpenCheck } from "lucide-react";
import "./placer-reference-figures.css";
type Lang = "zh" | "en";
const figures = [
  {
    src: "/images/user-placer-bend.jfif",
    title: "Inside bends, gravel bars and bedrock traps",
    zh: "内弯、砾石坝与基岩陷阱",
    body: "Read the sequence together: slower water on the inside bend, gravel-bar growth, eddies behind boulders, black-sand concentration, and cracks in exposed bedrock. These are sampling targets—not guaranteed pay streaks.",
    zhBody:
      "应组合观察内弯缓流、砾石坝生长、巨石后涡流、黑砂富集及裸露基岩裂缝。这些只是应验证的取样目标，不是必然的富金带。",
  },
  {
    src: "/images/user-placer-origin.jfif",
    title: "From lode source to placer concentration",
    zh: "从山金物源到砂金富集",
    body: "Weathering may release gold from mineralised veins. Streams then transport and repeatedly reconcentrate dense grains where velocity falls or the bed becomes rough.",
    zhBody:
      "风化可能从矿化脉中释放金；河流搬运后，会在流速下降或河床粗糙的位置反复再富集重颗粒。",
  },
  {
    src: "/images/user-placer-meanders.jfif",
    title: "Coarse and fine gold through successive bends",
    zh: "连续河弯中的粗金与细金位置",
    body: "Grain size, flood history and local hydraulics affect the pattern. Do not assume every inside bend is rich; test riffles, pools and bars with equal-volume samples.",
    zhBody:
      "颗粒大小、洪水历史和局部水动力都会改变分布。不能认定每个内弯都富金，应对浅滩、深潭和砾石坝做等体积比较。",
  },
  {
    src: "/images/user-placer-traps.jfif",
    title: "Six common mechanical trap settings",
    zh: "六种常见机械陷阱",
    body: "Rock bars, potholes, waterfall exits, meander loops, tributary junctions and seabed undulations illustrate the same principle: dense particles lag where transport energy changes.",
    zhBody:
      "岩坎、锅穴、瀑布下游、河曲、支流汇入口及海底起伏说明同一原理：搬运能量变化处可能滞留重颗粒。",
  },
  {
    src: "/images/user-placer-boulder.jfif",
    title: "Boulder wake during high flow",
    zh: "洪水期巨石背流区",
    body: "A low-velocity wake and paired eddies can form downstream of a stable boulder. Sample the protected pocket and a nearby control; do not work in active floodwater.",
    zhBody:
      "稳定巨石下游可形成低速背流区和成对涡流。应同时取背流窝样与邻近对照样，严禁在洪水流动期间作业。",
  },
] as const;
export default function PlacerReferenceFigures({ lang }: { lang: Lang }) {
  return (
    <section className="provided-figures">
      <header>
        <div>
          <p className="eyebrow">DETAILED ENGLISH REFERENCE FIGURES</p>
          <h3>
            {lang === "en"
              ? "Placer-gold river anatomy references"
              : "砂金河段英文详图参照"}
          </h3>
          <p>
            {lang === "en"
              ? "These are the detailed English-labelled figures supplied for this project. Read each as a hydraulic concept, then verify it with measured samples and controls."
              : "以下为本项目提供的英文标注详图。应把它们作为水动力概念图理解，再用已测量体积的样品和对照样验证。"}
          </p>
        </div>
        <BookOpenCheck />
      </header>
      <div className="provided-grid">
        {figures.map((f, i) => (
          <figure className={i === 0 ? "primary" : ""} key={f.src}>
            <Image src={f.src} alt={f.title} width={1280} height={900} />
            <figcaption>
              <b>{f.title}</b>
              {lang === "zh" && <strong>{f.zh}</strong>}
              <p>{lang === "en" ? f.body : f.zhBody}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="provenance-warning">
        <AlertTriangle />
        <p>
          <b>{lang === "en" ? "Provenance notice" : "来源说明"}</b>
          {lang === "en"
            ? "These figures were supplied by the project owner. Their original creator, publication and reuse licence have not yet been verified; they are labelled as user-provided references rather than attributed to an invented source."
            : "这些图由项目所有者提供，目前尚未核实原作者、出版物和复用许可，因此只标为“用户提供的参考图”，不虚构来源或许可。"}
        </p>
      </div>
    </section>
  );
}
