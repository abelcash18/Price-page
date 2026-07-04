// Service Worker for PWA caching
const CACHE_NAME = 'abeltech-pricing-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './favicon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png'
];

// 1. Install Event: Cache all core static assets
self.addEventListener('install', event => {
  // Forces the waiting service worker to become the active service worker immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching offline assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. Activate Event: Clean up old, stale caches from previous versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Forces open tabs to use this sw immediately
  );
});

// 3. Fetch Event: Cache-First Strategy with Network Fallback
self.addEventListener('fetch', event => {
  // Skip cross-origin or non-GET requests (like APIs, extension injections, etc.)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse; // Return asset from local storage instantly
        }
        
        // Fallback to network fetch if not found in cache
        return fetch(event.request).catch(() => {
          // Optional fallback page can go here if you decide to add an offline.html later
          console.log('[Service Worker] Resource fetch failed offline');
        });
      })
  );
});