// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBLN4LA-13aO6BWvv0MSAk5r5DIqEyE2ZY",
	authDomain: "odin-book-ea103.firebaseapp.com",
	projectId: "odin-book-ea103",
	storageBucket: "odin-book-ea103.appspot.com",
	messagingSenderId: "1098007418778",
	appId: "1:1098007418778:web:15d82dbd98a9bcb11dcc23",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
