import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgwffTD7zEt1bACX8u4QMFJLIvAnfqXig",
  authDomain: "swportal-251d1.firebaseapp.com",
  projectId: "swportal-251d1",
  storageBucket: "swportal-251d1.firebasestorage.app",
  messagingSenderId: "407631962079",
  appId: "1:407631962079:web:0e6639b417ca3e3a8b2e6a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
