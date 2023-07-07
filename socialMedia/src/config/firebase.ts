// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMjc7ic6wg2jP8qbU95vJOrTSBHRAoLqM",
  authDomain: "social-media-2ea94.firebaseapp.com",
  projectId: "social-media-2ea94",
  storageBucket: "social-media-2ea94.appspot.com",
  messagingSenderId: "974973108547",
  appId: "1:974973108547:web:6831c56295386687092ff6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
