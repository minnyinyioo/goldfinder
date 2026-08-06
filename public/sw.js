const VERSION = "goldfinder-v3.53.1";
const PAGE_CACHE = `${VERSION}-pages`;
const ASSET_CACHE = `${VERSION}-assets`;

const ROUTES = [
  "/", "/about", "/assess", "/atlas", "/backup", "/copyright",
  "/field", "/geology", "/knowledge", "/map", "/planner", "/project",
  "/qaqc", "/reports", "/review", "/sampling", "/search", "/sources", "/tools",
  "/en", "/en/about", "/en/assess", "/en/atlas", "/en/backup",
  "/en/copyright", "/en/field", "/en/geology", "/en/knowledge", "/en/map",
  "/en/planner", "/en/project", "/en/qaqc", "/en/reports", "/en/review",
  "/en/sampling", "/en/search", "/en/sources", "/en/tools",
  "/my", "/my/about", "/my/atlas", "/my/backup", "/my/copyright",
  "/my/field", "/my/knowledge", "/my/map", "/my/planner", "/my/project",
  "/my/qaqc", "/my/reports", "/my/review", "/my/search", "/my/sources", "/my/tools",
];

const IMAGES = [
  "arsenopyrite.jpg", "black-sand.jpg", "chalcopyrite.jpg", "chromite.jpg",
  "conglomerate.jpg", "field-alluvial-fan.jpg", "field-hydrothermal-alteration.jpg",
  "field-river-terrace.jpg", "field-shear-zone.jpg", "fresh-bedrock.jpg", "galena.jpg",
  "garnet.jpg", "gold-native.jpg", "gold-pan-coarse.jpg", "grey-clay-profile.jpg",
  "hematite.jpg", "ilmenite-sand.jpg", "laterite-profile.jpg", "laterite-red.jpg",
  "magnetite.jpg", "muscovite.jpg", "panning.jpg", "placer-flakes.jpg", "pyrite.jpg",
  "quartz-vein.jpg", "scheelite.jpg", "sluice.jpg", "sphalerite.jpg", "stibnite.jpg",
  "user-placer-bend.jpg", "user-placer-boulder.jpg", "user-placer-meanders.jpg",
  "user-placer-origin.jpg", "user-placer-traps.jpg", "weathered-bedrock.jpg", "zircon.jpg",
].map((name) => `/images/${name}`);

const CORE = ["/", "/manifest.webmanifest", "/offline.html"];
const OFFLINE_PACK = [...ROUTES, ...IMAGES, "/manifest.webmanifest", "/offline.html"];

function sameOriginPath(value, base = self.location.origin) {
  try {
    // Asset URLs are read from raw HTML rather than a DOM. Decode ampersands
    // before constructing the URL or Next/Image query strings become
    // `&amp;w=...`, which the image optimizer correctly rejects with HTTP 400.
    const decoded = value.replace(/&(?:amp|#0*38|#x0*26);/gi, "&");
    const url = new URL(decoded, base);
    return url.origin === self.location.origin ? `${url.pathname}${url.search}` : null;
  } catch {
    return null;
  }
}

function discoverAssets(text, contentType, base) {
  const found = new Set();
  const add = (value) => {
    const path = sameOriginPath(value, base);
    if (path && (path.startsWith("/_next/") || path.startsWith("/images/"))) found.add(path);
  };

  if (contentType.includes("text/html")) {
    for (const match of text.matchAll(/(?:src|href)=["']([^"']+)["']/g)) add(match[1]);
  }
  if (contentType.includes("text/css")) {
    for (const match of text.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add(match[1]);
  }
  return [...found];
}

async function cacheOne(path, queue) {
  const request = new Request(path, { cache: "reload" });
  const response = await fetch(request);
  if (!response.ok) throw new Error(`${response.status} ${path}`);
  const cache = await caches.open(path.startsWith("/_next/") || path.startsWith("/images/") ? ASSET_CACHE : PAGE_CACHE);
  await cache.put(request, response.clone());
  const type = response.headers.get("content-type") || "";
  if (type.includes("text/html") || type.includes("text/css")) {
    const text = await response.clone().text();
    for (const asset of discoverAssets(text, type, new URL(path, self.location.origin))) queue.add(asset);
  }
}

async function buildOfflinePack(source) {
  const queue = new Set(OFFLINE_PACK);
  const completed = new Set();
  const errors = [];

  while (completed.size < queue.size) {
    const next = [...queue].find((path) => !completed.has(path));
    if (!next) break;
    try {
      await cacheOne(next, queue);
    } catch (error) {
      errors.push(next);
    }
    completed.add(next);
    source?.postMessage({ type: "OFFLINE_PROGRESS", done: completed.size, total: queue.size });
  }

  const result = { type: "OFFLINE_COMPLETE", done: completed.size, total: queue.size, errors };
  source?.postMessage(result);
  return result;
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PAGE_CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("goldfinder-") && !key.startsWith(VERSION)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CACHE_OFFLINE_PACK") event.waitUntil(buildOfflinePack(event.source));
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) caches.open(PAGE_CACHE).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(async () => (await caches.match(request)) || (await caches.match(url.pathname)) || (await caches.match("/offline.html"))),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok && (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/images/") || url.pathname === "/manifest.webmanifest")) {
        caches.open(ASSET_CACHE).then((cache) => cache.put(request, response.clone()));
      }
      return response;
    })),
  );
});
