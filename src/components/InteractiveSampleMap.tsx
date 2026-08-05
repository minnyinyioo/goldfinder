"use client";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./interactive-sample-map.css";
type Point = {
  sample?: string;
  project?: string;
  date?: string;
  lat?: string;
  lng?: string;
  result?: string;
  resultUnit?: string;
  visibleGold?: string;
  qcType?: string;
  environment?: string;
};
const t = {
  zh: {
    title: "站内交互样点图",
    lead: "地图瓦片由 OpenStreetMap 提供；浏览时，视窗范围会请求给瓦片服务器。精确样点仍来自当前设备。",
    empty: "至少保存一个有效 GPS 样点后才会显示地图。",
    connect: "按项目和日期连接样点",
    fit: "显示全部样点",
    all: "全部项目",
    points: "个有效样点",
    sequence: "连接线表示记录顺序，不自动代表河流方向、矿脉走向或地质连续性。",
  },
  en: {
    title: "Interactive sample map",
    lead: "Map tiles are provided by OpenStreetMap; the visible area is requested from its tile servers. Exact points still come from this device.",
    empty: "Save at least one valid GPS sample to display the map.",
    connect: "Connect points by project and date",
    fit: "Fit all points",
    all: "All projects",
    points: "valid points",
    sequence:
      "Lines show record order; they do not automatically represent flow direction, vein strike, or geological continuity.",
  },
};
const valid = (x: Point) =>
  x.lat !== "" &&
  x.lng !== "" &&
  Number.isFinite(Number(x.lat)) &&
  Number.isFinite(Number(x.lng)) &&
  Math.abs(Number(x.lat)) <= 90 &&
  Math.abs(Number(x.lng)) <= 180;
const myMapText = {
  title: "အပြန်အလှန်အသုံးပြုနိုင်သော နမူနာမြေပုံ",
  lead: "မြေပုံ tile များကို OpenStreetMap မှ ပေးသည်။ မြင်ကွင်းဧရိယာကို tile server ထံ တောင်းခံမည်ဖြစ်ပြီး exact sample coordinate သည် ဤစက်မှသာ ရယူသည်။",
  empty: "မြေပုံပြရန် မှန်ကန်သော GPS sample အနည်းဆုံးတစ်ခု သိမ်းပါ။",
  connect: "Project နှင့် ရက်စွဲအလိုက် sample များချိတ်ရန်",
  fit: "Sample အားလုံးပြရန်",
  all: "Project အားလုံး",
  points: "မှန်ကန်သော နမူနာမှတ်",
  sequence:
    "ချိတ်ဆက်မျဉ်းသည် မှတ်တမ်းအစဉ်ကိုသာ ပြသည်။ ရေစီးဦးတည်ချက်၊ သတ္တုကြော strike သို့မဟုတ် ဘူမိဗေဒဆက်စပ်မှုဟု အလိုအလျောက် မယူဆရပါ။",
};
export default function InteractiveSampleMap({
  lang,
}: {
  lang: "zh" | "en" | "my";
}) {
  const c = lang === "my" ? myMapText : t[lang],
    host = useRef<HTMLDivElement>(null),
    mapRef = useRef<import("leaflet").Map | null>(null),
    layerRef = useRef<import("leaflet").LayerGroup | null>(null),
    [points, setPoints] = useState<Point[]>([]),
    [project, setProject] = useState("all"),
    [connect, setConnect] = useState(true);
  useEffect(() => {
    try {
      const rows = JSON.parse(
        localStorage.getItem("goldfinder-samples-v2") || "[]",
      );
      if (Array.isArray(rows)) setPoints(rows.filter(valid));
    } catch {}
  }, []);
  const shown = points.filter(
      (x) => project === "all" || x.project === project,
    ),
    projects = Array.from(
      new Set(points.map((x) => x.project).filter(Boolean)),
    ) as string[];
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!host.current) return;
      const L = await import("leaflet");
      if (cancelled) return;
      if (!mapRef.current) {
        mapRef.current = L.map(host.current).setView([20, 96], 5);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(mapRef.current);
      }
      layerRef.current?.remove();
      const group = L.layerGroup().addTo(mapRef.current);
      layerRef.current = group;
      shown.forEach((x) => {
        const color =
            x.qcType && x.qcType !== "Routine"
              ? "#bd87cf"
              : x.result
                ? "#d9b34a"
                : x.visibleGold
                  ? "#78aab3"
                  : "#9daea5",
          marker = L.circleMarker([Number(x.lat), Number(x.lng)], {
            radius: 8,
            color: "#f2f5f0",
            weight: 1,
            fillColor: color,
            fillOpacity: 0.95,
          }),
          box = document.createElement("div"),
          title = document.createElement("strong"),
          meta = document.createElement("p"),
          result = document.createElement("p");
        title.textContent = x.sample || "—";
        meta.textContent = `${x.project || "—"} · ${x.date || "—"} · ${x.environment || "—"}`;
        result.textContent = x.result
          ? `${x.result} ${x.resultUnit || ""}`
          : x.visibleGold
            ? `${x.visibleGold} visible`
            : "—";
        box.append(title, meta, result);
        marker.bindPopup(box).addTo(group);
      });
      if (connect)
        projects.forEach((p) => {
          const line = shown
            .filter((x) => x.project === p)
            .sort((a, b) => (a.date || "").localeCompare(b.date || ""))
            .map((x) => [Number(x.lat), Number(x.lng)] as [number, number]);
          if (line.length > 1)
            L.polyline(line, {
              color: "#80b79b",
              weight: 2,
              dashArray: "7 7",
              opacity: 0.8,
            }).addTo(group);
        });
      if (shown.length) {
        const bounds = L.latLngBounds(
          shown.map((x) => [Number(x.lat), Number(x.lng)] as [number, number]),
        );
        mapRef.current.fitBounds(bounds.pad(0.18), { maxZoom: 15 });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [project, connect, points]);
  useEffect(
    () => () => {
      mapRef.current?.remove();
      mapRef.current = null;
    },
    [],
  );
  return (
    <section className="section interactive-map-section">
      <div className="interactive-map-head">
        <div>
          <p className="eyebrow">OPENSTREETMAP · LOCAL POINTS</p>
          <h2>{c.title}</h2>
          <p>{c.lead}</p>
        </div>
        <strong>
          {shown.length} {c.points}
        </strong>
      </div>
      <div className="interactive-map-controls">
        <select value={project} onChange={(e) => setProject(e.target.value)}>
          <option value="all">{c.all}</option>
          {projects.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <label>
          <input
            type="checkbox"
            checked={connect}
            onChange={(e) => setConnect(e.target.checked)}
          />
          {c.connect}
        </label>
        <button onClick={() => setProject("all")}>{c.fit}</button>
      </div>
      {points.length ? (
        <div ref={host} className="interactive-map" aria-label={c.title} />
      ) : (
        <div className="interactive-map-empty">{c.empty}</div>
      )}
      <p className="map-sequence-note">{c.sequence}</p>
    </section>
  );
}
