if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/frontend/serviceWorker.js', {
      scope: './'
    })
    .then(reg => {
      console.log('Service worker has been registered for scope:' + reg.scope);
    })
    .catch(err => console.log(err));
};
const staticAssets = [
  './',
  './public/Notes.css',
  './public/Notes.html',
  './src/fetchService.js',
  './src/renderView.js',
];
self.addEventListener('install', async () => {
  const cache = await caches.open('static-cache');
  cache.addAll(staticAssets);
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if(url.origin === location.url){
      event.respondWith(cacheFirst(req));
  } else {
      event.respondWith(newtorkFirst(req));
  }
});
const cacheFirst = async (req) => {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
};
const networkFirst = (req) => {
  const cache = await caches.open('dynamic-cache');
  try {
      const res = await fetch(req);
      cache.put(req, res.clone());
      return res;
  } catch (error) {
      return await cache.match(req);
  }
};