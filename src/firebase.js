// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDxRPJ1m_ioUsWR99VCHw3ul9U5cmNagiE",
  authDomain: "flwrstore-8d547.firebaseapp.com",
  projectId: "flwrstore-8d547",
  storageBucket: "flwrstore-8d547.firebasestorage.app",
  messagingSenderId: "654752832441",
  appId: "1:654752832441:web:62122907874f7ab753b468",
  measurementId: "G-EJ0T4KVRR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);