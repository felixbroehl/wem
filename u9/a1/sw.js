const cacheName = 'www-navigator-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                'assets/a3_contents.json',
                'main.js',
                'index.html',
                'manifest.json',
                'https://cdn.skypack.dev/lit@v2.1.2',
                'https://cdn.skypack.dev/lit@v2.1.2/directives/class-map.js'
            ])
        })
    )
})

self.addEventListener('fetch', event => { // From https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
    if (event.request.method !== 'GET') return;

    event.respondWith(async function() {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            event.waitUntil(cache.add(event.request));
            return cachedResponse;
        }

        return fetch(event.request);
    }());
});