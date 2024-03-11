// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);    //Constante firebase

// Get authentication instance with AsyncStorage persistence
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_AUTH = auth;
export const FIREBASE_DB = getFirestore(FIREBASE_APP);        //Constante de base de datos