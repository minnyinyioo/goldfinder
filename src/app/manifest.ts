import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "探金 Goldfinder · 离线野外工具",
    short_name: "Goldfinder",
    description:
      "Evidence-led field geology, sampling, mineral recognition and offline record tools.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#07100d",
    theme_color: "#c9983f",
    orientation: "any",
    lang: "zh-CN",
    categories: ["education", "utilities", "productivity"],
    icons: [
      {
        src: "/images/gold-native.jpg",
        sizes: "960x960",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/images/gold-native.jpg",
        sizes: "960x960",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "看图识别", short_name: "识别", url: "/atlas", icons: [{ src: "/images/gold-native.jpg", sizes: "960x960", type: "image/jpeg" }] },
      { name: "现场评分", short_name: "评分", url: "/assess", icons: [{ src: "/images/gold-native.jpg", sizes: "960x960", type: "image/jpeg" }] },
      { name: "样品档案", short_name: "档案", url: "/field", icons: [{ src: "/images/gold-native.jpg", sizes: "960x960", type: "image/jpeg" }] },
    ],
  };
}
