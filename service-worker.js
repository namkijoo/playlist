/* eslint-disable no-restricted-globals */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/script.js"]);
    })
  );
});

/* eslint-disable no-restricted-globals */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
