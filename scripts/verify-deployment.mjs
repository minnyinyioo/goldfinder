import { readdir } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const base = (
  process.argv[2] ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://goldfinder.vercel.app"
).replace(/\/$/, "");
const routes = [
  "",
  "/search",
  "/project",
  "/atlas",
  "/assess",
  "/knowledge",
  "/geology",
  "/tools",
  "/sampling",
  "/qaqc",
  "/planner",
  "/field",
  "/map",
  "/reports",
  "/backup",
  "/sources",
  "/copyright",
  "/about",
  "/review",
  "/en",
  "/en/search",
  "/en/project",
  "/en/atlas",
  "/en/assess",
  "/en/knowledge",
  "/en/geology",
  "/en/tools",
  "/en/sampling",
  "/en/qaqc",
  "/en/planner",
  "/en/field",
  "/en/map",
  "/en/reports",
  "/en/backup",
  "/en/sources",
  "/en/copyright",
  "/en/about",
  "/en/review",
  "/my",
  "/my/search",
  "/my/project",
  "/my/atlas",
  "/my/knowledge",
  "/my/tools",
  "/my/planner",
  "/my/qaqc",
  "/my/field",
  "/my/map",
  "/my/reports",
  "/my/backup",
  "/my/sources",
  "/my/copyright",
  "/my/about",
  "/my/review",
];

async function filesUnder(root) {
  const output = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    const path = join(root, entry.name);
    if (entry.isDirectory()) output.push(...(await filesUnder(path)));
    else output.push(path);
  }
  return output;
}

const imageRoot = join(process.cwd(), "public", "images");
const images = (await filesUnder(imageRoot)).map(
  (path) => `/images/${relative(imageRoot, path).split(sep).join("/")}`,
);
const failures = [];
const discoveredInternal = new Set();

for (const route of routes) {
  const response = await fetch(`${base}${route || "/"}`, {
    redirect: "follow",
  });
  const html = await response.text();
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("text/html")
  ) {
    failures.push(
      `${route || "/"}: HTTP ${response.status} or invalid content type`,
    );
    continue;
  }
  if (!html.includes("GOLDFINDER"))
    failures.push(`${route || "/"}: site marker missing`);
  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("/_next/")) {
      discoveredInternal.add(href.split("#")[0].split("?")[0] || "/");
    }
  }
}

for (const path of discoveredInternal) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!response.ok)
    failures.push(`${path}: internal link returned HTTP ${response.status}`);
}

for (const path of images) {
  const response = await fetch(`${base}${path}`, {
    method: "HEAD",
    redirect: "follow",
  });
  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("image/")
  ) {
    failures.push(`${path}: image unavailable or invalid content type`);
  }
}

if (failures.length) {
  console.error(`Deployment verification failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Deployment verification passed: ${routes.length} routes, ${discoveredInternal.size} internal targets, and ${images.length} local images.`,
);
