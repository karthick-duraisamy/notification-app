
# Firebase Web Push Notification Setup

## Firebase Account and Project Setup

### Step 1: Create Firebase Account
- Use your **company email ID** to sign up on [Firebase Console](https://console.firebase.google.com/).
- Prefer using a **Google Workspace**-linked email for better integration.
- Add recovery options and 2FA for account security.

### Step 2: Create Firebase Project under Organization
- Inside our organization (e.g., **Infiniti Workspace**), create a new Firebase project (e.g., `notification`).
- Select our **Google Cloud organization or workspace parent** correctly so it's grouped properly.
- Enable Google Analytics for advanced tracking (optional but recommended).

### Step 3: Retrieve Project Configuration
- Go to: `Firebase Console` → `Project Settings` → `General`
- Locate the Firebase SDK snippet for Web.
- Copy and use this in your `firebase-config.ts`:

```ts
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPkaS8M8vYkQTJh5l1xwjOoVqRu021NcE",
  authDomain: "notification-8576a.firebaseapp.com",
  projectId: "notification-8576a",
  storageBucket: "notification-8576a.firebasestorage.app",
  messagingSenderId: "287155607380",
  appId: "1:287155607380:web:de88af9e7c04678d9bdac1",
  measurementId: "G-99L2CSJ3V7"
};

export const firebaseApp = initializeApp(firebaseConfig);
```

### 4. Generate Public VAPID Key
- Navigate to `Project Settings` → `Cloud Messaging` tab.
- Under **Web Push certificates**, click **Generate Key Pair** (if not already generated).
- Copy the **Public VAPID key** and save it securely.
- This key is necessary for generating the FCM token.

---

## Firebase Messaging Integration (Web)

### Step 1: Install Firebase
```bash
npm install firebase
# or
yarn add firebase
```

### Step 2: Firebase Messaging Setup & Token Generation
Create the `firebase-messaging.ts` file:

```ts
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseApp } from "./firebase-config";

const messaging = getMessaging(firebaseApp);

// Your Public VAPID Key
const publicVapidKey = "BO-a9wxh6Bdgdc1y8Sve-Xn9_LRUzMpYjfN0q46AvpumPUcbW_GMA3FxOQpoN5XoY9zgdmOh1ZnIcCiqDfJH0fI";

export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('Notification permission status:', permission);
    if (permission === 'granted') {
      const currentToken = await getToken(messaging, { vapidKey: publicVapidKey });

      if (currentToken) {
        console.log('FCM registration token:', currentToken);
        return currentToken;
      } else {
        console.log('No registration token available.');
      }
    } else {
      console.log('Permission to notify not granted.');
    }
  } catch (err) {
    console.error('Error retrieving token:', err);
  }
};
```

### Step 3: Trigger Token Request
- Call `requestPermissionAndGetToken()` from your app after page load or login.
- Ensure this is only called in browsers supporting Notification API.

---

## Additional Notes

### Recommended Enhancements
- Create and register a `firebase-messaging-sw.js` file in root:
```js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  // use same config here
});

const messaging = firebase.messaging();
```
- Add fallback UI for denied notification permission.
- Store FCM token to backend for targeted messaging.
- Refresh token on interval or when invalidated.

### Browser Support
- Works in: Chrome, Edge, Firefox (desktop/mobile)
- **iOS Safari does not support Web Push natively**

---

## Testing Tips
- Use Firebase Console → Cloud Messaging → Send Test Message
- Ensure service worker is active and page has permission
- Check `Application` → `Service Workers` in DevTools

