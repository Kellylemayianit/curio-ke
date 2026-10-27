/* Tiny service worker: images and fonts are cache-first, everything else network-first,
   so the site keeps working with a patchy connection and updates are never stuck. */
const CACHE = 'curio-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  const isStatic = /\.(jpg|jpeg|png|webp|svg|woff2)$/.test(url.pathname);
  e.respondWith(
    isStatic
      ? caches.match(req).then((hit) => hit || fetchAndStore(req))
      : fetchAndStore(req).catch(() => caches.match(req).then((hit) => hit || caches.match('index.html')))
  );
});

function fetchAndStore(req) {
  return fetch(req).then((res) => {
    if (res.ok) {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  });
}
