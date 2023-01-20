// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
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
