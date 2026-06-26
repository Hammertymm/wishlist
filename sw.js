// Service worker: makes the app work offline and installable ("Add to Home
// Screen"). It caches the app's files so they load with no connection.
//
// Strategy = "network-first": when online we always fetch the latest version
// (and refresh the cache), so you never get stuck on a stale app after an
// update. When offline, we serve the last cached copy. Bump CACHE when the
// list of files changes to clear out the old cache.
const CACHE = "wishlist-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
];

// Pre-cache the app shell as soon as the worker installs.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Delete any old caches when a new worker takes over.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network-first for GET requests; fall back to the cache when offline.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy)).catch(() => {});
        return res;
      })
      .catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("./index.html"))
      )
  );
});
