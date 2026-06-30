
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: "ai-interviewer-d6504",
  storageBucket: "ai-interviewer-d6504.firebasestorage.app",
  messagingSenderId: "631197476900",
  appId: "1:631197476900:web:79fb1339775bf704e610b1",
  measurementId: "G-N9FJR9CGET"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth, provider}