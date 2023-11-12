// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBPCVsq-S2lOoL-TmqCRGHU4fTiuP5PnE",
  authDomain: "expense-tracker-advanced.firebaseapp.com",
  projectId: "expense-tracker-advanced",
  storageBucket: "expense-tracker-advanced.appspot.com",
  messagingSenderId: "984131669563",
  appId: "1:984131669563:web:07780114df3a0e4b39d61e",
  measurementId: "G-W7R8PN3J1D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);