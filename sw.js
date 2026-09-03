/* AppNest · טאיצ׳י 24 — Service Worker
   כלל זהב: להעלות את VERSION בכל עדכון, אחרת המטמון מגיש גרסה ישנה. */
const VERSION = 'taichi24-v1.0.2';
const APP_CACHE = 'app-' + VERSION;
const SHELL = [
  './', './index.html', './appnest-assistant.js',
  './manifest.json', './icon-192.png', './icon-512.png', './privacy_policy.html'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP_CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k.startsWith('app-') && k !== APP_CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // רק אותו מקור. בקשות חוצות-מקור (CDN, ספקי AI) — לא נוגעים.
  if (url.origin !== self.location.origin) return;
  // מעטפת האפליקציה: network-first (עדכון תמיד מנצח אונליין), נפילה למטמון אופליין.
  if (SHELL.some(p => url.pathname.endsWith(p.replace('./','/')) || url.pathname.endsWith('index.html')) || url.pathname.endsWith('/')) {
    e.respondWith(
      fetch(req).then(res => { const cp = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, cp)); return res; })
                .catch(() => caches.match(req).then(m => m || caches.match('./index.html')))
    );
    return;
  }
  // פריימים ותמונות: cache-first (הם לא משתנים) — שהאפליקציה תעבוד מהר ואופליין.
  e.respondWith(
    caches.match(req).then(m => m || fetch(req).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(APP_CACHE).then(c => c.put(req, cp)); }
      return res;
    }).catch(() => m))
  );
});
