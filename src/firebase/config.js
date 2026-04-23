import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUJP_i-j2znxx_9e27nmd-NrO9Pi4OJb0",
  authDomain: "busybuy1-6e2b5.firebaseapp.com",
  projectId: "busybuy1-6e2b5",
  storageBucket: "busybuy1-6e2b5.firebasestorage.app",
  messagingSenderId: "348702424333",
  appId: "1:348702424333:web:f3883d616f5e6db14ec444",
  measurementId: "G-WGECMLLHBB",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
