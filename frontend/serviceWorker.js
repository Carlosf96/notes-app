if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/frontend/serviceWorker.js', {
      scope: './'
    })
    .then(reg => {
      console.log('Service worker has been registered for scope:' + reg.scope);
    })
    .catch(err => console.log(err));
}