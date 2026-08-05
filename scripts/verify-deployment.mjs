const base = (process.argv[2] || "https://goldfinder.vercel.app").replace(
  /\/$/,
  "",
);
const routes = [
  "/",
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
  "/search",
  "/en",
  "/my",
];
const images = [
  "/images/user-placer-bend.jpg",
  "/images/user-placer-origin.jpg",
  "/images/user-placer-meanders.jpg",
  "/images/user-placer-traps.jpg",
  "/images/user-placer-boulder.jpg",
];

const failures = [];
for (const route of routes) {
  const response = await fetch(`${base}${route}`, { redirect: "follow" });
  const html = await response.text();
  if (
    !response.ok ||
    !response.headers.get("content-type")?.includes("text/html")
  ) {
    failures.push(`${route}: HTTP ${response.status} or invalid content type`);
  } else if (!html.includes("GOLDFINDER")) {
    failures.push(`${route}: expected site marker missing`);
  }
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
  `Deployment verification passed: ${routes.length} routes and ${images.length} local images.`,
);
