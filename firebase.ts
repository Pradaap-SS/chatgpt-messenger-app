// Import the functions you need from the SDKs you need
import {getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRhzniobJC-FHypCKMDAKbtZNa9EedmeE",
  authDomain: "chatgpt-messenger-a714a.firebaseapp.com",
  projectId: "chatgpt-messenger-a714a",
  storageBucket: "chatgpt-messenger-a714a.appspot.com",
  messagingSenderId: "409946525809",
  appId: "1:409946525809:web:89df83f6c9cf6a91554bd0"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export{ db };
