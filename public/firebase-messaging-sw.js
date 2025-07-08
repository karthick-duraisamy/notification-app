importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDPkaS8M8vYkQTJh5l1xwjOoVqRu021NcE",
  authDomain: "notification-8576a.firebaseapp.com",
  projectId: "notification-8576a",
  storageBucket: "notification-8576a.firebasestorage.app",
  messagingSenderId: "287155607380",
  appId: "1:287155607380:web:de88af9e7c04678d9bdac1",
  measurementId: "G-99L2CSJ3V7"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png'
  };

  self.registration.showNotification(
    payload.notification.title,
    notificationOptions
  );
});