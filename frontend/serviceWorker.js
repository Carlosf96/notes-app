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
      console.log(url.origin, location.url);
      console.log('bzzzzz')
      event.respondWith(cacheFirst(req));
  } else {
      event.respondWith(networkFirst(req));
  }
});
const cacheFirst = async (req) => {
  const cachedResponse = caches.match(req);
  return cachedResponse || fetch(req);
};
const networkFirst = async (req) => {
  const cache = await caches.open('dynamic-cache');
  try {
      const res = await fetch(req);
      cache.put(req, res.clone())
        .catch(err => console.log(err));
      return res;
  } catch (error) {
      return await cache.match(req);
  }
};