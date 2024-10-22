// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKbfMM6ne16s2gVYlfjXEZLpv0d_BAJOI",
  authDomain: "lunch-1b2c1.firebaseapp.com",
  projectId: "lunch-1b2c1",
  storageBucket: "lunch-1b2c1.appspot.com",
  messagingSenderId: "63769526563",
  appId: "1:63769526563:web:d1ecfe4ff4c06e9ea08c96",
  measurementId: "G-JL2H5HCLNQ",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export initialized services
export const auth = getAuth(app);
export const db = getFirestore(app);
