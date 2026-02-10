// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth"; 
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"
import{APIKEY,AUTH_DOMAIN,PROJECT_ID,STORAGE_BUCKET,MESSAGING_SENDER_ID,APPID,MEASUREMENTID} from "@env"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APPID,
  measurementId: MEASUREMENTID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app)
//     persistance:getReactNativePersistance(ReactNativeAsyncStorage)
// });
export const db = getFirestore(app)
export const storege =getStorage(app)
const analytics = getAnalytics(app)