import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";




// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB2hnpres6UhbBqL5GzFOkTWAPTNen3Joc",
    authDomain: "fireapp-cbf1e.firebaseapp.com",
    projectId: "fireapp-cbf1e",
    storageBucket: "fireapp-cbf1e.firebasestorage.app",
    messagingSenderId: "631824044715",
    appId: "1:631824044715:web:32ad0dc5af3de50d821dee",
    measurementId: "G-K79W32MPM9",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);


                                    
