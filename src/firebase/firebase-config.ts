// Import the functions you need from the SDKs you need
import "firebase/compat/auth";

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  // measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyBVK1H0aWcsGaB-MmJkdn7WhbmExHmB-Os",
  authDomain: "gpa-matching.firebaseapp.com",
  projectId: "gpa-matching",
  storageBucket: "gpa-matching.appspot.com",
  messagingSenderId: "1045277673665",
  appId: "1:1045277673665:web:df5035d2cf7cef5e20ac40",
  measurementId: "G-HL048BJCFT",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseAnalytics = getAnalytics(firebaseApp);
