import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyAgVnCdzYWZPxDcLHGpHGFhdq-JvVJMkrU",
  authDomain: "chat-orientacion.firebaseapp.com",
  projectId: "chat-orientacion",
  storageBucket: "chat-orientacion.firebasestorage.app",
  messagingSenderId: "386087691549",
  appId: "1:386087691549:web:fcf860e58b4cbd1d00adf4",
  measurementId: "G-QJXT45F02M"
};

// Inicializar Firebase solo si no está inicializado
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

// Analytics solo en el cliente
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then(yes => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, app, analytics, db };

