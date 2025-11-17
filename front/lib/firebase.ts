import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDuYHbuZN63_VYJeyRI-oA43pBIxq5Dm7c",
  authDomain: "chat-orientacion-vocacional.firebaseapp.com",
  projectId: "chat-orientacion-vocacional",
  storageBucket: "chat-orientacion-vocacional.firebasestorage.app",
  messagingSenderId: "293396638275",
  appId: "1:293396638275:web:f6a5e105b7fcc96e3342f6",
  measurementId: "G-1NE7P9MPDT"
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

