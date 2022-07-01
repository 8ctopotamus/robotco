const STATIC_CACHE = 'static_cache_v1'
const DATA_CACHE = 'data_cache_v1'

const FILES_TO_CACHE = [
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

const swIcon = `🤖 (SW): `

self.addEventListener('install', event => {
  console.log(`${swIcon} Installing...`)
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(FILES_TO_CACHE))
  )
  self.skipWaiting() // forces the waiting sevice worker to become the active service worker: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
})

self.addEventListener('activate', event => {
  console.log(`${swIcon} Activating...`)
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
  self.clients.claim() // active service worker to set itself as the controller for all clients within its scope: https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
})

self.addEventListener('fetch', event => {
  console.log(`${swIcon} Requesting `, event.request)
  // Requests for data
  // Strategy: Network-first, fallback to cache
  if (event.request.url.includes('dummyjson.com') && event.request.method === 'GET') {
    event.respondWith(
      // open caches
      caches.open(DATA_CACHE)
        .then(cache => {
          // try network with a fetch request
          return fetch(event.request)
            .then(response => {
              // if success
              if (response.status === 200) {
                // save response in cache
                cache.put(event.request.url, response.clone())
              }
              return response
            })
            // if fails pull last saved data from cache
            .catch(() => caches.match(event.request))
        })
        .catch(err => console.log(err))
    )
    return
  }

  // Request for static assets (.html, .css, .js, .jpg, .png)
  // Strategy: Cache-first, fallback to Network
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  )
})