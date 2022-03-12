const cacheName = 'wem-v15';

const staticFiles = [
    "404.html",
    "files.json",
    "index.html",
    "listFiles.js",
    "sw.js",
    "assets/style.css",
    "assets/img/favicon.ico",
    "assets/img/logo.svg",
    "assets/img/u1.svg",
    "assets/img/u10.svg",
    "assets/img/u11.svg",
    "assets/img/u12.svg",
    "assets/img/u2.svg",
    "assets/img/u3.svg",
    "assets/img/u4.svg",
    "assets/img/u5.svg",
    "assets/img/u6.svg",
    "assets/img/u7.svg",
    "assets/img/u8.svg",
    "assets/img/u9.svg",
    "assets/img/wem-logo.png",
    "assets/manifest/icon-192x192.png",
    "assets/manifest/icon-256x256.png",
    "assets/manifest/icon-384x384.png",
    "assets/manifest/icon-512x512.png",
    "assets/manifest/manifest.json",
    "components/answer-block.js",
    "components/app.js",
    "components/chapter.js",
    "components/chapters.js",
    "components/code-preview-languages.js",
    "components/code-preview.js",
    "components/home.js",
    "components/inline-code-preview.js",
    "components/link.js",
    "components/logo-animation.js",
    "components/run-code.js",
    "components/utils.js",
    "components/assets/arrow.svg",
    "components/assets/console.html",
    "components/assets/eye-icon.svg",
    "components/assets/play-icon.svg",
    "solutions/u1/a3.html",
    "solutions/u1/a4.html",
    "solutions/u1/a5.html",
    "solutions/u1/index.html",
    "solutions/u10/index.html",
    "solutions/u10/a1/dist/favicon.ico",
    "solutions/u10/a1/dist/index.html",
    "solutions/u10/a1/dist/css/app.83e760de.css",
    "solutions/u10/a1/dist/js/app.28d7b81c.js",
    "solutions/u10/a1/dist/js/app.28d7b81c.js.map",
    "solutions/u10/a1/dist/js/chunk-vendors.e7c769f2.js",
    "solutions/u10/a1/dist/js/chunk-vendors.e7c769f2.js.map",
    "solutions/u10/a1/src/App.vue",
    "solutions/u10/a1/src/main.js",
    "solutions/u10/a1/src/components/TextCounter.vue",
    "solutions/u10/a2/dist/favicon.ico",
    "solutions/u10/a2/dist/index.html",
    "solutions/u10/a2/dist/css/app.8e257bfa.css",
    "solutions/u10/a2/dist/js/app.32924eb0.js",
    "solutions/u10/a2/dist/js/app.32924eb0.js.map",
    "solutions/u10/a2/dist/js/chunk-vendors.74a47ef3.js",
    "solutions/u10/a2/dist/js/chunk-vendors.74a47ef3.js.map",
    "solutions/u10/a2/src/App.vue",
    "solutions/u10/a2/src/components/MenuBar.vue",
    "solutions/u11/a1.js",
    "solutions/u11/a1.wat",
    "solutions/u11/a2.c",
    "solutions/u11/a2.html",
    "solutions/u11/a2.js",
    "solutions/u11/a2.wat",
    "solutions/u11/index.html",
    "solutions/u11/a1/main.wasm",
    "solutions/u11/a2/main.wasm",
    "solutions/u12/a1.js",
    "solutions/u12/index.html",
    "solutions/u12/webgoat/csrf/l2.html",
    "solutions/u12/webgoat/csrf/l2.png",
    "solutions/u12/webgoat/csrf/l3.html",
    "solutions/u12/webgoat/csrf/l3.png",
    "solutions/u12/webgoat/csrf/l6.html",
    "solutions/u12/webgoat/csrf/l6.png",
    "solutions/u12/webgoat/sql/l1.png",
    "solutions/u12/webgoat/sql/l10.png",
    "solutions/u12/webgoat/sql/l11.png",
    "solutions/u12/webgoat/sql/l12.png",
    "solutions/u12/webgoat/sql/l2.png",
    "solutions/u12/webgoat/sql/l3.png",
    "solutions/u12/webgoat/sql/l4.png",
    "solutions/u12/webgoat/sql/l8.png",
    "solutions/u12/webgoat/sql/l9.png",
    "solutions/u12/webgoat/xss/l1.png",
    "solutions/u12/webgoat/xss/l10_1.png",
    "solutions/u12/webgoat/xss/l10_2.png",
    "solutions/u12/webgoat/xss/l11_1.png",
    "solutions/u12/webgoat/xss/l11_2.png",
    "solutions/u12/webgoat/xss/l6.png",
    "solutions/u12/webgoat/xss/l9.png",
    "solutions/u2/a1.html",
    "solutions/u2/a2.html",
    "solutions/u2/a3_flexbox.html",
    "solutions/u2/a3_grid.html",
    "solutions/u2/a4.html",
    "solutions/u2/index.html",
    "solutions/u3/a1-1.js",
    "solutions/u3/a1-10.js",
    "solutions/u3/a1-11.js",
    "solutions/u3/a1-12.js",
    "solutions/u3/a1-13.js",
    "solutions/u3/a1-14.js",
    "solutions/u3/a1-2.js",
    "solutions/u3/a1-3.js",
    "solutions/u3/a1-4.js",
    "solutions/u3/a1-5.js",
    "solutions/u3/a1-6.js",
    "solutions/u3/a1-7.js",
    "solutions/u3/a1-8.js",
    "solutions/u3/a1-9.js",
    "solutions/u3/a2-1.js",
    "solutions/u3/a2-10.js",
    "solutions/u3/a2-11.js",
    "solutions/u3/a2-12.js",
    "solutions/u3/a2-13.js",
    "solutions/u3/a2-14.js",
    "solutions/u3/a2-15.js",
    "solutions/u3/a2-16.js",
    "solutions/u3/a2-2.js",
    "solutions/u3/a2-3.js",
    "solutions/u3/a2-4.js",
    "solutions/u3/a2-5.js",
    "solutions/u3/a2-6.js",
    "solutions/u3/a2-7.js",
    "solutions/u3/a2-8.js",
    "solutions/u3/a2-9.js",
    "solutions/u3/index.html",
    "solutions/u4/a1.css",
    "solutions/u4/a1.html",
    "solutions/u4/a1.js",
    "solutions/u4/a2.css",
    "solutions/u4/a2.html",
    "solutions/u4/a2.js",
    "solutions/u4/a3.css",
    "solutions/u4/a3.html",
    "solutions/u4/a3.js",
    "solutions/u4/a4.css",
    "solutions/u4/a4.html",
    "solutions/u4/a4.js",
    "solutions/u4/index.html",
    "solutions/u4/assets/align-text-center.svg",
    "solutions/u4/assets/align-text-left.svg",
    "solutions/u4/assets/align-text-right.svg",
    "solutions/u4/assets/bold.svg",
    "solutions/u4/assets/heading-h1.svg",
    "solutions/u4/assets/heading-h2.svg",
    "solutions/u4/assets/heading-h3.svg",
    "solutions/u4/assets/heading-h4.svg",
    "solutions/u4/assets/heading-h5.svg",
    "solutions/u4/assets/image-file.svg",
    "solutions/u4/assets/italic.svg",
    "solutions/u4/assets/link.svg",
    "solutions/u4/assets/text-color.svg",
    "solutions/u4/assets/text-strikethrough.svg",
    "solutions/u4/assets/underline.svg",
    "solutions/u4/assets/undo.svg",
    "solutions/u4/assets/unlink.svg",
    "solutions/u5/a1.css",
    "solutions/u5/a1.html",
    "solutions/u5/a1.js",
    "solutions/u5/a2.css",
    "solutions/u5/a2.html",
    "solutions/u5/a2.js",
    "solutions/u5/a3.html",
    "solutions/u5/a3_webWorker.html",
    "solutions/u5/a4.html",
    "solutions/u5/a4.js",
    "solutions/u5/index.html",
    "solutions/u5/assets/a.txt",
    "solutions/u5/assets/a4_contents.json",
    "solutions/u5/assets/b.txt",
    "solutions/u5/assets/worker.js",
    "solutions/u6/a1.css",
    "solutions/u6/a1.html",
    "solutions/u6/a1.js",
    "solutions/u6/a2.css",
    "solutions/u6/a2.html",
    "solutions/u6/a2.js",
    "solutions/u6/a3.css",
    "solutions/u6/a3.html",
    "solutions/u6/a3.js",
    "solutions/u6/index.html",
    "solutions/u7/alpha_file_gen.js",
    "solutions/u7/index.html",
    "solutions/u7/merge_files.js",
    "solutions/u7/merge_streams.js",
    "solutions/u7/merge_streams_express.js",
    "solutions/u7/number_file_gen.js",
    "solutions/u7/public/index.html",
    "solutions/u8/a1-1.html",
    "solutions/u8/a1-1.js",
    "solutions/u8/a1-2.html",
    "solutions/u8/a1-2.js",
    "solutions/u8/a1-3.html",
    "solutions/u8/a1-3.js",
    "solutions/u8/a1-4.html",
    "solutions/u8/a1-4.js",
    "solutions/u8/a1-5.html",
    "solutions/u8/a1-5.js",
    "solutions/u8/a1-6.html",
    "solutions/u8/a1-6.js",
    "solutions/u8/a2.html",
    "solutions/u8/a2.js",
    "solutions/u8/a3.html",
    "solutions/u8/a3.js",
    "solutions/u8/index.html",
    "solutions/u8/assets/a3_contents.json",
    "solutions/u9/index.html",
    "solutions/u9/a1/index.html",
    "solutions/u9/a1/main.js",
    "solutions/u9/a1/manifest.json",
    "solutions/u9/a1/sw.js",
    "solutions/u9/a1/assets/a3_contents.json",
    "solutions/u9/a1/assets/icon-192.png",
    "solutions/u9/a1/assets/icon-512.png"
];

const staticImports = [
    'https://cdn.skypack.dev/lit@v2.1.2',
    'https://cdn.skypack.dev/lit-element-router',
    'https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap',
    'https://cdn.skypack.dev/prismjs@v1.x/themes/prism-okaidia.min.css',
    'https://cdn.skypack.dev/prismjs@v1.x/components/prism-core.min.js'
];

self.addEventListener('install', (event) => {
    self.skipWaiting().then();
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
            return cache.addAll([
                ...(staticFiles.map(item=>'/wem/'+item)),
                ...staticImports
            ])
        })
    )
});

self.addEventListener('activate', function(e) {
    e.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(localCacheName) {
                    if (localCacheName !== cacheName) {
                        console.log('deleting', localCacheName);
                        return caches.delete(localCacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(cacheName).then((cache) => {
            return cache.match(event.request).then((response) => {
                const load = () => {
                    return fetch(event.request).then((response) => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
                };
                if (event.request.url.endsWith("/sw.js")) {
                    return load() || response;
                }
                return response || load();
            });
        })
    );
});