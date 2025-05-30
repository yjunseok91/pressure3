self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pressure-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/pressure3/index.html',
        '/pressure3/icon-192.png',
        '/pressure3/icon-512.png',
        '/pressure3/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
