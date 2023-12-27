// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.KEY,
  authDomain: "testing-projects-373f0.firebaseapp.com",
  projectId: "testing-projects-373f0",
  storageBucket: "testing-projects-373f0.appspot.com",
  messagingSenderId: "319109786606",
  appId: "1:319109786606:web:34955bbcaba2eca7907cff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);