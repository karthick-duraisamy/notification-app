import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyDPkaS8M8vYkQTJh5l1xwjOoVqRu021NcE',
  authDomain: 'notification-8576a.firebaseapp.com',
  projectId: 'notification-8576a',
  storageBucket: 'notification-8576a.firebasestorage.app',
  messagingSenderId: '287155607380',
  appId: '1:287155607380:web:de88af9e7c04678d9bdac1',
  measurementId: 'G-99L2CSJ3V7'
};

export const firebaseApp = initializeApp(firebaseConfig);
