const CACHE_NAME = 'pressure-converter-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './icon.png',
  './og_image.png',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 캐시된 응답이 있다면 반환하고, 없다면 네트워크 요청
      return response || fetch(event.request);
    }).catch(() => {
      // 네트워크도 실패했을 때 fallback을 넣고 싶다면 여기
      return new Response('네트워크 오류가 발생했습니다.', {
        status: 408,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    })
  );
});
