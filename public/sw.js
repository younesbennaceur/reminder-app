self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      // L'image principale à droite de la notif
      icon: '/Logo.png', 
      // La petite icône dans la barre de statut (Android uniquement). 
      // Idéalement, ce doit être une image blanche transparente, sinon Android met un carré blanc.
      // Pour l'instant, on remet le Logo.png, mais si ça fait un carré blanc, c'est normal.
      badge: '/Logo.png', 
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      // Actions optionnelles
      actions: [
        {action: 'open', title: 'Ouvrir l\'application'}
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow('/')
  );
});