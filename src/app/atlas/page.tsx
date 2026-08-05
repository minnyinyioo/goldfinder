import { atlasItems } from "@/data/media";
import AtlasExplorer, { ExplorerItem } from "./AtlasExplorer";
import "./atlas.css";
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
export default function Atlas() {
  const items = atlasItems.map((x) => ({ ...x, category: category(x.slug) }));
  return (
    <>
      <div className="page-head">
        <p className="eyebrow">VERIFIED PHOTO ATLAS</p>
        <h1>真实图片对照图鉴</h1>
        <p className="lead">
          筛选并放大真实参考图片，学习“应该观察什么”。照片不能直接鉴定样品；每项均附作者、许可和原始页面。
        </p>
      </div>
      <section className="section">
        <div className="compare">
          <div>
            <strong>先看形态</strong>
            <p>晶形、片状、粒状、延展或脆裂</p>
          </div>
          <div>
            <strong>再做测试</strong>
            <p>磁性、条痕、硬度、密度与解理</p>
          </div>
          <div>
            <strong>最后验证</strong>
            <p>代表性取样与适用的实验室分析</p>
          </div>
        </div>
        <AtlasExplorer items={items} lang="zh" />
      </section>
    </>
  );
}
