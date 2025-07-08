import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from './firebase-config';

// Get the messaging service instance
const messaging = getMessaging(firebaseApp);

// Public VAPID key - get this from Firebase console -> Engage -> Cloud Messaging -> Web configuration
const publicVapidKey = 'BO-a9wxh6Bdgdc1y8Sve-Xn9_LRUzMpYjfN0q46AvpumPUcbW_GMA3FxOQpoN5XoY9zgdmOh1ZnIcCiqDfJH0fI';

// Request permission and get token
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission status:', permission);
    if (permission === 'granted') {
      console.log('Notification permission granted.');

      // Get registration token. In service worker, ID is optional.
      const currentToken = await getToken(messaging, { vapidKey: publicVapidKey });

      if (currentToken) {
        console.log('FCM registration token:', currentToken);
        return currentToken;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // This means the user has blocked notifications or the browser doesn't support it
      }
    } else {
      console.log('Unable to get permission to notify.');
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
    // Depending on the error, you might want to show a different UI for the user.
  }
};
