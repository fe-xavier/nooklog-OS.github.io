const CACHE_NAME = 'nookphone-v4';
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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Estratégia Network-First: busca sempre a versão nova do GitHub quando online, e usa o cache quando offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
