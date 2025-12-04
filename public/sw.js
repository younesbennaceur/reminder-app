console.log("Service Worker chargé...");

self.addEventListener('push', e => {
  const data = e.data.json();
  
  self.registration.showNotification(data.title, {
    body: data.body,
    vibrate: [100, 50, 100], 
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  });
});


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
});