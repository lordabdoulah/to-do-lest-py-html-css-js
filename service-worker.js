// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open("my-pwa-cache").then((cache) => {
//       return cache.addAll([
//         "/",
//         "/index.html",
//         "/css/to-do-list.css",
//         "/css/all.min.css",
//         "/css/normalize.css",
//         "/script/main.js",
//         "/script/comments.js",
//         "/images/icon-192x192.png",
//         "/images/icon-512x512.png",
//         "/images/favicon.png",
//         "/images/image.png",
//         "/images/page.png",
//         "/images/Remove-bg.ai_1735542049271.png",
//       ]);
//     })
//   );
// });
const CACHE_NAME = 'to-do-list-cache-v1';
const urlsToCache = [
    "/",
    "/index.html",
    "/css/to-do-list.css",
    "/css/all.min.css",
    "/css/normalize.css",
    "/script/main.js",
    "/script/comments.js",
    "/images/icon-192x192.png",
    "/images/icon-512x512.png",
];

// تثبيت Service Worker وتخزين الملفات في الكاش
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// تفعيل Service Worker وإزالة الكاش القديم
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// جلب الملفات من الكاش عند عدم وجود إنترنت
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
