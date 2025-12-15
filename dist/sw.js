/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/sw.js":
/*!*******************!*\
  !*** ./src/sw.js ***!
  \*******************/
/***/ (() => {

eval("{/* eslint-disable no-restricted-globals */\nconst CACHE_NAME = 'choicer-shell-v2';\nconst EMOJI_CACHE = 'choicer-emoji-v2';\nconst logLines = [];\nconst log = msg => {\n  const line = `${new Date().toISOString()} ${msg}`;\n  logLines.push(line);\n  // ограничим размер лога, чтобы не рос бесконечно\n  if (logLines.length > 500) logLines.shift();\n};\n\n// Важно: у тебя CSS вшит в main.js через style-loader,\n// поэтому для оффлайна достаточно кешировать / и /main.js + manifest + иконки.\nconst SHELL_ASSETS = ['/', '/main.js', '/manifest.webmanifest', '/icons/icon-192.png', '/icons/icon-512.png'];\nself.addEventListener('install', event => {\n  log('[install] start');\n  event.waitUntil(caches.open(CACHE_NAME).then(async cache => {\n    await cache.addAll(SHELL_ASSETS);\n    log('[install] shell cached');\n    self.skipWaiting();\n  }));\n});\nself.addEventListener('activate', event => {\n  log('[activate] start');\n  event.waitUntil((async () => {\n    const keys = await caches.keys();\n    await Promise.all(keys.map(k => {\n      if (k !== CACHE_NAME && k !== EMOJI_CACHE) return caches.delete(k);\n      return Promise.resolve();\n    }));\n    await self.clients.claim();\n    log('[activate] done');\n  })());\n});\nself.addEventListener('fetch', event => {\n  const url = new URL(event.request.url);\n\n  // фиктивный файл для выдачи лога\n  if (url.pathname === '/log.html') {\n    log('[fetch] log.html requested');\n    event.respondWith(new Response(logLines.join('\\n'), {\n      headers: {\n        'Content-Type': 'text/plain; charset=utf-8'\n      }\n    }));\n    return;\n  }\n\n  // Логируем fetch (кроме шумных запросов)\n  // main.js — всегда пытаемся взять свежий из сети, а потом обновить кеш\n  if (url.origin === self.location.origin && url.pathname === '/main.js') {\n    event.respondWith((async () => {\n      const cache = await caches.open(CACHE_NAME);\n      try {\n        const fresh = await fetch(event.request);\n        if (fresh && fresh.ok) await cache.put(event.request, fresh.clone());\n        log('[fetch] /main.js (network)');\n        return fresh;\n      } catch (e) {\n        const cached = await cache.match(event.request);\n        log('[fetch] /main.js (cache fallback)');\n        return cached || new Response('Offline', {\n          status: 503\n        });\n      }\n    })());\n    return;\n  }\n\n  // App shell: cache-first, чтобы работало оффлайн\n  event.respondWith(caches.match(event.request).then(cached => {\n    if (cached) return cached;\n    return fetch(event.request).then(resp => {\n      // только same-origin кладём в кеш оболочки\n      if (resp.ok && url.origin === self.location.origin) {\n        const copy = resp.clone();\n        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));\n      }\n      return resp;\n    }).catch(() => {\n      // если запрос навигации и сети нет — вернём /\n      if (event.request.mode === 'navigate') {\n        return caches.match('/');\n      }\n      return new Response('Offline', {\n        status: 503\n      });\n    });\n  }));\n});\nasync function cacheEmoji(request) {\n  const cache = await caches.open(EMOJI_CACHE);\n  const cached = await cache.match(request);\n  if (cached) return cached;\n  try {\n    const resp = await fetch(request);\n    if (resp.ok) {\n      await cache.put(request, resp.clone());\n      log(`[emoji cached] ${request.url}`);\n    }\n    return resp;\n  } catch (e) {\n    return new Response('Offline emoji', {\n      status: 503\n    });\n  }\n}\n\n//# sourceURL=webpack://reactproject/./src/sw.js?\n}");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/sw.js"]();
/******/ 	
/******/ })()
;