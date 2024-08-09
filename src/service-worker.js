// src/service-worker.js

// 설치 단계 (install event)
// 여기서 캐시할 파일들을 정의할 수 있습니다.
// eslint-disable-next-line no-restricted-globals
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/styles.css",
        "/app.js",
        "/image.png",
      ]);
    })
  );
});

// 활성화 단계 (activate event)
// 이전에 캐시된 데이터가 있다면 정리할 수 있습니다.
// eslint-disable-next-line no-restricted-globals
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

// 네트워크 요청을 가로채서 캐시된 파일을 제공 (fetch event)
// eslint-disable-next-line no-restricted-globals
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// src/service-worker.js
// eslint-disable-next-line no-restricted-globals
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-data") {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    const response = await fetch("/sync", {
      method: "POST",
      body: JSON.stringify({ message: "Data to sync" }),
    });
    console.log("Data synced successfully:", response);
  } catch (error) {
    console.error("Error syncing data:", error);
  }
}

// 예시: 동기화를 요청하는 클라이언트 코드

if ("serviceWorker" in navigator && "SyncManager" in window) {
  navigator.serviceWorker.ready
    .then((registration) => {
      return registration.sync.register("sync-data");
    })
    .then(() => {
      console.log("Background sync registered!");
    })
    .catch((error) => {
      console.log("Background sync registration failed:", error);
    });
}
