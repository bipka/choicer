/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'choicer-shell-v2';
const EMOJI_CACHE = 'choicer-emoji-v2';

const logLines = [];
const log = (msg) => {
  const line = `${new Date().toISOString()} ${msg}`;
  logLines.push(line);
  // ограничим размер лога, чтобы не рос бесконечно
  if (logLines.length > 500) logLines.shift();
};

// Важно: у тебя CSS вшит в main.js через style-loader,
// поэтому для оффлайна достаточно кешировать / и /main.js + manifest + иконки.
const SHELL_ASSETS = [
  '/',
  '/main.js',
  '/manifest.webmanifest',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  log('[install] start');
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await cache.addAll(SHELL_ASSETS);
      log('[install] shell cached');
      self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  log('[activate] start');
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((k) => {
          if (k !== CACHE_NAME && k !== EMOJI_CACHE) return caches.delete(k);
          return Promise.resolve();
        })
      );
      await self.clients.claim();
      log('[activate] done');
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // фиктивный файл для выдачи лога
  if (url.pathname === '/log.html') {
    log('[fetch] log.html requested');
    event.respondWith(
      new Response(logLines.join('\n'), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      })
    );
    return;
  }

  // Логируем fetch (кроме шумных запросов)
// main.js — всегда пытаемся взять свежий из сети, а потом обновить кеш
  if (url.origin === self.location.origin && url.pathname === '/main.js') {
    event.respondWith(
      (async () => {
        const cache = await caches.open(CACHE_NAME);
        try {
          const fresh = await fetch(event.request);
          if (fresh && fresh.ok) await cache.put(event.request, fresh.clone());
          log('[fetch] /main.js (network)');
          return fresh;
        } catch (e) {
          const cached = await cache.match(event.request);
          log('[fetch] /main.js (cache fallback)');
          return cached || new Response('Offline', { status: 503 });
        }
      })()
    );
    return;
  }
  
  // App shell: cache-first, чтобы работало оффлайн
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((resp) => {
          // только same-origin кладём в кеш оболочки
          if (resp.ok && url.origin === self.location.origin) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return resp;
        })
        .catch(() => {
          // если запрос навигации и сети нет — вернём /
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Offline', { status: 503 });
        });
    })
  );
});

async function cacheEmoji(request) {
  const cache = await caches.open(EMOJI_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;

  try {
    const resp = await fetch(request);
    if (resp.ok) {
      await cache.put(request, resp.clone());
      log(`[emoji cached] ${request.url}`);
    }
    return resp;
  } catch (e) {
    return new Response('Offline emoji', { status: 503 });
  }
}