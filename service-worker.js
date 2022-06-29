const STATIC_CACHE = 'static_cache_v1'

const assets = [
  '/',
  'index.html',
  'site.webmanifest',
  'dist/main.css',
  'dist/bundle.js',
  'images/icons/android-chrome-192x192.png',
  'images/icons/android-chrome-512x512.png',
  'images/icons/apple-touch-icon.png',
  'images/icons/browserconfig.xml',
  'images/icons/favicon-16x16.png',
  'images/icons/favicon-32x32.png',
  'images/icons/favicon.ico',
  'images/icons/mstile-70x70.png',
  'images/icons/mstile-144x144.png',
  'images/icons/mstile-150x150.png',
  'images/icons/mstile-310x150.png',
  'images/icons/mstile-310x310.png',
  'images/icons/safari-pinned-tab.svg',
  'images/robots/robot-1.svg',
  'images/robots/robot-2.svg',
  'images/robots/robot-3.svg',
  'images/robots/robot-4.svg',
  'images/robots/robot-5.svg',
  'images/robots/robot-6.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
  'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js',
  'https://unpkg.com/scrollreveal',
  'https://cdnjs.cloudflare.com/ajax/libs/lettering.js/0.6.1/jquery.lettering.min.js',
  "https://cdnjs.cloudflare.com/ajax/libs/textillate/0.4.0/jquery.textillate.min.js",
  "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js",
  "src/js/particles.json",
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(assets))
  )
  self.skipWaiting()
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== STATIC_CACHE) {
            return caches.delete(key)
          }
        })
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then((res) => res || fetch(event.request))
  )
})