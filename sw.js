const CACHE_NAME = 'nookphone-v10';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './media/AC_clock.png',
  './media/AC_calculator.png',
  './media/AC_calendar.png',
  './media/AC_camera.png',
  './media/AC_gallery.png',
  './media/AC_post.png',
  './media/AC_roost.png',
  './media/AC_health.png',
  './media/AC_settings.png',
  './media/AC_froggychair.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // Um arquivo faltando não derruba mais a instalação inteira
      Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {})))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first, só para GET (POSTs do webhook passam direto)
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone)).catch(() => {});
        }
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(req);
        if (cached) return cached;
        if (req.mode === 'navigate') return caches.match('./index.html');
        return new Response('', { status: 504, statusText: 'Offline' });
      })
  );
});
