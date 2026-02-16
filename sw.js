const CACHE_NAME = 'coffee-sw-v7_1-pwa-1';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Navigation: serve cached index for offline
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match('./index.html').then((cached) =>
        cached || fetch(req).catch(() => caches.match('./index.html'))
      )
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) =>
      cached ||
      fetch(req).then((res) => {
        // cache same-origin GET responses
        try {
          const url = new URL(req.url);
          if (req.method === 'GET' && url.origin === self.location.origin) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
        } catch (e) {}
        return res;
      })
    )
  );
});
