/* My Life OS — service worker
 *
 * 하는 일은 두 가지뿐입니다.
 *   1) 홈 화면 앱으로 설치될 수 있게 해주는 것 (안드로이드 Chrome 설치 조건)
 *   2) 인터넷이 잠깐 끊겨도 앱이 열리게 해주는 것
 *
 * ⚠ 이 파일은 사용자가 작성한 기록(localStorage)에 절대 접근하지 않습니다.
 *    서비스워커는 localStorage 자체를 읽을 수 없으므로 기록이 지워질 위험이 없습니다.
 *
 * 업데이트 정책: 화면(HTML)은 항상 네트워크를 먼저 봅니다(network-first).
 * 그래서 새 버전을 올리면 다음 실행 때 바로 반영되고, 옛날 화면이 남지 않습니다.
 */

const VERSION = "mylifeos-v1";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION)
      .then((c) => c.addAll(SHELL).catch(() => null))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e && e.data === "skipWaiting") self.skipWaiting();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  const sameOrigin = url.origin === self.location.origin;

  /* 화면(HTML)은 네트워크 우선 — 업데이트가 즉시 반영되도록 */
  if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          if (sameOrigin && res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() =>
          caches.match(req).then((hit) => hit || caches.match("./index.html") || caches.match("./"))
        )
    );
    return;
  }

  /* 아이콘·글꼴 같은 정적 파일은 캐시 우선 */
  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          if (res && res.ok && (sameOrigin || res.type === "cors" || res.type === "opaque")) {
            const copy = res.clone();
            caches.open(VERSION).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => hit);
    })
  );
});
