import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBJBTpiuXmQPmgUWj1yozylUyXMv-EHbIA",
  authDomain: "intricate-mix-365313.firebaseapp.com",
  projectId: "intricate-mix-365313",
  storageBucket: "intricate-mix-365313.appspot.com",
  messagingSenderId: "559417633894",
  appId: "1:559417633894:web:a01e9f56745c27a34511a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
