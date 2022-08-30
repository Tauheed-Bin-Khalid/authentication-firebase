// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBiZkFaVE6HRv53bt93aPkUG_R3TI2N69Y",
    authDomain: "authcrudpractice.firebaseapp.com",
    projectId: "authcrudpractice",
    storageBucket: "authcrudpractice.appspot.com",
    messagingSenderId: "1005773377667",
    appId: "1:1005773377667:web:b5202708cf3aeeb8e3cbb6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);