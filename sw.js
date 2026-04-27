// Service Worker for PWA caching
const CACHE_NAME = 'pricing-page-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './favicon.png',
  './favicon-32x32.png',
  './favicon-16x16.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
