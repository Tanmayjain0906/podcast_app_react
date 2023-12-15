// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYjtKslww9_yaJm-4dG5prbQ-SjP0gweg",
  authDomain: "podcast-app-react-60f3a.firebaseapp.com",
  projectId: "podcast-app-react-60f3a",
  storageBucket: "podcast-app-react-60f3a.appspot.com",
  messagingSenderId: "904598625029",
  appId: "1:904598625029:web:489aea1fdaedf6121cf56c",
  measurementId: "G-89EHBP0ZN0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth  = getAuth(app);