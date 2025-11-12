// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZexDXkYEMGy_tpIWvil3873-_8Qf0b3c",
  authDomain: "jos-vendors.firebaseapp.com",
  projectId: "jos-vendors",
  storageBucket: "jos-vendors.firebasestorage.app",
  messagingSenderId: "402232328941",
  appId: "1:402232328941:web:a1f5ebcfafe4fa57ad02e4",
  measurementId: "G-3RPK46M86Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
