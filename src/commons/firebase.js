// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDveZTl8yp6JvUIp0yc-m7JKHBCpOsIFgk",
  authDomain: "blog-app-9d8cc.firebaseapp.com",
  projectId: "blog-app-9d8cc",
  storageBucket: "blog-app-9d8cc.appspot.com",
  messagingSenderId: "1047558762321",
  appId: "1:1047558762321:web:60a9f6d7963c8e818c2d70",
  measurementId: "G-MQV7CXYKKW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);