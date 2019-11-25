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
      cache.put(req, res.clone());
      return res;
  } catch (error) {
      console.log('The request was not able to be made, here is some cachy cache')
      // console.log(cache.match(req))
      return await cache.match(req);
  }
};