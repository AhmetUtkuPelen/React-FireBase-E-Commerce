import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


export const firebaseConfig = {
  apiKey: "AIzaSyAZNd-7Bq76ZFlCAjQfI6fOOPb7WgpxJJc",
  authDomain: "e-commerce-863b7.firebaseapp.com",
  projectId: "e-commerce-863b7",
  storageBucket: "e-commerce-863b7.appspot.com",
  messagingSenderId: "1084102747537",
  appId: "1:1084102747537:web:f2a811d85e5b450bd9e630"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)


export default app