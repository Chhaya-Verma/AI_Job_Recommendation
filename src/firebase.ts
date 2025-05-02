/////////////////////// FIRESTONE //////////////////
// src/firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore added

const firebaseConfig = {
  apiKey: "AIzaSyAVrjbuqiDEmb-_p9IC83288wkUAVTlvuA",
  authDomain: "ai-job-recommendation-app.firebaseapp.com",
  projectId: "ai-job-recommendation-app",
  storageBucket: "ai-job-recommendation-app.firebasestorage.app",
  messagingSenderId: "548387611975",
  appId: "1:548387611975:web:9e17e796c55118dfd6d862"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app); // ✅ This is Firestore DB







