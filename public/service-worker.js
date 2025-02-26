self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  event.waitUntil(
    caches.open('app-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/output.css',
        '/script.js',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
      ])
    }),
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})
