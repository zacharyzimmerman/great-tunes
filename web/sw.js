// Service worker for Great Tunes — thin wrapper over the shared GreatSW core.
//
// CACHE_VERSION is stamped by scripts/bump-version.js; keep the line exactly so
// the build can rewrite it. A byte-changed sw.js makes the browser activate a
// fresh worker that re-precaches the shell and evicts the old cache.
const CACHE_VERSION = "v0.3.19";

try {
  importScripts("https://cdn.jsdelivr.net/gh/zacharyzimmerman/great-apps@main/sw-core.js");
  GreatSW.init({
    version: CACHE_VERSION,
    cachePrefix: "great-tunes",
    shell: [
      "./",
      "./index.html",
      "./app.js",
      "./styles.css",
      "./manifest.json",
      "./favicon.svg",
      "./icons/icon-192.png",
      "./icons/icon-512.png",
      "./icons/apple-touch-icon.png",
      "./apple-touch-icon.png",
    ],
    audio: { pathSegment: "/audio/" },
  });
} catch (_) {
  // CDN unreachable at install — keep any previously-installed worker active.
}
