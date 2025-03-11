// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeFgpAeXg6fdsfli5c8d_699vRiaWTE40",
  authDomain: "ai-interview-5a811.firebaseapp.com",
  projectId: "ai-interview-5a811",
  storageBucket: "ai-interview-5a811.firebasestorage.app",
  messagingSenderId: "1004606998017",
  appId: "1:1004606998017:web:60bac66ba3d9e8723b6200",
  measurementId: "G-GXK7Z016J1",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword };
