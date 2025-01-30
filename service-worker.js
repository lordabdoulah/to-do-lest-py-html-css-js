self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-pwa-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/to-do-list.css",
        "/css/all.min.css",
        "/css/normalize.css",
        "/js/main.js",
        "/js/comments.js"
      ]);
    })
  );
});
