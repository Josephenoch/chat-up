import {initializeApp} from "firebase/app"
import {getFirestore} from "@firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { setPersistence, signInWithPopup, browserLocalPersistence} from "firebase/auth"



// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDKII12qWxgqwmR8Ut9MHHL6rhkI5N51Jk",
    authDomain: "whatsapp-clone-62e92.firebaseapp.com",
    projectId: "whatsapp-clone-62e92",
    storageBucket: "whatsapp-clone-62e92.appspot.com",
    messagingSenderId: "632581599147",
    appId: "1:632581599147:web:6ace34a135a2cb7453ecee",
    measurementId: "G-GYJEYHRC8G"
  };

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const db = getFirestore(app)


