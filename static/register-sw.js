if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { 
      scope: '/service/' 
    }).then(reg => {
      console.log('✅ Service Worker registered');
    }).catch(err => {
      console.error('❌ Service Worker registration failed:', err);
    });
  });
}
