importScripts('/baremux/index.js');
importScripts('/epoxy/index.js');
importScripts('/uv/uv.bundle.js');
importScripts('/uv/uv.config.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => {
  event.respondWith(sw.fetch(event));
});
