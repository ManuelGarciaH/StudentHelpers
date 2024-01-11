// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAafBx7fc3ouqkekHOAF2NzNZgEroRxMh4",
  authDomain: "studenthelpers-9cfed.firebaseapp.com",
  projectId: "studenthelpers-9cfed",
  storageBucket: "studenthelpers-9cfed.appspot.com",
  messagingSenderId: "971675916187",
  appId: "1:971675916187:web:9316c1fafd381cfebb333e"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);    //Constante Base de datos
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);           //Constante de Autenticación