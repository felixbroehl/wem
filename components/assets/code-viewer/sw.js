const cacheName = 'wem-code-viewer';

const staticImports = [
    'https://cdn.skypack.dev/@lukaskl/monaco-editor',
    'https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js',
    'codicon.ttf',
    'Monokai.json',
    'code-viewer.html',
    'sw.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll(staticImports)
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                return response || fetch(event.request).then((response) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            });
        })
    );
});