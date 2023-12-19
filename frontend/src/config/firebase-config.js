// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Jg0lrrHJBaoTvjxqJ3hJzHtrWGgxngo",
  authDomain: "expense-tracker-3b124.firebaseapp.com",
  databaseURL: "https://expense-tracker-3b124-default-rtdb.firebaseio.com",
  projectId: "expense-tracker-3b124",
  storageBucket: "expense-tracker-3b124.appspot.com",
  messagingSenderId: "310304315395",
  appId: "1:310304315395:web:3afdd907a50b81ef7fd636",
  measurementId: "G-RH7N4FW6JT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
