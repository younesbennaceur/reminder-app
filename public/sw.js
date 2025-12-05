// public/sw.js

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: data.icon || '/Logo.png',
      badge: '/Logo.png', // Petite icône dans la barre de statut (Android)
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      }
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // Ouvre l'application si on clique sur la notif
  event.waitUntil(
    self.clients.openWindow('/')
  );
});