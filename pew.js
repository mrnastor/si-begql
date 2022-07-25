// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuJnnppJWNpuU5F_yIiT5d7f-ynNsyUB4",
  authDomain: "test-project-230703.firebaseapp.com",
  projectId: "test-project-230703",
  storageBucket: "test-project-230703.appspot.com",
  messagingSenderId: "751103669346",
  appId: "1:751103669346:web:322de29f09e320c8ff8d3b",
  measurementId: "G-VTNDN1H7YN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);