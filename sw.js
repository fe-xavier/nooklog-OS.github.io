const CACHE_NAME = 'nookphone-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './media/AC_clock.png',
  './media/AC_calendar.png',
  './media/AC_calculator.png',
  './media/AC_camera.png',
  './media/AC_post.png',
  './media/AC_settings.png',
  './media/AC_froggychair.png',
  './media/AC_roost.png',
  './media/AC_google_doc.png',
  './media/AC_gyroid.png',
  './media/AC_cooking.png',
  './media/AC_exercise.png',
  './media/AC_health.png',
  './media/AC_dropbox.png',
  './media/AC_notes.png',
  './media/AC_gallery.png',
  './media/AC_instagram.png',
  './media/AC_twitter.png',
  './media/sound/UI_Phone_Open.wav',
  './media/sound/UI_Phone_Start_4.wav',
  './media/sound/UI_PocketMenu_Open.wav',
  './media/sound/UI_PocketMenu_Close.wav',
  './media/sound/UI_Point_Flag.wav',
  './media/sound/UI_Point_Get.wav',
  './media/sound/UI_Point_Stamp.wav',
  './media/sound/UI_Post_Delete.wav',
  './media/sound/UI_Post_MovePresent.wav',
  './media/sound/UI_Redo.wav',
  './media/sound/UI_Scroll.wav',
  './media/sound/UI_Select.wav',
  './media/sound/UI_Swkbd_BalloonAppear.wav',
  './media/sound/UI_Swkbd_Enter.wav',
  './media/sound/UI_Wait.wav',
  './media/sound/Nook Send.mp3',
  './media/sound/Nook Tritone.mp3'
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
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
