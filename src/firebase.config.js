// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCXxDotllKhHdriq2qzCbNW7_AHkiUaUqk",
    authDomain: "house-marketplace-app-bda98.firebaseapp.com",
    projectId: "house-marketplace-app-bda98",
    storageBucket: "house-marketplace-app-bda98.appspot.com",
    messagingSenderId: "553337410406",
    appId: "1:553337410406:web:93a9984db0d46499272ea7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const DataBase = getFirestore();
