import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);    //Constante firebase

// Get authentication instance with AsyncStorage persistence
const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const FIREBASE_AUTH = auth;
const FIREBASE_DB = getFirestore();        //Constante de base de datos
// FIREBASE_DB.settings({ persistenceEnabled: false });

// Exporta las instancias necesarias
export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB };